'use client';
import { Button } from '@/components/ui/button';

interface Competency {
  id: string | number;
  name: string;
  clusterId?: string;
  description?: string;
}

interface Cluster {
  id: string;
  name: string;
}

interface ExportButtonProps {
  data: Competency[];
  uType: Cluster[];
}

function convertToCSV(data: Competency[], uType: Cluster[]) {
  const header = ['name', 'cluster', 'description'];
  const rows = data.map(item => [
    `"${item.name.replace(/"/g, '""')}"`,
    `"${(uType && Array.isArray(uType) ? uType.find(ut => ut.id === item.clusterId)?.name : '') || ''}"`,
    `"${item.description?.replace(/"/g, '""') || ''}"`,
  ]);
  return [
    header.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\r\n');
}

export default function ExportCompetencyCSVButton({ data, uType }: ExportButtonProps) {
  const handleExport = () => {
    const csv = convertToCSV(data, uType);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'Competency.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleExport}>
      Export
    </Button>
  );
}