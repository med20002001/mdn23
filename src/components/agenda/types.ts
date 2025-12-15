export type ViewType = 'liste' | 'mois' | 'jour';

export interface AgendaEvent {
  slug: string;
  title: string;
  date: Date;
  datetime: string;
  location: string;
  description?: string;
  image?: string;
  organizer?: string;
  organizerEmail?: string;
  organizerWebsite?: string;
  venueWebsite?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
  googleMapsUrl?: string;
}

export interface DayInfo {
  day: number;
  isCurrentMonth: boolean;
  date: Date;
  hasEvent: boolean;
}
