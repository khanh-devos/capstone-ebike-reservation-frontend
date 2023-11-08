import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchReservation } from '../../redux/reservation/reservationSlice';

// const mockBike = [
//   {
//     id: 1,
//     name: 'EcoRider 500',
//     description:
//       'An elegant and efficient electric bicycle for your daily commute.',
//     image: 'https://media.bcompras.com.mx/iFSz4S0PZCusaaKK1RvtSbd2.webp',
//   }
// ];

export default function SpecificBike() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleReserve = () => navigate(`/ebikes/${id}/reservations/new`);

  return (
    <div>
      Specific Bike

      <button onClick={handleReserve}>Reserve</button>
    </div>
  );
}
