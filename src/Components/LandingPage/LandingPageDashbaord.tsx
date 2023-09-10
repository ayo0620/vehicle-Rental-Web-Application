import React, {useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
import '../../Styles/LandingPage/LandingPageDashbaord.css'
import HomeSection from './HomeSection';

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
        case 4:
            scrollToSection('review');
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
                <Tab label="Review"/>
                </Tabs>
            </AppBar>
      <main>
        <section className='home-section' id="home">
            <HomeSection/>
        </section>
        <section id="ride">
        <h1>#Ride Section</h1>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. T
        ortor posuere ac ut consequat semper viverra nam. Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. 
        Aliquam ut porttitor leo a diam. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.
        Mauris pharetra et ultrices neque ornare aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
        Sit amet purus gravida quis. Adipiscing commodo elit at imperdiet. Hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus arcu. Nullam vehicula ipsum a arcu. 
        Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Risus sed vulputate odio ut enim blandit volutpat. Bibendum arcu vitae elementum curabitur vitae. 
        Nascetur ridiculus mus mauris vitae ultricies leo integer. Mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum eu.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. T
        ortor posuere ac ut consequat semper viverra nam. Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. 
        Aliquam ut porttitor leo a diam. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.
        Mauris pharetra et ultrices neque ornare aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
        Sit amet purus gravida quis. Adipiscing commodo elit at imperdiet. Hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus arcu. Nullam vehicula ipsum a arcu. 
        Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Risus sed vulputate odio ut enim blandit volutpat. Bibendum arcu vitae elementum curabitur vitae. 
        Nascetur ridiculus mus mauris vitae ultricies leo integer. Mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum eu.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. T
        ortor posuere ac ut consequat semper viverra nam. Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. 
        Aliquam ut porttitor leo a diam. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.
        Mauris pharetra et ultrices neque ornare aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
        Sit amet purus gravida quis. Adipiscing commodo elit at imperdiet. Hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus arcu. Nullam vehicula ipsum a arcu. 
        Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Risus sed vulputate odio ut enim blandit volutpat. Bibendum arcu vitae elementum curabitur vitae. 
        Nascetur ridiculus mus mauris vitae ultricies leo integer. Mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum eu.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. T
        ortor posuere ac ut consequat semper viverra nam. Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. 
        Aliquam ut porttitor leo a diam. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.
        Mauris pharetra et ultrices neque ornare aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
        Sit amet purus gravida quis. Adipiscing commodo elit at imperdiet. Hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus arcu. Nullam vehicula ipsum a arcu. 
        Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Risus sed vulputate odio ut enim blandit volutpat. Bibendum arcu vitae elementum curabitur vitae. 
        Nascetur ridiculus mus mauris vitae ultricies leo integer. Mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum eu.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. T
        ortor posuere ac ut consequat semper viverra nam. Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. 
        Aliquam ut porttitor leo a diam. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.
        Mauris pharetra et ultrices neque ornare aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
        Sit amet purus gravida quis. Adipiscing commodo elit at imperdiet. Hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus arcu. Nullam vehicula ipsum a arcu. 
        Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Risus sed vulputate odio ut enim blandit volutpat. Bibendum arcu vitae elementum curabitur vitae. 
        Nascetur ridiculus mus mauris vitae ultricies leo integer. Mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum eu.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. T
        ortor posuere ac ut consequat semper viverra nam. Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. 
        Aliquam ut porttitor leo a diam. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.
        Mauris pharetra et ultrices neque ornare aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
        Sit amet purus gravida quis. Adipiscing commodo elit at imperdiet. Hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus arcu. Nullam vehicula ipsum a arcu. 
        Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Risus sed vulputate odio ut enim blandit volutpat. Bibendum arcu vitae elementum curabitur vitae. 
        Nascetur ridiculus mus mauris vitae ultricies leo integer. Mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum eu.
        </section>
        <section id="services">
        <h1>#Services Section</h1>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. T
        ortor posuere ac ut consequat semper viverra nam. Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. 
        Aliquam ut porttitor leo a diam. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.
        Mauris pharetra et ultrices neque ornare aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
        Sit amet purus gravida quis. Adipiscing commodo elit at imperdiet. Hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus arcu. Nullam vehicula ipsum a arcu. 
        Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Risus sed vulputate odio ut enim blandit volutpat. Bibendum arcu vitae elementum curabitur vitae. 
        Nascetur ridiculus mus mauris vitae ultricies leo integer. Mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum eu.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. T
        ortor posuere ac ut consequat semper viverra nam. Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. 
        Aliquam ut porttitor leo a diam. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.
        Mauris pharetra et ultrices neque ornare aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
        Sit amet purus gravida quis. Adipiscing commodo elit at imperdiet. Hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus arcu. Nullam vehicula ipsum a arcu. 
        Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Risus sed vulputate odio ut enim blandit volutpat. Bibendum arcu vitae elementum curabitur vitae. 
        Nascetur ridiculus mus mauris vitae ultricies leo integer. Mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum eu.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. T
        ortor posuere ac ut consequat semper viverra nam. Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. 
        Aliquam ut porttitor leo a diam. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.
        Mauris pharetra et ultrices neque ornare aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
        Sit amet purus gravida quis. Adipiscing commodo elit at imperdiet. Hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus arcu. Nullam vehicula ipsum a arcu. 
        Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Risus sed vulputate odio ut enim blandit volutpat. Bibendum arcu vitae elementum curabitur vitae. 
        Nascetur ridiculus mus mauris vitae ultricies leo integer. Mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum eu.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. T
        ortor posuere ac ut consequat semper viverra nam. Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. 
        Aliquam ut porttitor leo a diam. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.
        Mauris pharetra et ultrices neque ornare aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
        Sit amet purus gravida quis. Adipiscing commodo elit at imperdiet. Hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus arcu. Nullam vehicula ipsum a arcu. 
        Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Risus sed vulputate odio ut enim blandit volutpat. Bibendum arcu vitae elementum curabitur vitae. 
        Nascetur ridiculus mus mauris vitae ultricies leo integer. Mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum eu.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. T
        ortor posuere ac ut consequat semper viverra nam. Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. 
        Aliquam ut porttitor leo a diam. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.
        Mauris pharetra et ultrices neque ornare aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
        Sit amet purus gravida quis. Adipiscing commodo elit at imperdiet. Hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus arcu. Nullam vehicula ipsum a arcu. 
        Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Risus sed vulputate odio ut enim blandit volutpat. Bibendum arcu vitae elementum curabitur vitae. 
        Nascetur ridiculus mus mauris vitae ultricies leo integer. Mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum eu.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. T
        ortor posuere ac ut consequat semper viverra nam. Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. 
        Aliquam ut porttitor leo a diam. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.
        Mauris pharetra et ultrices neque ornare aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
        Sit amet purus gravida quis. Adipiscing commodo elit at imperdiet. Hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus arcu. Nullam vehicula ipsum a arcu. 
        Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Risus sed vulputate odio ut enim blandit volutpat. Bibendum arcu vitae elementum curabitur vitae. 
        Nascetur ridiculus mus mauris vitae ultricies leo integer. Mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum eu.
        </section>
        <section id="about">
        <h1>#About Section</h1>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. T
        ortor posuere ac ut consequat semper viverra nam. Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. 
        Aliquam ut porttitor leo a diam. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.
        Mauris pharetra et ultrices neque ornare aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
        Sit amet purus gravida quis. Adipiscing commodo elit at imperdiet. Hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus arcu. Nullam vehicula ipsum a arcu. 
        Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Risus sed vulputate odio ut enim blandit volutpat. Bibendum arcu vitae elementum curabitur vitae. 
        Nascetur ridiculus mus mauris vitae ultricies leo integer. Mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum eu.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. T
        ortor posuere ac ut consequat semper viverra nam. Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. 
        Aliquam ut porttitor leo a diam. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.
        Mauris pharetra et ultrices neque ornare aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
        Sit amet purus gravida quis. Adipiscing commodo elit at imperdiet. Hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus arcu. Nullam vehicula ipsum a arcu. 
        Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Risus sed vulputate odio ut enim blandit volutpat. Bibendum arcu vitae elementum curabitur vitae. 
        Nascetur ridiculus mus mauris vitae ultricies leo integer. Mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum eu.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. T
        ortor posuere ac ut consequat semper viverra nam. Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. 
        Aliquam ut porttitor leo a diam. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.
        Mauris pharetra et ultrices neque ornare aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
        Sit amet purus gravida quis. Adipiscing commodo elit at imperdiet. Hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus arcu. Nullam vehicula ipsum a arcu. 
        Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Risus sed vulputate odio ut enim blandit volutpat. Bibendum arcu vitae elementum curabitur vitae. 
        Nascetur ridiculus mus mauris vitae ultricies leo integer. Mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum eu.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. T
        ortor posuere ac ut consequat semper viverra nam. Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. 
        Aliquam ut porttitor leo a diam. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.
        Mauris pharetra et ultrices neque ornare aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
        Sit amet purus gravida quis. Adipiscing commodo elit at imperdiet. Hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus arcu. Nullam vehicula ipsum a arcu. 
        Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Risus sed vulputate odio ut enim blandit volutpat. Bibendum arcu vitae elementum curabitur vitae. 
        Nascetur ridiculus mus mauris vitae ultricies leo integer. Mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum eu.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. T
        ortor posuere ac ut consequat semper viverra nam. Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. 
        Aliquam ut porttitor leo a diam. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.
        Mauris pharetra et ultrices neque ornare aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
        Sit amet purus gravida quis. Adipiscing commodo elit at imperdiet. Hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus arcu. Nullam vehicula ipsum a arcu. 
        Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Risus sed vulputate odio ut enim blandit volutpat. Bibendum arcu vitae elementum curabitur vitae. 
        Nascetur ridiculus mus mauris vitae ultricies leo integer. Mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum eu.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. T
        ortor posuere ac ut consequat semper viverra nam. Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. 
        Aliquam ut porttitor leo a diam. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.
        Mauris pharetra et ultrices neque ornare aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
        Sit amet purus gravida quis. Adipiscing commodo elit at imperdiet. Hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus arcu. Nullam vehicula ipsum a arcu. 
        Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Risus sed vulputate odio ut enim blandit volutpat. Bibendum arcu vitae elementum curabitur vitae. 
        Nascetur ridiculus mus mauris vitae ultricies leo integer. Mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum eu.
        </section>
        <section id="review">
        <h1>#Review Section</h1>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. T
        ortor posuere ac ut consequat semper viverra nam. Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. 
        Aliquam ut porttitor leo a diam. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.
        Mauris pharetra et ultrices neque ornare aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
        Sit amet purus gravida quis. Adipiscing commodo elit at imperdiet. Hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus arcu. Nullam vehicula ipsum a arcu. 
        Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Risus sed vulputate odio ut enim blandit volutpat. Bibendum arcu vitae elementum curabitur vitae. 
        Nascetur ridiculus mus mauris vitae ultricies leo integer. Mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum eu.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. T
        ortor posuere ac ut consequat semper viverra nam. Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. 
        Aliquam ut porttitor leo a diam. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.
        Mauris pharetra et ultrices neque ornare aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
        Sit amet purus gravida quis. Adipiscing commodo elit at imperdiet. Hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus arcu. Nullam vehicula ipsum a arcu. 
        Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Risus sed vulputate odio ut enim blandit volutpat. Bibendum arcu vitae elementum curabitur vitae. 
        Nascetur ridiculus mus mauris vitae ultricies leo integer. Mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum eu.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. T
        ortor posuere ac ut consequat semper viverra nam. Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. 
        Aliquam ut porttitor leo a diam. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.
        Mauris pharetra et ultrices neque ornare aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
        Sit amet purus gravida quis. Adipiscing commodo elit at imperdiet. Hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus arcu. Nullam vehicula ipsum a arcu. 
        Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Risus sed vulputate odio ut enim blandit volutpat. Bibendum arcu vitae elementum curabitur vitae. 
        Nascetur ridiculus mus mauris vitae ultricies leo integer. Mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum eu.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. T
        ortor posuere ac ut consequat semper viverra nam. Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. 
        Aliquam ut porttitor leo a diam. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.
        Mauris pharetra et ultrices neque ornare aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
        Sit amet purus gravida quis. Adipiscing commodo elit at imperdiet. Hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus arcu. Nullam vehicula ipsum a arcu. 
        Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Risus sed vulputate odio ut enim blandit volutpat. Bibendum arcu vitae elementum curabitur vitae. 
        Nascetur ridiculus mus mauris vitae ultricies leo integer. Mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum eu.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. T
        ortor posuere ac ut consequat semper viverra nam. Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. 
        Aliquam ut porttitor leo a diam. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.
        Mauris pharetra et ultrices neque ornare aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
        Sit amet purus gravida quis. Adipiscing commodo elit at imperdiet. Hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus arcu. Nullam vehicula ipsum a arcu. 
        Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Risus sed vulputate odio ut enim blandit volutpat. Bibendum arcu vitae elementum curabitur vitae. 
        Nascetur ridiculus mus mauris vitae ultricies leo integer. Mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum eu.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. T
        ortor posuere ac ut consequat semper viverra nam. Quisque id diam vel quam elementum pulvinar etiam non quam. Dapibus ultrices in iaculis nunc sed augue. 
        In nisl nisi scelerisque eu ultrices vitae auctor eu. Ultrices mi tempus imperdiet nulla. Leo duis ut diam quam. Orci sagittis eu volutpat odio facilisis mauris. 
        Aliquam ut porttitor leo a diam. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel.
        Mauris pharetra et ultrices neque ornare aenean euismod. Consequat semper viverra nam libero justo laoreet sit. 
        Sit amet purus gravida quis. Adipiscing commodo elit at imperdiet. Hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus arcu. Nullam vehicula ipsum a arcu. 
        Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Risus sed vulputate odio ut enim blandit volutpat. Bibendum arcu vitae elementum curabitur vitae. 
        Nascetur ridiculus mus mauris vitae ultricies leo integer. Mi ipsum faucibus vitae aliquet nec. Condimentum mattis pellentesque id nibh tortor. Posuere morbi leo urna molestie at elementum eu.
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
