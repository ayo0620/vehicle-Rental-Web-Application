require('dotenv').config()

const PORT = process.env.PORT || 5001;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());

const vehiclesRouter = require('./routes/Vehicles')
const usersRouter = require('./routes/Users')
app.use('/vehicles', vehiclesRouter);
app.use('/users', usersRouter);

app.post('/create-payment-intent', async (req, res) => {
    try {
      const { amount, currency } = req.body;
  
      // Create a PaymentIntent with the specified amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
      });
  
      // Return the client secret to complete the payment on the client side
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

app.listen(PORT, () => console.log(`Server Started at port ${PORT}`))