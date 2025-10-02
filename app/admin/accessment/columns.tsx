"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/custom/data-table-column-header"
import ViewData from "./action/viewData"
import EditForm from "./action/editForm"

export type Assessment = {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  weightageSelf: number | null
  weightageSuperior: number | null
  weightagePeer: number | null


}

export const columns: ColumnDef<Assessment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const desc: string = row.getValue("description") || "";
      const words = desc.split(" ");
      const shortDesc = words.length > 5 ? words.slice(0, 5).join(" ") + "..." : desc;
      return <div className="capitalize">{shortDesc}</div>;
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("startDate") as string;
      if (!value) return "";
      const date = new Date(value);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hour = String(date.getHours()).padStart(2, "0");
      const minute = String(date.getMinutes()).padStart(2, "0");
      return <div>{`${day}-${month}-${year} ${hour}:${minute}`}</div>;
    },
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Date" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("endDate") as string;
      if (!value) return "";
      const date = new Date(value);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hour = String(date.getHours()).padStart(2, "0");
      const minute = String(date.getMinutes()).padStart(2, "0");
      return <div>{`${day}-${month}-${year} ${hour}:${minute}`}</div>;
    },
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "Status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const startDate = new Date(row.getValue("startDate"));
      const endDate = new Date(row.getValue("endDate"));
      const now = new Date();
      let status = "";
      let bg = "";
      if (now >= startDate && now <= endDate) {
        status = "Active";
        bg = "bg-green-500 text-white";
      } else if (now > endDate) {
        status = "Finish";
        bg = "bg-red-500 text-white";
      } else {
        status = "Upcoming";
        bg = "bg-gray-300 text-gray-700";
      }
      return (
        <span className={`capitalize px-3 py-1 rounded ${bg}`}>{status}</span>
      );
    },
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <div className="group relative flex items-center">
          <ViewData data={row.original} />
          <span className="absolute -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            View
          </span>
        </div>
        <div className="group relative flex items-center">
          <EditForm data={row.original} />
          <span className="absolute -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Edit
          </span>
        </div>
      </div>
    ),
  }

]