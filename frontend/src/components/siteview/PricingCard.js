import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CheckoutModal from "./CheckoutModal";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SiteDatesPicker from "../ui/SiteDatesPicker";

const PricingCard = (props) => {
  const { initialArrival } = useParams();
  const { initialDeparture } = useParams();
  const [departureDate, setDepartureDate] = useState(dayjs(initialDeparture));
  const [arrivalDate, setArrivalDate] = useState(dayjs(initialArrival));
  const [numberOfNights, setNumberOfNights] = useState("Select dates");
  const [netCost, setNetCost] = useState("");
  const [taxes, setTaxes] = useState("");
  const [total, setTotal] = useState("");

  const calcNights = (arrivalDate, departureDate) => {
    const date1String = dayjs(arrivalDate.$d).format("YYYY-MM-DD").toString();
    const dayjsDate1 = dayjs(date1String);
    const date2String = dayjs(departureDate.$d).format("YYYY-MM-DD").toString();
    const dayjsDate2 = dayjs(date2String);
    const nights = Math.ceil(dayjsDate2.diff(dayjsDate1, "day"));
    return nights;
  };

  const calcNetCost = (nights, price) => {
    const netCost = Math.ceil(nights * price);
    return netCost;
  };

  

  const calcTaxes = (netCost) => {
    const taxes = Math.ceil((netCost) * 0.13);
    return taxes;
  };

  const calcTotal = (netCost, taxes) => {
    const total = Math.ceil(netCost + taxes);
    return total;
  };

  useEffect(() => {
    const nights = calcNights(arrivalDate, departureDate);
    const netCost = calcNetCost(nights, props.site.price);
    const taxes = calcTaxes(netCost);
    const total = calcTotal(netCost, taxes);

    setNumberOfNights(nights);
    setNetCost(netCost);
    setTaxes(taxes);
    setTotal(total);
  }, [arrivalDate, departureDate, props.site.price]); //adding these dependencies fixed the refresh delay but onload shows 0 or NaN

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="h-full bg-base-100 rounded-xl drop-shadow-lg p-3 border border-neutral-200">
        <div>
          <h1 className="text-xl text-[#fd4b31] pt-3 pl-5">
            ${props.site.price}/night
          </h1>
          <p className="text-sm pl-5">
            {numberOfNights === 0
              ? "Select dates"
              : numberOfNights > 1
              ? numberOfNights + " " + "nights"
              : numberOfNights + " " + "night"}
          </p>
        </div>

        <div className="flex flex-row pt-4">
          <SiteDatesPicker
            arrivalDate={arrivalDate}
            departureDate={departureDate}
            setArrivalDate={setArrivalDate}
            setDepartureDate={setDepartureDate}
            parkId={props.parkId}
            siteId={props.siteId}
          />
        </div>
        <div className="w-full flex flex-row">
          {numberOfNights > 0 && (
            <>
              <div className="w-1/2 flex-col text-left justify-start pl-5">
                <h3 className="text-neutral-500 overflow-visible">
                  ${props.site.price} x {numberOfNights} nights
                </h3>

                <h3 className="text-neutral-500">Taxes</h3>
              </div>

              <div className="w-1/2 flex-col text-right justify-end pr-5 pb-2">
                <h3 className="text-neutral-500">${netCost} CAD</h3>

                <h3 className="text-neutral-500">${taxes} CAD</h3>
              </div>
            </>
          )}
        </div>
        <hr className="mx-4 text-neutral-300" />
        <div className="w-full flex flex-row pb-2">
          <div className="w-1/2 flex-col text-left justify-start pl-5 pt-2">
            <h3 className="text-neutral-500">Total</h3>
          </div>
          <div className="w-1/2 flex-col text-right justify-end pr-5 pt-2">
            <h3 className="text-neutral-500">${total} CAD</h3>
          </div>
        </div>
        <div className="w-full flex justify-center p-4">
          <CheckoutModal
            nights={numberOfNights}
            site={props.site}
            checkInDate={arrivalDate}
            checkoutDate={departureDate}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default PricingCard;
