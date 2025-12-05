interface Props {
  datetime: string;
  title: string;
  location?: string;
  description?: string;
  href: string;
}

export default function DayEventCard({ datetime, title, location, description, href }: Props) {
  return (
    <a
      href={href}
      className="block border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-blue-500 transition-all"
    >
      <div className="flex items-start gap-4">
        {/* Heure */}
        <div className="text-sm text-gray-600 min-w-[80px]">
          {datetime}
        </div>

        {/* Contenu */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {title}
          </h3>
          
          {location && (
            <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </p>
          )}

          {description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>
    </a>
  );
}
