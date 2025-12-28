import React from "react";
import type { AgendaEvent } from "../types";
import { EventCard } from "../cards";
import { EmptyState } from "../shared";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface ListViewProps {
  upcomingEvents: AgendaEvent[];
  pastEvents: AgendaEvent[];
  showAllEvents: boolean;
  showAllPastEvents: boolean;
  onToggleAllPastEvents: () => void;
}

export default function ListView({
  upcomingEvents,
  pastEvents,
  showAllEvents,
  showAllPastEvents,
  onToggleAllPastEvents,
}: ListViewProps) {
  const displayedPastEvents = showAllPastEvents
    ? pastEvents
    : pastEvents.slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          {showAllEvents ? "Tous les événements" : "Agenda"}
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-10 pt-6">
    
        {upcomingEvents.length === 0 && !showAllEvents && (
          <EmptyState />
        )}
        {showAllEvents && pastEvents.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-muted-foreground">
              Événements passés
            </h3>

            {pastEvents.map((event, idx) => (
              <EventCard key={idx} event={event} />
            ))}
          </section>
        )}

        {upcomingEvents.length > 0 && (
          <section className="space-y-4">
            {showAllEvents && (
              <h3 className="text-lg font-semibold text-muted-foreground">
                Événements à venir
              </h3>
            )}

            {upcomingEvents.map((event, idx) => (
              <EventCard key={idx} event={event} />
            ))}
          </section>
        )}
        {!showAllEvents && pastEvents.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-muted-foreground">
              Derniers événements passés
            </h3>

            {displayedPastEvents.map((event, idx) => (
              <EventCard key={idx} event={event} />
            ))}

            {pastEvents.length > 3 && !showAllPastEvents && (
              <div className="pt-2">
                <Button
                  variant="secondary"
                  onClick={onToggleAllPastEvents}
                >
                  Voir tous les événements passés ({pastEvents.length})
                </Button>
              </div>
            )}
          </section>
        )}
      </CardContent>
    </Card>
  );
}
