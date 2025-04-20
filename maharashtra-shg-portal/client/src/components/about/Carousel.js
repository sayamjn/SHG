import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Carousel = ({ images }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Handle next slide
  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  // Handle previous slide
  const handlePrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  // Go to a specific slide
  const goToSlide = (index) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg">
      {/* Main carousel container */}
      <div
        className="relative h-64 md:h-96"
        role="region"
        aria-roledescription="carousel"
        aria-label="SHG campaign photos"
      >
        {/* Carousel images */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${images.length}`}
            aria-hidden={index !== currentIndex}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
              <p className="text-sm md:text-base">{image.caption}</p>
            </div>
          </div>
        ))}

        {/* Navigation buttons */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full z-20 focus:outline-none focus:ring-2 focus:ring-white"
          onClick={handlePrev}
          aria-label={t('about.carousel.previous')}
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full z-20 focus:outline-none focus:ring-2 focus:ring-white"
          onClick={handleNext}
          aria-label={t('about.carousel.next')}
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      {/* Indicator dots */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-12 space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full focus:outline-none ${
              index === currentIndex
                ? 'bg-white'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;