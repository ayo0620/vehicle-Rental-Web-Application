import React, { useState, useEffect} from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar } from '@mui/material';
import { FaRegBell } from 'react-icons/fa';
import '../../Styles/AdminPage/AdminAppBar.css';


interface AdminAppBarProps {
    adminName: string;
    adminProfilePicture: string;
}

const AdminAppBar: React.FC<AdminAppBarProps> = ({ adminName, adminProfilePicture }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Admin Dashboard
                </Typography>
                <IconButton color="inherit">
                    <FaRegBell />
                </IconButton>
                <Avatar alt={adminName} src={adminProfilePicture} />
            </Toolbar>
        </AppBar>
    );
};

export default AdminAppBar;
