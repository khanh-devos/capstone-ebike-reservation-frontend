import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Calendar from 'reactjs-availability-calendar';
import './forcalendar.css';

export default function MyCalendar({ bikeId }) {
  const { reservations } = useSelector((state) => state.reservationSlice);

  const bookings = reservations
    .filter((item) => item.ebike.id === Number(bikeId))
    .map((item) => ({
      from: item.formated_starting_date,
      to: item.formated_ending_date,
    }));

  return (
    <Calendar bookings={bookings} showNumberOfMonths={1} showControls />
  );
}

MyCalendar.propTypes = {
  bikeId: PropTypes.number.isRequired,
};
