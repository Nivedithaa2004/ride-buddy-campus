import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, LogOut, Search, Filter } from "lucide-react";
import { toast } from "sonner";
import RideCard from "@/components/RideCard";
import { Ride, Booking } from "@/types/ride";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const PassengerDashboard = () => {
  const navigate = useNavigate();
  const [rides, setRides] = useState<Ride[]>([]);
  const [filteredRides, setFilteredRides] = useState<Ride[]>([]);
  const [userName, setUserName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState<string>("all");
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [bookedRides, setBookedRides] = useState<string[]>([]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      // Allow browsing without auth
      loadRides();
      return;
    }

    const name = localStorage.getItem("userName") || "Passenger";
    setUserName(name);
    loadRides();
    loadBookings();
  }, []);

  const loadRides = () => {
    const storedRides = localStorage.getItem("rides");
    if (storedRides) {
      const allRides: Ride[] = JSON.parse(storedRides);
      setRides(allRides);
      setFilteredRides(allRides);
    }
  };

  const loadBookings = () => {
    const email = localStorage.getItem("userEmail");
    const storedRides = localStorage.getItem("rides");
    if (storedRides && email) {
      const allRides: Ride[] = JSON.parse(storedRides);
      const booked = allRides
        .filter(ride => ride.bookings.some(booking => booking.passengerEmail === email))
        .map(ride => ride.id);
      setBookedRides(booked);
    }
  };

  useEffect(() => {
    let filtered = rides;

    if (searchQuery) {
      filtered = filtered.filter(
        ride =>
          ride.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ride.destination.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (vehicleFilter !== "all") {
      filtered = filtered.filter(ride => ride.vehicleType === vehicleFilter);
    }

    setFilteredRides(filtered);
  }, [searchQuery, vehicleFilter, rides]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleBook = (ride: Ride) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      toast.error("Please login to book a ride");
      navigate("/auth");
      return;
    }
    setSelectedRide(ride);
    setShowBookingDialog(true);
  };

  const handleConfirmBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedRide) return;

    const formData = new FormData(e.currentTarget);
    const newBooking: Booking = {
      id: Date.now().toString(),
      rideId: selectedRide.id,
      passengerName: formData.get("name") as string,
      passengerEmail: localStorage.getItem("userEmail") || "",
      passengerPhone: formData.get("phone") as string,
      pickupLocation: formData.get("pickup") as string,
      status: "confirmed",
      bookedAt: new Date().toISOString(),
    };

    // Update rides in localStorage
    const storedRides = localStorage.getItem("rides");
    if (storedRides) {
      const allRides: Ride[] = JSON.parse(storedRides);
      const updatedRides = allRides.map(ride => {
        if (ride.id === selectedRide.id) {
          return {
            ...ride,
            availableSeats: ride.availableSeats - 1,
            bookings: [...ride.bookings, newBooking]
          };
        }
        return ride;
      });
      localStorage.setItem("rides", JSON.stringify(updatedRides));
      loadRides();
      loadBookings();
    }

    toast.success("Ride booked successfully!");
    setShowBookingDialog(false);
    setSelectedRide(null);
  };

  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-background to-primary/5">
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
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-muted-foreground">Welcome, {userName}</span>
                  <Button variant="ghost" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/auth">
                  <Button variant="hero">Login / Sign Up</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Find a Ride</h1>
          <p className="text-muted-foreground">Search and book rides to campus</p>
        </div>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by pickup or destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Vehicle type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Vehicles</SelectItem>
              <SelectItem value="car">Car</SelectItem>
              <SelectItem value="bike">Bike</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredRides.length === 0 ? (
          <div className="text-center py-20">
            <Car className="h-24 w-24 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-semibold mb-2">No rides available</h2>
            <p className="text-muted-foreground">Check back later or try different filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRides.map((ride) => (
              <RideCard
                key={ride.id}
                ride={ride}
                showDriverInfo={bookedRides.includes(ride.id)}
                onBook={handleBook}
                isBooked={bookedRides.includes(ride.id)}
              />
            ))}
          </div>
        )}
      </main>

      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book This Ride</DialogTitle>
            <DialogDescription>
              Enter your details to confirm the booking
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleConfirmBooking} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={localStorage.getItem("userName") || ""}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pickup">Your Pickup Location</Label>
              <Input
                id="pickup"
                name="pickup"
                placeholder="Exact pickup point"
                required
              />
            </div>
            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setShowBookingDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="hero" className="flex-1">
                Confirm Booking
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PassengerDashboard;
