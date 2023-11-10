import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Calendar from 'reactjs-availability-calendar';
import './forcalendar.css';

export default function MyCalendar() {
  const { id } = useParams();
  const { reservations } = useSelector((state) => state.reservationSlice);

  const bookings = reservations
    .filter((item) => item.ebike.id === Number(id))
    .map((item) => ({
      from: item.formated_book_date,
      to: item.formated_book_date,
    }));

  return (
    <Calendar bookings={bookings} showNumberOfMonths={1} showControls />
  );
}
