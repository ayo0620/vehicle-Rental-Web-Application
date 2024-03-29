import React from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPageDashbaord';
import VehicleListingsDashboard from './Components/VehicleListingsPage/VehicleListingsDashboard';
import VehicleDetailsDashbaord from './Components/VehicleDetailsPage/VehicleDetailsDashboard';
import CheckoutDashboard from './Components/checkouPage/CheckoutDashboard';
import PaymentConfirmationPage from './Components/checkouPage/PaymentConfirmationPage';
import LoginPageDashboard from './Components/LoginPage/LoginPageDashboard';
import SignupPageDashboard from './Components/LoginPage/SignUpPageDashboard';
import AdminSignupPage from './Components/LoginPage/AdminSignupPage';
import AdminDashboard from './Components/AdminPage/AdminDashboard';
import AddListingsForm from './Components/AdminPage/AddListingsForm/AddListingsForm';
import VehicleListingDetails from './Components/AdminPage/VehicleListingDetails/VehicleListingDetails';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPageDashboard onLogin={() => {}} />} />
        <Route path='/signup' element={<SignupPageDashboard onSignup={() => {}} />} />
        <Route path="/adminSignup" element={<AdminSignupPage onAdminSignup={() => {}} />} />
        <Route path='/LandingPage' Component={LandingPage}/>
        <Route path='/vehicleListings' element={<VehicleListingsDashboard/>}/>
        <Route path='/vehicleListings/vehicle/:id' Component={VehicleDetailsDashbaord}/>
        <Route path='/vehicleListings/vehicle/checkout/:id' Component={CheckoutDashboard}/>
        <Route path='/confirmationPage' Component={PaymentConfirmationPage}/>
        <Route path='/adminDashboard' Component={AdminDashboard}/>
        <Route path="/add-listings" element={<AddListingsForm/>} />
        <Route path="/add-listings/:id" element={<AddListingsForm/>} />
        <Route path="/vehicle-listing-details/:id" element={<VehicleListingDetails/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
