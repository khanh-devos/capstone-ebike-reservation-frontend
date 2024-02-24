import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Calendar from 'reactjs-availability-calendar';
import './forcalendar.css';

const MyCalendar = ({ bikeId }) => {
  const { reservations } = useSelector((state) => state.reservationSlice);
  const { user } = useSelector((state) => state.authSlice);

  const bookings = reservations
    .filter((item) => item.ebike.id === Number(bikeId))
    .map((item) => {
      const newEndingDate = new Date(item.formated_ending_date);

      if (item.user_id === user.id) {
        const startDate = new Date(item.formated_starting_date);
        const arr = [];
        let currentDate = Object.assign(startDate);

        while (newEndingDate >= currentDate) {
          arr.push({
            from: new Date(currentDate),
            to: new Date(currentDate),
            middayCheckout: true,
          });
          currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
        }

        return arr;
      }

      return ({
        from: item.formated_starting_date,
        to: item.formated_ending_date,
        middayCheckout: false,
      });
    });

  return (
    <Calendar bookings={bookings.flat()} showNumberOfMonths={1} showControls />
  );
};

MyCalendar.propTypes = {
  bikeId: PropTypes.number.isRequired,
};

export default MyCalendar;
