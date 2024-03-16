import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface Column {
  id: 'vehicleName' | 'bookingId' | 'dateOrdered' | 'totalAmount' | 'status' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'vehicleName', label: 'Vehicle Name', minWidth: 170 },
  { id: 'bookingId', label: 'Booking ID', minWidth: 100 },
  { id: 'dateOrdered', label: 'Date Ordered', minWidth: 170 },
  { id: 'totalAmount', label: 'Total Amount', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 170 },
];

interface Booking {
  _id: string;
  vehicleId: string;
  userId: string;
  totalAmount: number;
  status: string;
  dateOrdered: string;
}

interface Vehicle {
  _id: string;
  make: string;
  model: string;
}

function createRow(
  vehicleName: string,
  bookingId: string,
  dateOrdered: string,
  totalAmount: number,
  status: string
): { vehicleName: string; bookingId: string; dateOrdered: string; totalAmount: number; status: string } {
  return { vehicleName, bookingId, dateOrdered, totalAmount, status };
}

const statusColors: Record<string, string> = {
    Pending: '#FFC107', // Yellow
    Confirmed: '#4CAF50', // Green
    Declined: '#F44336', // Red
};
  

const StickyHeadTable: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [vehicleDetails, setVehicleDetails] = React.useState<Record<string, { make: string; model: string }>>({});
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedBookingId, setSelectedBookingId] = React.useState<string>('');
  

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, bookingId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedBookingId(bookingId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBookingId('');
  };

  const handleConfirm = async () => {
    try {
      await fetch(`http://localhost:5001/bookings/${selectedBookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: 'Confirmed' }),
      });
      // Update the status of the confirmed booking in the local state
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking._id === selectedBookingId ? { ...booking, status: 'Confirmed' } : booking
        )
      );
    } catch (error) {
      console.error('Error confirming booking:', error);
    } finally {
      handleMenuClose();
    }
  };

  const handleDecline = async () => {
    try {
      await fetch(`http://localhost:5001/bookings/${selectedBookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: 'Declined' }),
      });
      // Update the status of the cancelled booking in the local state
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking._id === selectedBookingId ? { ...booking, status: 'Declined' } : booking
        )
      );
    } catch (error) {
      console.error('Error declining booking:', error);
    } finally {
      handleMenuClose();
    }
  };

  React.useEffect(() => {
    // Fetch recent bookings
    const fetchRecentBookings = async () => {
      try {
        const response = await fetch('http://localhost:5001/admin-dashboard/bookings', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch recent orders');
        }
        const data: Booking[] = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching recent orders:', error);
      }
    };

    fetchRecentBookings();
  }, []);

  React.useEffect(() => {
    // Fetch vehicle details for each booking
    const fetchVehicleDetails = async (vehicleId: string) => {
      try {
        const response = await fetch(`http://localhost:5001/vehicles/${vehicleId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const vehicleData: Vehicle = await response.json();
        setVehicleDetails((prevDetails) => ({
          ...prevDetails,
          [vehicleId]: { make: vehicleData.make, model: vehicleData.model },
        }));
      } catch (error) {
        console.error(`Error fetching vehicle details for vehicle ID ${vehicleId}:`, error);
      }
    };

    bookings.forEach((booking) => {
      if (!vehicleDetails[booking.vehicleId]) {
        fetchVehicleDetails(booking.vehicleId);
      }
    });
  }, [bookings, vehicleDetails]);

  return (
    <>
        <div>
            <h2>Orders</h2>
        </div>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    >
                    {column.label}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {bookings
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((booking) => {
                    const vehicleName = vehicleDetails[booking.vehicleId]
                    ? `${vehicleDetails[booking.vehicleId].make} ${vehicleDetails[booking.vehicleId].model}`
                    : 'Unknown Vehicle';
                    return (
                    <TableRow 
                        hover 
                        role="checkbox" 
                        tabIndex={-1} 
                        key={booking._id}
                    >
                        <TableCell>{vehicleName}</TableCell>
                        <TableCell>{booking._id}</TableCell>
                        <TableCell>{booking.dateOrdered}</TableCell>
                        <TableCell>${booking.totalAmount}</TableCell>
                        <TableCell>
                            <span style={{fontWeight:"bold",  color: statusColors[booking.status] }}>{booking.status}</span>
                        </TableCell>
                        <TableCell>
                          {booking.status === 'Pending' && (
                            <div>
                              <Button
                                variant="contained"
                                onClick={(event) => handleMenuOpen(event, booking._id)}
                              >
                                Actions
                              </Button>
                              <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl && selectedBookingId === booking._id)}
                                onClose={handleMenuClose}
                              >
                                <MenuItem onClick={handleConfirm}>Confirm</MenuItem>
                                <MenuItem onClick={handleDecline}>Decline</MenuItem>
                              </Menu>
                            </div>
                          )}
                        </TableCell>
                    </TableRow>
                    );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={bookings.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
            }}
        />
        </Paper>
    </>
  );
};

export default StickyHeadTable;
