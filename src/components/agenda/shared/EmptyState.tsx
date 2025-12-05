interface Props {
  message?: string;
  submessage?: string;
}

export default function EmptyState({ 
  message = "Aucun événement", 
  submessage = "Il n'y a pas d'événements à venir." 
}: Props) {
  return (
    <div className="text-center py-20 text-gray-500">
      <svg 
        className="w-16 h-16 mx-auto mb-4 text-gray-400" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
        />
      </svg>
      <p className="text-lg font-medium mb-1">{message}</p>
      <p className="text-sm">{submessage}</p>
    </div>
  );
}
