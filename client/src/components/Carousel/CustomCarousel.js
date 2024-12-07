import React from "react";
import { Carousel } from "react-bootstrap";
import "./CustomCarousel.css";

const CustomCarousel = ({ slides }) => {
  return (
    <Carousel fade>
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100 carousel-img"
            src={slide.image}
            alt={slide.title}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
