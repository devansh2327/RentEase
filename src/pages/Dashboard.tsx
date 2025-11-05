import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Package, History, Wallet, QrCode, Star, Clock, TrendingUp, Scan } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import QRDialog from "@/components/QRDialog";
import RentalDetailsDialog from "@/components/RentalDetailsDialog";
import { DamageAnalysisDialog } from "@/components/DamageAnalysisDialog";

const mockRentals = [
  {
    id: 1,
    item: "Scientific Calculator",
    type: "borrowed" as const,
    status: "active",
    dueDate: "2025-11-05",
    price: 3,
    deposit: 20,
  },
  {
    id: 2,
    item: "Lab Coat (Size M)",
    type: "lent" as const,
    status: "active",
    returnDate: "2025-11-04",
    price: 4,
    deposit: 15,
  },
];

const mockHistory = [
  {
    id: 1,
    item: "Organic Chemistry Textbook",
    type: "borrowed",
    date: "2025-10-15",
    amount: 25,
    rating: 5,
  },
  {
    id: 2,
    item: "USB-C Charger",
    type: "lent",
    date: "2025-10-20",
    amount: 8,
    rating: 4,
  },
];

const Dashboard = () => {
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [damageDialogOpen, setDamageDialogOpen] = useState(false);
  const [selectedRental, setSelectedRental] = useState<typeof mockRentals[0] | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
            <p className="text-muted-foreground">Manage your rentals and earnings</p>
          </div>
          <Link to="/add-item">
            <Button variant="hero">
              <Plus className="h-4 w-4 mr-2" />
              List New Item
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">$145.00</div>
              <p className="text-xs text-muted-foreground">+20% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
              <Wallet className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">$78.50</div>
              <p className="text-xs text-muted-foreground">Available to withdraw</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
              <Package className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">2</div>
              <p className="text-xs text-muted-foreground">1 borrowed, 1 lent</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">From 12 reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:inline-grid">
            <TabsTrigger value="active">Active Rentals</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {mockRentals.map((rental) => (
              <Card key={rental.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{rental.item}</CardTitle>
                      <CardDescription>
                        {rental.type === "borrowed" ? "Borrowed from" : "Lent to"} another student
                      </CardDescription>
                    </div>
                    <Badge variant={rental.type === "borrowed" ? "default" : "secondary"}>
                      {rental.type === "borrowed" ? "Borrowed" : "Lent Out"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {rental.type === "borrowed" ? "Due" : "Return"}: {rental.type === "borrowed" ? rental.dueDate : rental.returnDate}
                      </div>
                      <div className="text-sm font-semibold">
                        ${rental.price}/day • Deposit: ${rental.deposit}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => {
                              setSelectedRental(rental);
                              setQrDialogOpen(true);
                            }}
                          >
                            <QrCode className="h-4 w-4 mr-2" />
                            {rental.type === "borrowed" ? "Return QR" : "Pickup QR"}
                          </Button>
                          {rental.type === "borrowed" && (
                            <Button
                              size="sm"
                              variant="secondary"
                              className="hover-lift"
                              onClick={() => {
                                setSelectedRental(rental);
                                setDamageDialogOpen(true);
                              }}
                            >
                              <Scan className="h-4 w-4 mr-2" />
                              AI Damage Check
                            </Button>
                          )}
                          <Button
                        variant="default" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => {
                          setSelectedRental(rental);
                          setDetailsDialogOpen(true);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {mockHistory.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{item.item}</CardTitle>
                      <CardDescription>
                        {item.type === "borrowed" ? "Borrowed" : "Lent out"} • {item.date}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-accent">
                        {item.type === "borrowed" ? "-" : "+"}${item.amount}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{item.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {selectedRental && (
        <>
          <QRDialog
            open={qrDialogOpen}
            onOpenChange={setQrDialogOpen}
            itemName={selectedRental.item}
            type={selectedRental.type === "borrowed" ? "return" : "pickup"}
          />
          <RentalDetailsDialog
            open={detailsDialogOpen}
            onOpenChange={setDetailsDialogOpen}
            rental={selectedRental}
          />
          <DamageAnalysisDialog
            open={damageDialogOpen}
            onOpenChange={setDamageDialogOpen}
            rentalId={selectedRental.id.toString()}
            beforeImage="/placeholder.svg"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
