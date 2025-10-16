import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Bike, MapPin, Clock, Users, DollarSign, Phone, Mail } from "lucide-react";
import { Ride } from "@/types/ride";

interface RideCardProps {
  ride: Ride;
  showDriverInfo?: boolean;
  onBook?: (ride: Ride) => void;
  onEdit?: (ride: Ride) => void;
  onDelete?: (rideId: string) => void;
  isBooked?: boolean;
}

const RideCard = ({ ride, showDriverInfo = false, onBook, onEdit, onDelete, isBooked = false }: RideCardProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <Card className="shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all duration-300 hover:scale-[1.02]">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {ride.vehicleType === "car" ? (
                <Car className="h-5 w-5 text-primary" />
              ) : (
                <Bike className="h-5 w-5 text-secondary" />
              )}
              <Badge variant={ride.vehicleType === "car" ? "default" : "secondary"}>
                {ride.vehicleType.toUpperCase()}
              </Badge>
              <Badge variant={ride.availableSeats > 0 ? "outline" : "destructive"}>
                {ride.availableSeats > 0 ? `${ride.availableSeats} seats left` : "Full"}
              </Badge>
            </div>
            <CardTitle className="text-xl">{ride.driverName}</CardTitle>
            {showDriverInfo && (
              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{ride.driverPhone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{ride.driverEmail}</span>
                </div>
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              ₹{ride.costPerPerson}
            </div>
            <div className="text-xs text-muted-foreground">per person</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-medium">From: {ride.pickupLocation}</div>
              <div className="text-sm text-muted-foreground">To: {ride.destination}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-secondary" />
            <span className="text-sm">
              {formatDate(ride.date)} at {ride.time}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-accent" />
            <span className="text-sm">
              {ride.totalSeats - ride.availableSeats} / {ride.totalSeats} seats booked
            </span>
          </div>
        </div>
        
        {ride.bookings && ride.bookings.length > 0 && (
          <div className="pt-4 border-t">
            <div className="text-sm font-medium mb-2">Passengers ({ride.bookings.length})</div>
            <div className="space-y-2">
              {ride.bookings.map((booking) => (
                <div key={booking.id} className="text-sm p-2 rounded bg-muted">
                  <div className="font-medium">{booking.passengerName}</div>
                  <div className="text-xs text-muted-foreground">{booking.passengerPhone}</div>
                  <div className="text-xs text-muted-foreground">{booking.pickupLocation}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          {onBook && !isBooked && ride.availableSeats > 0 && (
            <Button variant="hero" className="flex-1" onClick={() => onBook(ride)}>
              Book Ride
            </Button>
          )}
          {isBooked && (
            <Badge variant="outline" className="flex-1 justify-center py-2">
              Booked ✓
            </Badge>
          )}
          {onEdit && (
            <Button variant="outline" onClick={() => onEdit(ride)}>
              Edit
            </Button>
          )}
          {onDelete && (
            <Button variant="destructive" onClick={() => onDelete(ride.id)}>
              Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RideCard;
