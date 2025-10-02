"use client";

import * as React from "react";
import { ColumnDef, getPaginationRowModel, SortingState, ColumnFiltersState, VisibilityState, useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel } from "@tanstack/react-table";
import { Department } from "./columns";
import { DataTableSearch } from "./action/search";
import { Table as Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTablePagination } from "@/components/custom/data-table-pagination";
import { flexRender } from "@tanstack/react-table";
import CreateDepartmentForm from "./action/createForm";
import { ColumnFilter } from "./action/columnFilter";
import ExportDepartmentCSVButton from "./action/exportBulk";
import ImportDepartmentCSV from "./action/importBulk";
import DeleteBulk from "./action/deleteBulk";
import { OrganizationNav } from "@/components/custom/smallNav/organization-nav";
import { Progress } from "@/components/ui/progress"


interface DataTableProps {
  columns: ColumnDef<Department, unknown>[];
  data: Department[];
  unitTypes?: { id: string; name: string }[];
}

export function DataTable({ columns, data, unitTypes }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [searchColumn, setSearchColumn] = React.useState<"name" | "description" | "unitType">("name");
  const [importProgress, setImportProgress] = React.useState(0);

  const table = useReactTable<Department>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
      sorting,
      columnVisibility,
    },
  });

  return (
    <div>
      <div className="flex flex-col ">

        <div className="flex items-center justify-between">
          <DataTableSearch
            searchColumn={searchColumn}
            setSearchColumn={setSearchColumn}
            table={table}
            setColumnFilters={setColumnFilters}
          />
          <p>Create <span className="font-bold text-primary"> structure</span> for each Organization.</p>
        </div>
        <div className="mb-3 flex items-start justify-between gap-4">
          {/* left */}
          <div className="overflow-hidden gap-4 basis-[30%] max-w-[30%] self-start">
            < OrganizationNav />
            <div className="bg-primary overflow-hidden p-5 rounded-md border self-start">
              <span className="font-semibold text-white">Add Structure</span>
              <CreateDepartmentForm />
            </div>
          </div>

          {/* right */}
          <div className="overflow-hidden p-5 rounded-md border basis-[70%] max-w-[70%]">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-semibold">
                Total Structure : <span className="font-semibold text-primary text-xl">{data.length}</span>
              </p>
              <div className="flex gap-1">
                <ImportDepartmentCSV setImportProgress={setImportProgress} />
                <ExportDepartmentCSVButton data={data} uType={unitTypes || []} />
                <DeleteBulk table={table} />
                <ColumnFilter table={table} />
              </div>
            </div>
            {importProgress > 0 && importProgress < 100 && <Progress value={importProgress} />}
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
                      className="hover:bg-red-100 transition cursor-pointer"
                    >
                      {row.getVisibleCells().map(cell => (
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
            <DataTablePagination table={table} />
          </div>
        </div>
      </div>
    </div >
  );
}