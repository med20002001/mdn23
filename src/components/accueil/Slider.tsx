import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  image: string;
  alt: string;
}

const slides: Slide[] = [
  { id: 1, image: "/images/slides/slide1.jpg", alt: "MDN23 Reception" },
  { id: 2, image: "/images/slides/slide2.jpg", alt: "Event 1" },
  { id: 3, image: "/images/slides/slide3.jpg", alt: "Event 2" },
  { id: 4, image: "/images/slides/slide4.jpg", alt: "Event 3" }
];

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
    setIsAutoPlaying(false);
  };

  return (
    <div
      className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-lg shadow-xl group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >

      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out
              ${index === current ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={goToPrevious}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
