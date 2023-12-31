import React from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPageDashbaord';
import VehicleListingsDashboard from './Components/VehicleListingsPage/VehicleListingsDashboard';
import VehicleDetailsDashbaord from './Components/VehicleDetailsPage/VehicleDetailsDashboard';
import CheckoutDashboard from './Components/checkouPage/CheckoutDashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' Component={LandingPage}/>
        {/* <Route path='/login' Component={Login}/> */}
        <Route path='/vehicleListings' Component={VehicleListingsDashboard}/>
        <Route path='/vehicleListings/vehicle/:id' Component={VehicleDetailsDashbaord}/>
        <Route path='/vehicleListings/vehicle/checkout/:id' Component={CheckoutDashboard}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
