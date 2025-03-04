
import { useState, useEffect } from 'react';
import { Heart, Lock, Unlock, Shield, ShieldCheck, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ECGVisualizer from './ECGVisualizer';
import { User, ECGDataPoint, generateMockReading, authenticateUser } from '@/lib/mockData';

interface AuthenticationSectionProps {
  user: User;
  onAuthenticated: (success: boolean) => void;
}

const AuthenticationSection: React.FC<AuthenticationSectionProps> = ({ 
  user, 
  onAuthenticated 
}) => {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'success' | 'failure'>('idle');
  const [currentReading, setCurrentReading] = useState<ECGDataPoint[]>([]);
  
  const startScan = () => {
    setStatus('scanning');
    
    // Generate a mock reading
    const mockReading = generateMockReading(user);
    setCurrentReading(mockReading);
    
    // Simulate processing time
    setTimeout(() => {
      const result = authenticateUser(mockReading, user);
      setStatus(result ? 'success' : 'failure');
      onAuthenticated(result);
    }, 4000); // 4 seconds to match the animation
  };
  
  const resetScan = () => {
    setStatus('idle');
    setCurrentReading([]);
  };
  
  useEffect(() => {
    // Reset any ongoing scanning when user changes
    resetScan();
  }, [user]);

  return (
    <Card className="glass-panel overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10">
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-medium">HeartKey Authentication</h3>
          </div>
          
          <div className="flex items-center space-x-2">
            {status === 'idle' && (
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span>Ready to scan</span>
              </div>
            )}
            
            {status === 'scanning' && (
              <div className="flex items-center space-x-1 text-sm text-amber-500">
                <Shield className="h-4 w-4" />
                <span>Scanning...</span>
              </div>
            )}
            
            {status === 'success' && (
              <div className="flex items-center space-x-1 text-sm text-emerald-500">
                <ShieldCheck className="h-4 w-4" />
                <span>Authenticated</span>
              </div>
            )}
            
            {status === 'failure' && (
              <div className="flex items-center space-x-1 text-sm text-destructive">
                <ShieldAlert className="h-4 w-4" />
                <span>Authentication failed</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-6">
          <div className="text-sm text-muted-foreground mb-2">
            Place your finger on the ECG sensor to authenticate
          </div>
          
          <div className="mb-4 h-[200px] bg-muted/20 rounded-lg overflow-hidden">
            {status === 'idle' && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Heart className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  <p>Waiting for heartbeat...</p>
                </div>
              </div>
            )}
            
            {(status === 'scanning' || status === 'success' || status === 'failure') && (
              <ECGVisualizer 
                data={currentReading} 
                lineColor={
                  status === 'success' 
                    ? 'rgb(16, 185, 129)' 
                    : status === 'failure' 
                      ? 'rgb(244, 63, 94)' 
                      : 'rgb(59, 130, 246)'
                }
                height={200}
                animated={true}
              />
            )}
          </div>
        </div>
        
        <div className="space-x-3">
          {status === 'idle' && (
            <Button onClick={startScan} className="space-x-2">
              <Heart className="h-4 w-4" />
              <span>Start Scan</span>
            </Button>
          )}
          
          {status === 'scanning' && (
            <Button disabled className="space-x-2">
              <div className="animate-pulse">
                <Heart className="h-4 w-4" />
              </div>
              <span>Scanning...</span>
            </Button>
          )}
          
          {(status === 'success' || status === 'failure') && (
            <Button onClick={resetScan} variant="outline" className="space-x-2">
              <Heart className="h-4 w-4" />
              <span>Scan Again</span>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AuthenticationSection;
