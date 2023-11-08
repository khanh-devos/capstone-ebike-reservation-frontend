import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchReservation } from "../../redux/reservation/reservationSlice";



export default function Reservations() {
  const dispatch = useDispatch();
  const { reservations } = useSelector((state) => state.reservationSlice)

  useEffect(() => {
    dispatch(fetchReservation())
  }, [dispatch])


  return (
    <div>RESERVATIONS

      {
        reservations.map((item, i) => (
            <p key={item.id} >Reserve {i} : {item.starting_date}</p>
        ))
      }

    </div>
  )
}