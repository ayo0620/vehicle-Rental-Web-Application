import React from "react";
import '../../Styles/LandingPage/AboutSection.css';

const AboutSection: React.FC = () => {
    return (
        <>
            <div className="heading">
                <span>About us</span>
                <h1>Best Customer Experience</h1>
            </div>
            <div className="about-container">
                <div className="about-img">
                    <img src ='https://pngimg.com/uploads/jeep/jeep_PNG96.png' width={900}/>
                </div>
                <div className="about-text">
                    <span>About us</span>
                    <p> 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua. Tortor posuere ac ut consequat semper viverra nam. 
                        Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
                        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. 
                        Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. Aliquam ut porttitor leo a diam. 
                        Vulputate eu scelerisque felis imperdiet proin fermentum leo vel. Mauris pharetra et ultrices neque ornare 
                        aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
                    </p>
                </div>
            </div>
        </>
    )
}

export default AboutSection;