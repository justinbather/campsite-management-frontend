import React from "react";
import ListAmenities from "./ListAmenities";

const SiteDescription = (props) => {
  console.log(props);
  return (
    <>
      <div className="flex justify-between w-full">
        <div className="flex flex-col h-full w-full mx-8">
          <h3 className="text-lg font-bold text-left">About Us</h3>
          <p className="text-md font-light">{props.siteDescription}</p>
          <hr className="text-neutral-300 mt-8"></hr>
        </div>
      </div>
    </>
  );
};

export default SiteDescription;
