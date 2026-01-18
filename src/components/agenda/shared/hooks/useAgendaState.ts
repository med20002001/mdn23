import { useState } from 'react';
import type { ViewType } from '../../types';

export const useAgendaState = () => {
  const [view, setView] = useState<ViewType>('liste');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showAllPastEvents, setShowAllPastEvents] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return {
    view, setView,
    selectedDate, setSelectedDate,
    searchQuery, setSearchQuery,
    currentMonth, setCurrentMonth,
    showAllPastEvents, setShowAllPastEvents,
    showAllEvents, setShowAllEvents,
    activeDropdown, setActiveDropdown
  };
};
