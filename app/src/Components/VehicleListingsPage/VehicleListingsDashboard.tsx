import React, { useState, useEffect } from 'react';
import { Vehicle } from "../../types/Vehicle";
import AppBar from './AppBar';
import Listings from './Listings';
import Sidebar from './Sidebar';
import { Alert } from '@mui/material';
import jwtDecode from "jwt-decode";
import '../../Styles/VehicleListingsPage/VehicleListingsDashboard.css';

interface vehicleFilters {
    vehicleTypes: string[];
    brands: string[];
    priceRange: [number, number];
}

interface DecodedTokenPayload {
  exp: number;
  // Add other properties if needed
}


const VehicleListingsDashboard: React.FC = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [filtersApplied, setFiltersApplied] = useState(false);


  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {

    try {

      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

    const response = await fetch('http://localhost:5001/vehicles', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });


    if (!response.ok) {
      if (response.status === 401) {
        console.error('Unauthorized: Token expired or invalid');
        // Handle 401 Unauthorized: Redirect to login page or display a message
      } else {
        console.error('Error fetching data:', response.statusText);
        // Handle other errors
      }
      // console.error('Error fetching data:', response.statusText);
      return;
    }
      
    const data = await response.json();
    console.log('response', data);
    // Check if data is an array before setting it in state
    setVehicles(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  };

  const applyFilters = async (filters: vehicleFilters) => {
    try {
      const url = new URL('http://localhost:5001/vehicles/filter');
      // Append filters to the URL
      for (const [key, value] of Object.entries(filters)) {
        // url.searchParams.set(key, value);
        if (Array.isArray(value) && value.length > 0) {
            url.searchParams.set(key, value.join(','));
          } else if (typeof value === 'object') {
            url.searchParams.set(key, value.join(','));
          } else {
            url.searchParams.set(key, value.toString());
        }
      }

      console.log('API Request URL:', url.toString());

      const response = await fetch(url.toString());
      const data = await response.json();
  
      // Handle the filtered data
      setFilteredVehicles(data);
      setFiltersApplied(true);
      console.log('Filtered Data:', data);
      // Update state or perform other actions based on the filtered data
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  };


  return (
    <>
        <div>
            <AppBar />
            {
                filtersApplied && filteredVehicles.length == 0 && (
                    <Alert className='alert-info' severity='info'>No results Found</Alert>
                )
            }
            <div style={{ display: 'flex' }}>
                <Sidebar applyFilters={applyFilters} />
                <Listings vehicles={filteredVehicles.length > 0 ? filteredVehicles : vehicles} />
            </div>
        </div>
    </>
  );
};

export default VehicleListingsDashboard;
