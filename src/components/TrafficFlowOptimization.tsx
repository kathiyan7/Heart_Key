
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Car, 
  Navigation, 
  TrendingUp, 
  AlertTriangle, 
  MapPin, 
  RotateCcw,
  Route
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface TrafficData {
  congestionLevel: number;
  predictedDelay: number;
  alternateRoutesAvailable: number;
  accidentRiskLevel: number;
  nearbyHotspots: {
    location: string;
    risk: 'low' | 'medium' | 'high';
    distance: number;
  }[];
}

const mockTrafficData: TrafficData = {
  congestionLevel: 65,
  predictedDelay: 12,
  alternateRoutesAvailable: 3,
  accidentRiskLevel: 30,
  nearbyHotspots: [
    { location: "Highway 101 Junction", risk: 'medium', distance: 1.2 },
    { location: "Downtown Intersection", risk: 'high', distance: 3.5 },
    { location: "Central Bridge", risk: 'low', distance: 5.7 }
  ]
};

const TrafficFlowOptimization = () => {
  const { toast } = useToast();
  const [trafficData, setTrafficData] = useState<TrafficData>(mockTrafficData);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  useEffect(() => {
    // Simulate real-time data updates
    const intervalId = setInterval(() => {
      setTrafficData(prev => ({
        ...prev,
        congestionLevel: Math.min(100, Math.max(10, prev.congestionLevel + (Math.random() > 0.5 ? 5 : -5))),
        predictedDelay: Math.max(0, prev.predictedDelay + (Math.random() > 0.6 ? 2 : -2)),
        accidentRiskLevel: Math.min(100, Math.max(5, prev.accidentRiskLevel + (Math.random() > 0.7 ? 3 : -3))),
      }));
    }, 8000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const handleOptimizeRoute = () => {
    setIsOptimizing(true);
    
    // Simulate route optimization
    setTimeout(() => {
      setTrafficData(prev => ({
        ...prev,
        congestionLevel: Math.max(10, prev.congestionLevel - 15),
        predictedDelay: Math.max(0, prev.predictedDelay - 5),
        alternateRoutesAvailable: prev.alternateRoutesAvailable + 1
      }));
      
      setIsOptimizing(false);
      
      toast({
        title: "Route Optimized",
        description: "Your route has been optimized to avoid congestion.",
      });
    }, 2000);
  };
  
  const handleAnalyzeRisks = () => {
    setIsAnalyzing(true);
    
    // Simulate risk analysis
    setTimeout(() => {
      setTrafficData(prev => ({
        ...prev,
        accidentRiskLevel: Math.max(5, prev.accidentRiskLevel - 10),
      }));
      
      setIsAnalyzing(false);
      
      toast({
        title: "Risk Analysis Complete",
        description: "Accident risk factors have been analyzed and mitigated.",
      });
    }, 2000);
  };
  
  // Determine congestion level status and color
  const getCongestionStatus = () => {
    if (trafficData.congestionLevel < 30) return { text: "Low", color: "bg-green-500" };
    if (trafficData.congestionLevel < 60) return { text: "Moderate", color: "bg-amber-500" };
    return { text: "High", color: "bg-red-500" };
  };
  
  // Determine risk level status and color
  const getRiskStatus = () => {
    if (trafficData.accidentRiskLevel < 20) return { text: "Low", color: "text-green-500" };
    if (trafficData.accidentRiskLevel < 50) return { text: "Moderate", color: "text-amber-500" };
    return { text: "High", color: "text-red-500" };
  };
  
  const congestionStatus = getCongestionStatus();
  const riskStatus = getRiskStatus();

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Traffic & Accident AI</span>
            </CardTitle>
            <CardDescription>ML-based traffic optimization & accident prevention</CardDescription>
          </div>
          
          <Badge variant="outline" className="flex items-center space-x-1 px-3 py-1">
            <div className={`w-2 h-2 rounded-full ${congestionStatus.color}`}></div>
            <span>{congestionStatus.text} Traffic</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm text-muted-foreground">
                <Car className="h-4 w-4 mr-2" />
                <span>Traffic Congestion</span>
              </div>
              <span className="font-medium">{trafficData.congestionLevel}%</span>
            </div>
            <Progress value={trafficData.congestionLevel} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm text-muted-foreground">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <span>Accident Risk</span>
              </div>
              <span className={`font-medium ${riskStatus.color}`}>{trafficData.accidentRiskLevel}%</span>
            </div>
            <Progress value={trafficData.accidentRiskLevel} className="h-2" />
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-3 space-y-2">
          <h4 className="text-sm font-medium flex items-center">
            <Navigation className="h-4 w-4 mr-2 text-muted-foreground" />
            Route Information
          </h4>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-background rounded-md p-2">
              <div className="text-muted-foreground">Predicted Delay</div>
              <div className="font-medium">{trafficData.predictedDelay} mins</div>
            </div>
            <div className="bg-background rounded-md p-2">
              <div className="text-muted-foreground">Alternate Routes</div>
              <div className="font-medium">{trafficData.alternateRoutesAvailable} available</div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            Nearby Risk Hotspots
          </h4>
          <div className="space-y-2">
            {trafficData.nearbyHotspots.map((hotspot, index) => (
              <div key={index} className="flex items-center justify-between bg-muted/30 rounded-lg p-2.5">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    hotspot.risk === 'low' ? 'bg-green-500' : 
                    hotspot.risk === 'medium' ? 'bg-amber-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm">{hotspot.location}</span>
                </div>
                <div className="text-sm text-muted-foreground">{hotspot.distance} mi</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button 
            onClick={handleOptimizeRoute} 
            disabled={isOptimizing}
            className="flex-1"
          >
            {isOptimizing ? (
              <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Route className="h-4 w-4 mr-2" />
            )}
            Optimize Route
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleAnalyzeRisks} 
            disabled={isAnalyzing}
            className="flex-1"
          >
            {isAnalyzing ? (
              <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <AlertTriangle className="h-4 w-4 mr-2" />
            )}
            Analyze Risks
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficFlowOptimization;
