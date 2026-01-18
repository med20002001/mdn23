import { useState, useEffect, useRef } from "react";
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

const AUTO_DELAY = 3000;

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!auto) return;

    if (progressRef.current) {
      progressRef.current.style.transition = "none";
      progressRef.current.style.width = "0%";

      requestAnimationFrame(() => {
        if (progressRef.current) {
          progressRef.current.style.transition = `width ${AUTO_DELAY}ms linear`;
          progressRef.current.style.width = "100%";
        }
      });
    }

    const timer = setTimeout(
      () => setCurrent((c) => (c + 1) % slides.length),
      AUTO_DELAY
    );

    return () => clearTimeout(timer);
  }, [current, auto]);

  const goTo = (i: number) => {
    setCurrent(i);
    setAuto(false);
  };

  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);

  return (
    <section
      className="
        relative w-full
        h-[340px] md:h-[440px] lg:h-[560px]
        overflow-hidden rounded-3xl
        bg-white shadow-2xl group
      "
      onMouseEnter={() => setAuto(false)}
      onMouseLeave={() => setAuto(true)}
    >
      {/* SLIDES */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`
            absolute inset-0
            transition-opacity duration-[1200ms] ease-out
            ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}
          `}
        >
          <img
            src={s.image}
            alt={s.alt}
            className={`
              w-full h-full object-cover
              transition-transform ease-linear
              ${i === current ? "scale-[1.07]" : "scale-100"}
            `}
            style={{ transitionDuration: `${AUTO_DELAY}ms` }}
          />
        </div>
      ))}

      {/* PREV */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="
          absolute left-6 top-1/2 -translate-y-1/2 z-20
          w-12 h-12 md:w-14 md:h-14
          rounded-full
          bg-gradient-to-br from-white/80 to-white/60
          backdrop-blur-md
          text-gray-800
          shadow-lg
          flex items-center justify-center
          opacity-100 lg:opacity-0 lg:group-hover:opacity-100
          transition-all duration-300
          hover:scale-110 hover:shadow-xl
          focus:outline-none focus:ring-2 focus:ring-green-500
        "
      >
        <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
      </button>

      {/* NEXT */}
      <button
        onClick={next}
        aria-label="Next slide"
        className="
          absolute right-6 top-1/2 -translate-y-1/2 z-20
          w-12 h-12 md:w-14 md:h-14
          rounded-full
          bg-gradient-to-br from-white/80 to-white/60
          backdrop-blur-md
          text-gray-800
          shadow-lg
          flex items-center justify-center
          opacity-100 lg:opacity-0 lg:group-hover:opacity-100
          transition-all duration-300
          hover:scale-110 hover:shadow-xl
          focus:outline-none focus:ring-2 focus:ring-green-500
        "
      >
        <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
      </button>

      {/* THUMBNAILS */}
      <div
        className="
          absolute bottom-8 left-1/2 -translate-x-1/2 z-20
          flex gap-3 px-4 py-2
          rounded-2xl bg-white/70 backdrop-blur
          shadow-lg
          opacity-100 lg:opacity-0 lg:group-hover:opacity-100
          transition
        "
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className={`
              relative w-16 h-10 rounded-lg overflow-hidden
              transition-all duration-300
              ${
                i === current
                  ? "ring-2 ring-green-600 scale-105"
                  : "opacity-70 hover:opacity-100"
              }
            `}
          >
            <img
              src={s.image}
              alt=""
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* PROGRESS BAR */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-200">
        <div
          ref={progressRef}
          className="h-full bg-green-600"
          style={{ width: "0%" }}
        />
      </div>
    </section>
  );
}
