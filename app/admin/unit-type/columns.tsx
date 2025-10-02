"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/custom/data-table-column-header"
import ViewData from "./action/viewData"
import EditForm from "./action/editForm"

export type UnitType = {
  id: string
  name: string
  description: string
}

export const columns: ColumnDef<UnitType>[] = [
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