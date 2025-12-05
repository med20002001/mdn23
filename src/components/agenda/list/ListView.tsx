import { useState, useRef, useEffect } from 'react';
import EventList from './EventList';
import ListViewPicker from './ListViewPicker.tsx';
import { ViewHeaderNavigation } from '../header';

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
  upcomingEvents: Event[];
  pastEvents: Event[];
}

type ViewFilter = 'upcoming' | 'past' | 'all';

export default function ListView({ upcomingEvents, pastEvents }: Props) {
  const [selectedView, setSelectedView] = useState<ViewFilter>('upcoming');
  const [showViewPicker, setShowViewPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Fermer le dropdown si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowViewPicker(false);
      }
    };

    if (showViewPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showViewPicker]);

  // Obtenir le label selon la vue sélectionnée
  const getViewLabel = () => {
    switch (selectedView) {
      case 'upcoming':
        return 'À venir';
      case 'past':
        return 'Passés';
      case 'all':
        return 'Tous les événements';
      default:
        return 'À venir';
    }
  };

  // Filtrer les événements selon la vue
  const displayedUpcomingEvents = selectedView === 'upcoming' || selectedView === 'all' ? upcomingEvents : [];
  const displayedPastEvents = selectedView === 'past' || selectedView === 'all' ? pastEvents : [];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header avec navigation */}
      <div ref={pickerRef}>
        <ViewHeaderNavigation
          title={getViewLabel()}
          showNavigation={true}
          onPrevious={() => {
            if (selectedView === 'upcoming') setSelectedView('past');
            else if (selectedView === 'past') setSelectedView('upcoming');
          }}
          onNext={() => {
            if (selectedView === 'upcoming') setSelectedView('past');
            else if (selectedView === 'past') setSelectedView('upcoming');
          }}
          onToday={() => setSelectedView('upcoming')}
          todayLabel="Ce mois-ci"
          showDropdown={true}
          isDropdownOpen={showViewPicker}
          onDropdownToggle={() => setShowViewPicker(!showViewPicker)}
          dropdownContent={
            <ListViewPicker
              selectedView={selectedView}
              onSelect={(view: ViewFilter) => {
                setSelectedView(view);
                setShowViewPicker(false);
              }}
              onClose={() => setShowViewPicker(false)}
            />
          }
        />
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Événements à venir */}
        {displayedUpcomingEvents.length > 0 ? (
          <EventList events={displayedUpcomingEvents} />
        ) : selectedView === 'upcoming' && (
          <div className="bg-gray-100 rounded-lg py-6 px-4 flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm text-gray-700">Il n'y a pas d'événements à venir.</span>
          </div>
        )}

        {/* Événements passés */}
        {displayedPastEvents.length > 0 && (
          <div className={displayedUpcomingEvents.length > 0 ? 'mt-16' : ''}>
            {selectedView === 'all' && (
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Derniers Événements passés</h2>
            )}
            <EventList events={displayedPastEvents} showPastIndicator={true} />
          </div>
        )}
      </div>
    </div>
  );
}
