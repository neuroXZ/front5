import * as React from "react";
import { Input } from "@/components/ui/input";
import { Table, ColumnFiltersState } from "@tanstack/react-table";
import { Competency } from "../columns";
import Cookies from "js-cookie";
import { API_BASE_URL } from "@/lib/api";
// import { MultiSelect } from "@/components/ui/multi-select"; // Guna komponen multi-select anda, atau boleh guna shadcn/ui jika ada
import Select from "react-select";

interface Cluster {
  id: string;
  name: string;
}

interface SearchProps {
  searchColumn: "name" | "description" | "cluster";
  setSearchColumn: (col: "name" | "description" | "cluster") => void;
  table: Table<Competency>;
  setColumnFilters: (filters: ColumnFiltersState) => void;
}

export function DataTableSearch({
  searchColumn,
  setSearchColumn,
  table,
  setColumnFilters,
}: SearchProps) {
  const [clusters, setClusters] = React.useState<Cluster[]>([]);

  React.useEffect(() => {
    const fetchClusters = async () => {
      const token = Cookies.get("token");
      const res = await fetch(`${API_BASE_URL}/cluster`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setClusters(data);
    };
    fetchClusters();
  }, []);

  return (
    <div className="mb-4 flex items-center gap-2">
      <select
        value={searchColumn}
        onChange={e => setSearchColumn(e.target.value as "name" | "description" | "cluster")}
        className="border rounded px-2 py-1"
      >
        <option value="name">Name</option>
        <option value="cluster">Cluster</option>
        <option value="description">Description</option>
      </select>
      <div className="relative w-full max-w-sm flex items-center gap-2">
        <div className="flex-1">
          {searchColumn === "cluster" ? (
            <Select
              isMulti
              options={clusters.map(c => ({ value: c.name, label: c.name }))}
              value={clusters
                .filter(c => {
                  const filterValue = table.getColumn("cluster")?.getFilterValue();
                  return Array.isArray(filterValue) ? filterValue.includes(c.name) : false;
                })
                .map(c => ({ value: c.name, label: c.name }))}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={selected => {
                const values = selected.map(opt => opt.value);
                table.getColumn("cluster")?.setFilterValue(values);
              }}
              placeholder="Pilih Cluster..."
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