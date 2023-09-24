import React from "react";
import { FaMapMarker } from 'react-icons/fa';
import { FaCalendar } from 'react-icons/fa';
import { FaCar } from 'react-icons/fa';
import '../../Styles/LandingPage/RideSection.css'


const RideSection: React.FC = () => {
    return (
        <>
            <div className="heading">
                <span>How it works</span>
                <h1>Rent with 3 easy steps</h1>
            </div>

            <div className="ride-container">
                <div className="box">
                    <FaMapMarker className="icon"/>
                    <h2>Choose a Location</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua. Quis lectus nulla at volutpat diam. Hac habitasse platea dictumst 
                        quisque sagittis.Arcu felis bibendum ut tristique et egestas quis. A diam maecenas sed enim ut sem viverra. 
                        At urna condimentum mattis pellentesque id. Dictum fusce ut placerat orci nulla pellentesque dignissim. 
                        Diam sollicitudin tempor id eu nisl nunc mi. Quam adipiscing vitae proin sagittis nisl rhoncus mattis 
                        rhoncus. Lectus proin nibh nisl condimentum id.</p>
                </div>
                <div className="box">
                    <FaCalendar className="icon"/>
                    <h2>Pick-up Date</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua. Quis lectus nulla at volutpat diam. Hac habitasse platea dictumst 
                        quisque sagittis.Arcu felis bibendum ut tristique et egestas quis. A diam maecenas sed enim ut sem viverra. 
                        At urna condimentum mattis pellentesque id. Dictum fusce ut placerat orci nulla pellentesque dignissim. 
                        Diam sollicitudin tempor id eu nisl nunc mi. Quam adipiscing vitae proin sagittis nisl rhoncus mattis 
                        rhoncus. Lectus proin nibh nisl condimentum id.</p>
                </div>
                <div className="box">
                    <FaCar className="icon"/>
                    <h2>Book a car</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua. Quis lectus nulla at volutpat diam. Hac habitasse platea dictumst 
                        quisque sagittis.Arcu felis bibendum ut tristique et egestas quis. A diam maecenas sed enim ut sem viverra. 
                        At urna condimentum mattis pellentesque id. Dictum fusce ut placerat orci nulla pellentesque dignissim. 
                        Diam sollicitudin tempor id eu nisl nunc mi. Quam adipiscing vitae proin sagittis nisl rhoncus mattis 
                        rhoncus. Lectus proin nibh nisl condimentum id.</p>
                </div>
            </div>
        </>
        
    )
}

export default RideSection;