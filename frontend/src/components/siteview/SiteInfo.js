import React from "react";
import ListAmenities from "./ListAmenities";

const SiteInfo = (props) => {
  console.log(props);
  return (
    <>
      <div className="flex justify-between w-full">
        <div className="flex flex-col h-full w-full mx-8 gap-4 pt-4">
          <div className="flex justify-between items-center">
            <p className="font-bold text-lg">{`Site ${props.siteName}`}</p>
            <img src={props.campgroundLogo} className="h-[48px] w-[48px]" />
          </div>

          <hr className="text-neutral-300"></hr>
          <div className="flex flex-col gap-3">
            <ListAmenities amenities={props.siteAmenities} />
          </div>
          <hr className="text-neutral-300"></hr>
        </div>
      </div>
    </>
  );
};

export default SiteInfo;
