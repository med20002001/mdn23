import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Search, ChevronDown } from 'lucide-react';

const AgendaContainer = ({ upcomingEvents = [], pastEvents = [], calendarEvents = [] }) => {
  const [view, setView] = useState('liste');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showAllPastEvents, setShowAllPastEvents] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);
  
  // États pour les dropdowns
  const [showListeDropdown, setShowListeDropdown] = useState(false);
  const [showMoisDropdown, setShowMoisDropdown] = useState(false);
  const [showJourDropdown, setShowJourDropdown] = useState(false);
  const [showSubscribeDropdown, setShowSubscribeDropdown] = useState(false);

  // Fonction pour formater les dates
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  // Fonction pour obtenir les jours du mois
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const adjustedStart = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;
    
    const days = [];
    
    // Jours du mois précédent
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = adjustedStart - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthLastDay - i)
      });
    }
    
    // Jours du mois actuel
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i)
      });
    }
    
    // Jours du mois suivant
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i)
      });
    }
    
    return days;
  };

  // Filtrer les événements par recherche
  const filteredUpcoming = useMemo(() => {
    if (!searchQuery) return upcomingEvents;
    return upcomingEvents.filter(event => 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [upcomingEvents, searchQuery]);

  const filteredPast = useMemo(() => {
    if (!searchQuery) return pastEvents;
    return pastEvents.filter(event => 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [pastEvents, searchQuery]);

  // Afficher seulement les 3 derniers événements passés par défaut
  const displayedPastEvents = showAllPastEvents ? filteredPast : filteredPast.slice(0, 3);

  // Obtenir les événements pour un jour spécifique
  const getEventsForDay = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return calendarEvents.filter(event => {
      const eventDateStr = new Date(event.date).toISOString().split('T')[0];
      return eventDateStr === dateStr;
    });
  };

  // Obtenir les événements pour le jour sélectionné
  const dayEvents = useMemo(() => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    return calendarEvents.filter(event => {
      const eventDateStr = new Date(event.date).toISOString().split('T')[0];
      return eventDateStr === dateStr;
    });
  }, [calendarEvents, selectedDate]);

  // Navigation mois
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // Toggle affichage tous les événements (passés + à venir)
  const toggleShowAllEvents = () => {
    setShowAllEvents(!showAllEvents);
    if (!showAllEvents) {
      setShowAllPastEvents(true);
    }
  };

  // Navigation jour
  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
    setCurrentMonth(new Date());
  };

  // Sélectionner un mois dans le dropdown
  const selectMonth = (monthIndex) => {
    const newDate = new Date(currentMonth.getFullYear(), monthIndex, 1);
    setCurrentMonth(newDate);
    setShowMoisDropdown(false);
  };

  // Sélectionner une année dans le dropdown
  const selectYear = (year) => {
    const newDate = new Date(year, currentMonth.getMonth(), 1);
    setCurrentMonth(newDate);
    setShowMoisDropdown(false);
  };

  const monthName = currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  const days = getDaysInMonth(currentMonth);
  const weekDays = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  const currentYear = currentMonth.getFullYear();
  const years = Array.from({length: 5}, (_, i) => currentYear - 2 + i);

  // Texte de la période affichée
  const getDateRangeText = () => {
    if (showAllEvents && filteredPast.length > 0 && filteredUpcoming.length > 0) {
      const oldestEvent = filteredPast[filteredPast.length - 1];
      const newestEvent = filteredUpcoming[filteredUpcoming.length - 1];
      const startDate = new Date(oldestEvent.date).toLocaleDateString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' });
      const endDate = new Date(newestEvent.date).toLocaleDateString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' });
      return `${startDate} - ${endDate}`;
    }
    return 'À venir';
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Barre de recherche */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher événements"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
            >
              Chercher
            </button>
            <button
              onClick={() => setView('liste')}
              className={`px-4 py-2 rounded-md font-medium ${
                view === 'liste' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border'
              }`}
            >
              Liste
            </button>
            <button
              onClick={() => setView('mois')}
              className={`px-4 py-2 rounded-md font-medium ${
                view === 'mois' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border'
              }`}
            >
              Mois
            </button>
            <button
              onClick={() => setView('jour')}
              className={`px-4 py-2 rounded-md font-medium ${
                view === 'jour' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border'
              }`}
            >
              Jour
            </button>
          </div>
        </div>
      </div>

      {/* Navigation et Vues */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            {/* Navigation temporelle */}
            <button
              onClick={view === 'liste' ? toggleShowAllEvents : (view === 'jour' ? goToPreviousDay : goToPreviousMonth)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={view === 'jour' ? goToNextDay : goToNextMonth}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            {view === 'liste' && (
              <div className="relative">
                <button
                  onClick={() => setShowListeDropdown(!showListeDropdown)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  Aujourd'hui
                </button>
                <button
                  onClick={() => setShowListeDropdown(!showListeDropdown)}
                  className="ml-2 flex items-center gap-2 text-lg font-medium hover:bg-gray-100 px-3 py-1 rounded"
                >
                  {getDateRangeText()}
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showListeDropdown && (
                  <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-4 z-50 w-64">
                    <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                      {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
                        <div key={i} className="font-semibold text-gray-600">{day}</div>
                      ))}
                    </div>
                    <div className="text-center mb-2">
                      <button className="text-sm font-medium">décembre 2025</button>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {getDaysInMonth(new Date()).map((day, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedDate(day.date);
                            setShowListeDropdown(false);
                          }}
                          className={`p-1 text-sm rounded ${
                            !day.isCurrentMonth ? 'text-gray-400' : 'text-gray-900'
                          } ${
                            new Date().toDateString() === day.date.toDateString()
                              ? 'bg-blue-600 text-white'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {day.day}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {view === 'mois' && (
              <div className="relative">
                <button
                  onClick={() => setShowMoisDropdown(!showMoisDropdown)}
                  className="flex items-center gap-2 text-lg font-medium hover:bg-gray-100 px-3 py-1 rounded"
                >
                  {monthName}
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showMoisDropdown && (
                  <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-4 z-50">
                    <div className="text-center mb-3 font-bold">{currentYear}</div>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {months.map((month, idx) => (
                        <button
                          key={idx}
                          onClick={() => selectMonth(idx)}
                          className={`px-3 py-2 text-sm rounded ${
                            currentMonth.getMonth() === idx
                              ? 'bg-blue-600 text-white'
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          {month}
                        </button>
                      ))}
                    </div>
                    <div className="border-t pt-3">
                      <div className="grid grid-cols-3 gap-2">
                        {years.map((year) => (
                          <button
                            key={year}
                            onClick={() => selectYear(year)}
                            className={`px-3 py-2 text-sm rounded ${
                              currentYear === year
                                ? 'bg-blue-600 text-white'
                                : 'hover:bg-gray-100 text-gray-700'
                            }`}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {view === 'jour' && (
              <div className="relative">
                <button
                  onClick={() => setShowJourDropdown(!showJourDropdown)}
                  className="flex items-center gap-2 text-lg font-medium hover:bg-gray-100 px-3 py-1 rounded"
                >
                  {formatDate(selectedDate)}
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showJourDropdown && (
                  <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-4 z-50 w-80">
                    <div className="flex items-center justify-between mb-3">
                      <button onClick={() => {
                        const newDate = new Date(selectedDate);
                        newDate.setMonth(newDate.getMonth() - 1);
                        setSelectedDate(newDate);
                      }}>
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <div className="text-sm font-medium">
                        {selectedDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                      </div>
                      <button onClick={() => {
                        const newDate = new Date(selectedDate);
                        newDate.setMonth(newDate.getMonth() + 1);
                        setSelectedDate(newDate);
                      }}>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                      {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
                        <div key={i} className="font-semibold text-gray-600">{day}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {getDaysInMonth(selectedDate).map((day, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedDate(day.date);
                            setShowJourDropdown(false);
                          }}
                          className={`p-2 text-sm rounded ${
                            !day.isCurrentMonth ? 'text-gray-400' : 'text-gray-900'
                          } ${
                            selectedDate.toDateString() === day.date.toDateString()
                              ? 'bg-blue-600 text-white'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {day.day}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contenu selon la vue */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {view === 'liste' && (
          <div>
            {/* Événements passés d'abord si showAllEvents */}
            {showAllEvents && filteredPast.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Événements passés</h2>
                {filteredPast.map((event, idx) => (
                  <div key={idx} className="mb-6 border-b pb-6">
                    <div className="flex gap-6">
                      <div className="flex-shrink-0 text-center">
                        <div className="bg-gray-100 rounded p-3 w-16">
                          <div className="text-xs text-gray-600 uppercase">{event.month}</div>
                          <div className="text-2xl font-bold text-gray-900">{event.day}</div>
                          <div className="text-xs text-gray-600">{event.year}</div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-600 mb-1">{event.datetime}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          <a href={event.href} className="hover:text-blue-600">
                            {event.title}
                          </a>
                        </h3>
                        <div className="text-sm text-gray-700 mb-2">{event.location}</div>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                      {event.image && (
                        <div className="flex-shrink-0 w-48 h-32">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Message si pas d'événements à venir */}
            {filteredUpcoming.length === 0 && !showAllEvents && (
              <div className="bg-gray-100 rounded p-8 text-center mb-8">
                <p className="text-gray-600">Il n'y a pas de événements à venir.</p>
              </div>
            )}

            {/* Événements à venir */}
            {filteredUpcoming.length > 0 && (
              <div className="mb-12">
                {showAllEvents && <h2 className="text-2xl font-bold text-gray-900 mb-6">Événements à venir</h2>}
                {filteredUpcoming.map((event, idx) => (
                  <div key={idx} className="mb-6 border-b pb-6">
                    <div className="flex gap-6">
                      <div className="flex-shrink-0 text-center">
                        <div className="bg-gray-100 rounded p-3 w-16">
                          <div className="text-xs text-gray-600 uppercase">{event.month}</div>
                          <div className="text-2xl font-bold text-gray-900">{event.day}</div>
                          <div className="text-xs text-gray-600">{event.year}</div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-600 mb-1">{event.datetime}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          <a href={event.href} className="hover:text-blue-600">
                            {event.title}
                          </a>
                        </h3>
                        <div className="text-sm text-gray-700 mb-2">{event.location}</div>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                      {event.image && (
                        <div className="flex-shrink-0 w-48 h-32">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Événements passés (seulement si pas en mode showAllEvents) */}
            {!showAllEvents && filteredPast.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Derniers Événements passés</h2>
                {displayedPastEvents.map((event, idx) => (
                  <div key={idx} className="mb-6 border-b pb-6">
                    <div className="flex gap-6">
                      <div className="flex-shrink-0 text-center">
                        <div className="bg-gray-100 rounded p-3 w-16">
                          <div className="text-xs text-gray-600 uppercase">{event.month}</div>
                          <div className="text-2xl font-bold text-gray-900">{event.day}</div>
                          <div className="text-xs text-gray-600">{event.year}</div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-600 mb-1">{event.datetime}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          <a href={event.href} className="hover:text-blue-600">
                            {event.title}
                          </a>
                        </h3>
                        <div className="text-sm text-gray-700 mb-2">{event.location}</div>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                      {event.image && (
                        <div className="flex-shrink-0 w-48 h-32">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Bouton pour afficher tous les événements passés */}
                {filteredPast.length > 3 && !showAllPastEvents && (
                  <button
                    onClick={() => setShowAllPastEvents(true)}
                    className="mt-4 px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-medium"
                  >
                    Voir tous les événements passés ({filteredPast.length})
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {view === 'mois' && (
          <div>
            <div className="bg-gray-100 rounded p-6 mb-6 flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5 text-gray-600" />
              <p className="text-gray-600">Il n'y a pas de événements à venir.</p>
            </div>

            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="grid grid-cols-7 border-b bg-gray-50">
                {weekDays.map((day) => (
                  <div key={day} className="p-3 text-center text-xs font-semibold text-gray-600">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7">
                {days.map((day, idx) => {
                  const dayEvents = getEventsForDay(day.date);
                  const isToday = new Date().toDateString() === day.date.toDateString();
                  
                  return (
                    <div
                      key={idx}
                      className={`min-h-[100px] border-r border-b p-2 ${
                        !day.isCurrentMonth ? 'bg-gray-50' : 'bg-white'
                      } ${isToday ? 'bg-blue-50' : ''}`}
                    >
                      <div className={`text-sm font-medium mb-1 ${
                        !day.isCurrentMonth ? 'text-gray-400' : 'text-gray-900'
                      } ${isToday ? 'text-blue-600 font-bold' : ''}`}>
                        {day.day}
                      </div>
                      {dayEvents.map((event, i) => (
                        <a
                          key={i}
                          href={event.href}
                          className="block text-xs bg-blue-100 text-blue-800 rounded px-1 py-0.5 mb-1 hover:bg-blue-200 truncate"
                        >
                          {event.title}
                        </a>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 text-right">
              <div className="relative inline-block">
                <button 
                  onClick={() => setShowSubscribeDropdown(!showSubscribeDropdown)}
                  className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 font-medium flex items-center gap-2"
                >
                  S'abonner au calendrier
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showSubscribeDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4 z-50">
                    <p className="text-sm text-gray-700 mb-3 font-semibold">S'abonner à ce calendrier</p>
                    <div className="space-y-2">
                      <a 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Fonctionnalité Google Calendar à venir');
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        📅 Google Calendar
                      </a>
                      <a 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Fonctionnalité iCal à venir');
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        📱 iCal
                      </a>
                      <a 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Fonctionnalité Outlook à venir');
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        📧 Outlook
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {view === 'jour' && (
          <div>
            <div className="bg-gray-100 rounded p-6 mb-6 flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5 text-gray-600" />
              <p className="text-gray-600">Il n'y a pas de événements à venir.</p>
            </div>

            <div className="flex justify-between items-center mb-6">
              <button
                onClick={goToPreviousDay}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Jour précédent
              </button>
              <button
                onClick={goToNextDay}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 flex items-center gap-2"
              >
                Jour suivant
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {dayEvents.length > 0 ? (
              <div className="space-y-6">
                {dayEvents.map((event, idx) => (
                  <div key={idx} className="bg-white rounded-lg border p-6">
                    <div className="text-sm text-gray-600 mb-2">{event.datetime}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      <a href={event.href} className="hover:text-blue-600">
                        {event.title}
                      </a>
                    </h3>
                    <div className="text-gray-700 mb-2">{event.location}</div>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Aucun événement ce jour</p>
              </div>
            )}

            <div className="mt-6 text-right">
              <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 font-medium">
                S'abonner au calendrier
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgendaContainer;