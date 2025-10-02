'use client';
import { DataTable } from "../data-table";
import { columns as getColumns, Position, Grade } from "../columns";

interface Props {
  positions: Position[];
  grades: Grade[];
}

export default function PositionTableClient({ positions, grades }: Props) {
  const columns = getColumns(grades);
  return <DataTable columns={columns} data={positions} grades={grades} />;
}