import React from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPageDashbaord';
import VehicleListingsDashboard from './Components/VehicleListingsPage/VehicleListingsDashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' Component={LandingPage}/>
        {/* <Route path='/login' Component={Login}/> */}
        <Route path='/vehicleListings' Component={VehicleListingsDashboard}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
