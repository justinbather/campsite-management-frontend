import placeholderImage from "../../assets/campsite-image.jpg";

const SiteCard = (props) => {
  return (
    <div className="w-[20rem] h-[20rem] bg-base-100 drop-shadow-xl overflow-hidden rounded-xl hover:ring-4 ring-neutral-300">
      <img className="w-full h-full" alt="image" src={placeholderImage} />

      <h1 className="text-lg text-base-100 absolute bottom-0">
        Site {props.site}
      </h1>
    </div>
  );
};

export default SiteCard;
