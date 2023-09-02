import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const PaymentSuccess = () => {

  const {booking_id} = useParams();
  const [bookingData, setBookingData] = useState({});


  const fetchBookingData = async () => {
    axios
      .get(`/bookings/payment/info/${booking_id}`)
      .then((res) => {
        setBookingData(res.data)

      })
      .catch((err) => {
        console.log(err)
      })
  }

  const updateBookingData = async () => {
    axios
    .put(`/bookings/payment/info/${booking_id}`)
    .then((res) => {
      console.log('Booking Payment complete')
    })
    .catch((err) => {
      console.log(err)
    })

  }

 

  useEffect(() => {
    updateBookingData()
    fetchBookingData()
  }, [])

  //Fetch Booking Info 
  // Send Patch setting payment made to true
  // Display Confirmation details on page
    return (
        <>
          <section>
            <div class="product Box-root">
              <div class="description Box-root">
                <h3>Checkout successful!</h3>
                <h3>{booking_id}</h3>
                {bookingData ? Object.keys(bookingData).map((key, index) => {
                  
                return <p key={index}>{bookingData[key]}</p>
                }) : <p>loading...</p>} 
              </div>
            </div>        
          </section>
        </>
      )
}

export default PaymentSuccess;