import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FeaturesShowcase = () => {
  const [features, setFeatures] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Fetch features from API
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/Harshit-Patle/DataSets/refs/heads/main/Probles.json"
        );
        const data = await response.json();
        console.log(data);

        const transformedFeatures = data.Problems.map((problem) => ({
          title: problem.heading,
          description: problem.description,
          image: problem.image,
        }));
        setFeatures(transformedFeatures);
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };
    fetchFeatures();
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    let intervalId;
    if (isAutoPlaying && features.length > 0) {
      intervalId = setInterval(() => {
        setCurrentIndex((prev) =>
          prev === features.length - 1 ? 0 : prev + 1
        );
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoPlaying, features]);

  // Pause auto-rotation when user interacts
  const handleManualNavigation = (newIndex) => {
    setCurrentIndex(newIndex);
    setIsAutoPlaying(false);
    // Resume auto-rotation after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToPrevious = () => {
    handleManualNavigation(
      currentIndex > 0 ? currentIndex - 1 : features.length - 1
    );
  };

  const goToNext = () => {
    handleManualNavigation(
      currentIndex < features.length - 1 ? currentIndex + 1 : 0
    );
  };

  if (features.length === 0) {
    return <div className="text-center text-gray-500">Loading features...</div>;
  }

  return (
    <div className="relative max-w-full mx-auto">
      <h1 className="text-5xl font-bold mb-10 text-center">Key Features</h1>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row min-h-[400px]">
          {/* Image Section */}
          <div className="w-full md:w-1/2 relative">
            <img
              src={features[currentIndex].image}
              alt={features[currentIndex].title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 break-words">
                {features[currentIndex].title}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 break-words leading-relaxed">
                {features[currentIndex].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
        aria-label="Previous feature"
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
        aria-label="Next feature"
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-4 mt-6 mb-6">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => handleManualNavigation(index)}
            className={`w-4 h-4 rounded-full transition-colors ${
              index === currentIndex ? "bg-blue-500 scale-125" : "bg-gray-300"
            }`}
            aria-label={`Go to feature ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesShowcase;
