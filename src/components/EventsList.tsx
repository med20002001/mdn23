// src/components/EventsList.tsx
import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import EventCard from '@/components/EventCard';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  speakers?: string[];
  status: 'upcoming' | 'passed';
}

const events: Event[] = [
  {
    id: 1,
    title: 'Musica Mundo Series',
    date: '2024-04-21',
    time: '16:00 - 18:30',
    location: 'Théâtre De Lieve Wouw Lieve Vouwstraat 13, Amersfoort',
    description: 'Hamid Bouchnak & l\'Orchestre Andalou d\'Amsterdam. La star marocaine et l\'orchestre donnent une nouvelle dimension à la musique andalouse et au raï. Lors de ce concert, l\'Orchestre Andalou d\'Amsterdam s\'engage dans une nouvelle collaboration spéciale. Le musicien populaire Hamid Bouchnak visite spécialement du Maroc pour ce concert.',
    image: '/images/events/musica-mundo.jpg',
    speakers: ['Hamid Bouchnak'],
    status: 'passed'
  },
  {
    id: 2,
    title: 'Architecture en mutation: Réinventer l\'approche opérationnelle',
    date: '2024-03-14',
    time: '12:00 - 13:15',
    location: 'Stair Lille 74 Rue des Arts, Lille',
    description: 'En mars, nous avons le plaisir d\'accueillir deux speakers ! B comme d\'habitude, même endroit, même heure ! La programme : 12h20 - Début de la présentation 13h - Questions/Réponses 13h10 - À table ! On vous réserve un repas bien mémé ! B pour ce qui est du menu, il est unique et...',
    image: '/images/events/architecture.jpg',
    speakers: ['Speaker 1', 'Speaker 2'],
    status: 'passed'
  },
  {
    id: 3,
    title: 'Día Internacional De La Dona',
    date: '2024-03-09',
    time: '17:00 - 19:00',
    location: 'Museo de Gavà - Torre Lluch Playa de Dolors Club, 13, Gavà',
    description: 'Célébrem i reconeixem el paper essencial de les dones en la construcció d\'una societat igualitaria! Conferència Commemoració Exposició de pintura Berenar amb la i dolços àrabs! Uni',
    image: '/images/events/dia-dona.jpg',
    status: 'passed'
  },
  {
    id: 4,
    title: 'Conférence: Avenir de la Diaspora Marocaine',
    date: '2025-01-15',
    time: '19:00 - 21:00',
    location: 'Centre Culturel Mohamed V, Paris',
    description: 'Discussion sur les perspectives et opportunités pour la diaspora marocaine en Europe.',
    image: '/images/events/conference.jpg',
    status: 'upcoming'
  },
];

type ViewType = 'list' | 'month' | 'day';

export default function EventsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewType, setViewType] = useState<ViewType>('list');
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'passed'>('all');

  // Filtrer les événements
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  // Grouper par date pour la vue mois
  const groupedByMonth = useMemo(() => {
    const grouped: Record<string, Event[]> = {};
    filteredEvents.forEach((event) => {
      const month = event.date.substring(0, 7); // YYYY-MM
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(event);
    });
    return grouped;
  }, [filteredEvents]);

  return (
    <div className="space-y-6">
      {/* Barre de recherche */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Rechercher événements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filtrage */}
        <div className="flex gap-2">
          <Button
            onClick={() => setFilterStatus('all')}
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            size="sm"
          >
            Tous
          </Button>
          <Button
            onClick={() => setFilterStatus('upcoming')}
            variant={filterStatus === 'upcoming' ? 'default' : 'outline'}
            size="sm"
          >
            À venir
          </Button>
          <Button
            onClick={() => setFilterStatus('passed')}
            variant={filterStatus === 'passed' ? 'default' : 'outline'}
            size="sm"
          >
            Passés
          </Button>
        </div>
      </div>

      {/* Onglets de vue */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setViewType('list')}
          className={`px-4 py-2 font-medium transition-colors ${
            viewType === 'list'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Liste
        </button>
        <button
          onClick={() => setViewType('month')}
          className={`px-4 py-2 font-medium transition-colors ${
            viewType === 'month'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Mois
        </button>
        <button
          onClick={() => setViewType('day')}
          className={`px-4 py-2 font-medium transition-colors ${
            viewType === 'day'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Jour
        </button>
      </div>

      {/* Affichage Vue Liste */}
      {viewType === 'list' && (
        <div className="space-y-6">
          {filteredEvents.length === 0 ? (
            <p className="py-8 text-center text-slate-500">
              Aucun événement trouvé
            </p>
          ) : (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          )}
        </div>
      )}

      {/* Affichage Vue Mois */}
      {viewType === 'month' && (
        <div className="space-y-8">
          {Object.entries(groupedByMonth).map(([month, monthEvents]) => (
            <div key={month}>
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                {new Date(month + '-01').toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long'
                })}
              </h3>
              <div className="space-y-4">
                {monthEvents.map((event) => (
                  <EventCard key={event.id} event={event} compact />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Affichage Vue Jour (Aujourd'hui + semaine) */}
      {viewType === 'day' && (
        <div className="space-y-4">
          {filteredEvents.length === 0 ? (
            <p className="py-8 text-center text-slate-500">
              Aucun événement pour cette période
            </p>
          ) : (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} compact />
            ))
          )}
        </div>
      )}
    </div>
  );
}
