import filterIcon from "../../assets/filter-icon.png";
import closeIcon from "../../assets/close-icon.png";
import { useEffect, useState } from "react";
import AmenitiesFilter from "./AmenitiesFilter";

const FilterDropdown = (props) => {
  const [toggle, setToggle] = useState(false);
  const [amenities, setAmenities] = useState([]);

  const updateAmenities = (amenities) => {
    props.amenities(amenities);
    console.log(amenities);
  };

  const handleDropdownToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    updateAmenities();
  }, [toggle]);

  return (
    <div className="h-1/2 flex items-center justify-center px-5">
      <div className="w-1/4 h-full flex flex-col">
        <AmenitiesFilter amenities={updateAmenities} />
      </div>
      <div className="w-1/4"></div>
      <div className="w-1/4 "></div>
      <div className="w-1/4 "></div>
    </div>
  );
};

export default FilterDropdown;
