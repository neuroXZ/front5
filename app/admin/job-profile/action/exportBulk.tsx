'use client';
import { Button } from '@/components/ui/button';

interface Position {
  id: string | number;
  name: string;
  gradeId?: string;
  description?: string;
}

interface UnitType {
  id: string;
  name: string;
}

interface ExportButtonProps {
  data: Position[];
  uType: UnitType[];
}

function convertToCSV(data: Position[], uType: UnitType[]) {
  const header = ['name', 'grade', 'description'];
  const rows = data.map(item => [
    `"${item.name.replace(/"/g, '""')}"`,
    `"${(uType && Array.isArray(uType) ? uType.find(ut => ut.id === item.gradeId)?.name : '') || ''}"`,
    `"${item.description?.replace(/"/g, '""') || ''}"`,
  ]);
  return [
    header.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\r\n');
}

export default function ExportPositionCSVButton({ data, uType }: ExportButtonProps) {
  const handleExport = () => {
    const csv = convertToCSV(data, uType);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'Position.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleExport}>
      Export
    </Button>
  );
}