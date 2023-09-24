import React from "react";
import '../../Styles/LandingPage/ServiceSection.css';

const ServiceSection = () => {
    return (
        <>
            <div className="heading">
                <span>Best Services</span>
                <h1>Explore our Top Deals <br></br> From Top Rated Listings</h1>
            </div>

            <div className="services-container">
                <div className="box">
                    <div className="box-img">
                        <img src="https://pngimg.com/d/mercedes_PNG80175.png" />
                    </div>
                    <h3>2018 Mercedres AMG</h3>
                    <h2>$58500 | $358 <span>/month</span></h2>
                </div>

                <div className="box">
                    <div className="box-img">
                        <img src="https://www.pngmart.com/files/6/Bicycle-PNG-Photos.png"/>
                    </div>
                    <h3>2015 Bicycle SPD Premium</h3>
                    <h2>$500 | $30 <span>/month</span></h2>
                </div>

                <div className="box">
                    <div className="box-img">
                        <img src="https://www.pngmart.com/files/10/Suzuki-Bike-PNG-Transparent-Image.png"/>
                    </div>
                    <h3>2022 SUKI Rapid</h3>
                    <h2>$1200 | $100 <span>/month</span></h2>
                </div>
            </div>
        </>
    );
}

export default ServiceSection;