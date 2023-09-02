import React, { useState, useEffect } from "react";
import NavBar from "../ui/NavBar";
import SiteTitle from "./SiteTitle";
import ImageDisplay from "./ImageDisplay";
import SiteDescription from "./SiteDescription";
import { useParams } from "react-router-dom";
import axios from "axios";
import PricingCard from "./PricingCard";
import SiteViewSkeleton from "./ImageDisplaySkeleton";
import GoogleMapDisplay from "../ui/GoogleMapDisplay";
import SiteInfo from "./SiteInfo";

const SiteView = (props) => {
  const { parkId } = useParams();
  const { siteId } = useParams();
  const { initialArrival } = useParams();
  const { initialDeparture } = useParams();
  const [site, setSite] = useState([]);
  const [loading, setLoading] = useState(true);
  const [siteImages, setSiteImages] = useState([]);
  const [campData, setCampData] = useState([]);

  const fetchSiteData = () => {
    setLoading(true);
    setTimeout(() => {
      axios
        .get(`/site/${siteId}`)
        .then((siteData) => {
          console.log(siteData);
          setSite(siteData.data);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(`/siteimage/${siteId}`)
        .then((siteImageData) => {
          setSiteImages(siteImageData.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });

      axios
        .get(`/park/${parkId}`)
        .then((res) => {
          setCampData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 2000);
  };

  useEffect(() => {
    fetchSiteData();
    console.log(campData);
  }, []);

  return (
    <div>
      <NavBar
        showButton={true}
        buttonText="Back to search"
        clickDestination={`/park/${parkId}`}
      />
      <div className="px-40 xl:px-80 pt-6">
        {loading ? (
          <SiteViewSkeleton />
        ) : (
          <>
            <SiteTitle
              siteNumber={`Site ${site.id}`}
              campgroundName={campData.name}
              city={`${campData.city}, ${campData.province}`}
            />
            <ImageDisplay
              siteImages={siteImages}
              siteId={siteId}
              thumbnail={site.thumbnail}
            />
            <div className="flex mt-10 gap-10">
              <SiteInfo
                siteAmenities={site.amenities}
                siteName={site.id}

                campgroundLogo={campData.logo}
              />
              <PricingCard
                site={site}
                initialArrival={initialArrival}
                initialDeparture={initialDeparture}
                parkId={parkId}
                siteId={siteId}
              />
            </div>
            <div className="flex w-full h-full my-10">
            <SiteDescription

                siteDescription={campData.description}
     
              />
            </div>
            <div className="flex w-full py-10 h-96">
              <GoogleMapDisplay
                parkLatitude={campData.latitude}
                parkLongitude={campData.longitude}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SiteView;
