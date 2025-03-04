
import { useState, useEffect } from 'react';
import { Car, Lock, Unlock, AlertTriangle, Power, Battery, Gauge } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Vehicle } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface VehicleStatusProps {
  vehicle: Vehicle;
  onLock: () => void;
  onUnlock: () => void;
  onStart: () => void;
  onStop: () => void;
  className?: string;
}

const VehicleStatus: React.FC<VehicleStatusProps> = ({
  vehicle,
  onLock,
  onUnlock,
  onStart,
  onStop,
  className
}) => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Trigger animation when vehicle status changes
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 700);
    return () => clearTimeout(timer);
  }, [vehicle.status]);

  const getStatusColor = () => {
    switch (vehicle.status) {
      case 'locked':
        return 'text-muted-foreground';
      case 'unlocked':
        return 'text-amber-500';
      case 'running':
        return 'text-emerald-500';
      case 'emergency_stop':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusText = () => {
    switch (vehicle.status) {
      case 'locked':
        return 'Vehicle Locked';
      case 'unlocked':
        return 'Vehicle Unlocked';
      case 'running':
        return 'Vehicle Running';
      case 'emergency_stop':
        return 'Emergency Stop';
      default:
        return 'Unknown Status';
    }
  };

  const getStatusIcon = () => {
    switch (vehicle.status) {
      case 'locked':
        return <Lock className="h-5 w-5" />;
      case 'unlocked':
        return <Unlock className="h-5 w-5" />;
      case 'running':
        return <Power className="h-5 w-5" />;
      case 'emergency_stop':
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Car className="h-5 w-5" />;
    }
  };

  return (
    <div className={cn("glass-panel rounded-xl p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Vehicle Status</h3>
        <div className={cn(
          "flex items-center space-x-2 px-3 py-1 rounded-full border",
          getStatusColor()
        )}>
          {getStatusIcon()}
          <span className="text-sm font-medium">{getStatusText()}</span>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Vehicle</h4>
            <div className="flex items-center space-x-3">
              <div className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center bg-muted/50",
                animate && vehicle.status === 'running' && "animate-vehicle-start"
              )}>
                <Car className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">{vehicle.name}</p>
                <p className="text-sm text-muted-foreground">{vehicle.model}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-2">
            {vehicle.status === 'locked' && (
              <Button onClick={onUnlock} variant="outline" size="sm" className="justify-start">
                <Unlock className="mr-2 h-4 w-4" />
                Unlock
              </Button>
            )}
            
            {vehicle.status === 'unlocked' && (
              <>
                <Button onClick={onLock} variant="outline" size="sm" className="justify-start">
                  <Lock className="mr-2 h-4 w-4" />
                  Lock
                </Button>
                <Button onClick={onStart} size="sm" className="justify-start">
                  <Power className="mr-2 h-4 w-4" />
                  Start
                </Button>
              </>
            )}
            
            {(vehicle.status === 'running' || vehicle.status === 'emergency_stop') && (
              <Button onClick={onStop} variant="destructive" size="sm" className="justify-start">
                <Power className="mr-2 h-4 w-4" />
                Stop
              </Button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm">
                <Gauge className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Speed</span>
              </div>
              <span className="font-medium">{vehicle.speed} km/h</span>
            </div>
            <Progress value={(vehicle.speed / vehicle.maxSpeed) * 100} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm">
                <Battery className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Battery</span>
              </div>
              <span className="font-medium">{vehicle.batteryLevel}%</span>
            </div>
            <Progress value={vehicle.batteryLevel} className="h-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleStatus;
