import React from "react";
import Listings from "./Listings";
import Sidebar from "./Sidebar";
import AppBar from "./AppBar";

const VehicleListingsDashboard: React.FC = () => {
    return (
        <div>
            <AppBar/>
            <div style={{ display: 'flex'}}>
                <Sidebar/>
                <Listings/>
            </div>
        </div>
    )
}

export default VehicleListingsDashboard;