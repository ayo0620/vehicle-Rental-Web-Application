import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import { Link } from 'react-router-dom';

import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import "../../Styles/AdminPage/VehicleDashboard.css";

interface Vehicle {
  _id: string;
  make: string;
  model: string;
  vehicleType: string;
  year: number;
  fuelType: string;
  rentPerHour: number;
  availability: boolean;
}


const VehicleDashboard: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicles, setSelectedVehicles] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        // Fetch vehicles from backend
        const response = await fetch('/admin-dashboard/listings', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Replace with your token management logic
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch vehicles');
        }
        const data: Vehicle[] = await response.json();
        // Transform data for DataGrid
        const rows = data.map(vehicle => ({
            ...vehicle,
            id: vehicle._id,
            vehicleName: `${vehicle.make} ${vehicle.model}`,
          }));
        setVehicles(rows);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchVehicles();
  }, []);

  const navigate = useNavigate();

  const handleEdit = (vehicleId: string) => {
    navigate(`/add-listings/${vehicleId}`);
  };

    const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
    const newSelectedVehicles = selectionModel.reduce((selected, id) => {
    selected[id.toString()] = true;
    return selected;
    }, {} as { [key: string]: boolean });
    setSelectedVehicles(newSelectedVehicles);
    };



  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/vehicles/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setVehicles(prevVehicles => prevVehicles.filter(vehicle => vehicle._id !== id));
    } catch (error) {
      console.error('Failed to delete vehicle', error);
    }
  };

  const toggleVehicleSelection = (id: string) => {
    setSelectedVehicles(prevSelectedVehicles => ({
      ...prevSelectedVehicles,
      [id]: !prevSelectedVehicles[id],
    }));
  };

  const handleDeleteAll = async () => {
    const vehicleIdsToDelete = Object.entries(selectedVehicles)
                                    .filter(([_, isSelected]) => isSelected)
                                    .map(([id, _]) => id);
  
    if (vehicleIdsToDelete.length > 0) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/vehicles/deleteMany`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ids: vehicleIdsToDelete })
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete vehicles');
        }
  
        // If deletion was successful, filter out the deleted vehicles
        setVehicles(prevVehicles => 
          prevVehicles.filter(vehicle => !vehicleIdsToDelete.includes(vehicle._id))
        );
  
        // Reset the selection state
        setSelectedVehicles({});
        
        // You can display a success message here
      } catch (error) {
        console.error('Failed to delete vehicles', error);
        // You can display an error message here
      }
    }
  };
  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 150 },
    { field: 'vehicleName', headerName: 'Vehicle Name', width: 200 },
    { field: 'vehicleType', headerName: 'Vehicle Type', width: 150 },
    { field: 'year', headerName: 'Vehicle Year', width: 150 },
    { field: 'fuelType', headerName: 'Fuel Type', width: 150 },
    { field: 'rentPerHour', headerName: 'Price per Day($)', width: 150 },
    { field: 'availability', headerName: 'Availability', width: 150, renderCell: (params) => (
        <span style={{ backgroundColor: params.value ? 'lightgreen' : 'lightcoral', 
                    color: params.value ? 'green' : 'red',
                    padding: '4px 6px', 
                    borderRadius: '8px',}}>
            {params.value ? 'Available' : 'Unavailable'}
      </span>
    ) },
    { field: 'actions', headerName: 'Actions', width: 230, renderCell: (params) => (
        <div className="action-buttons">
            <Link to={`/vehicle-listing-details/${params.row._id}`}>
            <Button variant="outlined" color="primary" size="small">View</Button>
            </Link>
            <Button variant="outlined" color="secondary" size="small" onClick={() => handleEdit(params.row._id)}>Edit</Button>
            <Button variant="text" style={{ color: 'red' }} size="small" onClick={() => handleDelete(params.row._id)}>Delete</Button>
      </div>
    ) },
  ];

  return (
    <div className="Admin-Listings-Container">
        <div className="header">
            <h2>Listings</h2>
            <Link to="/add-listings" className="add-button">
            <Button variant="outlined">Add New Listing</Button>
        </Link>
        </div>
        <div className="delete-selected-button">
            <Button 
                variant="contained" 
                color="error" 
                onClick={handleDeleteAll} 
                disabled={Object.keys(selectedVehicles).length === 0}
                >
                Delete Selected
            </Button>
        </div>
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={vehicles}
            columns={columns}
            checkboxSelection
            onRowSelectionModelChange={handleSelectionChange}
            rowSelectionModel={Object.keys(selectedVehicles)}
        />
        </div>
    </div>
  );
}

export default VehicleDashboard;
