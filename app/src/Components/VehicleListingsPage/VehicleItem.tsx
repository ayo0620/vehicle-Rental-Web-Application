import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import '../../Styles/VehicleListingsPage/VehicleItem.css';


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

interface vehicleItemProps {
     vehicle: Vehicle
}

const VehicleItem: React.FC<vehicleItemProps> = ({ vehicle }) => {
     return (
        <div className="listing-item"> 
          <img src={vehicle.image} width={300} height={300}/>
          <div className="vehicle-details">
               <div className="title">
                    <p>{`${vehicle.make} ${vehicle.model} ${vehicle.year}`} <FaRegHeart className="icon"/></p>
               </div>
               <div className="sub-title">
                    <p><FaRegUser className="icon"/> {vehicle.capacity} persons</p>
                    <p>${vehicle.rentPerHour}/hr</p>
               </div>
          </div>
        </div>
     )    
}

export default VehicleItem;