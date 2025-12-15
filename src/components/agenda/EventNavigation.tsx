import { useEffect, useState } from 'react';

interface Event {
  slug: string;
  title: string;
  date: Date;
}
interface Props {
  currentSlug: string;
  allEvents: Event[];
}
export default function EventNavigation({ currentSlug, allEvents }: Props) {
  const [prevEvent, setPrevEvent] = useState<Event | null>(null);
  const [nextEvent, setNextEvent] = useState<Event | null>(null);

  useEffect(() => {
    const sortedEvents = [...allEvents].sort((a, b) => 
      a.date.getTime() - b.date.getTime()
    );
    const currentIndex = sortedEvents.findIndex(e => e.slug === currentSlug);

    if (currentIndex > 0) {
      setPrevEvent(sortedEvents[currentIndex - 1]);
    }

    if (currentIndex < sortedEvents.length - 1) {
      setNextEvent(sortedEvents[currentIndex + 1]);
    }
  }, [currentSlug, allEvents]);

  if (!prevEvent && !nextEvent) {
    return null;
  }

  return (
    <div className="border-t pt-6 mt-12">
      <div className="flex justify-between items-center gap-4">
        {prevEvent ? (
          <a 
            href={`/agenda/${prevEvent.slug}`}
            className="text-sm text-blue-700 hover:underline flex items-center gap-2 group"
          >
            <svg 
              className="w-4 h-4 transition-transform group-hover:-translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>{prevEvent.title}</span>
          </a>
        ) : (
          <div></div>
        )}
        {nextEvent ? (
          <a 
            href={`/agenda/${nextEvent.slug}`}
            className="text-sm text-blue-700 hover:underline flex items-center gap-2 group text-right"
          >
            <span>{nextEvent.title}</span>
            <svg 
              className="w-4 h-4 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
