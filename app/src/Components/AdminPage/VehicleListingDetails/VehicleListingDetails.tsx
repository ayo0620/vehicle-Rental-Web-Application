import React from "react";
import { useParams } from 'react-router-dom';

import "../../../Styles/AdminPage/VehicleListingDetails/VehicleListingDetails.css";
import { FaArrowLeft } from "react-icons/fa";

interface Vehicle {
  _id: string;
  make: string;
  model: string;
  image: string;
  vehicleType: string;
  year: number;
  capacity: number;
  fuelType: string;
  rentPerHour: number;
  description: string;
}

const VehicleListingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [vehicle, setVehicle] = React.useState<Vehicle | null>(null);

  // Fetch vehicle details by ID (you need to implement this)
  React.useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage or wherever it's stored
        const response = await fetch(`/vehicles/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }); 
        if (!response.ok) {
          throw new Error('Failed to fetch vehicle details');
        }
        const data: Vehicle = await response.json();
        setVehicle(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVehicleDetails();
  }, [id]);

  const handleBackClick = () => {
    window.history.back(); // This will take the user back to the previous page
  };


  // Render loading while fetching data
  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <>
        <div className='vehicle-details-header'>
          <FaArrowLeft className='back-button' onClick={handleBackClick}/>
          <h2>Vehicle Details</h2>
        </div>
        <div className="vehicle-details-container">
            <div className="top-layer">
                <div className="vehicle-image-container">
                    <img src={vehicle.image} alt="Vehicle" className="vehicle-image" />
                </div>
                <div className="vehicle-details">
                    <h2>Vehicle Details</h2>
                    <div>
                    <strong>Vehicle Type:</strong> {vehicle.vehicleType}
                    </div>
                    <div>
                    <strong>Make:</strong> {vehicle.make}
                    </div>
                    <div>
                    <strong>Model:</strong> {vehicle.model}
                    </div>
                    <div>
                    <strong>Year:</strong> {vehicle.year}
                    </div>
                    <div>
                    <strong>Capacity:</strong> {vehicle.capacity}
                    </div>
                    <div>
                    <strong>Fuel Type:</strong> {vehicle.fuelType}
                    </div>
                    <div>
                    <strong>Rent Per Day:</strong> ${vehicle.rentPerHour}
                    </div>
                </div>
            </div>
        <div className="vehicle-description">
            <h2>Description</h2>
            <p>{vehicle.description}</p>
        </div>
        </div>
    </>
  );
}


export default VehicleListingDetails;