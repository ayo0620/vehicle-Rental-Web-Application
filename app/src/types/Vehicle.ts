export interface Vehicle {
    _id: string;
    vehicleType: string;
    make: string;
    model: string;
    year: number;
    image: string;
    capacity: number;
    fuelType: string;
    bookedTimeSlots: {
      from: string;
      to: string;
    }[];
    availability: boolean;
    rentPerHour: number;
    createdBy: string;
    description?: string;
    reviews?: Review[];
  }
  
  export interface Review {
    user: string;
    comment: string;
  }
  