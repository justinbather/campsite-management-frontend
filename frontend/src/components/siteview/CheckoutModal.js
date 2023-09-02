import { API_URL } from "../../constants";
import dayjs from "dayjs";
import GradientButton from "../ui/GradientButton";

const CheckoutModal = (props) => {
  //Takes in Site object {site.park_id:int, site.id:int, site.price:int} checkInDate, checkoutDate
  const parsedCheckInDate = dayjs(props.checkInDate.$d).format("YYYY-MM-DD");
  const parsedCheckoutDate = dayjs(props.checkoutDate.$d).format("YYYY-MM-DD");

  return (
    <>
      <GradientButton
        buttonText="Reserve"
        onClick={() => window.my_modal_3.showModal()}
      />

      <dialog id="my_modal_3" className="modal">
        <form
          method="post"
          action={`${API_URL}/bookings/payment`}
          className="modal-box"
        >
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => window.my_modal_3.closeModal()}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Hello!</h3>
          

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">What's your first name?</span>
            </label>
            <input
              type="text"
              name="first_name"
              placeholder="John"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">What's your last name?</span>
            </label>
            <input
              type="text"
              name="last_name"
              placeholder="Doe"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">What's your email?</span>
            </label>
            <input
              type="text"
              name="email"
              placeholder="johndoe@gmail.com"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <input type="hidden" name="park_id" value={props.site.park_id} />
          <input type="hidden" name="site_id" value={props.site.id} />
          <input type="hidden" name="start_date" value={parsedCheckInDate} />
          <input type="hidden" name="end_date" value={parsedCheckoutDate} />

          <input type="hidden" name="product_name" value="test_product" />
          <input type="hidden" name="price" value={props.site.price * 100} />
          <input type="hidden" name="nights" value={props.nights} />

          <p className="py-4">Press ESC key or click on ✕ button to close</p>
          <button
            type="submit"
            className="btn btn-wide btn-active bg-gradient-to-r from-[#fec051] to-[#fd4b31] text-base-100 border-0 hover:ring-4 ring-neutral-300"
          >
            Checkout
          </button>
        </form>
      </dialog>
    </>
  );
};

export default CheckoutModal;
