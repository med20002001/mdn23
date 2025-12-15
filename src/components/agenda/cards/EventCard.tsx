import React from "react";
import type { AgendaEvent } from "../types";
import { EventDate } from "../shared";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface EventCardProps {
  event: AgendaEvent;
}

export default function EventCard({ event }: EventCardProps) {
  // Extraire month, day, year depuis event.date
  const eventDate = new Date(event.date);
  
  // Formater le mois en français (ex: "jan", "fév", "mar")
  const month = eventDate.toLocaleDateString('fr-FR', { month: 'short' });
  
  // Obtenir le jour et le convertir en string
  const day = String(eventDate.getDate());
  
  // Obtenir l'année et la convertir en string
  const year = String(eventDate.getFullYear());
  
  // Construire l'URL à partir du slug
  const href = `/agenda/${event.slug}`;

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex gap-6">
          {/* DATE */}
          <EventDate
            month={month}
            day={day}
            year={year}
          />

          {/* CONTENU */}
          <div className="flex-1 space-y-2">
            <div className="text-sm text-muted-foreground">
              {event.datetime}
            </div>

            <h3 className="text-xl font-semibold leading-snug">
              <a
                href={href}
                className="hover:text-primary hover:underline"
              >
                {event.title}
              </a>
            </h3>

            {event.location && (
              <div className="text-sm text-muted-foreground">
                {event.location}
              </div>
            )}

            {event.description && (
              <p className="text-sm text-foreground">
                {event.description}
              </p>
            )}
          </div>

          {/* IMAGE */}
          {event.image && (
            <div className="flex-shrink-0 w-48">
              <img
                src={typeof event.image === 'string' ? event.image : (event.image as any).src}
                alt={event.title}
                className="h-32 w-full rounded-md object-cover"
              />
            </div>
          )}
        </div>

        <Separator className="mt-6" />
      </CardContent>
    </Card>
  );
}
