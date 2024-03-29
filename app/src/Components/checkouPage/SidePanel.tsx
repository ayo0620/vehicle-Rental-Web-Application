import { Button } from "@mui/material";
import '../../Styles/CheckoutPage/SidePanel.css';
import React from "react";

interface CheckoutSidePanelProps{
    vehicleImage: string;
    vehicleName: string;
    pickUpDate: string;
    returnDate: string;
    numberOfDays: number;
    rentPerDay: number;
    protectionPlan: string;
    setTotalAmountWithTax: React.Dispatch<React.SetStateAction<number>>; 

}

const SidePanel: React.FC<CheckoutSidePanelProps> = ({vehicleImage, vehicleName, pickUpDate, returnDate, numberOfDays, rentPerDay, protectionPlan, setTotalAmountWithTax}) => {

    const totalAmount = rentPerDay * numberOfDays;
    const taxRate = 0.0925;
    const taxAmount = totalAmount * taxRate;
    const protectionPlanAmount = protectionPlan === "standard" ? 40 : 20;
    const protectionPlanTotalAmount = protectionPlanAmount * numberOfDays;
    const totalAmountWithTax = totalAmount + taxAmount + protectionPlanTotalAmount;

    React.useEffect(() => {
        setTotalAmountWithTax(totalAmountWithTax);
      }, [setTotalAmountWithTax, totalAmountWithTax]);

    return(
        <div className="sidepanel-container">
            <div className="sidepanel-image">
                <img src={`http://localhost:3000/${vehicleImage}`} width={250} height={150}/>
            </div>
            <h3>{vehicleName}</h3>
            <p style={{marginBottom: '15px'}}>
                {`${new Date(pickUpDate).toDateString()}`} {`->`} {` ${new Date(returnDate).toDateString()}`}
            </p>
            <div className="columns">
                <div className="column">
                    <p>{rentPerDay} X {numberOfDays} days</p>
                    <p>Protection Plan</p>
                    <p>Taxes</p>
                    <strong>Total</strong>
                </div>
                <div className="column">
                    <p>${totalAmount.toFixed(2)}</p>
                    <p>${protectionPlanTotalAmount.toFixed(2)}</p>
                    <p>${taxAmount.toFixed(2)}</p>
                    <strong>${totalAmountWithTax.toFixed(2)}</strong>
                </div>
            </div>

            {/* <div className="book-trip-btn">
                <Button variant="contained" color="primary">Book Trip</Button>
            </div> */}
            
        </div>
    )
}   

export default SidePanel;