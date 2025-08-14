"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Button } from "./button";
import { cn } from "@/app/_lib/utils";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const paginationButton = () => (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Primeira página
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Anterior
      </Button>
      <div className="text-sm font-medium">
        Página {table.getState().pagination.pageIndex + 1} de{" "}
        {table.getPageCount()}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Próxima
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
      >
        Última página
      </Button>
    </>
  );

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const isSorted = header.column.getIsSorted();

                  return (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={cn(canSort && "cursor-pointer select-none")}
                    >
                      <div className="flex items-center gap-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        {isSorted === "asc" && <ArrowUp className="h-4 w-4" />}
                        {isSorted === "desc" && (
                          <ArrowDown className="h-4 w-4" />
                        )}
                        {canSort && !isSorted && (
                          <ArrowUpDown className="h-4 w-4 opacity-30" />
                        )}
                      </div>
                    </TableHead>
                  );
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhuma transação cadastrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {paginationButton()}
      </div>
    </>
  );
}
