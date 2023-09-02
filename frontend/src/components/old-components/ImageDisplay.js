import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageDisplay = (props) => {
  const [images, setImages] = useState([]);

  const fetchImages = (siteId) => {
    axios
      .get(`/siteimage/${siteId}`)
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (props.selectedSite) {
      fetchImages(props.selectedSite.id);
    }
  }, [props.selectedSite]);

  return (
    <div>
      <Carousel
        showThumbs={false}
        dynamicHeight={false}
        showStatus={false}
        showIndicators={false}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.photo} // Update to the correct property based on your API response
            alt={`Image ${index}`}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ImageDisplay;
