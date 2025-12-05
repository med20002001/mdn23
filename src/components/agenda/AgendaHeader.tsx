import EventSearchBar from './EventSearchBar';
import EventTabs from './EventTabs';
import CalendarNavigation from './CalendarNavigation';

interface Props {
  activeTab?: 'liste' | 'mois' | 'jour';
  onSearch?: (query: string) => void;
  onTabChange?: (tab: 'liste' | 'mois' | 'jour') => void;
  showCalendarNav?: boolean;
}

export default function AgendaHeader({ 
  activeTab = 'liste', 
  onSearch,
  onTabChange,
  showCalendarNav = true 
}: Props) {
  return (
    <>
      {/* Barre de recherche et onglets */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <EventSearchBar onSearch={onSearch} />
          <EventTabs activeTab={activeTab} onTabChange={onTabChange} />
        </div>
      </div>

      {/* Navigation calendrier */}
      {showCalendarNav && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <CalendarNavigation />
          </div>
        </div>
      )}
    </>
  );
}
