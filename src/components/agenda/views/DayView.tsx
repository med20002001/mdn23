import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { AgendaEvent } from "../types";
import { EmptyState, SubscribeButton } from "../shared";
import { DayEventCard } from "../cards";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface DayViewProps {
  selectedDate: Date;
  dayEvents: AgendaEvent[];
  onPreviousDay: () => void;
  onNextDay: () => void;
}

export default function DayView({
  selectedDate,
  dayEvents,
  onPreviousDay,
  onNextDay,
}: DayViewProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onPreviousDay}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Jour précédent
          </Button>

          <CardTitle className="text-lg">
            {selectedDate.toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </CardTitle>

          <Button
            variant="outline"
            onClick={onNextDay}
            className="gap-2"
          >
            Jour suivant
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6 space-y-8">
        {dayEvents.length === 0 && <EmptyState />}
        {dayEvents.length > 0 && (
          <div className="space-y-6">
            {dayEvents.map((event, idx) => (
              <DayEventCard key={idx} event={event} />
            ))}
          </div>
        )}
        
          <div className="pt-4">
             <SubscribeButton />
          </div>
        
      </CardContent>
    </Card>
  );
}
