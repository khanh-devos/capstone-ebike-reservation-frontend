// import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// import { fetchReservation } from '../../redux/reservation/reservationSlice';

const mockBikes = [
  {
    id: 1,
    name: 'EcoRider 500',
    description:
      'An elegant and efficient electric bicycle for your daily commute.',
    image: 'https://media.bcompras.com.mx/iFSz4S0PZCusaaKK1RvtSbd2.webp',
  },
  {
    id: 2,
    name: 'VoltXpress ZR2',
    description:
      'The perfect companion to explore the city with speed and comfort.',
    image:
      'https://http2.mlstatic.com/D_NQ_NP_2X_904305-MLA48736887155_012022-F.webp',
  },
  {
    id: 3,
    name: 'UrbanGlide Pro',
    description:
      'A versatile and modern electric bicycle that adapts to your lifestyle.',
    image: 'https://media.bcompras.com.mx/tVmMvJPOxrykcPSk2roMyqOx.webp',
  },
  {
    id: 4,
    name: 'EcoMotion X3',
    description:
      'Experimenta la libertad de moverte de manera sostenible con esta e-bike.',
    image: 'https://media.bcompras.com.mx/RUFTQuCiAjO0SVYA4SF4W3Po.webp',
  },
  {
    id: 5,
    name: 'SpeedRider S1',
    description:
      'Experience the freedom of moving sustainably with this e-bike.',
    image: 'https://media.bcompras.com.mx/F0OGrsgu8eZV3kw2MLbpJnSJ.webp',
  },
  {
    id: 6,
    name: 'CityCommuter E7',
    description:
      'Ride around town in style and efficiency on this modern e-bike.',
    image: 'https://media.bcompras.com.mx/yYuGNeaCO1J1aHHsQhbhzwbJ.webp',
  },
];

export default function SpecificBike() {
  const { id } = useParams();
  const navigate = useNavigate();

  const bike = mockBikes.find((b) => b.id === parseInt('42', 10));
  const bikeName = bike ? bike.name : 'Bike not found';
  const bikeImg = bike ? bike.image : 'Bike image not found';

  const handleReserve = () => navigate(`/ebikes/${id}/reservations/new`);

  return (
    <div className="container-specific-bike">
      <div className="conatienr-img-specific">
        <img className="img-specific" src={bikeImg} alt="" />
      </div>
      <div className="titles-specific-container">
        <h2 className="name-specific-bike">{bikeName}</h2>
        <p>-£350 deposit any Vespa Purchaset</p>
      </div>
      <div className="payment-c">
        <div className="specification-1">
          <p className="left-text">Finance free</p>
          <p className="right-text">£129</p>
        </div>
        <div className="specification-2">
          <p className="left-text">Option to purchase fee</p>
          <p className="right-text">£249</p>
        </div>
        <div className="specification-3">
          <p className="left-text">Total ammount payable</p>
          <p className="right-text">£9,879</p>
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
        <p className="more-models">DISCOVER MORE MODELS</p>
        <p className="arrow-more-models">
          {' '}
          {'>'}
          {' '}
        </p>
      </div>
      <button onClick={handleReserve} type="button">Reserve</button>
    </div>
  );
}
