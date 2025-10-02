'use client';
import { Button } from '@/components/ui/button';

interface UnitType {
  id: string | number;
  name: string;
  description?: string;
}

interface ExportButtonProps {
  data: UnitType[];
}

function convertToCSV(data: UnitType[]) {
  const header = ['name', 'description'];
  const rows = data.map(item => [
    `"${item.name.replace(/"/g, '""')}"`,
    `"${item.description?.replace(/"/g, '""') || ''}"`,
  ]);
  return [
    header.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\r\n');
}

export default function ExportUnitTypeCSVButton({ data }: ExportButtonProps) {
  const handleExport = () => {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'unit_types.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button   onClick={handleExport}>
      Export
    </Button>
  );
}