"use client";
import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";

interface Props {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
}

export default function DateRangeFilter({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[260px] justify-start">
          {value?.from ? (
            `${value.from.toLocaleDateString()} → ${value.to?.toLocaleDateString() || ""}`
          ) : (
            "Select date range"
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-auto bg-white"> {/* Added bg-white and w-auto */}
        <Calendar
          mode="range"
          selected={value}
          onSelect={(range) => {
            onChange(range);
            // Close popover when selection is complete
            if (range?.from && range?.to) {
              setOpen(false);
            }
          }}
          numberOfMonths={2}
          className="bg-white rounded-md border" // Ensure white background
        />
      </PopoverContent>
    </Popover>
  );
}