import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Cable, Shirt, Umbrella, Calculator, Users, Shield, DollarSign } from "lucide-react";
import heroImage from "@/assets/hero-campus.jpg";

const categories = [
  { icon: BookOpen, name: "Books & Notes", count: 150, color: "text-primary" },
  { icon: Cable, name: "Electronics", count: 85, color: "text-secondary" },
  { icon: Shirt, name: "Lab Coats", count: 45, color: "text-accent" },
  { icon: Umbrella, name: "Accessories", count: 120, color: "text-primary" },
  { icon: Calculator, name: "Calculators", count: 60, color: "text-secondary" },
];

const features = [
  {
    icon: Users,
    title: "Campus Community",
    description: "Connect with fellow students and share resources within your campus community.",
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Security deposits and verified student IDs ensure safe and trustworthy rentals.",
  },
  {
    icon: DollarSign,
    title: "Affordable Rates",
    description: "Save money by renting instead of buying. Earn extra by listing your items.",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary-glow/5 to-secondary/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <span className="text-sm font-semibold text-primary">Welcome to Campus Sharing</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                Share. Rent. Save.
                <span className="block bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
                  Campus Made Easy.
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                RentEase Campus connects college students to rent everyday items like calculators, chargers, books, and more. 
                Save money, help your peers, and build a sustainable campus community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/browse">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto group">
                    Browse Items
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <img 
                src={heroImage} 
                alt="Students sharing campus resources" 
                className="relative rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Popular Categories</h2>
            <p className="text-xl text-muted-foreground">Find what you need, when you need it</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Card key={category.name} className="group cursor-pointer hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors">
                    <category.icon className={`h-8 w-8 ${category.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} items</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Three simple steps to start renting</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  1
                </div>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Register with your college email address</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  2
                </div>
                <CardTitle>Browse & Request</CardTitle>
                <CardDescription>Find items you need and send rental requests</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  3
                </div>
                <CardTitle>Scan & Use</CardTitle>
                <CardDescription>Scan QR code to pickup and return items</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why RentEase Campus?</h2>
            <p className="text-xl text-muted-foreground">Built by students, for students</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-secondary opacity-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of students already sharing resources on campus
          </p>
          <Link to="/auth">
            <Button variant="hero" size="lg">
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
