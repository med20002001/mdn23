import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ButtonAgenda } from "@/components/ui/button-agenda";
import { Calendar, ChevronDown } from "lucide-react";

interface AddToCalendarProps {
  title: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
}

export default function AddToCalendarButton({
  title,
  description = '',
  location = '',
  startDate,
  endDate,
}: AddToCalendarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Formater la date pour les liens calendrier
  const formatDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : formatDate(new Date(startDate.getTime() + 60 * 60 * 1000));

  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedLocation = encodeURIComponent(location);

  // URLs pour chaque service
  const calendarLinks = {
    google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${start}/${end}&details=${encodedDescription}&location=${encodedLocation}`,
    
    icalendar: `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${typeof window !== 'undefined' ? window.location.href : ''}
DTSTART:${start}
DTEND:${end}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`,
    
    outlook365: `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodedTitle}&startdt=${start}&enddt=${end}&body=${encodedDescription}&location=${encodedLocation}`,
    
    outlookLive: `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodedTitle}&startdt=${start}&enddt=${end}&body=${encodedDescription}&location=${encodedLocation}`,
  };

  const handleCalendarClick = (type: keyof typeof calendarLinks) => {
    const link = calendarLinks[type];
    
    if (type === 'icalendar') {
      const blob = new Blob([link.replace('data:text/calendar;charset=utf8,', '')], {
        type: 'text/calendar',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.ics`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
    
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <ButtonAgenda variant="outline" className="gap-2">
          <Calendar className="w-5 h-5" />
          Ajouter au calendrier
          <ChevronDown className="w-4 h-4" />
        </ButtonAgenda>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="start" className="w-56">
        {/* Google Agenda */}
        <DropdownMenuItem 
          onClick={() => handleCalendarClick('google')}
          className="gap-3"
        >
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.46 12.26c0-.81-.07-1.6-.2-2.36H12v4.46h5.88c-.25 1.32-1 2.43-2.13 3.18v2.74h3.45c2.02-1.86 3.18-4.6 3.18-7.86z" fill="#4285F4"/>
            <path d="M12 23c2.88 0 5.3-.95 7.06-2.58l-3.45-2.68c-.95.64-2.17 1.02-3.61 1.02-2.77 0-5.12-1.87-5.95-4.39H2.49v2.76C4.25 21.02 7.87 23 12 23z" fill="#34A853"/>
            <path d="M6.05 14.37c-.21-.64-.33-1.32-.33-2.02s.12-1.38.33-2.02V7.57H2.49C1.82 8.89 1.43 10.4 1.43 12s.39 3.11 1.06 4.43l3.56-2.76z" fill="#FBBC05"/>
            <path d="M12 5.56c1.56 0 2.97.54 4.07 1.6l3.05-3.05C17.3 2.42 14.88 1 12 1 7.87 1 4.25 2.98 2.49 6.87l3.56 2.76C6.88 7.43 9.23 5.56 12 5.56z" fill="#EA4335"/>
          </svg>
          <span>Google Agenda</span>
        </DropdownMenuItem>

        {/* iCalendar */}
        <DropdownMenuItem 
          onClick={() => handleCalendarClick('icalendar')}
          className="gap-3"
        >
          <svg className="w-5 h-5 flex-shrink-0 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
            <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
            <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
            <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
          </svg>
          <span>iCalendar</span>
        </DropdownMenuItem>

        {/* Outlook 365 */}
        <DropdownMenuItem 
          onClick={() => handleCalendarClick('outlook365')}
          className="gap-3"
        >
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 3H3v18h18V3zM12 16.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z" fill="#0078D4"/>
            <path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="#fff"/>
          </svg>
          <span>Outlook 365</span>
        </DropdownMenuItem>

        {/* Outlook Live */}
        <DropdownMenuItem 
          onClick={() => handleCalendarClick('outlookLive')}
          className="gap-3"
        >
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 3H3v18h18V3zM12 16.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z" fill="#0072C6"/>
            <path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="#fff"/>
          </svg>
          <span>Outlook Live</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
