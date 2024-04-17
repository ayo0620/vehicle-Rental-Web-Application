import { error } from "console";
import { Vehicle } from "../../types/Vehicle";
import React, { useEffect, useState } from "react";
import VehicleItem from "./VehicleItem";
import '../../Styles/VehicleListingsPage/Listings.css'


interface ListingsProps {
    vehicles: Vehicle[];
}

const Listings: React.FC<ListingsProps> = ({ vehicles }) => {
    if (!Array.isArray(vehicles)) {
        // Render an appropriate fallback UI or return null
        return <div>No vehicles available</div>;
    }

    return (
        <>
            <div className="listings" style={{ maxHeight: '100vh'}}>
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