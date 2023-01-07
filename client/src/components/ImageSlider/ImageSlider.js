import React, { useCallback, useEffect, useRef, useState } from "react";
import "./ImageSlider.css";

const slideStyles = {
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "15px",
  fontSize: "45px",
  color: "#31c48d",
  zIndex: 1,
  cursor: "pointer",
};

const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "15px",
  fontSize: "45px",
  color: "#31c48d",
  zIndex: 1,
  cursor: "pointer",
};

const sliderStyles = {
  position: "relative",
  height: "100%",
};

const dotsContainerStyles = {
  display: "flex",
  position: "relative",
  bottom: "40px",
  justifyContent: "center",
};

const dotStyle = {
  margin: "0 5px",
  cursor: "pointer",
  fontSize: "20px",
  color: "#31c48d",
};

const slidesContainerStyles = {
  display: "flex",
  height: "100%",
  transition: "transform ease-out 0.3s",
};

const slidesContainerOverflowStyles = {
  overflow: "hidden",
  height: "100%",
};

const activeDotStyle = {
  margin: "0 5px",
  cursor: "pointer",
  fontSize: "20px",
  opacity: "1",
  transitionDuration: "1s",
  transform: "scale(1.08)",
  color: "white",
};

const ImageSlider = ({ cakes, parentWidth }) => {
  const timerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [];

  if (cakes.imgOne) {
    images.push(cakes.imgOne);
  }

  if (cakes.imgTwo) {
    images.push(cakes.imgTwo);
  }

  if (cakes.imgThree) {
    images.push(cakes.imgThree);
  }

  if (cakes.imgFour) {
    images.push(cakes.imgFour);
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, images]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const getSlidesStylesWithBackground = (slideIndex) => ({
    ...slideStyles,
    backgroundImage: `url(${images[slideIndex]})`,
    width: `${parentWidth}px`,
  });

  const getSlidesContainerStylesWithWidth = () => ({
    ...slidesContainerStyles,
    width: parentWidth * images.length,
    transform: `translateX(${-(currentIndex * parentWidth)}px)`,
  });

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      goToNext();
    }, 3000);
  }, [goToNext]);


  return (
    <div style={sliderStyles}>
      {images.length > 1 ? (
        <>
          <div>
            <div onClick={goToPrevious} style={leftArrowStyles}>
              ❰
            </div>
            <div onClick={goToNext} style={rightArrowStyles}>
              ❱
            </div>
          </div>
        </>
      ) : null}
      <div style={slidesContainerOverflowStyles}>
        <div style={getSlidesContainerStylesWithWidth()}>
          {images.map((_, slideIndex) => (
            <div
              key={slideIndex}
              style={getSlidesStylesWithBackground(slideIndex)}
            ></div>
          ))}
        </div>
      </div>
      <div style={dotsContainerStyles}>
        {images.map((image, slideIndex) => (
          <div
            style={slideIndex === currentIndex ? activeDotStyle : dotStyle}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
