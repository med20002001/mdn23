import { useState, useMemo, useRef, useEffect } from 'react';
import EventBadge from './EventBadge';
import MonthPicker from './MonthPicker';

interface Event {
  date: string | Date;
  title: string;
  href: string;
}

interface Props {
  events: Event[];
  currentDate?: Date;
}

export default function MonthCalendar({ events, currentDate = new Date() }: Props) {
  const [selectedMonth, setSelectedMonth] = useState(currentDate);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Fermer le picker si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowMonthPicker(false);
      }
    };

    if (showMonthPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMonthPicker]);

  const normalizedEvents = useMemo(() => {
    return events.map(event => ({
      ...event,
      date: new Date(event.date)
    }));
  }, [events]);

  const getEventsForDate = (date: Date): typeof normalizedEvents => {
    return normalizedEvents.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
    });
  };

  const daysInMonth = useMemo(() => {
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const daysCount = lastDay.getDate();
    const prevMonthDays = startDay === 0 ? 6 : startDay - 1;
    const prevMonth = new Date(year, month, 0);
    const prevMonthLastDay = prevMonth.getDate();
    
    const days: Array<{
      date: Date;
      isCurrentMonth: boolean;
      events: typeof normalizedEvents;
    }> = [];
    
    for (let i = prevMonthDays; i > 0; i--) {
      const day = prevMonthLastDay - i + 1;
      const date = new Date(year, month - 1, day);
      days.push({ date, isCurrentMonth: false, events: getEventsForDate(date) });
    }
    
    for (let i = 1; i <= daysCount; i++) {
      const date = new Date(year, month, i);
      days.push({ date, isCurrentMonth: true, events: getEventsForDate(date) });
    }
    
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isCurrentMonth: false, events: getEventsForDate(date) });
    }
    
    return days;
  }, [selectedMonth, normalizedEvents]);

  const monthName = selectedMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  const weekDays = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1))}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1))}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={() => setSelectedMonth(new Date())}
                className="ml-2 px-4 py-2 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 font-medium"
              >
                Ce mois-ci
              </button>
            </div>

            {/* Dropdown mois/année */}
            <div className="relative" ref={pickerRef}>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold capitalize">{monthName}</h2>
                <button 
                  onClick={() => setShowMonthPicker(!showMonthPicker)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Month Picker Popup */}
              {showMonthPicker && (
                <MonthPicker
                  currentDate={selectedMonth}
                  onSelect={(date) => setSelectedMonth(date)}
                  onClose={() => setShowMonthPicker(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Calendrier */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="bg-gray-100 border-b border-gray-200 py-3 px-4 flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm text-gray-700">Il n'y a pas d'événements à venir.</span>
          </div>

          <div className="grid grid-cols-7 border-b border-gray-200">
            {weekDays.map(day => (
              <div key={day} className="p-3 text-xs font-semibold text-gray-600 text-center bg-gray-50">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {daysInMonth.map((day, index) => {
              const isToday = 
                day.date.getDate() === new Date().getDate() &&
                day.date.getMonth() === new Date().getMonth() &&
                day.date.getFullYear() === new Date().getFullYear();

              return (
                <div
                  key={index}
                  className={`min-h-[120px] p-3 border-b border-r border-gray-200 ${
                    !day.isCurrentMonth ? 'bg-gray-50' : 'bg-white'
                  } ${index % 7 === 6 ? 'border-r-0' : ''} ${
                    isToday ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className={`text-sm font-bold mb-2 ${
                    !day.isCurrentMonth ? 'text-gray-400' : isToday ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {day.date.getDate()}
                  </div>

                  <div className="space-y-1">
                    {day.events.map((event, i) => (
                      <EventBadge key={i} title={event.title} href={event.href} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bouton S'abonner */}
      <div className="max-w-7xl mx-auto px-4 pb-8 flex justify-end">
        <button className="px-4 py-2 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50 flex items-center gap-2">
          S'abonner au calendrier
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
