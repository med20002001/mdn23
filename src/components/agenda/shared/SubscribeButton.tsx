import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { CalendarPlus, ChevronDown, Globe, Apple, Mail, Download } from "lucide-react";

interface EventData {
  title: string;
  description: string;
  location: string;
  startDate: string; 
  endDate: string;   
}

interface SubscribeButtonProps {
  event?: EventData;
}

export default function SubscribeButton({ event }: SubscribeButtonProps) {
  // Fonction pour formater les dates au format ISO requis
  const formatDateToISO = (dateString: string) => {
    return new Date(dateString).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  // 1. Google Calendar
  const handleGoogleCalendar = () => {
    if (!event) return;
    
    const startDate = formatDateToISO(event.startDate);
    const endDate = formatDateToISO(event.endDate);
    
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(googleUrl, '_blank');
  };

  const handleOutlook = () => {
    if (!event) return;
    const outlookUrl = `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.title)}&body=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&startdt=${event.startDate}&enddt=${event.endDate}`;
    window.open(outlookUrl, '_blank');
  };

  const generateICS = () => {
    if (!event) return '';
    
    const startDate = formatDateToISO(event.startDate);
    const endDate = formatDateToISO(event.endDate);
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Mon Site//Mon Calendrier//FR',
      'BEGIN:VEVENT',
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${event.location}`,
      `UID:${Date.now()}@monsite.com`,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    return icsContent;
  };
  const downloadICS = (filename: string) => {
    const icsContent = generateICS();
    if (!icsContent) return;
    
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClick = (label: string) => {
    switch (label) {
      case "Google Calendar":
        handleGoogleCalendar();
        break;
      case "Outlook":
        handleOutlook();
        break;
    }
  };
  if (!event) {
    return (
      <Button variant="outline" disabled className="gap-2">
        <CalendarPlus className="w-4 h-4" />
        Ajouter au calendrier
        <ChevronDown className="w-4 h-4 opacity-70" />
      </Button>
    );
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"       >
          <CalendarPlus className="w-4 h-4" />
          Ajouter au calendrier
          <ChevronDown className="w-4 h-4 opacity-70" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        className="w-72 rounded-lg border bg-white p-2 shadow-md"
      >
        <PopoverClose asChild>
          <MenuItem icon={<Globe className="w-4 h-4" />} label="Google Calendar" onClick={handleClick} />
        </PopoverClose>
        <PopoverClose asChild>
          <MenuItem icon={<Apple className="w-4 h-4" />} label="Apple Calendar (iCal)" onClick={handleClick} />
        </PopoverClose>
        <PopoverClose asChild>
          <MenuItem icon={<Mail className="w-4 h-4" />} label="Outlook" onClick={handleClick} />
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
function MenuItem({ icon,label,onClick,}: {icon: React.ReactNode;label: string;onClick: (label: string) => void;
}) {
  return (
    <button onClick={() => onClick(label)}className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted focus:outline-none focus-visible:ring-1 focus-visible:ring-ring">
      <span className="text-muted-foreground">{icon}</span><span>{label}</span>
    </button>
  );
}
