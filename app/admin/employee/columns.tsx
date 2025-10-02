"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/custom/data-table-column-header"
// import ViewData from "./action/viewData"
// import EditForm from "./action/editForm"
import Image from "next/image"
import Link from "next/link"


export type Employee = {
  id: string
  name: string
  email: string
  image: string
  gender: string
  positionId: string
  unitId: string
  staffOrgId: string
  password: string

}

export type Position = {
  id: string
  name: string
}
export type Unit = {
  id: string
  name: string
}


export const columns = (positions: Position[], units: Unit[]): ColumnDef<Employee>[] => [

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
    accessorKey: "image",
    header: () => <div className="text-center">Image</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Image
          src={row.getValue("image") || "/avatar1.png"}
          alt="Employee Image"
          width={40}
          height={40}
          className="rounded-full object-cover"
          unoptimized
        />
      </div>

    ),
    enableHiding: true, // atau buang property ini
  },
  {
    accessorKey: "staffOrgId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Staff Organization" />
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue("staffOrgId")}</div>,
    footer: (props) => props.column.id,
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
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    enableHiding: true, // atau buang property ini
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue("gender")}</div>,
  },
  {
    id: "position",
    accessorFn: (row) => {
      const position = positions.find(u => u.id === row.positionId);
      return position ? position.name : "-";
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position Name" />
    ),
    cell: ({ row }) => {
      const position = positions.find(u => u.id === row.original.positionId);
      return <div className="capitalize">{position ? position.name : '-'}</div>;
    },
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, columnId, filterValue) => {
      // filterValue boleh jadi string atau array
      if (Array.isArray(filterValue)) {
        return filterValue.includes(row.getValue(columnId));
      }
      const value = row.getValue(columnId);
      if (typeof value === "string" && typeof filterValue === "string") {
        return value.includes(filterValue);
      }
      return false;
    },
  },
  {
    id: "unit",
    accessorFn: (row) => {
      const unit = units.find(u => u.id === row.unitId);
      return unit ? unit.name : "-";
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit Name" />
    ),
    cell: ({ row }) => {
      const unit = units.find(u => u.id === row.original.unitId);
      return <div className="capitalize">{unit ? unit.name : '-'}</div>;
    },
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, columnId, filterValue) => {
      // filterValue boleh jadi string atau array
      if (Array.isArray(filterValue)) {
        return filterValue.includes(row.getValue(columnId));
      }
      const value = row.getValue(columnId);
      if (typeof value === "string" && typeof filterValue === "string") {
        return value.includes(filterValue);
      }
      return false;
    },
  },


  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        {/* <div className="group relative flex items-center">
          <ViewData data={row.original} />
          <span className="absolute -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            View
          </span>
        </div> */}
        <div className="group relative flex items-center">
          <Link href={`/admin/employee/${row.original.id}`}>
            <button className="p-2 rounded bg-blue-600 text-white hover:bg-blue-700">
              Lihat Maklumat
            </button>
          </Link>
        </div>
        {/* <div className="group relative flex items-center">
          <EditForm data={row.original} />
          <span className="absolute -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Edit
          </span>
        </div> */}
      </div>
    ),
  }

]