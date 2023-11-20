import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import { FaCcMastercard, FaCcVisa, FaCcAmex } from 'react-icons/fa';
import '../../Styles/CheckoutPage/PaymentForm.css'; // Add your CSS file for styling
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

interface PaymentFormProps {
  totalAmountWithTax: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({totalAmountWithTax}) => {
  const stripe = useStripe();
  const elements  = useElements();
  const [nameOnCard, setNameOnCard] = useState<string>('');
  const [nameError, setNameError] = useState<string | null>(null);


  const handlePayNow = async () => {
    if (!stripe || !elements) {
      return;
    }
    
    // Reset previous errors
    setNameError(null);

    try {
        if (!nameOnCard) {
            setNameError("Please enter the name on the card.");
            console.error("please enter the name on the card.")
            return;
        }

    const amountInCents = Math.round(totalAmountWithTax * 100);

      // Call your server to create a PaymentIntent
      const response = await fetch('http://localhost:5001/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountInCents,
          currency: 'usd',
        }),
      });

      const { clientSecret } = await response.json();

      // Confirm the payment on the client side
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: nameOnCard,
          },
        },
      });

      if (error) {
        console.error(error.message);
        alert("Payment failed. Please check your card details and try again.");
      } else {
        console.log(paymentIntent);
        alert("Payment successful! Thank you for your purchase.");
      }
    } catch (error) {
        console.error(error instanceof Error ? error.message : 'An unknown error occurred.');
        alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="payment-form-container">
      <Typography variant="h6" gutterBottom>
        Card Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name on Card"
            variant="outlined"
            value={nameOnCard}
            onChange={(e) => {setNameOnCard(e.target.value); setNameError(null);}}
            error={!!nameError}
            helperText={nameError}
          />
        </Grid>
        <Grid item xs={12}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </Grid>
      </Grid>

      <hr></hr>

      <div className="pay-now-button">
        <Button variant="contained" color="primary" onClick={handlePayNow}>
          Pay Now
        </Button>
      </div>
    </div>
  );
};

export default PaymentForm;
