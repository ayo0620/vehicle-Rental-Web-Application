import React, { useState } from "react";
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    Select,
    Typography,
    RadioGroup,
  } from '@mui/material';
import { FaCreditCard, FaCcDiscover } from "react-icons/fa";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import '../../Styles/CheckoutPage/Checkout.css';

interface CheckoutProps {
    onProtectionPlanChange: (plan: string) => void;
    totalAmountWithTax: number;
}

const Checkout: React.FC<CheckoutProps> = ({ onProtectionPlanChange, totalAmountWithTax }) => {
    const PUBLIC_KEY = "pk_test_51OBSk7GevQbRHFh3QRj00qKa6bU5HQ7DrbGLScBRywkZEAKzOY3Xs0SsVPxxh5RKFMUHfmjCxf75Z7hdRqLKtYFz00GcJPBU5W";
    const stripePromise = loadStripe(PUBLIC_KEY);
    const [protectionPlan, setProtectionPlan] = useState<string>('');
  
    const handleProtectionPlanChange = (plan: string) => {
        if (protectionPlan === plan) {
          setProtectionPlan(""); // Deselect if already selected
        } else {
          setProtectionPlan(plan);
          onProtectionPlanChange(plan)
        }
    };

  
    // Payment method implementation goes here
  
    return ( 
      <div className="checkout-container">
        <Typography style={{fontWeight: 'bold', fontSize: '34px'}} variant="h5" gutterBottom>
          Checkout
        </Typography>
        <hr />
  
        {/* Protection Plan Section */}
        <Typography style={{fontWeight: 'bold', fontSize: '22px'}} variant="h6" gutterBottom>
          Add Protection Plan
        </Typography>
        <Typography style={{marginBottom: '10px'}}>
            Choose a plan that works best for you
        </Typography>
  
    
        <div>
        <div
            style={{backgroundColor: '#EAE8E8', marginBottom: '30px', marginRight: '30px'}}
          className={protectionPlan === "standard" ? "selected-box" : "box"}
          onClick={() => handleProtectionPlanChange("standard")}
        >
          <Typography style={{fontWeight:'500'}} variant="h6">Standard</Typography>
          <Typography>* $600 minimum out of pocket for damages or theft</Typography>
        </div>

        <div
            style={{backgroundColor: '#EAE8E8', marginBottom: '30px', marginRight: '30px'}}
          className={protectionPlan === "minimum" ? "selected-box" : "box"}
          onClick={() => handleProtectionPlanChange("minimum")}
        >
          <Typography style={{fontWeight:'500'}} variant="h6">Minimum</Typography>
          <Typography>* $4000 minimum out of pocket for damages or theft</Typography>
        </div>
      </div>
        <hr />
  
        {/* Payment Method Section */}
        <Typography style={{fontWeight: 'bold', fontSize: '22px'}} variant="h6" gutterBottom>
          Payment Method
        </Typography>

        {/* Show Payment Form */}
            <Elements stripe={stripePromise}>
                <PaymentForm totalAmountWithTax={totalAmountWithTax}/>
            </Elements>

      </div>
    );
  };
  

export default Checkout;