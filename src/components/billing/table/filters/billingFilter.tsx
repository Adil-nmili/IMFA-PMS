// src/components/billing/table/filters/billingFilter.tsx
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuGitPullRequestDraft } from "react-icons/lu";
import DateRangeFilter from "@/components/billing/table/filters/dateRangeFilter";
import { Button } from "@/components/ui/button";
import type { Invoice } from "@/types/invoice";
import type { Table } from "@tanstack/react-table";
import type { DateRange } from "react-day-picker";

// Modifiez l'interface pour utiliser le type générique
interface BillingFilterProps<TData> {
  table: Table<TData>;
}

export function BillingFilter<TData extends Invoice>({
  table,
}: BillingFilterProps<TData>) {
  const [searchValue, setSearchValue] = useState("");
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string>("");

  /** GLOBAL SEARCH **/
  const handleGlobalSearch = (value: string) => {
    setSearchValue(value);
    table.setGlobalFilter(value);
  };

  /** STATUS FILTER **/
  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    // Utilisez un cast pour résoudre le problème TypeScript
    (table.getColumn("Status") as any)?.setFilterValue(status);
  };

  /** DATE RANGE FILTER **/
  const handleDateRangeChange = (value: DateRange | undefined) => {
    setRange(value);
    
    if (value?.from && value?.to) {
      (table.getColumn("Date_invoice") as any)?.setFilterValue({
        from: value.from,
        to: value.to
      });
    } else if (value?.from) {
      (table.getColumn("Date_invoice") as any)?.setFilterValue({
        from: value.from,
        to: undefined
      });
    } else {
      (table.getColumn("Date_invoice") as any)?.setFilterValue(undefined);
    }
  };

  /** RESET DATE RANGE ONLY **/
  const handleResetDateRange = () => {
    setRange(undefined);
    (table.getColumn("Date_invoice") as any)?.setFilterValue(undefined);
  };

  /** CLEAR ALL FILTERS **/
  const clearAllFilters = () => {
    table.resetColumnFilters();
    table.setGlobalFilter("");
    setSearchValue("");
    setRange(undefined);
    setStatusFilter("");
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 w-full p-4 bg-gray-50 rounded-lg">

      {/* STATUS FILTER */}
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-[#967e62] text-white py-1 px-2 rounded-sm flex items-center gap-1 text-base font-normal hover:bg-[#856a4a] transition-colors">
          <LuGitPullRequestDraft /> 
          Status {statusFilter && `: ${statusFilter}`}
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-white">
          <DropdownMenuItem onClick={() => handleStatusFilter("Payé")}>
            Payé
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusFilter("Non Payé")}>
            Non payé
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <div className="p-2">
            <Button variant="ghost" onClick={clearAllFilters} className="w-full">
              Clear All Filters
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* DATE RANGE FILTER */}
      <div className="flex items-center gap-3">
        <DateRangeFilter value={range} onChange={handleDateRangeChange} />

        <button
          onClick={handleResetDateRange}
          className="px-3 py-1.5 rounded-sm border text-sm bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          Reset 
        </button>
      </div>

      {/* SEARCH */}
      <Input
        placeholder="Rechercher ......"
        value={searchValue}
        onChange={(e) => handleGlobalSearch(e.target.value)}
        className="max-w-sm bg-white "
      />
    </div>
  );
}

export default BillingFilter;