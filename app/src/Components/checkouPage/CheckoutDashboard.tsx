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
    const { state } = location || {};
    const { vehicleId, userId, adminId, vehicleImage, vehicleName, pickUpDate, returnDate, numberOfDays, rentPerDay } = state || {};
    const [selectedProtectionPlan, setSelectedProtectionPlan] = useState<string>("");
    const [totalAmountWithTax, setTotalAmountWithTax] = useState<number>(0); // New state for total amount


  if (!state) {
    // Handle the case where state is not available
    return <div>Error: No state found</div>;
  }

  const handleProtectionPlanChange = (plan: string) => {
    setSelectedProtectionPlan(plan);

  };

  return (
    <>
    <div className='checkout-page-containter'>
      <Checkout
        vehicleId={vehicleId}
        userId={userId} 
        adminId={adminId}
        onProtectionPlanChange={handleProtectionPlanChange}
        totalAmountWithTax={totalAmountWithTax}
      />
      <SidePanel
        vehicleImage={vehicleImage} 
        vehicleName={vehicleName}
        pickUpDate={pickUpDate}
        returnDate={returnDate}
        numberOfDays={numberOfDays}
        rentPerDay={rentPerDay}
        protectionPlan={selectedProtectionPlan}
        setTotalAmountWithTax={setTotalAmountWithTax}
       />
    </div>

    </>

  );
};

export default CheckoutDashboard;