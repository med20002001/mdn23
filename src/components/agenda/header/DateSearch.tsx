import React from 'react';

type DateSearchProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

function toYyyyMmDd(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function DateSearch({ selectedDate, onDateChange }: DateSearchProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="date"
        value={toYyyyMmDd(selectedDate)}
        onChange={(e) => {
          const v = e.target.value;
          if (!v) return;
          onDateChange(new Date(`${v}T00:00:00`));
        }}
        className="border rounded-md px-3 py-2 text-sm bg-white"
      />

    </div>
  );
}
