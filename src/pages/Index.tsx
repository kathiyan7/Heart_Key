
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ChevronRight, Car, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Header from '@/components/Header';

const Index = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Hero section */}
        <section className="px-4 py-20 md:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-6 inline-flex rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary">
              Introducing HeartKey Navigator
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="block">Unlock your vehicle with</span>
              <span className="text-primary">your heartbeat</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              A revolutionary biometric authentication system that provides secure access to your vehicle while monitoring your heart health in real-time.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2">
                  <Heart className="w-5 h-5" />
                  <span>Try the demo</span>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline">
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <section className="px-4 py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Key Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                HeartKey Navigator combines security with health protection for a revolutionary driving experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="glass-panel h-full">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Biometric Security</h3>
                  <p className="text-muted-foreground">
                    Your heart's unique PQRST waveform pattern serves as your personalized key, providing unmatched security that can't be duplicated.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-panel h-full">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Health Monitoring</h3>
                  <p className="text-muted-foreground">
                    Continuous monitoring detects abnormal heart conditions, alerting you to potential health concerns before they become emergencies.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-panel h-full">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Car className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Emergency Response</h3>
                  <p className="text-muted-foreground">
                    In case of cardiac distress, the system initiates emergency protocols, gradually slowing the vehicle to a safe stop.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Call to action */}
        <section className="px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Experience the future of vehicle security</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Try our interactive demo to see how HeartKey Navigator makes driving safer and more secure.
            </p>
            <Link to="/dashboard">
              <Button 
                size="lg" 
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="gap-2 relative"
              >
                {isHovering && (
                  <span className="absolute inset-0 rounded-md animate-ping-subtle bg-primary/20" />
                )}
                <Heart className="w-5 h-5" />
                <span>Go to dashboard</span>
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2023 HeartKey Navigator. Created for hackathon demonstration purposes.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
