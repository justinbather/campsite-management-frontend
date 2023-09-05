import React, { useEffect, useState } from "react";

const ImageDisplay = (props) => {
  //Limit images to 4 so we can nicely put into grid
  //let siteImages = []
  //props.siteImages.length > 4 ? siteImages = props.siteImages.slice(0, 4) : siteImages = props.siteImages
  const [imageArray, setImageArray] = useState([]);

  useEffect(() => {
    props.siteImages.length > 4
      ? setImageArray(props.siteImages.slice(0, 5))
      : setImageArray(props.siteImages);
  }, [props]);
  console.log(`Image array:${imageArray}`)

  return (
    <div className="pt-4">
      <div className="w-full rounded-xl relative grid grid-cols-2 sm:gap-1 overflow-hidden max-h-[50vh]">
        {imageArray.length > 0 && (
          <>
            <div className="w-full h-full">
              <img
                className="w-full h-full object-cover"
                alt="image"
                src={props.thumbnail}
              />
            </div>
            <div className="flex">
              <div className="sm:gap-1 grid grid-cols-2 justify-center">
                {imageArray.map((image, index) => (
                  <img
                    key={index}
                    alt="image"
                    src={image.photo}
                    className="w-full h-full object-cover"
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageDisplay;
