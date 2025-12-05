interface Props {
  title: string;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  todayLabel?: string;
}

export default function CalendarHeader({
  title,
  onPrevious,
  onNext,
  onToday,
  todayLabel = "Aujourd'hui"
}: Props) {
  return (
    <div className="flex items-center justify-between mb-6 px-4">
      <button
        onClick={onPrevious}
        className="p-2 hover:bg-gray-100 rounded transition-colors"
        aria-label="Précédent"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="flex items-center gap-3">
        <button
          onClick={onToday}
          className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 font-medium"
        >
          {todayLabel}
        </button>
        <h2 className="text-xl font-semibold capitalize">{title}</h2>
      </div>

      <button
        onClick={onNext}
        className="p-2 hover:bg-gray-100 rounded transition-colors"
        aria-label="Suivant"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
