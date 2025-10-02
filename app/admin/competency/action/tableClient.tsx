'use client';
import { DataTable } from "../data-table";
import { columns as getColumns, Competency, Cluster } from "../columns";

interface Props {
  competencies: Competency[];
  clusters: Cluster[];
}

export default function CompetencyTableClient({ competencies, clusters }: Props) {
  const columns = getColumns(clusters);
  return <DataTable columns={columns} data={competencies} clusters={clusters} />;
}