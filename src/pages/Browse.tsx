import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Clock, DollarSign, Star, Calculator, BookOpen, Battery, ShirtIcon, Umbrella, Music, Smartphone, Camera, Tablet, Tent } from "lucide-react";
import Navbar from "@/components/Navbar";
import RentRequestDialog from "@/components/RentRequestDialog";
import calculatorImg from "@/assets/calculator.jpg";
import textbookImg from "@/assets/textbook.jpg";
import chargerImg from "@/assets/charger.jpg";
import labcoatImg from "@/assets/labcoat.jpg";
import umbrellaImg from "@/assets/umbrella.jpg";
import speakerImg from "@/assets/speaker.jpg";
import powerbankImg from "@/assets/powerbank.jpg";
import cameraImg from "@/assets/camera.jpg";
import tabletImg from "@/assets/tablet.jpg";
import tentImg from "@/assets/tent.jpg";

const mockItems = [
  {
    id: 1,
    name: "Scientific Calculator",
    category: "Electronics",
    price: 3,
    period: "day",
    deposit: 20,
    image: calculatorImg,
    owner: "John Doe",
    rating: 4.8,
    available: true,
    location: "Engineering Block",
  },
  {
    id: 2,
    name: "Organic Chemistry Textbook",
    category: "Books",
    price: 5,
    period: "week",
    deposit: 30,
    image: textbookImg,
    owner: "Sarah Smith",
    rating: 4.9,
    available: true,
    location: "Library",
  },
  {
    id: 3,
    name: "USB-C Laptop Charger",
    category: "Electronics",
    price: 2,
    period: "day",
    deposit: 25,
    image: chargerImg,
    owner: "Mike Johnson",
    rating: 4.7,
    available: false,
    location: "CS Department",
  },
  {
    id: 4,
    name: "Lab Coat (Size M)",
    category: "Lab Equipment",
    price: 4,
    period: "day",
    deposit: 15,
    image: labcoatImg,
    owner: "Emily Chen",
    rating: 5.0,
    available: true,
    location: "Biology Lab",
  },
  {
    id: 5,
    name: "Compact Umbrella",
    category: "Accessories",
    price: 1,
    period: "day",
    deposit: 10,
    image: umbrellaImg,
    owner: "David Lee",
    rating: 4.6,
    available: true,
    location: "Student Center",
  },
  {
    id: 6,
    name: "Graphing Calculator TI-84",
    category: "Electronics",
    price: 4,
    period: "day",
    deposit: 35,
    image: calculatorImg,
    owner: "Lisa Wang",
    rating: 4.9,
    available: true,
    location: "Math Building",
  },
  {
    id: 7,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 3,
    period: "day",
    deposit: 30,
    image: speakerImg,
    owner: "Alex Turner",
    rating: 4.7,
    available: true,
    location: "Student Center",
  },
  {
    id: 8,
    name: "Power Bank 20000mAh",
    category: "Electronics",
    price: 2,
    period: "day",
    deposit: 20,
    image: powerbankImg,
    owner: "Maria Garcia",
    rating: 4.8,
    available: true,
    location: "Library",
  },
  {
    id: 9,
    name: "DSLR Camera",
    category: "Electronics",
    price: 15,
    period: "day",
    deposit: 100,
    image: cameraImg,
    owner: "Tom Wilson",
    rating: 5.0,
    available: true,
    location: "Media Lab",
  },
  {
    id: 10,
    name: "Drawing Tablet",
    category: "Electronics",
    price: 5,
    period: "day",
    deposit: 40,
    image: tabletImg,
    owner: "Nina Patel",
    rating: 4.9,
    available: false,
    location: "Art Department",
  },
  {
    id: 11,
    name: "Camping Tent",
    category: "Outdoor",
    price: 10,
    period: "day",
    deposit: 50,
    image: tentImg,
    owner: "Chris Brown",
    rating: 4.6,
    available: true,
    location: "Recreation Center",
  },
  {
    id: 12,
    name: "Physics Textbook",
    category: "Books",
    price: 4,
    period: "week",
    deposit: 25,
    image: textbookImg,
    owner: "James Lee",
    rating: 4.7,
    available: true,
    location: "Library",
  },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Electronics":
      return <Battery className="h-5 w-5" />;
    case "Books":
      return <BookOpen className="h-5 w-5" />;
    case "Lab Equipment":
      return <ShirtIcon className="h-5 w-5" />;
    case "Outdoor":
      return <Tent className="h-5 w-5" />;
    case "Audio":
      return <Music className="h-5 w-5" />;
    default:
      return <Calculator className="h-5 w-5" />;
  }
};

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<typeof mockItems[0] | null>(null);
  const [rentDialogOpen, setRentDialogOpen] = useState(false);

  const filteredItems = mockItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Browse Items</h1>
          <p className="text-muted-foreground">Find what you need from fellow students</p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for items..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Books">Books</SelectItem>
              <SelectItem value="Lab Equipment">Lab Equipment</SelectItem>
              <SelectItem value="Accessories">Accessories</SelectItem>
              <SelectItem value="Outdoor">Outdoor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  {item.available ? (
                    <Badge variant="success">Available</Badge>
                  ) : (
                    <Badge variant="destructive">Rented</Badge>
                  )}
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{item.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{item.rating}</span>
                  </div>
                </div>
                <CardDescription>{item.category}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{item.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-primary">${item.price}/{item.period}</span>
                  <span className="text-muted-foreground">• Deposit: ${item.deposit}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Owner: {item.owner}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant={item.available ? "default" : "outline"} 
                  className="w-full"
                  disabled={!item.available}
                  onClick={() => {
                    if (item.available) {
                      setSelectedItem(item);
                      setRentDialogOpen(true);
                    }
                  }}
                >
                  {item.available ? "Request to Rent" : "Not Available"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No items found matching your criteria</p>
          </div>
        )}
      </div>

      {selectedItem && (
        <RentRequestDialog
          open={rentDialogOpen}
          onOpenChange={setRentDialogOpen}
          item={selectedItem}
        />
      )}
    </div>
  );
};

export default Browse;
