interface Props {
  title: string;
  showNavigation?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  onToday?: () => void;
  todayLabel?: string;
  showDropdown?: boolean;
  dropdownContent?: React.ReactNode;
  isDropdownOpen?: boolean;
  onDropdownToggle?: () => void;
}

export default function ViewHeaderNavigation({ 
  title,
  showNavigation = false,
  onPrevious,
  onNext,
  onToday,
  todayLabel = "Ce mois-ci",
  showDropdown = true,
  dropdownContent,
  isDropdownOpen = false,
  onDropdownToggle
}: Props) {
  return (
    <div className="bg-white border-b border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {showNavigation && (
            <div className="flex items-center gap-2">
              <button
                onClick={onPrevious}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={onNext}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {onToday && (
                <button
                  onClick={onToday}
                  className="ml-2 px-4 py-2 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 font-medium"
                >
                  {todayLabel}
                </button>
              )}
            </div>
          )}

          <div className={`relative ${!showNavigation ? '' : 'ml-auto'}`}>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold capitalize">{title}</h2>
              {showDropdown && onDropdownToggle && (
                <button 
                  onClick={onDropdownToggle}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>

            {isDropdownOpen && dropdownContent}
          </div>
        </div>
      </div>
    </div>
  );
}
