import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QrCode } from "lucide-react";

interface QRDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemName: string;
  type: "pickup" | "return";
}

const QRDialog = ({ open, onOpenChange, itemName, type }: QRDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{type === "pickup" ? "Pickup" : "Return"} QR Code</DialogTitle>
          <DialogDescription>
            Show this QR code to {type === "pickup" ? "collect" : "return"} {itemName}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <div className="w-64 h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-primary">
            <QrCode className="w-48 h-48 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            QR Code for {itemName}
          </p>
          <p className="text-xs text-muted-foreground text-center px-4">
            This is a demo QR code. In production, this would be a scannable code linked to the rental transaction.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRDialog;
