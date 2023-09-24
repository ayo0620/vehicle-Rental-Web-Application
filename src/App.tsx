import React from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPageDashbaord';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' Component={LandingPage}/>
        {/* <Route path='/login' Component={Login}/> */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
