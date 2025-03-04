
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ChevronRight, Car, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Header from '@/components/Header';

const Index = () => {
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  const handleNavigateToDashboard = () => {
    document.body.classList.add('page-transition');
    setTimeout(() => {
      navigate('/dashboard');
    }, 600);
  };

  // Card hover animations
  const cardVariants = {
    initial: { 
      y: 20, 
      opacity: 0 
    },
    animate: (i: number) => ({ 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.5,
        delay: 0.1 * i
      }
    }),
    hover: { 
      y: -10, 
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { 
        type: "spring", 
        stiffness: 300 
      }
    }
  };

  // Car animation for hero section
  const carVariants = {
    initial: { x: -100, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.5 }
      }}
    >
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Hero section */}
        <section className="px-4 py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background/70 z-0"></div>
          
          <motion.div 
            className="max-w-5xl mx-auto text-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="mb-6 inline-flex rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Introducing HeartKey Navigator
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="block">Unlock your vehicle with</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">your heartbeat</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              A revolutionary biometric authentication system that provides secure access to your vehicle while monitoring your heart health in real-time.
            </motion.p>
            
            <motion.div 
              className="flex flex-col md:flex-row gap-4 justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="gap-2 relative bg-gradient-to-r from-primary to-blue-500 border-0 hover:shadow-lg transition-all duration-300"
                  onClick={handleNavigateToDashboard}
                >
                  <Heart className="w-5 h-5" />
                  <span>Try the demo</span>
                  <ChevronRight className="w-5 h-5" />
                  {isHovering && (
                    <motion.span 
                      className="absolute inset-0 rounded-md bg-primary/20"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Button>
              </motion.div>
              
              <Link to="/about">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="hover:bg-primary/10 transition-all duration-300"
                  >
                    Learn more
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Animated car illustration */}
          <motion.div 
            className="absolute bottom-0 right-0 md:right-20 opacity-30 md:opacity-60 z-0"
            variants={carVariants}
            initial="initial"
            animate="animate"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut" 
                }}
              >
                <Car className="w-32 h-32 md:w-48 md:h-48 text-primary/50" />
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 md:w-40 h-1 bg-black/10 rounded-full blur-sm"
                animate={{
                  width: ["60%", "70%", "60%"],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </section>
        
        {/* Features section */}
        <section className="px-4 py-20 bg-muted/30 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Key Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                HeartKey Navigator combines security with health protection for a revolutionary driving experience.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                custom={0}
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                viewport={{ once: true }}
              >
                <Card className="glass-panel h-full transform-gpu transition-all border border-white/20 dark:border-white/10 backdrop-blur-md">
                  <CardContent className="pt-6">
                    <motion.div 
                      className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
                      whileHover={{ 
                        rotate: 5, 
                        scale: 1.1,
                        background: "rgba(59, 130, 246, 0.2)"
                      }}
                    >
                      <ShieldCheck className="w-6 h-6 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">Biometric Security</h3>
                    <p className="text-muted-foreground">
                      Your heart's unique PQRST waveform pattern serves as your personalized key, providing unmatched security that can't be duplicated.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                custom={1}
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                viewport={{ once: true }}
              >
                <Card className="glass-panel h-full transform-gpu transition-all border border-white/20 dark:border-white/10 backdrop-blur-md">
                  <CardContent className="pt-6">
                    <motion.div 
                      className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
                      whileHover={{ 
                        rotate: -5, 
                        scale: 1.1,
                        background: "rgba(239, 68, 68, 0.2)"
                      }}
                    >
                      <Heart className="w-6 h-6 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">Health Monitoring</h3>
                    <p className="text-muted-foreground">
                      Continuous monitoring detects abnormal heart conditions, alerting you to potential health concerns before they become emergencies.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                custom={2}
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                viewport={{ once: true }}
              >
                <Card className="glass-panel h-full transform-gpu transition-all border border-white/20 dark:border-white/10 backdrop-blur-md">
                  <CardContent className="pt-6">
                    <motion.div 
                      className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
                      whileHover={{ 
                        rotate: 5, 
                        scale: 1.1,
                        background: "rgba(34, 197, 94, 0.2)"
                      }}
                    >
                      <Car className="w-6 h-6 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">Emergency Response</h3>
                    <p className="text-muted-foreground">
                      In case of cardiac distress, the system initiates emergency protocols, gradually slowing the vehicle to a safe stop.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Call to action */}
        <section className="px-4 py-20 bg-gradient-to-br from-background to-primary/5">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Experience the future of vehicle security</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Try our interactive demo to see how HeartKey Navigator makes driving safer and more secure.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="gap-2 relative bg-gradient-to-r from-primary to-blue-500 border-0"
                onClick={handleNavigateToDashboard}
              >
                {isHovering && (
                  <motion.span 
                    className="absolute inset-0 rounded-md animate-ping-subtle bg-primary/20" 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, transition: { duration: 0.2 } }}
                  />
                )}
                <Heart className="w-5 h-5" />
                <span>Go to dashboard</span>
              </Button>
            </motion.div>
          </motion.div>
        </section>
      </main>
      
      <footer className="border-t py-8 px-4 bg-muted/10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2023 HeartKey Navigator. Created for hackathon demonstration purposes.</p>
        </div>
      </footer>
    </motion.div>
  );
};

export default Index;
