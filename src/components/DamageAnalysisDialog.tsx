import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, CheckCircle, AlertTriangle, XCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DamageAnalysisDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rentalId: string;
  beforeImage?: string;
}

interface DamageDetail {
  type: string;
  severity: string;
  location: string;
  description: string;
}

interface Analysis {
  condition: "No Damage" | "Minor Damage" | "Major Damage";
  damagePercentage: number;
  summary: string;
  damages: DamageDetail[];
  recommendation: string;
}

export const DamageAnalysisDialog = ({ open, onOpenChange, rentalId, beforeImage }: DamageAnalysisDialogProps) => {
  const [afterImageFile, setAfterImageFile] = useState<File | null>(null);
  const [afterImagePreview, setAfterImagePreview] = useState<string>("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAfterImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAfterImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImages = async () => {
    if (!afterImagePreview || !beforeImage) {
      toast.error("Both images are required");
      return;
    }

    setAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-damage', {
        body: {
          beforeImage,
          afterImage: afterImagePreview
        }
      });

      if (error) throw error;

      setAnalysis(data.analysis);
      
      // Update rental record with analysis
      await supabase
        .from('rentals')
        .update({
          after_image: afterImagePreview,
          damage_analysis: data.analysis,
          status: 'returned'
        })
        .eq('id', rentalId);

      toast.success("Damage analysis complete!");
    } catch (error: any) {
      console.error('Analysis error:', error);
      toast.error(error.message || "Failed to analyze images");
    } finally {
      setAnalyzing(false);
    }
  };

  const getConditionIcon = () => {
    if (!analysis) return null;
    
    switch (analysis.condition) {
      case "No Damage":
        return <CheckCircle className="h-8 w-8 text-accent" />;
      case "Minor Damage":
        return <AlertTriangle className="h-8 w-8 text-secondary" />;
      case "Major Damage":
        return <XCircle className="h-8 w-8 text-destructive" />;
    }
  };

  const getConditionColor = () => {
    if (!analysis) return "";
    
    switch (analysis.condition) {
      case "No Damage":
        return "text-accent";
      case "Minor Damage":
        return "text-secondary";
      case "Major Damage":
        return "text-destructive";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl neon-text">AI Damage Analysis</DialogTitle>
          <DialogDescription>
            Upload the after-return photo to compare with the before-rental image
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div>
            <Label className="text-lg mb-2 block">Before Rental</Label>
            {beforeImage ? (
              <img src={beforeImage} alt="Before" className="w-full rounded-lg border-2 border-primary/50" />
            ) : (
              <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">No before image</p>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="after-image" className="text-lg mb-2 block">After Return</Label>
            {afterImagePreview ? (
              <img src={afterImagePreview} alt="After" className="w-full rounded-lg border-2 border-secondary/50" />
            ) : (
              <label htmlFor="after-image" className="w-full h-64 bg-muted rounded-lg flex flex-col items-center justify-center cursor-pointer hover-glow border-2 border-dashed border-muted-foreground">
                <Upload className="h-12 w-12 mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Click to upload</p>
                <Input
                  id="after-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>
        </div>

        {!analysis && (
          <Button
            onClick={analyzeImages}
            disabled={!afterImagePreview || analyzing}
            className="w-full mt-4 hover-lift"
            size="lg"
          >
            {analyzing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Damage"
            )}
          </Button>
        )}

        {analysis && (
          <div className="mt-6 space-y-6 p-6 bg-card rounded-lg border-2 border-primary/30">
            <div className="flex items-center gap-4">
              {getConditionIcon()}
              <div className="flex-1">
                <h3 className={`text-2xl font-bold ${getConditionColor()}`}>
                  {analysis.condition}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Damage Level: {analysis.damagePercentage}%
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Summary</h4>
              <p className="text-sm text-muted-foreground">{analysis.summary}</p>
            </div>

            {analysis.damages.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Detected Damages</h4>
                <div className="space-y-3">
                  {analysis.damages.map((damage, index) => (
                    <div key={index} className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium capitalize">{damage.type.replace('_', ' ')}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          damage.severity === 'severe' ? 'bg-destructive/20 text-destructive' :
                          damage.severity === 'moderate' ? 'bg-secondary/20 text-secondary' :
                          'bg-accent/20 text-accent'
                        }`}>
                          {damage.severity}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        <strong>Location:</strong> {damage.location}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {damage.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 bg-primary/10 rounded-lg">
              <h4 className="font-semibold mb-2">Recommendation</h4>
              <p className="text-sm">{analysis.recommendation}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
