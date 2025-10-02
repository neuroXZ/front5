import * as React from "react";
import { Input } from "@/components/ui/input";
import { Table, ColumnFiltersState } from "@tanstack/react-table";
import { Employee } from "../columns";
import Cookies from "js-cookie";
import { API_BASE_URL } from "@/lib/api";
// import { MultiSelect } from "@/components/ui/multi-select"; // Guna komponen multi-select anda, atau boleh guna shadcn/ui jika ada
import Select from "react-select";

interface unit {
  id: string;
  name: string;
}
interface position {
  id: string;
  name: string;
}


interface SearchProps {
  searchColumn: "name" | "email" | "image" | "position" | "unit" | "staffOrgId";
  setSearchColumn: (col: "name" | "email" | "image" | "position" | "unit" | "staffOrgId") => void;
  table: Table<Employee>;
  setColumnFilters: (filters: ColumnFiltersState) => void;
}

export function DataTableSearch({
  searchColumn,
  setSearchColumn,
  table,
  setColumnFilters,
}: SearchProps) {
  const [positions, setPositions] = React.useState<position[]>([]);
  const [units, setUnits] = React.useState<unit[]>([]);

  React.useEffect(() => {
    const fetchPosition = async () => {
      const token = Cookies.get("token");
      const res = await fetch(`${API_BASE_URL}/position`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setPositions(data);
    };
    fetchPosition();

    const fetchUnit = async () => {
      const token = Cookies.get("token");
      const res = await fetch(`${API_BASE_URL}/unit`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setUnits(data);
    };
    fetchUnit();

    
  }, []);

  return (
  <div className="mb-4 flex items-center gap-2">
      <select
        value={searchColumn}
        onChange={e => setSearchColumn(e.target.value as "name" | "email" | "image" | "position" | "unit" | "staffOrgId")}
        className="border rounded px-2 py-1"
      >
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="image">Image</option>
        <option value="position">Position</option>
        <option value="unit">Unit</option>
        <option value="staffOrgId">Staff Org ID</option>
      </select>
      <div className="relative w-full max-w-sm flex items-center gap-2">
        <div className="flex-1">
          {["position", "unit"].includes(searchColumn) ? (
            <Select
              isMulti
              options={
                searchColumn === "position"
                  ? positions.map(ut => ({ value: ut.name, label: ut.name }))
                  : searchColumn === "unit"
                  ? units.map(ut => ({ value: ut.name, label: ut.name }))
                  : []
              }
              value={
                (searchColumn === "position" ? positions : searchColumn === "unit" ? units : [])
                  .filter(ut => {
                    const filterValue = table.getColumn(searchColumn)?.getFilterValue();
                    return Array.isArray(filterValue) ? filterValue.includes(ut.name) : false;
                  })
                  .map(ut => ({ value: ut.name, label: ut.name }))
              }
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={selected => {
                const values = selected.map(opt => opt.value);
                table.getColumn(searchColumn)?.setFilterValue(values);
              }}
              placeholder={`Pilih ${searchColumn.charAt(0).toUpperCase() + searchColumn.slice(1)}...`}
            />
          ) : (
            <Input
              placeholder={`Filter ${searchColumn}...`}
              value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
              onChange={event =>
                table.getColumn(searchColumn)?.setFilterValue(event.target.value)
              }
            />
          )}
        </div>
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