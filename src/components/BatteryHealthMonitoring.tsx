
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Battery, 
  BatteryCharging, 
  ThermometerSun, 
  Activity,
  Zap,
  Clock,
  RotateCcw
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

interface BatteryHealthData {
  currentHealth: number; // percentage
  estimatedLifespan: number; // months
  optimalChargingPattern: string[];
  temperatureStatus: 'normal' | 'high' | 'low';
  currentTemperature: number; // celsius
  chargeCycles: number;
  degradationRate: number; // percentage per month
  lastOptimized: Date;
}

const initialBatteryData: BatteryHealthData = {
  currentHealth: 92,
  estimatedLifespan: 48,
  optimalChargingPattern: ['Avoid frequent fast charging', 'Maintain between 20-80%', 'Charge slowly overnight'],
  temperatureStatus: 'normal',
  currentTemperature: 25,
  chargeCycles: 78,
  degradationRate: 0.5,
  lastOptimized: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
};

const BatteryHealthMonitoring = () => {
  const { toast } = useToast();
  const [batteryData, setBatteryData] = useState<BatteryHealthData>(initialBatteryData);
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  // Simulate temperature changes
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryData(prev => {
        const newTemp = prev.currentTemperature + (Math.random() > 0.5 ? 0.5 : -0.5);
        const tempStatus = 
          newTemp > 35 ? 'high' : 
          newTemp < 10 ? 'low' : 
          'normal';
        
        return {
          ...prev,
          currentTemperature: parseFloat(newTemp.toFixed(1)),
          temperatureStatus: tempStatus
        };
      });
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  const optimizeBattery = () => {
    setIsOptimizing(true);
    
    setTimeout(() => {
      setBatteryData(prev => ({
        ...prev,
        currentHealth: Math.min(100, prev.currentHealth + 2),
        estimatedLifespan: prev.estimatedLifespan + 3,
        degradationRate: Math.max(0.1, prev.degradationRate - 0.1),
        lastOptimized: new Date()
      }));
      
      setIsOptimizing(false);
      
      toast({
        title: "Battery Optimized",
        description: "AI has optimized your battery charging patterns for maximum longevity.",
      });
    }, 2500);
  };
  
  // Calculate days since last optimization
  const daysSinceOptimized = Math.floor((new Date().getTime() - batteryData.lastOptimized.getTime()) / (1000 * 3600 * 24));
  
  // Determine health status and color
  const getHealthStatus = () => {
    if (batteryData.currentHealth >= 90) return { text: "Excellent", color: "text-green-500" };
    if (batteryData.currentHealth >= 75) return { text: "Good", color: "text-emerald-500" };
    if (batteryData.currentHealth >= 50) return { text: "Fair", color: "text-amber-500" };
    return { text: "Poor", color: "text-red-500" };
  };
  
  const healthStatus = getHealthStatus();

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Battery className="h-5 w-5 text-primary" />
              <span>Battery Health AI</span>
            </CardTitle>
            <CardDescription>Predictive battery health monitoring</CardDescription>
          </div>
          
          <Badge variant={batteryData.temperatureStatus === 'normal' ? 'outline' : 'destructive'} className="flex items-center space-x-1 px-3 py-1">
            <ThermometerSun className="h-3.5 w-3.5 mr-1" />
            <span>{batteryData.currentTemperature}°C</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center bg-muted/40 rounded-lg p-4">
          <div className="text-2xl font-bold flex items-center mb-1">
            <span className={healthStatus.color}>{batteryData.currentHealth}%</span>
          </div>
          <div className="text-sm text-muted-foreground mb-3">Current Battery Health</div>
          <Progress value={batteryData.currentHealth} className="h-2 w-full max-w-[200px]" />
          <div className="mt-2 text-sm font-medium">{healthStatus.text}</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Clock className="h-4 w-4 mr-2" />
              <span>Estimated Lifespan</span>
            </div>
            <div className="font-medium">{batteryData.estimatedLifespan} months</div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Activity className="h-4 w-4 mr-2" />
              <span>Degradation Rate</span>
            </div>
            <div className="font-medium">{batteryData.degradationRate}% / month</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center">
            <Zap className="h-4 w-4 mr-2 text-primary" />
            AI-Recommended Charging Pattern
          </h4>
          
          <div className="space-y-2">
            {batteryData.optimalChargingPattern.map((tip, index) => (
              <div key={index} className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                  <span className="text-xs text-primary font-medium">{index + 1}</span>
                </div>
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="text-sm">Charge Cycles</div>
            <div className="font-medium">{batteryData.chargeCycles}</div>
          </div>
          <Progress value={(batteryData.chargeCycles / 500) * 100} className="h-2" />
          <div className="text-xs text-muted-foreground text-right">
            {Math.round((1 - batteryData.chargeCycles / 500) * 100)}% of expected lifecycle remaining
          </div>
        </div>
        
        <Button 
          onClick={optimizeBattery} 
          disabled={isOptimizing} 
          className="w-full"
          variant={daysSinceOptimized > 5 ? "default" : "outline"}
        >
          {isOptimizing ? (
            <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <BatteryCharging className="h-4 w-4 mr-2" />
          )}
          {daysSinceOptimized > 5 ? "Optimize Battery (Recommended)" : `Optimize Battery (Last run: ${daysSinceOptimized}d ago)`}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BatteryHealthMonitoring;
