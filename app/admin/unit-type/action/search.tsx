import * as React from "react";
import { Input } from "@/components/ui/input";
import { Table, ColumnFiltersState } from "@tanstack/react-table";
import { UnitType } from "../columns";

interface SearchProps {
  searchColumn: "name" | "description";
  setSearchColumn: (col: "name" | "description") => void;
  table: Table<UnitType>;
  setColumnFilters: (filters: ColumnFiltersState) => void;
}

export function DataTableSearch({
  searchColumn,
  setSearchColumn,
  table,
  setColumnFilters,
}: SearchProps) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <select
        value={searchColumn}
        onChange={e => setSearchColumn(e.target.value as "name" | "description")}
        className="border rounded px-2 py-1"
      >
        <option value="name">Name</option>
        <option value="description">Description</option>
      </select>
      <div className="relative w-full max-w-sm flex items-center gap-2">
        <Input
          placeholder={`Filter ${searchColumn}...`}
          value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
          onChange={event =>
            table.getColumn(searchColumn)?.setFilterValue(event.target.value)
          }
        />
        <button
          type="button"
          className="ml-2 px-3 py-1 border rounded text-sm text-gray-600 hover:bg-gray-100"
          onClick={() => setColumnFilters([])}
          aria-label="Reset"
        >
          Clear
        </button>
      </div>
    </div>
  );
}