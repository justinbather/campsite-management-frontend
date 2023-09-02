import { useEffect, useState } from "react";

const AmenitiesFilter = (props) => {
  const [checkedAmenities, setCheckedAmenities] = useState([]);

  const handleAmenityToggle = (e) => {
    if (e.target.checked) {
      setCheckedAmenities([...checkedAmenities, e.target.id]);
    } else {
      setCheckedAmenities(
        checkedAmenities.filter((amenity) => amenity !== e.target.id)
      );
    }
    props.amenities(checkedAmenities);
    console.log(checkedAmenities);
  };

  useEffect(() => {
    props.amenities(checkedAmenities);
  }, [handleAmenityToggle]);

  return (
    <>
      <h3 className="font-bold text-sm text-left">Amenities</h3>
      <ul className="flex gap-5 rounded-2xl items-center">
        <li className="py-3 text-sm flex text-center">
          <input
            type="checkbox"
            className="mx-1 text-center"
            id="Water"
            onClick={(e) => {
              handleAmenityToggle(e);
            }}
          />
          Water
        </li>
        <li className="py-3 text-sm flex">
          <input
            type="checkbox"
            id="Electricity"
            className="mx-1"
            onClick={(e) => {
              handleAmenityToggle(e);
            }}
          />
          Electricity
        </li>
        <li className="py-3 text-sm flex">
          <input
            type="checkbox"
            id="Sewage"
            className="mx-1"
            onClick={(e) => {
              handleAmenityToggle(e);
            }}
          />
          Sewage
        </li>
      </ul>
    </>
  );
};

export default AmenitiesFilter;
