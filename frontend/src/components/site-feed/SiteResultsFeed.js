import SiteCard from "./SiteCard";
import placeholderImage from "../../assets/campsite-image.jpg";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SiteResultsFeed = (props) => {
  const [selectedArrival, setSelectedArrival] = useState([]);
  const [selectedDeparture, setSelectedDeparture] = useState([]);
  const { parkId } = useParams();

  const navigate = useNavigate();
  const handleClick = (siteId) => {
    navigate(
      `/park/${parkId}/site/${siteId}/${selectedArrival}/${selectedDeparture}`
    );
  };

  useEffect(() => {
    setSelectedArrival(props.initialArrival);

    setSelectedDeparture(props.initialDeparture);
  }, [props]);

  return (
    <div className="flex flex-nowrap ml-10">
      <h1 className="absolute px-20 text-center font-inter text-4xl font-bold">
        {props.feedTitle}
      </h1>
      <div className="flex justify-center px-20 py-14 gap-5">
        {props.sites.map((site) => (
          <div className="flex w-[25rem] h-[20rem] bg-base-100 drop-shadow-xl justify-center overflow-hidden rounded-xl hover:ring-4 ring-neutral-300">
            <img
              className="w-full h-full"
              alt="image"
              src={site.thumbnail}
              role="button"
              key={site.id}
              onClick={() => handleClick(site.id)}
            />
            <h1 className="text-lg text-center text-base-100 absolute bottom-0">
              Site {site.id} - ${site.price}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiteResultsFeed;
