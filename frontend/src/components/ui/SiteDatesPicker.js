import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { HiArrowRight } from "react-icons/hi";
import axios from "axios";
import { API_URL } from "../../constants";


const SiteDatesPicker = (props) => {
  const [error, setError] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const currentDate = dayjs() //returns current date and time in dayjs format

  const parsedCurrentDate = dayjs(currentDate.$d).format("YYYY-MM-DD") // parse to YYYY-MM-DD

  const fetchUnavailableDates = async (parsedCurrentDate) => {
    axios
      .get(`${API_URL}/unavailabledates/${props.parkId}/${props.siteId}/${parsedCurrentDate}`)
      .then((res) => {
        setUnavailableDates(res.data.dates)
      })
      .catch((err) => {
        console.log(`Error fetching unavailable dates: ${err}`)
      })
  }
 
  const disableDates = (date) => {
  
    const parsedDate = dayjs(date.$d).format("YYYY-MM-DD")
    return unavailableDates.includes(parsedDate);
    
  }

  useEffect(() => {
    fetchUnavailableDates(parsedCurrentDate);
  }, [props.parkId, props.siteId])



  return (
    <div>
      <div className="flex gap-3 items-center">
        <DatePicker
          value={props.arrivalDate}
          shouldDisableDate={disableDates}
          disablePast
          slotProps={{
            textField: {
              error: error !== null,
            },
          }}
          onChange={(newArrivalDate) => {
            if (newArrivalDate <= props.departureDate) {
              props.setArrivalDate(newArrivalDate);
              setError(null); // Clear any previous error
            } else {
              setError("Arrival date must be before departure date");
            }
          }}
        />
        <HiArrowRight />
        <DatePicker
          value={props.departureDate}
          shouldDisableDate={disableDates}
          disablePast
          slotProps={{
            textField: {
              error: error !== null,
            },
          }}
          onChange={(newDepartureDate) => {
            if (newDepartureDate >= props.arrivalDate) {
              props.setDepartureDate(newDepartureDate);
              setError(null); // Clear any previous error
            } else {
              setError("Departure date must be after arrival date");
            }
          }}
        />
      </div>
      <div className="h-[24px] text-center">
        {error && (
          <p className="pt-2 text-xs" style={{ color: "red" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default SiteDatesPicker;
