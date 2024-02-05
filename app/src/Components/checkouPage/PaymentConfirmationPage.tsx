import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Typography, Button } from "@mui/material";

const PaymentConfirmationPage: React.FC = () => {

  const handleContinueShopping = () => {
    // Redirect to the home page or any other desired page
    // history.push("/");
  };

  return (
    <div style={{position: "absolute", top: "40%", left: "0", right: "0", bottom:"0", textAlign: "center", height: "100vh"}}>
   
        <Typography variant="h2" gutterBottom>
            Payment Successful!
        </Typography>
        <FaCheckCircle style={{ fontSize: 100, color: "green" }} />
        <Typography variant="body1" paragraph>
            Thank you for your Payment, your host will contact you soon.
        </Typography>
    </div>
  );
};

export default PaymentConfirmationPage;
