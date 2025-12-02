// src/components/EventCard.tsx
import { Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { FC } from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  speakers?: string[];
  status: 'upcoming' | 'passed';
}

interface EventCardProps {
  event: Event;
  compact?: boolean;
}

const EventCard: FC<EventCardProps> = ({ event, compact = false }) => {
  const [year, month, day] = event.date.split('-');
  const dateObj = new Date(event.date);
  const dayName = dateObj.toLocaleDateString('fr-FR', { weekday: 'short' });

  if (compact) {
    return (
      <div className="flex gap-4 rounded-lg bg-white p-4 shadow-sm">
        <div className="flex flex-col items-center justify-center rounded bg-slate-100 px-4 py-2 text-center">
          <span className="text-xs uppercase text-slate-500">{dayName}</span>
          <span className="text-2xl font-bold text-slate-900">{day}</span>
          <span className="text-xs text-slate-500">{month}</span>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-slate-900">{event.title}</h4>
          <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {event.time}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {event.location}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="flex flex-col gap-6 overflow-hidden rounded-lg bg-white shadow-sm md:flex-row">
      {/* Image */}
      <div className="md:w-2/5">
        <img
          src={event.image}
          alt={event.title}
          className="h-48 w-full object-cover md:h-full"
        />
      </div>

      {/* Contenu */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Calendar className="h-4 w-4" />
              {event.date} @ {event.time}
            </div>
            <h3 className="mt-2 text-xl font-bold text-slate-900">
              {event.title}
            </h3>
          </div>
          {event.status === 'passed' && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              Passé
            </span>
          )}
        </div>

        <div className="flex items-start gap-2 text-slate-700">
          <MapPin className="mt-1 h-4 w-4 flex-shrink-0" />
          <p className="text-sm">{event.location}</p>
        </div>

        <p className="line-clamp-3 text-sm text-slate-600">
          {event.description}
        </p>

        {event.speakers && event.speakers.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Users className="h-4 w-4" />
            <span>{event.speakers.join(', ')}</span>
          </div>
        )}

        <div className="mt-auto pt-2">
          <Button
            variant="default"
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Plus d'infos
          </Button>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
