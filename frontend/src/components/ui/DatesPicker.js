import React from "react";
import { DatePicker } from "@mui/x-date-pickers";

import { useState } from "react";
import { HiArrowRight } from "react-icons/hi";

const DatesPicker = (props) => {
  const [error, setError] = useState(null);

  return (
    <div>
      <div className="flex gap-3 items-center">
        <DatePicker
          value={props.arrivalDate}
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
      <div className="text-center">
        {error && (
          <p className="pt-2 text-xs" style={{ color: "red" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default DatesPicker;
