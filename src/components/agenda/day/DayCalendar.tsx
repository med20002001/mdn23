import { useState, useMemo } from 'react';
import CalendarHeader from '../shared/CalendarHeader';
import EmptyState from '../shared/EmptyState';
import DayEventCard from './DayEventCard';

interface Event {
  date: Date;
  datetime: string;
  title: string;
  location: string;
  description: string;
  href: string;
}

interface Props {
  events: Event[];
  currentDate?: Date;
}

export default function DayCalendar({ events, currentDate = new Date() }: Props) {
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const dayEvents = useMemo(() => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === selectedDate.getDate() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getFullYear() === selectedDate.getFullYear()
      );
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [selectedDate, events]);

  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const dateString = selectedDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="bg-white">
      <CalendarHeader
        title={dateString}
        onPrevious={goToPreviousDay}
        onNext={goToNextDay}
        onToday={goToToday}
      />

      {dayEvents.length > 0 ? (
        <div className="space-y-4">
          {dayEvents.map((event, index) => (
            <DayEventCard
              key={index}
              datetime={event.datetime}
              title={event.title}
              location={event.location}
              description={event.description}
              href={event.href}
            />
          ))}
        </div>
      ) : (
        <EmptyState 
          message="Aucun événement ce jour"
          submessage="Il n'y a pas d'événements à venir."
        />
      )}
    </div>
  );
}
