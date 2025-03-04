
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, User, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { normalUser, abnormalUser, User as UserType } from '@/lib/mockData';

interface MockSensorProps {
  onUserSelected: (user: UserType) => void;
  disabled?: boolean;
}

const MockSensor: React.FC<MockSensorProps> = ({ onUserSelected, disabled }) => {
  const [selectedUser, setSelectedUser] = useState<UserType>(normalUser);
  const [isConnected, setIsConnected] = useState(false);
  
  const handleConnect = () => {
    setIsConnected(true);
    onUserSelected(selectedUser);
  };
  
  const handleDisconnect = () => {
    setIsConnected(false);
  };
  
  const handleUserChange = (value: string) => {
    const user = value === 'normal' ? normalUser : abnormalUser;
    setSelectedUser(user);
    if (isConnected) {
      onUserSelected(user);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center space-x-2">
          <Heart className="h-5 w-5 text-primary" />
          <span>Mock ECG Sensor</span>
        </CardTitle>
        <CardDescription>
          This simulates the ECG sensor that would be integrated into the vehicle
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Sensor Status:</div>
            <div className={cn(
              "px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1",
              isConnected 
                ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" 
                : "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
            )}>
              <div className={cn(
                "w-2 h-2 rounded-full",
                isConnected ? "bg-green-500" : "bg-amber-500"
              )} />
              <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Test User:</label>
            <Select
              disabled={disabled || isConnected}
              value={selectedUser === normalUser ? 'normal' : 'abnormal'}
              onValueChange={handleUserChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a test user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">
                  <div className="flex items-center space-x-2">
                    <UserCheck className="h-4 w-4 text-green-500" />
                    <span>Normal Heart Pattern</span>
                  </div>
                </SelectItem>
                <SelectItem value="abnormal">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-red-500" />
                    <span>Abnormal Heart Pattern</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="pt-2">
            {!isConnected ? (
              <Button 
                className="w-full" 
                onClick={handleConnect} 
                disabled={disabled}
              >
                <Heart className="mr-2 h-4 w-4" />
                Connect Sensor
              </Button>
            ) : (
              <Button 
                className="w-full" 
                variant="outline" 
                onClick={handleDisconnect}
                disabled={disabled}
              >
                Disconnect Sensor
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MockSensor;
