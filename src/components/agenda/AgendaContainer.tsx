import React from 'react';
import { SearchBar, ViewToggle, DateSearch } from './header';
import { ListView, MonthView, DayView } from './views';
import { useAgendaState } from './shared/hooks/useAgendaState';
import { useAgendaFilters } from './shared/hooks/useAgendaFilters';
import { useAgendaNavigation as useNavLogic } from './shared/hooks/useAgendaNavigation';
import type { AgendaEvent } from './types';

interface AgendaContainerProps {
  upcomingEvents?: AgendaEvent[];
  pastEvents?: AgendaEvent[];
  calendarEvents?: AgendaEvent[];
}

const AgendaContainer: React.FC<AgendaContainerProps> = ({
  upcomingEvents = [],
  pastEvents = [],
  calendarEvents = [],
}) => {
  const state = useAgendaState();
  const [dateFilter, setDateFilter] = React.useState<Date | null>(null);
  
  const filters = useAgendaFilters(
    upcomingEvents,
    pastEvents,
    calendarEvents,
    state.searchQuery,
    dateFilter
  );

const nav = useNavLogic(
  state.view,
  state.selectedDate,
  state.setSelectedDate,
  state.currentMonth,
  state.setCurrentMonth,
  state.showAllEvents,       
  state.setShowAllEvents,    
  state.setShowAllPastEvents  
);
  const displayUpcoming = React.useMemo(() => {
    if (dateFilter || state.searchQuery.trim()) {
      return filters.filteredUpcoming;
    }
    return filters.filteredUpcoming.slice(0, 3);
  }, [filters.filteredUpcoming, dateFilter, state.searchQuery]);
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1">
              <SearchBar
                searchQuery={state.searchQuery}
                onSearchChange={state.setSearchQuery}
                onSearchSubmit={() => {}}
              />
            </div>

            <div className="flex items-center gap-2">
              <DateSearch
                selectedDate={dateFilter || new Date()}
                onDateChange={(d: Date) => setDateFilter(d)}
              />
              
              {dateFilter && (
                <button
                  onClick={() => setDateFilter(null)}
                  className="text-sm text-gray-600 hover:text-gray-900 underline"
                >
                  Réinitialiser
                </button>
              )}
            </div>

            <ViewToggle view={state.view} onViewChange={state.setView} />
          </div>
        </div>
      </div>
      <div className="max-w-8xl mx-auto px-4 py-8">
        {state.view === 'liste' && (
          <ListView
            upcomingEvents={displayUpcoming}
            pastEvents={filters.filteredPast}
            showAllEvents={state.showAllEvents}
            showAllPastEvents={state.showAllPastEvents}
            onToggleAllPastEvents={() => state.setShowAllPastEvents(true)}
          />
        )}
        {state.view === 'mois' && (
          <MonthView 
            currentMonth={state.currentMonth} 
            calendarEvents={calendarEvents} 
          />
        )}
   {state.view === 'jour' && (
          <DayView
            selectedDate={state.selectedDate}
            dayEvents={filters.dayEvents}
            onPreviousDay={() => {
              const newDate = new Date(state.selectedDate);
              newDate.setDate(newDate.getDate() - 1);
              state.setSelectedDate(newDate);
            }}
            onNextDay={() => {
              const newDate = new Date(state.selectedDate);
              newDate.setDate(newDate.getDate() + 1);
              state.setSelectedDate(newDate);
            }}
          /> )}</div></div>);};
export default AgendaContainer;
