import React, { useEffect, useState } from "react";
import { Vehicle } from "../../types/Vehicle";
import { useParams, Link} from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { FaGasPump } from "react-icons/fa";
import '../../Styles/VehicleDetailsPage/VehicleDetailsDashboard.css';
import { Button } from "@mui/material";


interface VehicleDetailProps {
    vehicle: Vehicle
}

interface LocationState {
    vehicleImage: string;
    vehicleName: string;
    pickUpDate: string;
    returnDate: string;
    numberOfDays: number;
    renterPerDay: number;
  }

const VehicleDetailsDashbaord: React.FC= () => {
    const { id } = useParams<{ id: string }>();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [pickUpDate, setPickUpDate] = useState<string>('');
    const [returnDate, setReturnDate] = useState<string>('');
    const [pickUpTime, setPickUpTime] = useState<string>('');
    const [returnTime, setReturnTime] = useState<string>('');
    const [totalCharge, setTotalCharge] = useState<number | null>(null);
    const [timeDiffInDays, setTimeDiffInDays] = useState<number>(0); // Declare here

    useEffect(() => {
        const fetchVehicleDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5001/vehicles/${id}`);
                const data = await response.json();
                setVehicle(data)
            } catch(error) {
                console.error('Error fetching vehicle details:', error);
            }
        };
        fetchVehicleDetails();
    }, [id]);

    if(!vehicle) {
        return <div>Loading...</div>
    }

    const calculateTotalCharge = () => {
        const ratePerHour = vehicle?.rentPerHour || 0;

        const pickUpDateTime = new Date(`${pickUpDate}T${pickUpTime}`) as any;
        const returnDateTime = new Date(`${returnDate}T${returnTime}`) as any;

        const timeDiffInHours = (returnDateTime - pickUpDateTime) / (1000 * 60 * 60* 24);
        const timeDiffInMilliseconds = returnDateTime.getTime() - pickUpDateTime.getTime();
        const timeDiffInDays = timeDiffInMilliseconds / (1000 * 60 * 60 * 24);

        setTimeDiffInDays(timeDiffInHours); 

        // Calculate total charge
        const totalCharge = ratePerHour * timeDiffInHours;
        setTotalCharge(totalCharge);
    };





    return (
        <>
            <img className="vehicle-image" src={vehicle.image}/>
            <div className="vehicle-details-container">
                <div className="vehicle-info">
                    <div className="vehicle-name">
                        <h2>{`${vehicle.make} ${vehicle.model} ${vehicle.year}`}</h2>
                        <p>4.8 ({vehicle.reviews?.length} reviews)</p>
                    </div>
                    
                    <div className="car-specifications-section">
                        <h2>Specifications</h2>
                        <div className="specification-list" style={{display: 'flex'}}>
                            <FaUsers className="icon"/> <p>{vehicle.capacity} persons</p>
                            <FaGasPump className="icon"/> <p>{vehicle.fuelType}</p>
                        </div>
                    </div>

                    <div className="description-section">
                        <h2>Description</h2>
                        <p>{vehicle.description}</p>
                    </div>
                </div>

                <div className="pick-up-return-section">
                    <div className="rent-rate">
                        <p>${vehicle.rentPerHour}/ day</p>
                    </div>
                    <div className="pick-up-return-body">
                        <label>Pick-up Date:</label>
                        <input
                            type="date"
                            value={pickUpDate}
                            onChange={(e) => setPickUpDate(e.target.value)}
                        /> 
                          <br></br>

                        <label>Pick-up Time:</label>
                        <input
                            type="time"
                            value={pickUpTime}
                            onChange={(e) => setPickUpTime(e.target.value)}
                        />
                          <br></br>

                        <label>Return Date:</label>
                        <input
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                        />
                          <br></br>
                        <label>Return Time:</label>
                        <input
                            type="time"
                            value={returnTime}
                            onChange={(e) => setReturnTime(e.target.value)}
                        />
                          <br></br>
                        <div className="calculate-btn">
                            <Button variant="outlined" onClick={calculateTotalCharge}>Calculate Total</Button>
                            {totalCharge !== null && (
                            <div className="total-charge">
                                <p>Total: ${totalCharge.toFixed(2)}</p>
                            </div>
                        )}
                        </div>
                            <br></br>
                        <div className="checkout-btn">
                        <Link 
                            to={`/vehicleListings/vehicle/checkout/${id}`}
                            state={{
                                vehicleImage: vehicle.image,
                                vehicleName: `${vehicle.make} ${vehicle.model} ${vehicle.year}`,
                                pickUpDate,
                                returnDate,
                                numberOfDays: totalCharge !== null ? Math.ceil(timeDiffInDays) : 0,
                                rentPerDay: vehicle.rentPerHour,
                            }}
                            >
                            <Button variant="contained" color="primary">Proceed to Checkout</Button>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VehicleDetailsDashbaord;