import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const PaymentConfirmationPage: React.FC = () => {

  return (
    <div style={{position: "absolute", top: "40%", left: "0", right: "0", bottom:"0", textAlign: "center", height: "100vh"}}>
   
        <Typography variant="h2" gutterBottom>
            Payment Successful!
        </Typography>
        <FaCheckCircle style={{ fontSize: 100, color: "green" }} />
        <Typography variant="body1" paragraph>
            Thank you for your Payment, your host will contact you soon.
        </Typography>
        <Button variant="contained" color="primary">
            <Link to="/vehicleListings" style={{ textDecoration: 'none', color: 'white' }}>
                Go Back Home
            </Link>
        </Button>
    </div>
  );
};

export default PaymentConfirmationPage;
