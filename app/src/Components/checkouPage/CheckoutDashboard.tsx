import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import SidePanel from './SidePanel';
import Checkout from './Checkout';
import '../../Styles/CheckoutPage/CheckoutDashboard.css';


interface LocationState {
    vehicleImage: string;
    vehicleName: string;
    pickUpDate: string;
    returnDate: string;
    numberOfDays: number;
    rentPerDay: number;
  }


const CheckoutDashboard: React.FC = () => {
    const location = useLocation();

//   const { state } = location;
  const { state } = location || {};
  const { vehicleImage, vehicleName, pickUpDate, returnDate, numberOfDays, rentPerDay } = state || {};
  const [selectedProtectionPlan, setSelectedProtectionPlan] = useState<string>("");
  
  if (!state) {
    // Handle the case where state is not available
    return <div>Error: No state found</div>;
  }

  const handleProtectionPlanChange = (plan: string) => {
    setSelectedProtectionPlan(plan);
  };

  return (
    <div className='checkout-page-containter'>
      <Checkout onProtectionPlanChange={handleProtectionPlanChange}/>
      <SidePanel
        vehicleImage={vehicleImage} 
        vehicleName={vehicleName}
        pickUpDate={pickUpDate}
        returnDate={returnDate}
        numberOfDays={numberOfDays}
        rentPerDay={rentPerDay}
        protectionPlan={selectedProtectionPlan} 
       />
    </div>

  );
};

export default CheckoutDashboard;