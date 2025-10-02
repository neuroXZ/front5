'use client';
import { DataTable } from "../data-table";
import { columns as getColumns, Employee, Position, Unit } from "../columns";

interface Props {
  employees: Employee[];
  positions: Position[];
  units: Unit[];
}

export default function PositionTableClient({ employees, positions, units }: Props) {
  const columns = getColumns(positions, units);
  return <DataTable columns={columns} data={employees} unit={units} position={positions} />;
}