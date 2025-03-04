
import { useState } from 'react';
import { HeartPulse, AlertCircle, Heart, ActivitySquare, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, ECGDataPoint, analyzeHealth } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import ECGVisualizer from './ECGVisualizer';

interface HealthMonitoringProps {
  user: User;
  currentReading?: ECGDataPoint[];
  onEmergencyDetected?: () => void;
}

const HealthMonitoring: React.FC<HealthMonitoringProps> = ({
  user,
  currentReading,
  onEmergencyDetected
}) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const isAbnormal = user.healthStatus === 'abnormal';
  
  // If this is an abnormal user and we have current reading, notify the emergency
  if (isAbnormal && currentReading && onEmergencyDetected) {
    onEmergencyDetected();
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg flex items-center space-x-2">
              <HeartPulse className="h-5 w-5 text-primary" />
              <span>Health Monitoring</span>
            </CardTitle>
            <CardDescription>Real-time health analysis</CardDescription>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-sm flex items-center space-x-1 ${
            isAbnormal ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' 
            : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
          }`}>
            {isAbnormal 
              ? <AlertCircle className="h-4 w-4" /> 
              : <Heart className="h-4 w-4" />
            }
            <span>{isAbnormal ? 'Abnormal' : 'Normal'}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {isAbnormal && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Health Alert Detected</AlertTitle>
            <AlertDescription>
              {user.healthDetails?.condition || 'Abnormal heart pattern detected'}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="col-span-2 md:col-span-1 p-3 rounded-lg bg-secondary/50">
            <div className="text-sm font-medium text-muted-foreground mb-1">Reference Pattern</div>
            <ECGVisualizer 
              data={user.registeredECG.data} 
              height={120}
              lineColor={isAbnormal ? 'rgb(244, 63, 94)' : 'rgb(16, 185, 129)'}
              animated={false}
            />
          </div>
          
          <div className="col-span-2 md:col-span-1 p-3 rounded-lg bg-secondary/50">
            <div className="text-sm font-medium text-muted-foreground mb-1">Current Reading</div>
            {currentReading ? (
              <ECGVisualizer 
                data={currentReading} 
                height={120}
                lineColor={isAbnormal ? 'rgb(244, 63, 94)' : 'rgb(16, 185, 129)'}
                animated={false}
              />
            ) : (
              <div className="h-[120px] flex items-center justify-center text-muted-foreground">
                No current reading available
              </div>
            )}
          </div>
        </div>
        
        {isAbnormal && user.healthDetails && (
          <div className="mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowDetails(!showDetails)}
              className="w-full justify-center"
            >
              {showDetails ? 'Hide Details' : 'Show Health Details'}
              <Info className="h-4 w-4 ml-2" />
            </Button>
            
            {showDetails && (
              <div className="mt-4 space-y-4 animate-fade-in">
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <ActivitySquare className="h-4 w-4 mr-2 text-muted-foreground" />
                    Condition Details
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <div className="text-xs text-muted-foreground">Condition</div>
                      <div className="font-medium">{user.healthDetails.condition}</div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <div className="text-xs text-muted-foreground">Severity</div>
                      <div className="font-medium capitalize">{user.healthDetails.severity}</div>
                    </div>
                  </div>
                </div>
                
                {user.healthDetails.recommendations && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Recommendations</h4>
                    <ul className="space-y-2">
                      {user.healthDetails.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                            <span className="text-xs text-primary font-medium">{index + 1}</span>
                          </div>
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HealthMonitoring;
