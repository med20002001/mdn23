import { useState } from 'react';

interface Props {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export default function EventSearchBar({ 
  onSearch, 
  placeholder = "Rechercher évènements" 
}: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      // Redirection par défaut
      window.location.href = `/agenda?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
        />
        <svg 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium text-white rounded bg-blue-600 hover:bg-blue-700 transition-colors"
      >
        Chercher
      </button>
    </form>
  );
}
