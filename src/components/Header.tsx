
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Car, ChevronRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 lg:px-8 py-4 glass-panel shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10">
              <Heart size={18} className="text-primary" />
            </div>
            <span className="text-lg font-medium text-foreground">HeartKey</span>
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === item.href 
                  ? "text-primary" 
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/dashboard">
            <Button size="sm" variant="outline" className="space-x-2">
              <Car size={16} />
              <span>Access Vehicle</span>
              <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-3 px-4 space-y-3 animate-fade-in">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "block text-base font-medium py-2 transition-colors hover:text-primary",
                location.pathname === item.href 
                  ? "text-primary" 
                  : "text-muted-foreground"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-2">
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full justify-between">
                <span>Access Vehicle</span>
                <Car size={16} />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
