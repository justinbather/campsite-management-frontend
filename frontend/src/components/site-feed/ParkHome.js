import React, { useState, useEffect } from "react";
import NavBar from "../ui/NavBar";
import SiteFilter from "./SiteFilter";
import SiteResultsFeed from "./SiteResultsFeed";
import FilterDropdown from "./FilterDropdown";
import filterIcon from "../../assets/filter-icon.png";
import closeIcon from "../../assets/close-icon.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants";

const ParkHome = () => {
  const [parkData, setParkData] = useState([]);
  const [arrivalDate, setArrivalDate] = useState([]);
  const [departureDate, setDepartureDate] = useState([]);
  const [rawAvailableSites, setRawAvailableSites] = useState([]);
  //const [filteredSites, setFilteredSites] = useState([]);
  const [dropdownToggle, setDropdownToggle] = useState(false);
  const [amenities, setAmenities] = useState([]);

  const { parkId } = useParams();

  const fetchParkData = async () => {
    axios
      .get(`${API_URL}/park/${parkId}`)
      .then((res) => {
        setParkData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateArrivalDate = (arrival) => {
    setArrivalDate(arrival);
  };
  const updateDepartureDate = (departure) => {
    setDepartureDate(departure);
  };

  const updateRawAvailableSites = (sites) => {
    setRawAvailableSites(sites);
  };

  const updateAmenities = (amenities) => {
    setAmenities(amenities);
    console.log(amenities);
  };

  const updateFilteredSites = () => {
    /*
        site: {id, name, park etc...
          amenities : {
            0: {id, name, icon},
            1: {id, name, icon}...
          }}
        we need to filter rawAvailableSites so that each sites amenitity list contains the checked off amenity
    */
    const filteredSites = rawAvailableSites.filter((site) => {
      // Check if any amenities are selected
      if (amenities) {
        // Check if all selected amenities are present in the site's amenities
        return amenities.every((amenity) => {
          return Object.values(site.amenities).some(
            (siteAmenity) => siteAmenity.name === amenity
          );
        });
      } else {
        // No amenities selected, so include the site
        return true;
      }
    });

    return filteredSites;
  }; // Filtering function works, need to work on checking off amenities to remove the delay between selecting and changing state

  const sortSitesByCategory = (category) => {
    const sites = updateFilteredSites()
    const sortedSites = sites.filter((site) => {
      console.log(site)
      return site.site_type === category
    })
    return sortedSites
  }

  const handleDropdownToggle = () => {
    setDropdownToggle(!dropdownToggle);
  };

  useEffect(() => {
    fetchParkData();
  }, [parkId]);

  useEffect(() => {
    updateFilteredSites();
  }, [amenities]);

  return (
    <div className="">
      <NavBar
        showTitle={true}
        titleText={parkData.name}
        titleImg={parkData.logo}
      />
      <div className="flex justify-center pt-10 gap-2">
        <SiteFilter
          arrival={updateArrivalDate}
          departure={updateDepartureDate}
          sites={updateRawAvailableSites}
          parkId={parkId}
        />
        <div className="w-8 h-8 flex flex-row mt-3 items-center justify-center align-center hover:bg-neutral-200 rounded-full transition">
          <a onClick={handleDropdownToggle}>
            <img
              className="w-6 cursor-pointer"
              src={filterIcon}
              alt="Filter Icon"
            ></img>
          </a>
        </div>
      </div>
      {dropdownToggle && (
        <div className="absolute w-full pl-[825px] h-30 flex justify-center items-center bg-opacity-50 bg-gray-900 z-50">
          <div className="h-full rounded-md bg-base-100 drop-shadow-lg">
            <FilterDropdown amenities={updateAmenities} />
          </div>
        </div>
      )}

      {/* Content below the filter dropdown */}
      <div className="flex pt-20 overflow-x-scroll hide-scroll-bar">
        <SiteResultsFeed
          feedTitle="Top Sites For You"
          sites={updateFilteredSites()}
          initialArrival={arrivalDate}
          initialDeparture={departureDate}
        />
      </div>
      <div className="flex pt-5 overflow-x-scroll hide-scroll-bar">
        <SiteResultsFeed
          feedTitle="Best Tent Sites"
          sites={sortSitesByCategory("Tent")}
          initialArrival={arrivalDate}
          initialDeparture={departureDate}
        />
      </div>
      <div className="flex pt-5 overflow-x-scroll hide-scroll-bar">
        <SiteResultsFeed
          feedTitle="Popular Trailer Sites"
          sites={updateFilteredSites()}
          initialArrival={arrivalDate}
          initialDeparture={departureDate}
        />
      </div>
    </div>
  );
};

export default ParkHome;
