import { API_URL } from "../../constants";
import dayjs from "dayjs";

const Checkout = (props) => {
  console.log(props);
  const parsedCheckInDate = dayjs(props.checkInDate.$d).format("YYYY-MM-DD");
  const parsedCheckoutDate = dayjs(props.checkoutDate.$d).format("YYYY-MM-DD");
  console.log(parsedCheckInDate);
  return (
    <>
      <div className="container">
        <h1>Checkout</h1>
        <img src="https://i.imgur.com/EHyR2nP.png" className="image"></img>
        <h2>Price</h2>
        <h3>25$</h3>
        <form action={`${API_URL}/bookings/payment`} method="POST">
          <input type="hidden" name="park_id" value={props.site.park_id} />
          <input type="hidden" name="site_id" value={props.site.id} />
          <input type="hidden" name="start_date" value={parsedCheckInDate} />
          <input type="hidden" name="end_date" value={parsedCheckoutDate} />

          <input type="hidden" name="product_name" value="test_product" />
          <input type="hidden" name="price" value={props.site.price * 100} />
          <button className="btn-checkout" type="submit">
            Checkout
          </button>
        </form>
      </div>
    </>
  );
};

export default Checkout;
