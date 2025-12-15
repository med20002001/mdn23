import type { DayInfo, AgendaEvent } from './types';

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('fr-FR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};
function hasEventOnDate(date: Date, events: AgendaEvent[]): boolean {
  const dateStr = date.toISOString().split('T')[0];
  return events.some(event => {
    const eventDateStr = new Date(event.date).toISOString().split('T')[0];
    return eventDateStr === dateStr;
  });
}
export const getDaysInMonth = (date: Date, events: AgendaEvent[] = []): DayInfo[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  const adjustedStart = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;
  
  const days: DayInfo[] = [];
  
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = adjustedStart - 1; i >= 0; i--) {
    const dayDate = new Date(year, month - 1, prevMonthLastDay - i);
    days.push({
      day: prevMonthLastDay - i,
      isCurrentMonth: false,
      date: dayDate,
      hasEvent: hasEventOnDate(dayDate, events)
    });
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    const dayDate = new Date(year, month, i);
    days.push({
      day: i,
      isCurrentMonth: true,
      date: dayDate,
      hasEvent: hasEventOnDate(dayDate, events)
    });
  }
  
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const dayDate = new Date(year, month + 1, i);
    days.push({
      day: i,
      isCurrentMonth: false,
      date: dayDate,
      hasEvent: hasEventOnDate(dayDate, events)
    });
  }
  
  return days;
};

export const getEventsForDay = (events: AgendaEvent[], date: Date): AgendaEvent[] => {
  const dateStr = date.toISOString().split('T')[0];
  return events.filter(event => {
    const eventDateStr = new Date(event.date).toISOString().split('T')[0];
    return eventDateStr === dateStr;
  });
};

export const WEEK_DAYS = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];
export const MONTHS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
