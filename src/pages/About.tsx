
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Heart, ShieldCheck, Car, BrainCircuit, Zap, Info } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <div className="mb-2 inline-flex rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary">
              About the Project
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">HeartKey Navigator</h1>
            <p className="text-xl text-muted-foreground">
              Using ECG biometrics for vehicle authentication and health monitoring
            </p>
          </div>
          
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="future">Future Vision</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-8">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <Info className="mr-2 h-5 w-5 text-primary" />
                    Project Overview
                  </h2>
                  <p className="mb-4">
                    HeartKey Navigator is a revolutionary security system that uses your unique cardiac signature (ECG/PQRST waveform) as a biometric key to unlock and operate your vehicle. Unlike traditional biometrics like fingerprints or facial recognition, your heart's electrical pattern is extremely difficult to replicate and provides an additional layer of security.
                  </p>
                  <p>
                    Beyond security, the system continuously monitors your heart activity while driving. If it detects abnormal patterns indicative of cardiac distress, the system initiates safety protocols to gradually slow down the vehicle and bring it to a safe stop, potentially saving lives during medical emergencies.
                  </p>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">Enhanced Security</h3>
                    </div>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-xs text-primary font-medium">1</span>
                        </div>
                        <span>Impossible to duplicate your unique heart signature</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-xs text-primary font-medium">2</span>
                        </div>
                        <span>Prevents theft even if physical keys are stolen</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-xs text-primary font-medium">3</span>
                        </div>
                        <span>Advanced machine learning ensures precise matching</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                        <Heart className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">Health Protection</h3>
                    </div>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-xs text-primary font-medium">1</span>
                        </div>
                        <span>Detects signs of cardiac distress while driving</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-xs text-primary font-medium">2</span>
                        </div>
                        <span>Initiates emergency protocols during heart events</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-xs text-primary font-medium">3</span>
                        </div>
                        <span>Provides early warning for potential heart issues</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="technology" className="space-y-8">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <BrainCircuit className="mr-2 h-5 w-5 text-primary" />
                    How It Works
                  </h2>
                  <p className="mb-4">
                    HeartKey Navigator combines advanced ECG sensors, machine learning algorithms, and automotive integration to create a seamless and secure driving experience.
                  </p>
                  
                  <div className="space-y-6 mt-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">ECG Authentication Process</h3>
                      <ol className="space-y-4">
                        <li className="flex">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-primary">1</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Capture PQRST Waveform</h4>
                            <p className="text-muted-foreground">The system captures your unique PQRST waveform from integrated sensors in the steering wheel</p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-primary">2</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Pattern Recognition</h4>
                            <p className="text-muted-foreground">Machine learning algorithms compare the captured pattern with your registered profile</p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-primary">3</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Authentication Decision</h4>
                            <p className="text-muted-foreground">If patterns match, the vehicle unlocks and enables starting</p>
                          </div>
                        </li>
                      </ol>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Health Monitoring System</h3>
                      <ol className="space-y-4">
                        <li className="flex">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-primary">1</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Continuous Monitoring</h4>
                            <p className="text-muted-foreground">The system continuously monitors heart activity during driving</p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-primary">2</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Anomaly Detection</h4>
                            <p className="text-muted-foreground">AI algorithms detect signs of cardiac distress or abnormalities</p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-primary">3</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Emergency Response</h4>
                            <p className="text-muted-foreground">Gradual vehicle slow-down and notifications to emergency services</p>
                          </div>
                        </li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-primary" />
                    Technical Implementation
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Hardware Components</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                            <span className="text-xs text-primary font-medium">•</span>
                          </div>
                          <span>ECG sensors embedded in steering wheel</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                            <span className="text-xs text-primary font-medium">•</span>
                          </div>
                          <span>On-board processing unit for pattern recognition</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                            <span className="text-xs text-primary font-medium">•</span>
                          </div>
                          <span>Encrypted storage for biometric templates</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                            <span className="text-xs text-primary font-medium">•</span>
                          </div>
                          <span>Vehicle CAN bus integration</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Software Stack</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                            <span className="text-xs text-primary font-medium">•</span>
                          </div>
                          <span>Deep learning pattern recognition algorithms</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                            <span className="text-xs text-primary font-medium">•</span>
                          </div>
                          <span>Real-time health monitoring system</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                            <span className="text-xs text-primary font-medium">•</span>
                          </div>
                          <span>Low-latency signal processing</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                            <span className="text-xs text-primary font-medium">•</span>
                          </div>
                          <span>Emergency protocol management system</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="future" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">Future Development Roadmap</h2>
                  <p className="mb-6 text-muted-foreground">
                    The HeartKey Navigator technology has significant potential for expansion in several directions:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <Heart className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-1">Advanced Health Insights</h3>
                          <p className="text-muted-foreground">
                            Expanded health monitoring to detect fatigue, stress levels, and early warning signs of various cardiovascular conditions.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <Car className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-1">Personalized Driving Experience</h3>
                          <p className="text-muted-foreground">
                            Automatic adjustment of vehicle settings (seat, mirrors, climate) based on the identified driver's heart signature.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <ShieldCheck className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-1">Multi-Factor Biometrics</h3>
                          <p className="text-muted-foreground">
                            Integration with other biometric factors for enhanced security in high-value vehicles.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <BrainCircuit className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-1">AI-Driven Risk Assessment</h3>
                          <p className="text-muted-foreground">
                            Predictive analytics to assess cardiac risk and provide preventative health recommendations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">Market Potential</h2>
                  <p className="mb-6">
                    HeartKey Navigator addresses critical needs in automotive safety and security, with applications across multiple market segments:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-medium mb-2">Luxury Vehicles</h3>
                      <p className="text-sm text-muted-foreground">
                        Premium security and health features for high-end automotive brands.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-medium mb-2">Fleet Management</h3>
                      <p className="text-sm text-muted-foreground">
                        Monitor driver health and prevent accidents in commercial fleets.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-medium mb-2">Elderly Drivers</h3>
                      <p className="text-sm text-muted-foreground">
                        Safety features for seniors with increased risk of cardiac events.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-medium mb-2">Ride-Sharing Services</h3>
                      <p className="text-sm text-muted-foreground">
                        Enhanced security for both drivers and passengers.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-medium mb-2">Insurance Industry</h3>
                      <p className="text-sm text-muted-foreground">
                        Potential for reduced premiums with enhanced safety features.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-medium mb-2">Medical Transport</h3>
                      <p className="text-sm text-muted-foreground">
                        Specialized monitoring for patients during medical transport.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="border-t py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2023 HeartKey Navigator. Created for hackathon demonstration purposes.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
