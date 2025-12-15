import React from "react";
import type { AgendaEvent } from "../types";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

interface DayEventCardProps {
  event: AgendaEvent;
}

export default function DayEventCard({ event }: DayEventCardProps) {
  // Construire l'URL à partir du slug
  const href = `/agenda/${event.slug}`;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="text-sm text-muted-foreground">
          {event.datetime}
        </div>

        <CardTitle className="text-xl leading-snug">
          <a
            href={href}
            className="hover:underline hover:text-primary"
          >
            {event.title}
          </a>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
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
      </CardContent>
    </Card>
  );
}
