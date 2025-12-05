type ViewFilter = 'upcoming' | 'past' | 'all';

interface Props {
  selectedView: ViewFilter;
  onSelect: (view: ViewFilter) => void;
  onClose: () => void;
}

export default function ListViewPicker({ selectedView, onSelect }: Props) {
  const views: { value: ViewFilter; label: string }[] = [
    { value: 'upcoming', label: 'À venir' },
    { value: 'past', label: 'Événements passés' },
    { value: 'all', label: 'Tous les événements' },
  ];

  return (
    <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 min-w-[200px]">
      {views.map((view) => (
        <button
          key={view.value}
          onClick={() => onSelect(view.value)}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
            selectedView === view.value ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
          }`}
        >
          {view.label}
        </button>
      ))}
    </div>
  );
}
