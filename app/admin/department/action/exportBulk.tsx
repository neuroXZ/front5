'use client';
import { Button } from '@/components/ui/button';

interface Department {
  id: string | number;
  name: string;
  unitTypeId?: string;
  description?: string;
}

interface UnitType {
  id: string;
  name: string;
}

interface ExportButtonProps {
  data: Department[];
  uType: UnitType[];
}

function convertToCSV(data: Department[], uType: UnitType[]) {
  const header = ['name', 'unitType', 'description'];
  const rows = data.map(item => [
    `"${item.name.replace(/"/g, '""')}"`,
    `"${(uType && Array.isArray(uType) ? uType.find(ut => ut.id === item.unitTypeId)?.name : '') || ''}"`,
    `"${item.description?.replace(/"/g, '""') || ''}"`,
  ]);
  return [
    header.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\r\n');
}

export default function ExportDepartmentCSVButton({ data, uType }: ExportButtonProps) {
  const handleExport = () => {
    const csv = convertToCSV(data, uType);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'Department.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleExport}>
      Export
    </Button>
  );
}