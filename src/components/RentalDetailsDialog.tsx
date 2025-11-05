import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, DollarSign, MapPin, User, Clock } from "lucide-react";

interface RentalDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rental: {
    id: number;
    item: string;
    type: "borrowed" | "lent";
    status: string;
    dueDate?: string;
    returnDate?: string;
    price: number;
    deposit: number;
  };
}

const RentalDetailsDialog = ({ open, onOpenChange, rental }: RentalDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{rental.item}</DialogTitle>
          <DialogDescription>
            Rental Details
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status</span>
            <Badge variant={rental.type === "borrowed" ? "default" : "secondary"}>
              {rental.type === "borrowed" ? "Borrowed" : "Lent Out"}
            </Badge>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {rental.type === "borrowed" ? "Owner" : "Borrower"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {rental.type === "borrowed" ? "John Doe" : "Sarah Smith"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {rental.type === "borrowed" ? "Due Date" : "Return Date"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {rental.type === "borrowed" ? rental.dueDate : rental.returnDate}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Pickup Location</p>
                <p className="text-sm text-muted-foreground">Engineering Block, Room 301</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Rental Started</p>
                <p className="text-sm text-muted-foreground">2025-11-01, 10:00 AM</p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Daily Rate</span>
              <span className="text-sm font-medium">${rental.price}/day</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Security Deposit</span>
              <span className="text-sm font-medium">${rental.deposit}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Total Paid</span>
              <span className="text-sm font-bold text-primary">
                ${rental.price * 3 + rental.deposit}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RentalDetailsDialog;
