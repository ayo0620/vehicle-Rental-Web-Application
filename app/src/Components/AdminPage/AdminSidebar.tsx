import React , { useState } from "react";
import { FaCar, FaCarSide, FaChartLine, FaClipboardList, FaHome, FaRegClipboard, FaUsers } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import '../../Styles/AdminPage/AdminSidebar.css';

interface AdminSidebarProps {
    onSectionSelect: (section: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onSectionSelect }) => {
    const navigate = useNavigate();
    const [selectedSection, setSelectedSection] = useState<string>('dashboard');


    const handleSectionClick = (section: string) => {
        setSelectedSection(section);
        onSectionSelect(section);
    }

    const handleLogout = () => {
        // Clear the authentication token from local storage
        localStorage.removeItem("token");
    
        // Redirect to the login page
        navigate("/");
    };

    return (
        <div className="Admin-Sidebar">
            <div className="logo">
                <FaCar className="car-icon"/>
                <span>
                    Veh<span>i</span>cle
                </span>
            </div>

            {/* menu */}
            <div className="menu">
                <div className={`menuItem ${selectedSection === 'dashboard' ? 'active' : ''}`} onClick={() => handleSectionClick('dashboard')}>
                    <div>
                        <FaHome/>
                    </div>
                    <span>Dashboard</span>
                </div>

                <div className={`menuItem ${selectedSection === 'vehicles' ? 'active' : ''}`} onClick={() => handleSectionClick('vehicles')}>
                    <div>
                        <FaCarSide/>
                    </div>
                    <span>Vehicles</span>
                </div>

                <div className={`menuItem ${selectedSection === 'bookings' ? 'active' : ''}`} onClick={() => handleSectionClick('bookings')}>
                    <div>
                        <FaRegClipboard/>
                    </div>
                    <span>Bookings</span>
                </div>

                <div className={`menuItem ${selectedSection === 'customers' ? 'active' : ''}`} onClick={() => handleSectionClick('customers')}>
                    <div>
                        <FaUsers/>
                    </div>
                    <span>Customers</span>
                </div>

                <div className={`menuItem ${selectedSection === 'analytics' ? 'active' : ''}`} onClick={() => handleSectionClick('analytics')}>
                    <div>
                        <FaChartLine/>
                    </div>
                    <span>Analytics</span>
                </div>

                <div className={`menuItem ${selectedSection === 'customer-review' ? 'active' : ''}`} onClick={() => handleSectionClick('customer-review')}>
                    <div>
                        <FaClipboardList/>
                    </div>
                    <span>Customer Review</span>
                </div>

                <div className="Sign-out">
                    <FaSignOutAlt className= "Sign-out-icon" onClick={handleLogout}/>
                </div>
            </div>
        </div>
    )
}

export default AdminSidebar;