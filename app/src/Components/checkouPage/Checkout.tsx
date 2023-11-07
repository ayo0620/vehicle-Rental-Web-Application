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
import '../../Styles/CheckoutPage/Checkout.css';

interface CheckoutProps {
    onProtectionPlanChange: (plan: string) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onProtectionPlanChange }) => {

    const [protectionPlan, setProtectionPlan] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    // const [selectedProtectionPlan, setSelectedProtectionPlan] = useState<string>("");

  
    const handleProtectionPlanChange = (plan: string) => {
        if (protectionPlan === plan) {
          setProtectionPlan(""); // Deselect if already selected
        } else {
          setProtectionPlan(plan);
          onProtectionPlanChange(plan)
        }
    };
  
    const handlePaymentMethodChange = (
      event: React.ChangeEvent<{ value: unknown }>
    ) => {
      setPaymentMethod(event.target.value as string);
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
        <Typography variant="h6" gutterBottom>
          Payment Method
        </Typography>
  
        <RadioGroup
            aria-label="payment-method"
            name="payment-method"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
        >
        <div>

        <FormControlLabel
          value="creditCard"
          control={<Radio />}
          label="Debit or Credit Card"
        />
        
        <FaCreditCard style={{marginLeft:'40px'}} size={25}/>
        <FaCcDiscover  style={{marginLeft:'40px'}} size={25}/>
        </div>
        <FormControlLabel value="paypal" control={<Radio />} label="PayPal"/>
      </RadioGroup>
  
        {/* Payment method implementation */}
      </div>
    );
  };
  

export default Checkout;