import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { BookOpen, User, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-br from-primary to-primary-glow rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              RentEase Campus
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/">
              <Button 
                variant={isActive("/") ? "default" : "ghost"}
                className="transition-all duration-300 hover-lift"
              >
                Home
              </Button>
            </Link>
            <Link to="/browse">
              <Button 
                variant={isActive("/browse") ? "default" : "ghost"}
                className="transition-all duration-300 hover-lift"
              >
                Browse Items
              </Button>
            </Link>
            {user && (
              <Link to="/dashboard">
                <Button 
                  variant={isActive("/dashboard") ? "default" : "ghost"}
                  className="transition-all duration-300 hover-lift"
                >
                  My Dashboard
                </Button>
              </Link>
            )}
            {user ? (
              <Button variant="hero" size="sm" onClick={signOut} className="hover-lift">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="hero" size="sm" className="hover-lift">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <Button 
                variant={isActive("/") ? "default" : "ghost"}
                className="w-full justify-start"
              >
                Home
              </Button>
            </Link>
            <Link to="/browse" onClick={() => setMobileMenuOpen(false)}>
              <Button 
                variant={isActive("/browse") ? "default" : "ghost"}
                className="w-full justify-start"
              >
                Browse Items
              </Button>
            </Link>
            {user && (
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button 
                  variant={isActive("/dashboard") ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  My Dashboard
                </Button>
              </Link>
            )}
            {user ? (
              <Button variant="hero" className="w-full" onClick={() => { signOut(); setMobileMenuOpen(false); }}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="hero" className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
