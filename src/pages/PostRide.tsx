import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Car, Bike, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Ride } from "@/types/ride";

const PostRide = () => {
  const navigate = useNavigate();
  const [vehicleType, setVehicleType] = useState<"car" | "bike">("car");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const role = localStorage.getItem("userRole");
    
    if (!isAuthenticated || role !== "driver") {
      navigate("/auth");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newRide: Ride = {
      id: Date.now().toString(),
      driverId: localStorage.getItem("userEmail") || "",
      driverName: localStorage.getItem("userName") || "",
      driverEmail: localStorage.getItem("userEmail") || "",
      driverPhone: formData.get("phone") as string,
      vehicleType: vehicleType,
      pickupLocation: formData.get("pickup") as string,
      destination: formData.get("destination") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      availableSeats: parseInt(formData.get("seats") as string),
      totalSeats: parseInt(formData.get("seats") as string),
      costPerPerson: parseFloat(formData.get("cost") as string),
      status: "active",
      bookings: []
    };

    // Save to localStorage
    const existingRides = localStorage.getItem("rides");
    const rides: Ride[] = existingRides ? JSON.parse(existingRides) : [];
    rides.push(newRide);
    localStorage.setItem("rides", JSON.stringify(rides));

    toast.success("Ride posted successfully!");
    navigate("/driver-dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <header className="bg-card shadow-[var(--shadow-soft)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/driver-dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Link to="/" className="flex items-center gap-2">
              <Car className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CampusRide
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="shadow-[var(--shadow-strong)]">
          <CardHeader>
            <CardTitle className="text-3xl">Post a New Ride</CardTitle>
            <CardDescription>Share your ride details with fellow students</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label>Vehicle Type</Label>
                <RadioGroup value={vehicleType} onValueChange={(value) => setVehicleType(value as "car" | "bike")}>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value="car" id="car" />
                    <Label htmlFor="car" className="flex-1 cursor-pointer flex items-center gap-3">
                      <Car className="h-6 w-6 text-primary" />
                      <div>
                        <div className="font-semibold">Car</div>
                        <div className="text-xs text-muted-foreground">4-wheeler vehicle</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border-2 border-border hover:border-secondary transition-colors cursor-pointer">
                    <RadioGroupItem value="bike" id="bike" />
                    <Label htmlFor="bike" className="flex-1 cursor-pointer flex items-center gap-3">
                      <Bike className="h-6 w-6 text-secondary" />
                      <div>
                        <div className="font-semibold">Two-Wheeler</div>
                        <div className="text-xs text-muted-foreground">Bike or scooter</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <Input
                    id="pickup"
                    name="pickup"
                    placeholder="e.g., Downtown Mall"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    name="destination"
                    placeholder="e.g., Campus Gate 1"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Departure Time</Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="seats">
                    {vehicleType === "car" ? "Available Seats" : "Pillion Slots"}
                  </Label>
                  <Input
                    id="seats"
                    name="seats"
                    type="number"
                    min="1"
                    max={vehicleType === "car" ? "4" : "1"}
                    placeholder={vehicleType === "car" ? "e.g., 3" : "1"}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Cost per Person (₹)</Label>
                  <Input
                    id="cost"
                    name="cost"
                    type="number"
                    step="0.50"
                    min="0"
                    placeholder="e.g., 5.00"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Contact Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => navigate("/driver-dashboard")}>
                  Cancel
                </Button>
                <Button type="submit" variant="hero" className="flex-1">
                  Post Ride
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PostRide;
