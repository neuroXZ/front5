'use client';
import { DataTable } from "../data-table";
import { columns as getColumns, Department, UnitType } from "../columns";

interface Props {
  departments: Department[];
  unitTypes: UnitType[];
}

export default function DepartmentTableClient({ departments, unitTypes }: Props) {
  const columns = getColumns(unitTypes);
  return <DataTable columns={columns} data={departments} unitTypes={unitTypes} />;
}