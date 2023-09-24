import React, {useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
import '../../Styles/LandingPage/LandingPageDashbaord.css'
import HomeSection from './HomeSection';
import RideSection from './RideSection';
import AboutSection from './AboutSection';
import ServiceSection from './ServiceSection';

const LandingPage: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const scrollToSection = (sectionId: string) => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };
  
    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setSelectedTab(newValue);
      switch (newValue) {
        case 0:
          scrollToSection('home');
          break;
        case 1:
          scrollToSection('ride');
          break;
        case 2:
          scrollToSection('services');
          break;
        case 3:
          scrollToSection('about');
          break;
        default:
          break;
      }
  };

  return (
    <div className='landing-page-container'>
            <AppBar position="fixed">
                <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                centered
                indicatorColor='primary'
                textColor='secondary'
                >
                <Tab label="Home" />
                <Tab label="Ride" />
                <Tab label="Services" />
                <Tab label="About" />
                </Tabs>
            </AppBar>
      <main>
        <section className='home-section' id="home">
            <HomeSection/>
        </section>
        <section className='ride-section' id="ride">
            <RideSection/> 
        </section>
        <section className='service-section' id="services">
            <ServiceSection/>
        </section>
        <section className='about-section' id="about">
            <AboutSection/>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
