import React from "react";
import type { AgendaEvent } from "../types";
import { EventDate } from "../shared";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface EventCardProps {
  event: AgendaEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.date);
  const month = eventDate.toLocaleDateString("fr-FR", { month: "short" });
  const day = String(eventDate.getDate());
  const year = String(eventDate.getFullYear());
  const href = `/agenda/${event.slug}`;

  return (
    <Card className="mb-6 overflow-hidden">
      <CardContent className="pt-4 sm:pt-6">

        {/* MOBILE : image en haut */}
        {event.image && (
          <div className="sm:hidden mb-4">
            <img
              src={
                typeof event.image === "string"
                  ? event.image
                  : (event.image as any).src
              }
              alt={event.title}
              className="w-full h-48 rounded-md object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* CONTENU */}
        <div className="flex gap-4">

          {/* DATE */}
          <div className="shrink-0">
            <EventDate month={month} day={day} year={year} />
          </div>

          {/* TEXTE */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="text-xs sm:text-sm text-muted-foreground">
              {event.datetime}
            </div>

            <h3 className="text-base sm:text-lg lg:text-xl font-semibold leading-snug break-words">
              <a href={href} className="hover:text-primary hover:underline">
                {event.title}
              </a>
            </h3>

            {event.location && (
              <div className="text-sm text-muted-foreground break-words">
                {event.location}
              </div>
            )}

            {event.description && (
              <p className="text-sm text-foreground line-clamp-3">
                {event.description}
              </p>
            )}
          </div>

          {/* DESKTOP : image à droite */}
          {event.image && (
            <div className="hidden sm:block w-40 lg:w-48 shrink-0">
              <img
                src={
                  typeof event.image === "string"
                    ? event.image
                    : (event.image as any).src
                }
                alt={event.title}
                className="h-28 lg:h-32 w-full rounded-md object-cover"
                loading="lazy"
              />
            </div>
          )}
        </div>

        <Separator className="mt-4 sm:mt-6" />
      </CardContent>
    </Card>
  );
}
