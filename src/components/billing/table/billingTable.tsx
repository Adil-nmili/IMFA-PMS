"use client";

import React, { useState, useEffect } from "react";
import type { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Invoice } from "@/types/invoice";
import { BillingFilter } from "./filters/billingFilter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function BillingTable<TData extends Invoice, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const table = useReactTable({
    data,
    columns: columns, // ← UTILISEZ 'columns' PAS 'getColumns()'
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
   globalFilterFn: (row, _, filterValue) => {
  if (!filterValue || filterValue === "") return true;
  
  const searchText = String(filterValue).toLowerCase().trim();
  
  return row.getAllCells().some((cell) => {
    const cellValue = String(cell.getValue() || "").toLowerCase();
    
    // Si la recherche contient "payé" ou "paye", chercher les deux versions
    if (searchText.includes("pay")) {
      return cellValue.includes("payé") || cellValue.includes("paye");
    }
    
    return cellValue.includes(searchText);
  });
},
    initialState: { pagination: { pageSize: 5 } },
  });

  // Debug
  useEffect(() => {
    console.log("🔄 Table mis à jour - Filtre:", globalFilter, "Lignes:", table.getRowModel().rows.length);
  }, [globalFilter, table.getRowModel().rows]);

  return (
    <>
      <div className="overflow-hidden rounded-md border p-1">
        <BillingFilter table={table} />
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-6">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-6">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-2">
        <button
          className="btn-outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
           
        <button
          className="btn-outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </>
  );
}