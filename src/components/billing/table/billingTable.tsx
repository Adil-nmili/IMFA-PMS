"use client";

import React, { useState, useEffect } from "react";
import type { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Filter,
  MoreHorizontal,
  Eye,
  EyeOff,
  RefreshCw,
  Settings2,
  SortAsc,
  SortDesc
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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
  const [sorting, setSorting] = useState<SortingState>([{ id: "date", desc: true }]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      globalFilter,
      sorting,
      columnVisibility,
      rowSelection,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => row.id || Math.random().toString(),
    globalFilterFn: (row, _, filterValue) => {
      if (!filterValue || filterValue === "") return true;
      
      const searchText = String(filterValue).toLowerCase().trim();
      
      return row.getAllCells().some((cell) => {
        const cellValue = String(cell.getValue() || "").toLowerCase();
        
        // If search contains "payé" or "paye", search for both versions
        if (searchText.includes("pay")) {
          return cellValue.includes("payé") || cellValue.includes("paye");
        }
        
        return cellValue.includes(searchText);
      });
    },
    initialState: { 
      pagination: { pageSize: 10 },
      sorting: [{ id: "date", desc: true }]
    },
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate selected rows total
  const selectedTotal = selectedRows.reduce((sum, row) => {
    const amount = (row.original as Invoice).amount || 0;
    return sum + amount;
  }, 0);

  const handleExport = () => {
    setIsLoading(true);
    // Simulate export
    setTimeout(() => {
      alert(`Exported ${selectedRows.length || data.length} invoices`);
      setIsLoading(false);
    }, 1000);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate refresh
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="space-y-4">
      {/* Header with Actions */}
      <Card className="border shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Invoice Management</h2>
              <p className="text-sm text-muted-foreground">
                {table.getFilteredRowModel().rows.length} invoices found
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative flex-1 lg:flex-none lg:w-64">
                <Input
                  placeholder="Search invoices..."
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="pl-9"
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>

              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {table.getAllColumns()
                      .filter((column) => column.getCanFilter())
                      .map((column) => (
                        <div key={column.id} className="p-2">
                          <label className="text-xs font-medium">{column.id}</label>
                          <Input
                            type="text"
                            value={(column.getFilterValue() as string) ?? ""}
                            onChange={(e) => column.setFilterValue(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Settings2 className="mr-2 h-4 w-4" />
                      Columns
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) => column.toggleVisibility(!!value)}
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>

                <Button 
                  size="sm"
                  onClick={handleExport}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Selected Rows Summary */}
          {selectedRows.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {selectedRows.length} selected
                  </Badge>
                  <span className="text-sm font-medium">
                    Total: {formatCurrency(selectedTotal)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Send Reminders</Button>
                  <Button variant="outline" size="sm">Mark as Paid</Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Table */}
      <div className="rounded-lg border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table className="relative">
            <TableHeader className="bg-gray-50/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead 
                      key={header.id} 
                      className={cn(
                        "px-4 py-3 font-semibold text-gray-700 whitespace-nowrap",
                        header.column.getCanSort() && "cursor-pointer select-none"
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <SortAsc className="h-4 w-4" />,
                          desc: <SortDesc className="h-4 w-4" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow 
                    key={row.id} 
                    className={cn(
                      "hover:bg-gray-50/80 transition-colors",
                      row.getIsSelected() && "bg-blue-50/50"
                    )}
                    onClick={() => row.toggleSelected()}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="rounded-full bg-gray-100 p-4">
                        <FileText className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-gray-900">No invoices found</h3>
                        <p className="text-sm text-gray-500">
                          Try adjusting your search or filter to find what you're looking for.
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setGlobalFilter("");
                          setColumnFilters([]);
                        }}
                      >
                        Clear filters
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Enhanced Footer with Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border rounded-lg bg-gray-50/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="h-8 w-20">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-600">entries</span>
          </div>

          <div className="text-sm text-gray-600">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="h-8 w-8 p-0"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
              let pageIndex;
              const currentPage = table.getState().pagination.pageIndex;
              const pageCount = table.getPageCount();
              
              if (pageCount <= 5) {
                pageIndex = i;
              } else if (currentPage < 3) {
                pageIndex = i;
              } else if (currentPage > pageCount - 4) {
                pageIndex = pageCount - 5 + i;
              } else {
                pageIndex = currentPage - 2 + i;
              }
              
              return (
                <Button
                  key={pageIndex}
                  variant={currentPage === pageIndex ? "default" : "outline"}
                  size="sm"
                  onClick={() => table.setPageIndex(pageIndex)}
                  className="h-8 w-8 p-0"
                >
                  {pageIndex + 1}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="h-8 w-8 p-0"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 border rounded-lg bg-white">
          <div className="text-sm text-gray-500">Total Invoices</div>
          <div className="text-xl font-bold">{data.length}</div>
        </div>
        <div className="p-4 border rounded-lg bg-white">
          <div className="text-sm text-gray-500">Visible Rows</div>
          <div className="text-xl font-bold">{table.getFilteredRowModel().rows.length}</div>
        </div>
        <div className="p-4 border rounded-lg bg-white">
          <div className="text-sm text-gray-500">Selected</div>
          <div className="text-xl font-bold">{selectedRows.length}</div>
        </div>
        <div className="p-4 border rounded-lg bg-white">
          <div className="text-sm text-gray-500">Filter Active</div>
          <div className="text-xl font-bold">
            {globalFilter || columnFilters.length > 0 ? "Yes" : "No"}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper components
const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);