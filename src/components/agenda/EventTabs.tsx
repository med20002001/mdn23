interface Props {
  activeTab?: 'liste' | 'mois' | 'jour';
  onTabChange?: (tab: 'liste' | 'mois' | 'jour') => void;
}

export default function EventTabs({ activeTab = 'liste', onTabChange }: Props) {
  const handleClick = (tab: 'liste' | 'mois' | 'jour', e: React.MouseEvent) => {
    if (onTabChange) {
      e.preventDefault();
      onTabChange(tab);
    }
  };

  return (
    <div className="flex items-center gap-4 text-sm text-gray-600">
      <a 
        href="/agenda?view=liste" 
        onClick={(e) => handleClick('liste', e)}
        className={`hover:text-gray-900 pb-1 transition-colors ${
          activeTab === 'liste' ? 'border-b-2 border-blue-600 text-gray-900 font-medium' : ''
        }`}
      >
        Liste
      </a>
      <a 
        href="/agenda?view=mois" 
        onClick={(e) => handleClick('mois', e)}
        className={`hover:text-gray-900 pb-1 transition-colors ${
          activeTab === 'mois' ? 'border-b-2 border-blue-600 text-gray-900 font-medium' : ''
        }`}
      >
        Mois
      </a>
      <a 
        href="/agenda?view=jour" 
        onClick={(e) => handleClick('jour', e)}
        className={`hover:text-gray-900 pb-1 transition-colors ${
          activeTab === 'jour' ? 'border-b-2 border-blue-600 text-gray-900 font-medium' : ''
        }`}
      >
        Jour
      </a>
    </div>
  );
}
