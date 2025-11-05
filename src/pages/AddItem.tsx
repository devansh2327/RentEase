import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const AddItem = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Item listed successfully! Awaiting admin approval.");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">List New Item</h1>
          <p className="text-muted-foreground">Share your items with fellow students and earn money</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
            <CardDescription>Fill in the information about the item you want to rent out</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Item Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Item Name *</Label>
                <Input 
                  id="name" 
                  placeholder="e.g., Scientific Calculator" 
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="books">Books & Notes</SelectItem>
                    <SelectItem value="lab">Lab Equipment</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the condition, features, and any usage instructions"
                  rows={4}
                  required
                />
              </div>

              {/* Pricing */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Rental Price *</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="price" 
                      type="number" 
                      placeholder="5" 
                      required
                      step="0.01"
                      min="0"
                    />
                    <Select defaultValue="day">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hour">per hour</SelectItem>
                        <SelectItem value="day">per day</SelectItem>
                        <SelectItem value="week">per week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deposit">Security Deposit *</Label>
                  <Input 
                    id="deposit" 
                    type="number" 
                    placeholder="20" 
                    required
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Pickup Location *</Label>
                <Input 
                  id="location" 
                  placeholder="e.g., Engineering Block, Room 203" 
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image">Item Image *</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG or WEBP (max. 5MB)
                  </p>
                  <Input 
                    id="image" 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-4">
                <Button type="submit" variant="hero" className="flex-1" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit for Approval"}
                </Button>
                <Link to="/dashboard" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                All listings are reviewed by admin before being published
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddItem;
