'use client';
import { Button } from '@/components/ui/button';

interface Training {
  id: string | number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

interface ExportButtonProps {
  data: Training[];
}

function convertToCSV(data: Training[]) {
  const header = ['name', 'description', 'startDate', 'endDate'];
  const formatDate = (value?: string) => {
    if (!value) return '';
    const date = new Date(value);
    if (isNaN(date.getTime())) return '';
    return date.toISOString();
  };
  const rows = data.map(item => [
    `"${item.name.replace(/"/g, '""')}"`,
    `"${item.description?.replace(/"/g, '""') || ''}"`,
    `"${formatDate(item.startDate)}"`,
    `"${formatDate(item.endDate)}"`,
  ]);
  return [
    header.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\r\n');
}

export default function ExportTrainingCSVButton({ data }: ExportButtonProps) {
  const handleExport = () => {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'Trainings.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button   onClick={handleExport}>
      Export
    </Button>
  );
}