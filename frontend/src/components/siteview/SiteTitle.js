import React from "react";

const SiteTitle = (props) => {
  return (
    <div>
      <h1 className="text-lg font-bold text-neutral-800">{props.siteNumber}</h1>
      <p className="text-md font-light text-neutral-500">
        {props.campgroundName} - {props.city}
      </p>
    </div>
  );
};

export default SiteTitle;
