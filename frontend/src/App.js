import {
  Homepage,
  CampSelect,
  SiteList,
  Checkout,
  PaymentSuccess,
  PaymentFailure,
  SiteView,
  ParkHome,
} from "./components";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { STRIPE_KEY } from "./constants";
import { useState } from "react";

const stripeKey = STRIPE_KEY;
const stripePromise = loadStripe(stripeKey);

function App() {
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <Router>
          <Routes>
            <Route
              exact
              path="/park/:parkId/site/:siteId/:initialArrival/:initialDeparture/"
              index
              element={<SiteView />}
            ></Route>
            <Route
              exact
              path="/park/:parkId/"
              index
              element={<ParkHome />}
            ></Route>
            <Route
              exact
              path="bookings/success/:booking_id"
              element={<PaymentSuccess />}
            />
            {/* <Route exact path='bookings' index element={<CampSelect />} /> */}
            {/* <Route
              exact
              path="bookings/payment/"
              index
              element={<Checkout />}
            />
            <Route
              exact
              path="bookings/success/"
              element={<PaymentSuccess />}
            />
            <Route exact path="bookings/failed/" element={<PaymentFailure />} /> */}
          </Routes>
        </Router>
      </Elements>
    </div>
  );
}

export default App;
