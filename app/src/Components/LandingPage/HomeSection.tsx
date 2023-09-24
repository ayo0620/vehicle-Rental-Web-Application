import React from "react"
import { Button } from "@mui/material"
import '../../Styles/LandingPage/HomeSection.css'

const HomeSection: React.FC = () => {
    return (
        <>
        <div className="text">
            <h1><span>Looking</span> to <br></br>rent a vehicle</h1>
            <p>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor <br></br> incididunt ut labore et dolore magna aliqua. 
               Tortor posuere ac ut consequat semper viverra nam.
            </p>
        </div>

        <div className="image">
            <img src ='https://pngimg.com/uploads/jeep/jeep_PNG96.png' width={900}/>
        </div>

        <div className="form-container">
            <div className="input-box">
                <span>Location</span>
                <input type="search" name="" id="" placeholder="Search Places"></input>
            </div>
            <div className="input-box">
                <span>Pick-up Date</span>
                <input type="date" name="" id=""></input>
            </div>
            <div className="input-box">
                <span>Return Date</span>
                <input type="date" name="" id=""></input>
            </div>
            <Button variant="contained" className="submit-btn" color="primary" type="submit">
                submit
            </Button>
        </div>
        </>
    )
}

export default HomeSection;