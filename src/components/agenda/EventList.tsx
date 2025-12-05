import EventCard from './EventCard';

interface Event {
  month: string;
  day: string;
  year: string;
  datetime: string;
  title: string;
  location: string;
  description: string;
  image: string;
  href: string;
  date: Date;
}

interface Props {
  events: Event[];
  title?: string;
  emptyMessage?: string;
  showPastIndicator?: boolean;
}

export default function EventList({ 
  events, 
  title = "Événements",
  emptyMessage = "Aucun événement à afficher",
  showPastIndicator = false
}: Props) {
  const now = new Date();

  if (events.length === 0) {
    return (
      <div className="bg-gray-100 border-t-4 border-blue-600 py-6 px-4 text-center rounded-lg">
        <p className="text-sm text-gray-600">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-8">{title}</h2>
      )}
      
      <div className="space-y-8">
        {events.map((event) => (
          <EventCard
            key={event.href}
            month={event.month}
            day={event.day}
            year={event.year}
            datetime={event.datetime}
            title={event.title}
            location={event.location}
            description={event.description}
            image={event.image}
            href={event.href}
            isPast={showPastIndicator && event.date < now}
          />
        ))}
      </div>
    </section>
  );
}
