import { useMemo } from 'react';
import { getEventsForDay } from '../../utils';
import type { AgendaEvent } from '../../types';

export const useAgendaFilters = (
  upcomingEvents: AgendaEvent[],
  pastEvents: AgendaEvent[],
  calendarEvents: AgendaEvent[],
  searchQuery: string,
  dateFilter: Date | null 
) => {
  const isSameDate = (date1: Date, date2: Date) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };
  const filteredUpcoming = useMemo(() => {
    let events = upcomingEvents;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      events = events.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.location?.toLowerCase().includes(query) ||
        event.organizer?.toLowerCase().includes(query)
      );
    }
    if (dateFilter) {
      events = events.filter(event => {
        const eventDate = new Date(event.date);
        return isSameDate(eventDate, dateFilter);
      });
    }
    return events;
  }, [upcomingEvents, searchQuery, dateFilter]);

  const filteredPast = useMemo(() => {
    let events = pastEvents;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      events = events.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.location?.toLowerCase().includes(query) ||
        event.organizer?.toLowerCase().includes(query)
      );
    }
    if (dateFilter) {
      events = events.filter(event => {
        const eventDate = new Date(event.date);
        return isSameDate(eventDate, dateFilter);
      });
    }

    return events;
  }, [pastEvents, searchQuery, dateFilter]);

  const dayEvents = useMemo(() => {
    const events = getEventsForDay(calendarEvents, dateFilter || new Date());
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      return events.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.location?.toLowerCase().includes(query) ||
        event.organizer?.toLowerCase().includes(query)
      );
    }
    return events;
  }, [calendarEvents, dateFilter, searchQuery]);

  return { filteredUpcoming, filteredPast, dayEvents };
};
