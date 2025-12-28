import React from "react";
import type { AgendaEvent } from "../types";
import { EmptyState, SubscribeButton } from "../shared";
import { getDaysInMonth, getEventsForDay, WEEK_DAYS } from "../utils";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface MonthViewProps {
  currentMonth: Date;
  calendarEvents: AgendaEvent[];
}

export default function MonthView({
  currentMonth,
  calendarEvents,
}: MonthViewProps) {
  const days = getDaysInMonth(currentMonth);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          {currentMonth.toLocaleDateString("fr-FR", {
            month: "long",
            year: "numeric",
          })}
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6 space-y-6">
        {calendarEvents.length === 0 && <EmptyState />}
        <div className="overflow-hidden rounded-md border">
          <div className="grid grid-cols-7 bg-muted">
            {WEEK_DAYS.map((day) => (
              <div
                key={day}
                className="p-3 text-center text-xs font-semibold text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {days.map((day, idx) => {
              const dayEvents = getEventsForDay(
                calendarEvents,
                day.date
              );
              const isToday =
                new Date().toDateString() ===
                day.date.toDateString();

              return (
                <div
                  key={idx}
                  className={[
                    "min-h-[110px] border-r border-b p-2 text-sm",
                    !day.isCurrentMonth && "bg-muted/50",
                    isToday && "bg-primary/10",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div
                    className={[
                      "mb-1 font-medium",
                      !day.isCurrentMonth &&
                      "text-muted-foreground",
                      isToday &&
                      "text-primary font-semibold",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {day.day}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.map((event, i) => (
                      <a
                        key={i}
                        href={`/agenda/${event.slug}`}
                        className="block truncate rounded bg-primary/10 px-1 py-0.5 text-xs text-primary hover:bg-primary/20"
                      >
                        {event.title}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="pt-4">
          <SubscribeButton />
        </div>
      </CardContent>
    </Card>
  );
}
