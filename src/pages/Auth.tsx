import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Car, Bike } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<"driver" | "passenger">("passenger");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    
    // Simple mock authentication - store in localStorage
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("isAuthenticated", "true");
    
    toast.success(`Welcome back! Logged in as ${userRole}`);
    navigate(userRole === "driver" ? "/driver-dashboard" : "/passenger-dashboard");
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    
    // Simple mock authentication - store in localStorage
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", name);
    localStorage.setItem("isAuthenticated", "true");
    
    toast.success(`Account created! Welcome, ${name}`);
    navigate(userRole === "driver" ? "/driver-dashboard" : "/passenger-dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-md shadow-[var(--shadow-strong)]">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 justify-center mb-4">
            <Car className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CampusRide
            </CardTitle>
          </div>
          <CardDescription className="text-center">
            Join the sustainable campus commuting revolution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">College Email</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="you@college.edu"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label>I am a:</Label>
                  <RadioGroup value={userRole} onValueChange={(value) => setUserRole(value as "driver" | "passenger")}>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                      <RadioGroupItem value="driver" id="driver-login" />
                      <Label htmlFor="driver-login" className="flex-1 cursor-pointer flex items-center gap-2">
                        <Car className="h-4 w-4" />
                        Driver (I have a vehicle)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                      <RadioGroupItem value="passenger" id="passenger-login" />
                      <Label htmlFor="passenger-login" className="flex-1 cursor-pointer flex items-center gap-2">
                        <Bike className="h-4 w-4" />
                        Passenger (I need a ride)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button type="submit" variant="hero" className="w-full" size="lg">
                  Log In
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    name="name"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">College Email</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="you@college.edu"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-phone">Phone Number</Label>
                  <Input
                    id="signup-phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label>I am a:</Label>
                  <RadioGroup value={userRole} onValueChange={(value) => setUserRole(value as "driver" | "passenger")}>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                      <RadioGroupItem value="driver" id="driver-signup" />
                      <Label htmlFor="driver-signup" className="flex-1 cursor-pointer flex items-center gap-2">
                        <Car className="h-4 w-4" />
                        Driver (I have a vehicle)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                      <RadioGroupItem value="passenger" id="passenger-signup" />
                      <Label htmlFor="passenger-signup" className="flex-1 cursor-pointer flex items-center gap-2">
                        <Bike className="h-4 w-4" />
                        Passenger (I need a ride)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button type="submit" variant="hero" className="w-full" size="lg">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
