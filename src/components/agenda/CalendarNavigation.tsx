import CalendarDropdown from '../CalendarDropdown';

interface Props {
  currentDate?: Date;
  onPrevious?: () => void;
  onNext?: () => void;
  onToday?: () => void;
}

export default function CalendarNavigation({ 
  currentDate = new Date(), 
  onPrevious, 
  onNext, 
  onToday 
}: Props) {
  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  const handleToday = () => {
    if (onToday) {
      onToday();
    }
  };

  return (
    <div className="flex items-center gap-4 text-sm">
      {/* Bouton Précédent */}
      <button 
        onClick={handlePrevious}
        className="text-gray-500 hover:text-gray-900 transition-colors p-1 rounded hover:bg-gray-100"
        aria-label="Mois précédent"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      {/* Bouton Suivant */}
      <button 
        onClick={handleNext}
        className="text-gray-500 hover:text-gray-900 transition-colors p-1 rounded hover:bg-gray-100"
        aria-label="Mois suivant"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Bouton Aujourd'hui */}
      <button 
        onClick={handleToday}
        className="border border-gray-300 rounded px-3 py-1.5 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
      >
        Aujourd'hui
      </button>
      
      {/* Dropdown Calendrier - SANS client:load */}
      <div className="inline-block">
        <CalendarDropdown />
      </div>
    </div>
  );
}
