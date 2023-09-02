import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DatesPicker from "../ui/DatesPicker";

const SiteFilter = (props) => {
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [arrivalDate, setArrivalDate] = useState(dayjs());
  const [filteredSites, setFilteredSites] = useState([]);

  const parsedArrivalDate = dayjs(arrivalDate.$d).format("YYYY-MM-DD");
  const parsedDepartureDate = dayjs(departureDate.$d).format("YYYY-MM-DD");

  const fetchFilteredSites = async (parsedArrivalDate, parsedDepartureDate) => {
    axios
      .get(`/bookings/2/${parsedArrivalDate}/${parsedDepartureDate}`)
      .then((res) => {
        setFilteredSites(res.data);

        props.sites(res.data);
        props.arrival(parsedArrivalDate);
        props.departure(parsedDepartureDate);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchFilteredSites(parsedArrivalDate, parsedDepartureDate);
  }, [arrivalDate, departureDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatesPicker
        setArrivalDate={setArrivalDate}
        setDepartureDate={setDepartureDate}
        arrivalDate={arrivalDate}
        departureDate={departureDate}
      />
    </LocalizationProvider>
  );
};

export default SiteFilter;
