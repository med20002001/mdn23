interface EventCardProps {
  month: string;
  day: string;
  year: string;
  datetime: string;
  title: string;
  location: string;
  description: string;
  image: string;
  href: string;
  isPast?: boolean;
}

export default function EventCard({
  month,
  day,
  year,
  datetime,
  title,
  location,
  description,
  image,
  href,
  isPast = false,
}: EventCardProps) {
  return (
    <article className={`grid grid-cols-1 md:grid-cols-[80px_1fr_320px] gap-6 border-t border-gray-200 pt-8 ${
      isPast ? 'opacity-75' : ''
    }`}>
      {/* Date */}
      <div className="text-center md:text-left">
        <p className={`text-xs uppercase font-medium ${isPast ? 'text-gray-500' : 'text-blue-700'}`}>
          {month}
        </p>
        <p className="text-3xl font-bold text-gray-900">{day}</p>
        <p className="text-xs text-gray-500">{year}</p>
      </div>
      
      {/* Contenu */}
      <div>
        <p className="text-sm text-gray-500 mb-1">{datetime}</p>
        <a 
          href={href} 
          className="text-lg font-bold text-gray-900 hover:text-blue-700 block mb-2 transition-colors"
        >
          {title}
        </a>
        <p className="text-sm text-gray-600 mb-3 flex items-start gap-1">
          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{location}</span>
        </p>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
      
      {/* Image */}
      <div className="hidden md:block">
        <a href={href} className="block">
          {title === "Dia Internacional De La Dona" ? (
            <div className="w-full max-w-sm mx-auto rounded overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-auto object-contain" 
                loading="lazy" 
              />
            </div>
          ) : (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-44 object-cover rounded shadow-md hover:shadow-lg transition-shadow" 
              loading="lazy" 
            />
          )}
        </a>
      </div>
    </article>
  );
}
