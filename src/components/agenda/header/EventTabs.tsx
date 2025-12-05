interface Props {
  activeTab?: 'liste' | 'mois' | 'jour';
  onTabChange?: (tab: 'liste' | 'mois' | 'jour') => void;
}

export default function EventTabs({ activeTab = 'liste', onTabChange }: Props) {
  const handleClick = (tab: 'liste' | 'mois' | 'jour') => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="flex items-center gap-4 text-sm text-gray-600">
      <button
        onClick={() => handleClick('liste')}
        className={`hover:text-gray-900 pb-1 transition-colors cursor-pointer ${
          activeTab === 'liste' ? 'border-b-2 border-blue-600 text-gray-900 font-medium' : ''
        }`}
      >
        Liste
      </button>
      <button
        onClick={() => handleClick('mois')}
        className={`hover:text-gray-900 pb-1 transition-colors cursor-pointer ${
          activeTab === 'mois' ? 'border-b-2 border-blue-600 text-gray-900 font-medium' : ''
        }`}
      >
        Mois
      </button>
      <button
        onClick={() => handleClick('jour')}
        className={`hover:text-gray-900 pb-1 transition-colors cursor-pointer ${
          activeTab === 'jour' ? 'border-b-2 border-blue-600 text-gray-900 font-medium' : ''
        }`}
      >
        Jour
      </button>
    </div>
  );
}
