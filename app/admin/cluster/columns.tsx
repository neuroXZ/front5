"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/custom/data-table-column-header"
import ViewData from "./action/viewData"
import EditForm from "./action/editForm"

export type Cluster = {
  id: string
  name: string
  description: string
  color: string
  level: number

}

export const columns: ColumnDef<Cluster>[] = [
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
    accessorKey: "color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Color" />
    ),
    cell: ({ row }) => {
      const color = row.getValue("color") as string;
      return (
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-6 h-6 rounded border"
            style={{ backgroundColor: color }}
            title={color}
          />
          <span className="text-xs">{color}</span>
        </div>
      );
    },
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "level",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Level" />
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue("level")}</div>,
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