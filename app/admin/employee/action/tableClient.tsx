'use client';
import { DataTable } from "../data-table";
import { columns as getColumns, Employee, Position, Unit, Supervisor } from "../columns";

interface Props {
  employees: Employee[];
  positions: Position[];
  units: Unit[];
  supervisors: Supervisor[];
}

export default function PositionTableClient({ employees, positions, units, supervisors }: Props) {
  const columns = getColumns(positions, units, supervisors);
  return <DataTable columns={columns} data={employees} unit={units} position={positions} supervisor={supervisors} />;
}