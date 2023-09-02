import React, { useState } from "react";

const SiteList = (props) => {
  const [selectedSite, setSelectedSite] = useState([]);

  const handleSiteClick = (site) => {
    setSelectedSite(site);
    props.onSiteClick(site)
  };
  

  return (
    <div className="bg-white flex h-full w-full flex-col">
      <ul className="flex flex-col">
        {props.sites.map((site) => (
          <li
            key={site.id}
            className={`border-b-2 border-stroke-color p-4 justify-between flex transition hover:bg-gray-100 cursor-pointer ${
              selectedSite.id === site.id ? "bg-gray-100" : ""
            }`}
            onClick={() => {
              props.onSiteClick(site.id);
              handleSiteClick(site);
            }}
          >
            <h2 className="font-bold">Site {site.id}</h2>
            <h1 className="font-bold">${site.price}</h1>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SiteList;
