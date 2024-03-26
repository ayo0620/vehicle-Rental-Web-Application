import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Grid,
  CircularProgress
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import '../../Styles/CheckoutPage/PaymentForm.css'; // Add your CSS file for styling
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

interface PaymentFormProps {
  vehicleId: string;
  userId: string;
  adminId: string;
  totalAmountWithTax: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({vehicleId, userId, adminId, totalAmountWithTax}) => {
  const stripe = useStripe();
  const elements  = useElements();
  const [nameOnCard, setNameOnCard] = useState<string>('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handlePayNow = async () => {
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }
    
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setLoading(false);
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

    
      const paymentResponse = await fetch('http://localhost:5001/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountInCents,
          currency: 'usd',
        }),
      });

      const { clientSecret } = await paymentResponse.json();
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: nameOnCard,
            },
          },
        });

        if (paymentResult.error) {
          alert("Payment failed: " + paymentResult.error.message);
        } else {
          if (paymentResult.paymentIntent.status === 'succeeded') {
       
            const bookingResponse = await fetch('http://localhost:5001/bookings', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
              body: JSON.stringify({
                vehicleId: vehicleId,
                userId: userId, 
                totalAmount: totalAmountWithTax,
                status: 'Pending', 
                createdBy: adminId,
              }),
            });
            
            if (bookingResponse.ok) {
              const bookingData = await bookingResponse.json();
              console.log('Booking created', bookingData);
              navigate("/confirmationPage");
            } else {
              const errorData = await bookingResponse.json();
              console.error('Booking creation failed:', errorData.message);
              alert(`Booking creation failed: ${errorData.message}`);
            }
          }
        }
    } catch (error) {
        console.error(error instanceof Error ? error.message : 'An unknown error occurred.');
        alert("An error occurred. Please try again later.");
    } finally {
        setLoading(false);
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
        <Button
          variant="contained"
          color="primary"
          onClick={handlePayNow}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Pay Now"}
        </Button>
      </div>
    </div>
  );
};

export default PaymentForm;
