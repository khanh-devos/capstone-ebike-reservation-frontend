import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../index.css';
import { fetchEbike } from '../../redux/ebike/ebikeSlice';
import BikeCarousel from './BikeCarousel';

const Mainpage = () => {
  const dispatch = useDispatch();
  const { ebikes: bikes } = useSelector((state) => state.ebikeSlice);

  useEffect(() => {
    dispatch(fetchEbike());
  }, [dispatch]);

  return (
    <div className="main-conteiner-mainpage">
      <div className="mainpage">
        <div className="container-titles">
          <h1 className="title-main-page">LATEST MODELS</h1>
          <h4 className="subtitle-main-page">Please select a Vespa Model</h4>
        </div>
        <BikeCarousel bikes={bikes} />
      </div>
    </div>
  );
}

export default Mainpage;
