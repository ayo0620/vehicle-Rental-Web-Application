import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminAppBar from "./AdminAppBar";
import VehicleDashboard from "./VehicleDashboard";
import BookingsDashboard from "./BookingsDashboard";
import CustomersDashboard from "./CustomersDashboard";
import AnalyticsDashboard from "./AnalyticsDashboard";
import CustomerReviewDashboard from "./CustomerReviewDashboard";
import '../../Styles/AdminPage/AdminDashboard.css';
import MainDashboard from "./MainDashboard";


interface AdminAppBarProps {
  adminName: string;
  adminProfilePicture: string;
}

const AdminDashboard: React.FC = () => {
  const adminName = 'Admin Name';
  const adminProfilePicture = 'https://example.com/profile-picture.jpg';

  // State to manage the selected section of the dashboard
  const [selectedSection, setSelectedSection] = useState<string>('dashboard');
  const [pendingBookingsCount, setPendingBookingsCount] = useState(0);

  // Function to fetch pending bookings count
  const fetchPendingBookingsCount = async () => {
    try {
        const response = await fetch('http://localhost:5001/admin-dashboard/pending-bookings-count', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        const data = await response.json();
        setPendingBookingsCount(data.count);
    } catch (error) {
        console.error('Error fetching pending bookings count:', error);
    }
};

useEffect(() => {
    fetchPendingBookingsCount();
}, []);

  // Function to handle section selection
  const handleSectionSelect = (section: string) => {
    setSelectedSection(section);
  };

  const renderDashboardContent = (): React.ReactNode => {
    switch (selectedSection) {
      case 'vehicles':
        return <VehicleDashboard />;
      case 'bookings':
        return <BookingsDashboard fetchPendingBookingsCount={fetchPendingBookingsCount}/>
      case 'customers':
        return <CustomersDashboard/>;
      case 'analytics':
        return <AnalyticsDashboard/>
      case 'customer-review':
        return <CustomerReviewDashboard/>
      default:
        return <MainDashboard/>;
    }
  };



  return (
    <div className="AdminDashboard-container">
      <AdminAppBar adminName={adminName} adminProfilePicture={adminProfilePicture}/>
      <div className="MainContainer">
        <AdminSidebar 
          onSectionSelect={handleSectionSelect}
          pendingBookingsCount={pendingBookingsCount}/>
        <div className="MainDashboard">
          {renderDashboardContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
