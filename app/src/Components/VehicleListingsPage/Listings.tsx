import { error } from "console";
import React, { useEffect, useState } from "react";
import VehicleItem from "./VehicleItem";
import '../../Styles/VehicleListingsPage/Listings.css'

interface Vehicle {
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
}

interface ListingsProps {
    vehicles: Vehicle[];
}

const Listings: React.FC<ListingsProps> = ({ vehicles }) => {

    return (
        <>
            <div className="listings">
                <div className="listings-grid">
                    {vehicles.map((vehicle) => (
                        <VehicleItem key={vehicle._id} vehicle={vehicle} />
                    ))}
                </div>
            </div>

            {
                
            }
        </>
    );
}

export default Listings;