
// Types for ECG data and user
export interface ECGDataPoint {
  time: number;
  value: number;
}

export type ECGWaveSegment = 'P' | 'Q' | 'R' | 'S' | 'T' | 'baseline';

export interface ECGWave {
  id: string;
  data: ECGDataPoint[];
  segments: Record<ECGWaveSegment, [number, number]>; // [start, end] indices in data array
}

export interface User {
  id: string;
  name: string;
  registeredECG: ECGWave;
  healthStatus: 'normal' | 'abnormal';
  healthDetails?: {
    condition?: string;
    severity?: 'low' | 'medium' | 'high';
    recommendations?: string[];
  };
}

export interface Vehicle {
  id: string;
  name: string;
  model: string;
  status: 'locked' | 'unlocked' | 'running' | 'emergency_stop';
  speed: number;
  maxSpeed: number;
  batteryLevel: number;
}

// Generate mock normal ECG data (simplified PQRST complex)
const generateNormalECG = (): ECGDataPoint[] => {
  const data: ECGDataPoint[] = [];
  const cycleLength = 100; // points per heart cycle
  
  for (let i = 0; i < cycleLength * 3; i++) {
    const x = i;
    let y = 0;
    
    // Baseline
    y = 10;
    
    // P Wave (atrial depolarization)
    if (i % cycleLength >= 10 && i % cycleLength < 25) {
      y = 10 + 5 * Math.sin((i % cycleLength - 10) * (Math.PI / 15));
    }
    
    // PR segment
    else if (i % cycleLength >= 25 && i % cycleLength < 30) {
      y = 10;
    }
    
    // QRS Complex (ventricular depolarization)
    else if (i % cycleLength >= 30 && i % cycleLength < 35) {
      y = 10 - 3 * (i % cycleLength - 30); // Q
    }
    else if (i % cycleLength >= 35 && i % cycleLength < 40) {
      y = -5 + 9 * (i % cycleLength - 35); // R
    }
    else if (i % cycleLength >= 40 && i % cycleLength < 45) {
      y = 40 - 10 * (i % cycleLength - 40); // S
    }
    
    // ST Segment
    else if (i % cycleLength >= 45 && i % cycleLength < 55) {
      y = -10 + (i % cycleLength - 45);
    }
    
    // T Wave (ventricular repolarization)
    else if (i % cycleLength >= 55 && i % cycleLength < 75) {
      y = 0 + 10 * Math.sin((i % cycleLength - 55) * (Math.PI / 20));
    }
    
    // Add some random noise
    y += (Math.random() - 0.5) * 0.5;
    
    data.push({ time: x, value: y });
  }
  
  return data;
};

// Generate abnormal ECG data - simulated ST elevation (potential heart attack)
const generateAbnormalECG = (): ECGDataPoint[] => {
  const data: ECGDataPoint[] = [];
  const cycleLength = 100; // points per heart cycle
  
  for (let i = 0; i < cycleLength * 3; i++) {
    const x = i;
    let y = 0;
    
    // Baseline
    y = 10;
    
    // P Wave (atrial depolarization)
    if (i % cycleLength >= 10 && i % cycleLength < 25) {
      y = 10 + 6 * Math.sin((i % cycleLength - 10) * (Math.PI / 15)); // Slightly higher P wave
    }
    
    // PR segment
    else if (i % cycleLength >= 25 && i % cycleLength < 30) {
      y = 10;
    }
    
    // QRS Complex (ventricular depolarization)
    else if (i % cycleLength >= 30 && i % cycleLength < 35) {
      y = 10 - 4 * (i % cycleLength - 30); // Deeper Q
    }
    else if (i % cycleLength >= 35 && i % cycleLength < 40) {
      y = -6 + 12 * (i % cycleLength - 35); // Higher R
    }
    else if (i % cycleLength >= 40 && i % cycleLength < 45) {
      y = 54 - 14 * (i % cycleLength - 40); // Deeper S
    }
    
    // ST Segment - Elevated (sign of potential heart attack)
    else if (i % cycleLength >= 45 && i % cycleLength < 55) {
      y = -10 + 4 * (i % cycleLength - 45); // ST elevation
    }
    
    // T Wave (ventricular repolarization) - Inverted T wave
    else if (i % cycleLength >= 55 && i % cycleLength < 75) {
      y = 30 - 8 * Math.sin((i % cycleLength - 55) * (Math.PI / 20)); // Inverted T wave
    }
    
    // Add some random noise
    y += (Math.random() - 0.5) * 1.5;
    
    data.push({ time: x, value: y });
  }
  
  return data;
};

// Create mock users
export const normalUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  registeredECG: {
    id: 'ecg-normal-1',
    data: generateNormalECG(),
    segments: {
      baseline: [0, 9],
      P: [10, 24],
      Q: [30, 34],
      R: [35, 39],
      S: [40, 44],
      T: [55, 74]
    }
  },
  healthStatus: 'normal'
};

export const abnormalUser: User = {
  id: 'user-2',
  name: 'Sam Taylor',
  registeredECG: {
    id: 'ecg-abnormal-1',
    data: generateAbnormalECG(),
    segments: {
      baseline: [0, 9],
      P: [10, 24],
      Q: [30, 34],
      R: [35, 39],
      S: [40, 44],
      T: [55, 74]
    }
  },
  healthStatus: 'abnormal',
  healthDetails: {
    condition: 'Potential ST elevation',
    severity: 'high',
    recommendations: [
      'Seek immediate medical attention',
      'Avoid driving',
      'Remain seated and calm',
      'Emergency services have been notified'
    ]
  }
};

// Mock vehicle
export const vehicle: Vehicle = {
  id: 'vehicle-1',
  name: 'Model X',
  model: 'Electric SUV',
  status: 'locked',
  speed: 0,
  maxSpeed: 120,
  batteryLevel: 85
};

// Mock authentication function
export const authenticateUser = (inputECG: ECGDataPoint[], user: User): boolean => {
  // In a real system, this would use ML to compare ECG patterns
  // Here we'll just randomly return true for the normal user
  if (user.id === 'user-1') {
    return Math.random() > 0.3; // 70% chance of success
  }
  return Math.random() > 0.7; // 30% chance of success for abnormal user
};

// Mock health analysis function
export const analyzeHealth = (inputECG: ECGDataPoint[], user: User): 'normal' | 'abnormal' => {
  // In a real system, this would use ML to detect anomalies
  // Here we'll just return the predefined health status
  return user.healthStatus;
};

// Generate a randomized ECG reading based on a user's pattern
export const generateMockReading = (user: User): ECGDataPoint[] => {
  if (user.healthStatus === 'normal') {
    return generateNormalECG();
  } else {
    return generateAbnormalECG();
  }
};
