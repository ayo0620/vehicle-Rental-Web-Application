import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Order {
  _id: string;
  vehicleId: string;
  userId: string;
  totalAmount: number;
  status: string;
  dateOrdered: string;
}

interface Vehicle {
    _id: string;
    vehicleType: string;
    make: string;
    model: string;
    year: number;
  }

const RecentOrdersTable: React.FC = () => {
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [vehicleDetails, setVehicleDetails] = useState<Record<string, { make: string; model: string }>>({});

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const response = await fetch('http://localhost:5001/admin-dashboard/recent-orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch recent orders');
        }
        const data: Order[] = await response.json();
        setRecentOrders(data);
      } catch (error) {
        console.error('Error fetching recent orders:', error);
      }
    };

    fetchRecentOrders();
  }, []);


  useEffect(() => {
    const fetchVehicleDetails = async (vehicleId: string) => {
      try {
        const response = await fetch(`http://localhost:5001/vehicles/${vehicleId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const vehicleData = await response.json();
        setVehicleDetails((prevDetails) => ({
          ...prevDetails,
          [vehicleId]: { make: vehicleData.make, model: vehicleData.model },
        }));
      } catch (error) {
        console.error(`Error fetching vehicle details for vehicle ID ${vehicleId}:`, error);
      }
    };

    recentOrders.forEach((order) => {
      if (!vehicleDetails[order.vehicleId]) {
        fetchVehicleDetails(order.vehicleId);
      }
    });
  }, [recentOrders, vehicleDetails]);

  return (
    <div className="Table">
      <h3>Recent Orders</h3>
      <TableContainer component={Paper} style={{ boxShadow: '0px 13px 20px 0px #80808029' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Vehicle Name</TableCell>
              <TableCell align="left">Booking ID</TableCell>
              <TableCell align="left">Date Ordered</TableCell>
              {/* <TableCell align="left">Customer Email</TableCell> */}
              <TableCell align="left">Total Amount</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                    {vehicleDetails[order.vehicleId] ? `${vehicleDetails[order.vehicleId].make} ${vehicleDetails[order.vehicleId].model}` : 'Unknown Vehicle'}
                </TableCell>
                <TableCell align="left">{order._id}</TableCell>
                <TableCell align="left">{new Date(order.dateOrdered).toLocaleString()}</TableCell>
                {/* <TableCell align="left">{order.user ? order.user.email : 'Unknown User'}</TableCell> */}
                <TableCell align="left">{order.totalAmount}</TableCell>
                <TableCell align="left">{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RecentOrdersTable;
