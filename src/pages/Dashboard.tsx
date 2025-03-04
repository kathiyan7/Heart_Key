
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import MockSensor from '@/components/MockSensor';
import AuthenticationSection from '@/components/AuthenticationSection';
import VehicleStatus from '@/components/VehicleStatus';
import HealthMonitoring from '@/components/HealthMonitoring';
import { normalUser, abnormalUser, vehicle as initialVehicle, User, Vehicle, ECGDataPoint, generateMockReading } from '@/lib/mockData';

const Dashboard = () => {
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<User>(normalUser);
  const [vehicle, setVehicle] = useState<Vehicle>(initialVehicle);
  const [authenticated, setAuthenticated] = useState(false);
  const [currentReading, setCurrentReading] = useState<ECGDataPoint[]>([]);
  const [emergencyDetected, setEmergencyDetected] = useState(false);
  
  const handleUserSelected = (user: User) => {
    setSelectedUser(user);
    setAuthenticated(false);
    setEmergencyDetected(false);
    
    toast({
      title: "User Selected",
      description: `${user.name} selected. You can now attempt authentication.`,
    });
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
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Header />
      
      <main className="flex-1 px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">HeartKey Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your vehicle status and manage authentication with your heart's biometric pattern
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-6">
              <MockSensor 
                onUserSelected={handleUserSelected} 
                disabled={vehicle.status === 'running'}
              />
              
              <AuthenticationSection 
                user={selectedUser} 
                onAuthenticated={handleAuthenticated} 
              />
            </div>
            
            <div className="md:col-span-2 space-y-6">
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
