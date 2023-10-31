import React from "react";
import { Vehicle } from "../../types/Vehicle";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import '../../Styles/VehicleListingsPage/VehicleItem.css';

interface vehicleItemProps {
     vehicle: Vehicle
}

const VehicleItem: React.FC<vehicleItemProps> = ({ vehicle }) => {
     return (
          <div className="listing-item"> 
               <Link to={`vehicle/${vehicle._id}`}>
                    <img src={vehicle.image} width={300} height={300}/>
               </Link>
               <div className="vehicle-details">
                    <div className="title">
                         <p>{`${vehicle.make} ${vehicle.model} ${vehicle.year}`} <FaRegHeart className="icon"/></p>
                    </div>
                    <div className="sub-title">
                         <p><FaRegUser className="icon"/> {vehicle.capacity} persons</p>
                         <p>${vehicle.rentPerHour}/day</p>
                    </div>
               </div>
          </div>
     )    
}

export default VehicleItem;