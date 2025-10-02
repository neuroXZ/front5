'use client';
import { Button } from '@/components/ui/button';

interface Assessment {
  id: string | number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  weightageSelf?: number;
  weightageSuperior?: number;
  weightagePeer?: number;
}

interface ExportButtonProps {
  data: Assessment[];
}

function convertToCSV(data: Assessment[]) {
  const header = ['name', 'description', 'startDate', 'endDate', 'weightageSelf', 'weightageSuperior', 'weightagePeer'];
  const rows = data.map(item => [
    `"${item.name.replace(/"/g, '""')}"`,
    `"${item.description?.replace(/"/g, '""') || ''}"`,
    `"${item.startDate?.replace(/"/g, '""') || ''}"`,
    `"${item.endDate?.replace(/"/g, '""') || ''}"`,
    `${item.weightageSelf !== undefined ? item.weightageSelf : ''}`,
    `${item.weightageSuperior !== undefined ? item.weightageSuperior : ''}`,
    `${item.weightagePeer !== undefined ? item.weightagePeer : ''}`,
  ]);
  return [
    header.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\r\n');
}

export default function ExportAssessmentCSVButton({ data }: ExportButtonProps) {
  const handleExport = () => {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'Assessments.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button   onClick={handleExport}>
      Export
    </Button>
  );
}