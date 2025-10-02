'use client';
import { Button } from '@/components/ui/button';

interface Employee {
  id: string | number;
  name: string;
  email: string;
  image: string;
  gender: string;
  positionId: string;
  unitId: string;
  staffOrgId: string;
  password?: string;

}

interface Position {
  id: string;
  name: string;
}
interface Unit {
  id: string;
  name: string;
}

interface ExportButtonProps {
  data: Employee[];
  unit: Unit[];
  position: Position[];
}

function convertToCSV(data: Employee[], unit: Unit[], position: Position[]) {
  const header = ['name', 'email', 'gender', 'position', 'unit', 'staffOrgId'];
  const rows = data.map(item => [
    `"${item.name.replace(/"/g, '""')}"`,
    `"${item.staffOrgId.replace(/"/g, '""')}"`,
    `"${item.email?.replace(/"/g, '""') || ''}"`,
    `"${item.gender?.replace(/"/g, '""') || ''}"`,
    `"${(position && Array.isArray(position) ? position.find(pos => pos.id === item.positionId)?.name : '') || ''}"`,
    `"${(unit && Array.isArray(unit) ? unit.find(ut => ut.id === item.unitId)?.name : '') || ''}"`,
  ]);
  return [
    header.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\r\n');
}

export default function ExportEmployeeCSVButton({ data, position, unit }: ExportButtonProps) {
  const handleExport = () => {
    const csv = convertToCSV(data, unit, position);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'Employee.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleExport}>
      Export
    </Button>
  );
}