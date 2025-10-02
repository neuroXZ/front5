'use client';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '@/lib/api';

// export default function ImportDepartmentCSV({ setImportProgress }) {
export default function ImportPositionCSV({ setImportProgress }: { setImportProgress: (value: number) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [grades, setGrades] = useState<{ id: string; name: string }[]>([]);

  // Fetch grades for mapping name to id
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const token = Cookies.get('token');
        const res = await fetch(`${API_BASE_URL}/grade`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setGrades(data);
      } catch  {
        setError('Failed to fetch grades');
      }
    };
    fetchGrades();
  }, []);

  // Fungsi untuk parse CSV dan import satu persatu
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setSuccess('');
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result as string;
      const lines = text.trim().split('\n');
      // Buang header
      const dataLines = lines.slice(1);
      let imported = 0;
      let failed = 0;

      for (let i = 0; i < dataLines.length; i++) {
        const line = dataLines[i];
        // Parse CSV dengan koma, buang tanda petik
        const [name, gradeName, description] = line.split(',').map(val => val.replace(/^"|"$/g, '').trim());
        if (!name) continue;
        // Cari id berdasarkan nama grade
        let gradeId = '';
        if (gradeName) {
          const found = grades.find(ut => ut.name.toLowerCase() === gradeName.toLowerCase());
          if (found) gradeId = found.id;
        }
        const token = Cookies.get('token');
        const res = await fetch(`${API_BASE_URL}/position`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, gradeId, description }),
        });
        if (res.ok) imported++;
        else failed++;
        setImportProgress(Math.round(((i + 1) / dataLines.length) * 100));
      }
      setSuccess(`Import selesai! Berjaya: ${imported}, Gagal: ${failed}`);
      if (imported > 0) {
        window.location.reload();
      }
    };
    reader.readAsText(file);
  };

  // Klik butang akan trigger file picker
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div >
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Button onClick={handleImportClick}>
        Import
      </Button>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
    </div>
  );
}
