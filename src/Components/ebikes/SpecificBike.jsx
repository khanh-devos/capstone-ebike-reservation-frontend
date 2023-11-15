import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useNavigate, useParams, Link,
} from 'react-router-dom';
import rainbow from './rainbow.png';
import { deleteEbike, resetMessage } from '../../redux/ebike/ebikeSlice';

const SpecificBike = () => {
  const [errorMessage, setErrorMessage] = useState(false);
  const {
    ebikes, ebike, isLoading, message,
  } = useSelector((state) => state.ebikeSlice);
  const { user } = useSelector((state) => state.authSlice);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let bike = ebike;
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!ebike) {
    bike = ebikes.find((b) => b.id === parseInt(id, 10));
  }

  const selectedBike = ebikes.find((b) => b.id === parseInt(id, 10));
  const bikeModel = selectedBike ? selectedBike.model : 'Bike not found';
  const bikeImg = selectedBike ? selectedBike.image : 'Bike image not found';
  const bikePrice = selectedBike ? selectedBike.price : 'Bike price not found';

  const handleReserve = () => navigate(`/ebikes/${id}/reservations/new`);

  const handleDeleteEbike = () => {
    dispatch(deleteEbike(bike.id));
  };

  useEffect(() => {
    if (message === 'ebike deleted successfully') {
      navigate('/ebikes');
      dispatch(resetMessage());
    } else {
      setErrorMessage(true);
    }
  }, [message, navigate, dispatch]);

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className="main-specific">
      <div className="container-specific-bike">
        <div className="conatienr-img-specific">
          <img className="img-specific" src={bikeImg} alt="" />
        </div>
        <div className="info-bike">
          <div className="titles-specific-container">
            <h2 className="name-specific-bike">
              {bikeModel}
              {' '}
              {`(${selectedBike?.city})`}
            </h2>
            <p className="deposit-text">-10% deposit any Ebike Purchaset</p>
          </div>
          <div className="payment-c">
            <div className="specification-1">
              <p className="left-text">Finance free</p>
              <p className="right-text">{`£${bikePrice}`}</p>
            </div>
            <div className="specification-2">
              <p className="left-text">Option to purchase fee</p>
              <p className="right-text">+10%</p>
            </div>
            <div className="specification-3">
              <p className="left-text">Total ammount payable</p>
              <p className="right-text">{`£${bikePrice}`}</p>
            </div>
            <div className="specification-4">
              <p className="left-text">Duration</p>
              <p className="right-text">48 Months</p>
            </div>
          </div>
          <div className="APR-contaeiner">
            <p className="APR-percentage">5.9% APR</p>
            <p className="representative-text">Representative</p>
          </div>
          <div className="discover-contaeiner">
            <div className="rainbow-contaienr">
              <img src={rainbow} className="rainbow-img" alt="rainbow" />
            </div>
            <>
              <p className="more-models">DISCOVER MORE MODELS</p>
              <p className="arrow-more-models">
                {' '}
                {'>'}
                {' '}
              </p>
            </>
          </div>
          <div className="flex_horizontal">
            <button className="btn btn-reserve" onClick={handleReserve} type="button">Reserve &gt;</button>
            {user && bike && user.id === bike.seller_id && (
              <button className="btn btn-delete" type="button" onClick={handleDeleteEbike}>
                Delete
              </button>
            )}
          </div>
          {errorMessage ? <div className="flex_horizontal error_message">{message}</div> : ''}
        </div>
      </div>
      <button type="button" className="back-button">
        <Link to="/ebikes">
          {' '}
          {'<'}
          {' '}
        </Link>
      </button>
    </div>
  );
};

export default SpecificBike;
