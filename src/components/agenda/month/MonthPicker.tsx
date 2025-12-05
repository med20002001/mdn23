import { useState } from 'react';

interface Props {
  currentDate: Date;
  onSelect: (date: Date) => void;
  onClose: () => void;
}

export default function MonthPicker({ currentDate, onSelect, onClose }: Props) {
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const currentMonth = currentDate.getMonth();

  const months = [
    'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jui',
    'Jui', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'
  ];

  const handleMonthClick = (monthIndex: number) => {
    const newDate = new Date(selectedYear, monthIndex, 1);
    onSelect(newDate);
    onClose();
  };

  const goToPreviousYear = () => {
    setSelectedYear(selectedYear - 1);
  };

  const goToNextYear = () => {
    setSelectedYear(selectedYear + 1);
  };

  return (
    <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50 w-80">
      {/* Header avec année */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousYear}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <span className="text-lg font-semibold">{selectedYear}</span>

        <button
          onClick={goToNextYear}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Grille des mois */}
      <div className="grid grid-cols-4 gap-2">
        {months.map((month, index) => {
          const isSelected = index === currentMonth && selectedYear === currentDate.getFullYear();
          const isCurrentMonth = 
            index === new Date().getMonth() && 
            selectedYear === new Date().getFullYear();

          return (
            <button
              key={month}
              onClick={() => handleMonthClick(index)}
              className={`px-3 py-2 text-sm rounded transition-colors ${
                isSelected
                  ? 'bg-blue-600 text-white font-medium'
                  : isCurrentMonth
                  ? 'bg-gray-100 hover:bg-gray-200'
                  : 'hover:bg-gray-100'
              }`}
            >
              {month}
            </button>
          );
        })}
      </div>
    </div>
  );
}
