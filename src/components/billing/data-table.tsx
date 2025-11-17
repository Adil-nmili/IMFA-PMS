import type { ColumnDef, ColumnFiltersState} from "@tanstack/react-table"
import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {X} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LuGitPullRequestDraft } from "react-icons/lu";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const table = useReactTable({
    data,
    columns,
     onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 7, 
      },
    },
     state: {
      columnFilters,
    },

  })

  return (
    <>
<div className="flex flex-col gap-3 py-2 px-2 ">
       
 <div className="flex justify-between items-center">
           <Input
  placeholder="Rechercher..."
  value={table.getState().globalFilter ?? ""}
  onChange={(event) => table.setGlobalFilter(event.target.value)}
  className="max-w-sm"
/>

<div>
    <div className="">
    <DropdownMenu>
  <DropdownMenuTrigger className="bg-[#967e62] py-0.5 px-1 rounded-sm flex justify-between items-center gap-1 font-normal text-base"><LuGitPullRequestDraft />Status</DropdownMenuTrigger>
  <DropdownMenuContent>
    
    <DropdownMenuItem>Payé</DropdownMenuItem>
    <DropdownMenuItem>Non-payé</DropdownMenuItem>
    <DropdownMenuSeparator />
    <Button variant={"ghost"}>Clear Filters</Button>
  </DropdownMenuContent>
</DropdownMenu>
</div>
 </div>

</div>
<div>
   <FilterArea/>
</div>
</div>
      
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
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
     <div className="flex items-center justify-end space-x-2 py-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
         {/* <div
              data-slot="card"
              className={cn(
                "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
                className
              )}
              {...props}
            /> */}
        <div className="flex items-center space-x-1">
    {Array.from({ length: table.getPageCount() }, (_, i) => (
      <Button
        key={i}
        variant={i === table.getState().pagination.pageIndex ? "default" : "outline"}
        size="sm"
        onClick={() => table.setPageIndex(i)}
      >
        {i + 1}
      </Button>
    ))}
  </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    
    </>
  )
} 
function FilterArea() {
   return(
    <div className="flex ">
       { /**Status**/ }
       <div className="flex items-center gap-2 border border-dashed rounded-sm p-1 px-2 text-sm ">
          <span className="text-gray-600">Status</span>
          <Separator orientation="vertical" />
          <div className="flex gap-2 items-center">
            <Badge variant={"secondary"}>Item 1</Badge>
            <Badge variant={"secondary"}>Item 2</Badge>
          </div>
       </div>
       <Button variant={"ghost"} className="p-1 px-2">
        <span>Reset</span>
       <div>
         <X/>
       </div>
       </Button>
    </div>
   )
}


