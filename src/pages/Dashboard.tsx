
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import MockSensor from '@/components/MockSensor';
import AuthenticationSection from '@/components/AuthenticationSection';
import VehicleStatus from '@/components/VehicleStatus';
import HealthMonitoring from '@/components/HealthMonitoring';
import TrafficFlowOptimization from '@/components/TrafficFlowOptimization';
import BatteryHealthMonitoring from '@/components/BatteryHealthMonitoring';
import VehicleProximityAlert from '@/components/VehicleProximityAlert';
import { motion } from 'framer-motion';
import { AlertTriangle, Battery, HeartPulse, Car } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { normalUser, abnormalUser, vehicle as initialVehicle, User, Vehicle, ECGDataPoint, generateMockReading } from '@/lib/mockData';

const Dashboard = () => {
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<User>(normalUser);
  const [vehicle, setVehicle] = useState<Vehicle>(initialVehicle);
  const [authenticated, setAuthenticated] = useState(false);
  const [currentReading, setCurrentReading] = useState<ECGDataPoint[]>([]);
  const [emergencyDetected, setEmergencyDetected] = useState(false);
  const [showHealthAlert, setShowHealthAlert] = useState(false);
  const [showTrafficAlert, setShowTrafficAlert] = useState(false);
  const [showAccidentAlert, setShowAccidentAlert] = useState(false);
  const [showBatteryAlert, setShowBatteryAlert] = useState(false);
  
  const handleUserSelected = (user: User) => {
    setSelectedUser(user);
    setAuthenticated(false);
    setEmergencyDetected(false);
    setShowHealthAlert(false);
    
    toast({
      title: "User Selected",
      description: `${user.name} selected. You can now attempt authentication.`,
    });
    
    // Check if abnormal user is selected and show appropriate alerts
    if (user === abnormalUser) {
      setShowHealthAlert(true);
    }
  };
  
  const handleAuthenticated = (success: boolean) => {
    setAuthenticated(success);
    
    if (success) {
      setVehicle({
        ...vehicle,
        status: 'unlocked'
      });
      
      toast({
        title: "Authentication Successful",
        description: "Your heartbeat pattern has been recognized. Vehicle unlocked.",
        variant: "default",
      });
      
      // Generate current reading for health monitoring
      setCurrentReading(generateMockReading(selectedUser));
    } else {
      toast({
        title: "Authentication Failed",
        description: "Your heartbeat pattern was not recognized. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleEmergencyDetected = () => {
    if (!emergencyDetected && vehicle.status === 'running') {
      setEmergencyDetected(true);
      setShowHealthAlert(true);
      
      toast({
        title: "Health Emergency Detected",
        description: "Abnormal heart condition detected. Initiating emergency protocol.",
        variant: "destructive",
      });
      
      // Simulate gradually slowing down the vehicle
      let speed = vehicle.speed;
      const interval = setInterval(() => {
        speed = Math.max(0, speed - 10);
        setVehicle(prev => ({
          ...prev,
          speed: speed
        }));
        
        if (speed === 0) {
          clearInterval(interval);
          setVehicle(prev => ({
            ...prev,
            status: 'emergency_stop'
          }));
          
          toast({
            title: "Emergency Stop Completed",
            description: "Vehicle has safely stopped. Please seek medical attention.",
            variant: "destructive",
          });
        }
      }, 1000);
    }
  };
  
  // Traffic Alert Handler
  useEffect(() => {
    const trafficInterval = setInterval(() => {
      // Random chance to show traffic alert (for demo purposes)
      if (Math.random() > 0.7 && authenticated) {
        setShowTrafficAlert(true);
        toast({
          title: "High Traffic Congestion",
          description: "Heavy traffic detected ahead. AI recommending alternate routes.",
          variant: "destructive",
        });
        
        // Auto-dismiss after 10 seconds
        setTimeout(() => setShowTrafficAlert(false), 10000);
      }
    }, 20000);
    
    return () => clearInterval(trafficInterval);
  }, [authenticated, toast]);
  
  // Accident Risk Alert Handler
  useEffect(() => {
    const accidentInterval = setInterval(() => {
      // Random chance to show accident risk alert (for demo purposes)
      if (Math.random() > 0.8 && authenticated && vehicle.status === 'running') {
        setShowAccidentAlert(true);
        toast({
          title: "High Accident Risk",
          description: "Increased accident risk detected. Drive with caution.",
          variant: "destructive",
        });
        
        // Auto-dismiss after 8 seconds
        setTimeout(() => setShowAccidentAlert(false), 8000);
      }
    }, 25000);
    
    return () => clearInterval(accidentInterval);
  }, [authenticated, vehicle.status, toast]);
  
  // Battery Health Alert Handler
  useEffect(() => {
    const batteryInterval = setInterval(() => {
      // Random chance to show battery health alert (for demo purposes)
      if (Math.random() > 0.75 && authenticated) {
        setShowBatteryAlert(true);
        toast({
          title: "Low Battery Health",
          description: "Battery health degrading rapidly. Maintenance required.",
          variant: "destructive",
        });
        
        // Auto-dismiss after 12 seconds
        setTimeout(() => setShowBatteryAlert(false), 12000);
      }
    }, 30000);
    
    return () => clearInterval(batteryInterval);
  }, [authenticated, toast]);
  
  const handleLockVehicle = () => {
    setVehicle({
      ...vehicle,
      status: 'locked'
    });
    setAuthenticated(false);
    
    toast({
      title: "Vehicle Locked",
      description: "Your vehicle has been locked successfully.",
    });
  };
  
  const handleUnlockVehicle = () => {
    if (!authenticated) {
      toast({
        title: "Authentication Required",
        description: "Please authenticate with your heartbeat pattern first.",
        variant: "destructive",
      });
      return;
    }
    
    setVehicle({
      ...vehicle,
      status: 'unlocked'
    });
    
    toast({
      title: "Vehicle Unlocked",
      description: "Your vehicle has been unlocked successfully.",
    });
  };
  
  const handleStartVehicle = () => {
    if (vehicle.status !== 'unlocked') {
      toast({
        title: "Vehicle Not Ready",
        description: "Please unlock the vehicle before starting.",
        variant: "destructive",
      });
      return;
    }
    
    setVehicle({
      ...vehicle,
      status: 'running',
      speed: 20 // Start at 20 km/h
    });
    
    toast({
      title: "Vehicle Started",
      description: "Your vehicle is now running. Drive safely!",
    });
  };
  
  const handleStopVehicle = () => {
    setVehicle({
      ...vehicle,
      status: 'unlocked',
      speed: 0
    });
    setEmergencyDetected(false);
    
    toast({
      title: "Vehicle Stopped",
      description: "Your vehicle has been stopped successfully.",
    });
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      
      <main className="flex-1 px-4 py-12 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <motion.h1 
              className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              HeartKey Dashboard
            </motion.h1>
            <motion.p 
              className="text-muted-foreground"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Monitor your vehicle status and manage authentication with your heart's biometric pattern
            </motion.p>
          </div>
          
          {/* Alert Section */}
          <div className="mb-6 space-y-3">
            {showHealthAlert && (
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <Alert variant="destructive" className="border-l-4 border-l-red-500">
                  <HeartPulse className="h-4 w-4" />
                  <AlertTitle className="font-semibold">Health Alert</AlertTitle>
                  <AlertDescription>
                    Abnormal heart condition detected. Please seek medical attention immediately.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
            
            {showTrafficAlert && (
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <Alert variant="destructive" className="border-l-4 border-l-amber-500">
                  <Car className="h-4 w-4" />
                  <AlertTitle className="font-semibold">Traffic Congestion</AlertTitle>
                  <AlertDescription>
                    Heavy traffic detected ahead. AI is calculating alternate routes to avoid delays.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
            
            {showAccidentAlert && (
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <Alert variant="destructive" className="border-l-4 border-l-red-500">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle className="font-semibold">Accident Risk</AlertTitle>
                  <AlertDescription>
                    High accident risk detected in your current route. Drive with extreme caution.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
            
            {showBatteryAlert && (
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <Alert variant="destructive" className="border-l-4 border-l-orange-500">
                  <Battery className="h-4 w-4" />
                  <AlertTitle className="font-semibold">Battery Health</AlertTitle>
                  <AlertDescription>
                    Battery health is critically low. Please schedule maintenance soon.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <motion.div 
              className="md:col-span-3 space-y-6"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <MockSensor 
                onUserSelected={handleUserSelected} 
                disabled={vehicle.status === 'running'}
              />
              
              <AuthenticationSection 
                user={selectedUser} 
                onAuthenticated={handleAuthenticated} 
              />
              
              <VehicleProximityAlert />
            </motion.div>
            
            <motion.div 
              className="md:col-span-5 space-y-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <VehicleStatus 
                vehicle={vehicle}
                onLock={handleLockVehicle}
                onUnlock={handleUnlockVehicle}
                onStart={handleStartVehicle}
                onStop={handleStopVehicle}
              />
              
              <HealthMonitoring 
                user={selectedUser}
                currentReading={authenticated ? currentReading : undefined}
                onEmergencyDetected={handleEmergencyDetected}
              />
            </motion.div>

            <motion.div 
              className="md:col-span-4 space-y-6"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <TrafficFlowOptimization />
              <BatteryHealthMonitoring />
            </motion.div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default Dashboard;
