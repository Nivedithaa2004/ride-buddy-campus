import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, Plus, LogOut } from "lucide-react";
import { toast } from "sonner";
import RideCard from "@/components/RideCard";
import { Ride } from "@/types/ride";

const DriverDashboard = () => {
  const navigate = useNavigate();
  const [rides, setRides] = useState<Ride[]>([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const role = localStorage.getItem("userRole");
    
    if (!isAuthenticated || role !== "driver") {
      navigate("/auth");
      return;
    }

    // Load user info
    const name = localStorage.getItem("userName") || "Driver";
    setUserName(name);

    // Load rides from localStorage
    const storedRides = localStorage.getItem("rides");
    if (storedRides) {
      const allRides: Ride[] = JSON.parse(storedRides);
      const email = localStorage.getItem("userEmail");
      const driverRides = allRides.filter(ride => ride.driverEmail === email);
      setRides(driverRides);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleDelete = (rideId: string) => {
    const storedRides = localStorage.getItem("rides");
    if (storedRides) {
      const allRides: Ride[] = JSON.parse(storedRides);
      const updatedRides = allRides.filter(ride => ride.id !== rideId);
      localStorage.setItem("rides", JSON.stringify(updatedRides));
      setRides(rides.filter(ride => ride.id !== rideId));
      toast.success("Ride deleted successfully");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="bg-card shadow-[var(--shadow-soft)] sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Car className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CampusRide
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Welcome, {userName}</span>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Driver Dashboard</h1>
            <p className="text-muted-foreground">Manage your rides and passengers</p>
          </div>
          <Link to="/post-ride">
            <Button variant="hero" size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Post New Ride
            </Button>
          </Link>
        </div>

        {rides.length === 0 ? (
          <div className="text-center py-20">
            <Car className="h-24 w-24 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-semibold mb-2">No rides posted yet</h2>
            <p className="text-muted-foreground mb-6">Start by posting your first ride</p>
            <Link to="/post-ride">
              <Button variant="hero" size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Post Your First Ride
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rides.map((ride) => (
              <RideCard
                key={ride.id}
                ride={ride}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DriverDashboard;
