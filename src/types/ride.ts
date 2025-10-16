export interface Ride {
  id: string;
  driverId: string;
  driverName: string;
  driverEmail: string;
  driverPhone: string;
  vehicleType: "car" | "bike";
  pickupLocation: string;
  destination: string;
  date: string;
  time: string;
  availableSeats: number;
  totalSeats: number;
  costPerPerson: number;
  status: "active" | "completed" | "cancelled";
  bookings: Booking[];
}

export interface Booking {
  id: string;
  rideId: string;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  pickupLocation: string;
  status: "pending" | "confirmed" | "cancelled";
  bookedAt: string;
}
