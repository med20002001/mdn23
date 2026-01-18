import type { ViewType } from '../../types';

export const useAgendaNavigation = (
  view: ViewType,
  selectedDate: Date,
  setSelectedDate: (date: Date) => void,
  currentMonth: Date,
  setCurrentMonth: (date: Date) => void,
  showAllEvents: boolean,
  setShowAllEvents: (show: boolean) => void,
  setShowAllPastEvents: (show: boolean) => void
) => {
  const handlePrevious = () => {
    if (view === 'liste') {
      setShowAllEvents(!showAllEvents);
      if (!showAllEvents) setShowAllPastEvents(true);
    } else if (view === 'jour') {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() - 1);
      setSelectedDate(newDate);
    } else if (view === 'mois') {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    }
  };

  const handleNext = () => {
    if (view === 'jour') {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() + 1);
      setSelectedDate(newDate);
    } else if (view === 'mois') {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    }
  };

  const selectMonth = (monthIndex: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex, 1));
  };

  const selectYear = (year: number) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
  };

  const goToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentMonth(today);
    setShowAllEvents(false);
    setShowAllPastEvents(false);
  };

  return { handlePrevious, handleNext, selectMonth, selectYear, goToToday };
};
