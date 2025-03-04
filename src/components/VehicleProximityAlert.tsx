
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Car, Shield, Volume2, VolumeX, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProximityData {
  isVehicleNearby: boolean;
  direction: 'left' | 'right' | 'front' | 'back' | null;
  distance: number; // in meters
  relativeSpeed: number; // in km/h
  riskLevel: 'low' | 'medium' | 'high' | null;
}

const VehicleProximityAlert = () => {
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [sensitivityLevel, setSensitivityLevel] = useState(70);
  const [proximityData, setProximityData] = useState<ProximityData>({
    isVehicleNearby: false,
    direction: null,
    distance: 0,
    relativeSpeed: 0,
    riskLevel: null
  });
  
  // Simulate random vehicle proximity events
  useEffect(() => {
    if (!alertsEnabled) return;
    
    const interval = setInterval(() => {
      const random = Math.random();
      
      if (random > 0.7) {
        // Simulate a vehicle being nearby
        const directions = ['left', 'right', 'front', 'back'] as const;
        const newDirection = directions[Math.floor(Math.random() * directions.length)];
        const newDistance = Math.floor(Math.random() * 15) + 1; // 1-15 meters
        const newSpeed = Math.floor(Math.random() * 30) + 5; // 5-35 km/h
        
        // Calculate risk level based on distance and sensitivity
        let riskLevel: 'low' | 'medium' | 'high' = 'low';
        if (newDistance < 3) {
          riskLevel = 'high';
        } else if (newDistance < 7) {
          riskLevel = 'medium';
        }
        
        // Adjust risk based on sensitivity setting
        if (sensitivityLevel > 80 && riskLevel === 'low') riskLevel = 'medium';
        if (sensitivityLevel < 30 && riskLevel === 'medium') riskLevel = 'low';
        
        setProximityData({
          isVehicleNearby: true,
          direction: newDirection,
          distance: newDistance,
          relativeSpeed: newSpeed,
          riskLevel: riskLevel
        });
        
        // Show notification for medium/high risk
        if (riskLevel !== 'low') {
          const directionText = newDirection === 'left' ? 'to the left'
            : newDirection === 'right' ? 'to the right'
            : newDirection === 'front' ? 'in front'
            : 'behind';
            
          toast.warning(`Vehicle detected ${directionText}`, {
            description: `${newDistance}m away, approaching at ${newSpeed} km/h`,
            position: 'bottom-right',
          });
          
          // Play sound for high risk if enabled
          if (soundEnabled && riskLevel === 'high') {
            const audio = new Audio('/alert.mp3');
            audio.volume = 0.5;
            audio.play().catch(e => console.log('Audio play error:', e));
          }
        }
        
        // Reset after 5 seconds
        setTimeout(() => {
          setProximityData({
            isVehicleNearby: false,
            direction: null,
            distance: 0,
            relativeSpeed: 0,
            riskLevel: null
          });
        }, 5000);
      }
    }, 10000); // Check every 10 seconds
    
    return () => clearInterval(interval);
  }, [alertsEnabled, sensitivityLevel, soundEnabled]);
  
  // Get the appropriate icon based on direction
  const getDirectionIcon = () => {
    switch (proximityData.direction) {
      case 'left': return <ArrowLeft className="h-6 w-6" />;
      case 'right': return <ArrowRight className="h-6 w-6" />;
      case 'front': return <ArrowUp className="h-6 w-6" />;
      case 'back': return <ArrowDown className="h-6 w-6" />;
      default: return null;
    }
  };
  
  // Get risk level color
  const getRiskColor = () => {
    if (!proximityData.riskLevel) return 'bg-transparent';
    switch (proximityData.riskLevel) {
      case 'low': return 'bg-green-500/20 text-green-600 dark:text-green-400';
      case 'medium': return 'bg-amber-500/20 text-amber-600 dark:text-amber-400';
      case 'high': return 'bg-red-500/20 text-red-600 dark:text-red-400';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center space-x-2">
          <Shield className="h-5 w-5 text-primary" />
          <span>Vehicle Proximity Alert</span>
        </CardTitle>
        <CardDescription>Real-time detection of nearby vehicles</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <Switch 
                checked={alertsEnabled} 
                onCheckedChange={setAlertsEnabled}
                id="alerts-enabled"
              />
              <label htmlFor="alerts-enabled" className="text-sm font-medium">
                Alerts
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                checked={soundEnabled} 
                onCheckedChange={setSoundEnabled}
                id="sound-enabled"
                disabled={!alertsEnabled}
              />
              <label htmlFor="sound-enabled" className="text-sm font-medium flex items-center">
                {soundEnabled ? (
                  <Volume2 className="h-4 w-4 mr-1" />
                ) : (
                  <VolumeX className="h-4 w-4 mr-1" />
                )}
                Sound
              </label>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Sensitivity</label>
            <span className="text-sm">{sensitivityLevel}%</span>
          </div>
          <Slider
            defaultValue={[sensitivityLevel]}
            max={100}
            step={5}
            disabled={!alertsEnabled}
            onValueChange={(values) => setSensitivityLevel(values[0])}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
        
        <div className={cn(
          "mt-4 rounded-lg p-4 transition-all duration-300",
          proximityData.isVehicleNearby ? getRiskColor() : "bg-muted/40"
        )}>
          {proximityData.isVehicleNearby ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Car className="h-5 w-5" />
                  <span className="font-medium">Vehicle Detected</span>
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-medium capitalize bg-background/50">
                  {proximityData.riskLevel} Risk
                </div>
              </div>
              
              <div className="flex justify-center my-2">
                <div className={cn(
                  "h-16 w-16 rounded-full flex items-center justify-center",
                  proximityData.riskLevel === 'high' ? "animate-pulse bg-red-500/20" : "bg-background/50"
                )}>
                  {getDirectionIcon()}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-background/50 rounded-md p-2">
                  <div className="text-muted-foreground">Distance</div>
                  <div className="font-medium">{proximityData.distance} meters</div>
                </div>
                <div className="bg-background/50 rounded-md p-2">
                  <div className="text-muted-foreground">Relative Speed</div>
                  <div className="font-medium">{proximityData.relativeSpeed} km/h</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <Car className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-center text-muted-foreground">
                {alertsEnabled 
                  ? "No vehicles detected nearby" 
                  : "Vehicle proximity alerts are disabled"}
              </p>
            </div>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground bg-muted/20 p-3 rounded-lg flex items-start">
          <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
          <p>
            This feature helps detect nearby vehicles using sensors. Adjust sensitivity based on 
            your driving environment. Always maintain visual awareness while driving.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleProximityAlert;
