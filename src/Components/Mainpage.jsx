import React from 'react';
import '../index.css';
import NavigationPanel from './NavigationPanel';
import BikeCarousel from './BikeCarousel';

const Mainpage = () => (
  <div className="main-conteiner-mainpage">
    <div className="mainpage">
      <div className="container-titles">
        <h1 className="title-main-page">LATEST MODELS</h1>
        <h4 className="subtitle-main-page">Please select a Vespa Model</h4>
      </div>
      <div className="carousel-container">
        <BikeCarousel />
      </div>
    </div>
    <NavigationPanel />
  </div>
);

export default Mainpage;
