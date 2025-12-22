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

    const t = setTimeout(
      () => setCurrent((c) => (c + 1) % slides.length),
      AUTO_DELAY
    );
    return () => clearTimeout(t);
  }, [current, auto]);

  const goTo = (i: number) => {
    setCurrent(i);
    setAuto(false);
  };

  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);

  return (
    <section
      className="relative w-full h-[340px] md:h-[440px] lg:h-[560px]
                 overflow-hidden rounded-3xl bg-white shadow-2xl group"
      onMouseEnter={() => setAuto(false)}
      onMouseLeave={() => setAuto(true)}
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out
            ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          <img
            src={s.image}
            alt={s.alt}
            className={`w-full h-full object-cover
              transition-transform ease-linear
              ${i === current ? "scale-[1.07]" : "scale-100"}`}
            style={{ transitionDuration: `${AUTO_DELAY}ms` }}
          />
        </div>
      ))}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-6 top-1/2 -translate-y-1/2
                   w-10 h-10 rounded-full
                   bg-white/70 backdrop-blur
                   text-gray-700 shadow
                   opacity-0 group-hover:opacity-100
                   transition hover:bg-white"
      >
        <ChevronLeft className="w-5 h-5 mx-auto" />
      </button>

      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-6 top-1/2 -translate-y-1/2
                   w-10 h-10 rounded-full
                   bg-white/70 backdrop-blur
                   text-gray-700 shadow
                   opacity-0 group-hover:opacity-100
                   transition hover:bg-white"
      >
        <ChevronRight className="w-5 h-5 mx-auto" />
      </button>
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2
                   flex gap-3 px-4 py-2
                   rounded-2xl bg-white/70 backdrop-blur
                   shadow-lg opacity-0 group-hover:opacity-100
                   transition"
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className={`relative w-16 h-10 rounded-lg overflow-hidden
                        transition-all duration-300
                        ${i === current ? "ring-2 ring-green-600" : "opacity-70 hover:opacity-100"}`}
          >
            <img src={s.image} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
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
