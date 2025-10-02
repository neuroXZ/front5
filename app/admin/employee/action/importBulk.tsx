'use client';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '@/lib/api';

// export default function ImportDepartmentCSV({ setImportProgress }) {
export default function ImportEmployeeCSV({ setImportProgress }: { setImportProgress: (value: number) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [positions, setPositions] = useState<{ id: string; name: string }[]>([]);
  // Fetch positions for mapping name to id
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const token = Cookies.get('token');
        const res = await fetch(`${API_BASE_URL}/position`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setPositions(data);
      } catch  {
        setError('Failed to fetch positions');
      }
    };
    fetchPositions();

    // const fetchUnits = async () => {
    //   try {
    //     const token = Cookies.get('token');
    //     const res = await fetch(`${API_BASE_URL}/unit`, {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });
    //     const data = await res.json();
    //     if (res.ok) setUnit(data);
    //   } catch  {
    //     setError('Failed to fetch units');
    //   }
    // };
    // fetchUnits();

    // const fetchStaffOrgs = async () => {
    //   try {
    //     const token = Cookies.get('token');
    //     const res = await fetch(`${API_BASE_URL}/staff`, {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });
    //     const data = await res.json();
    //     if (res.ok) setStaffOrgs(data);
    //   } catch  {
    //     setError('Failed to fetch staff organizations');
    //   }
    // };
    // fetchStaffOrgs();
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
        const [name, position] = line.split(',').map(val => val.replace(/^"|"$/g, '').trim());
        if (!name) continue;
        // Cari id berdasarkan nama position
        let positionId = '';
        if (position) {
          const found = positions.find(ut => ut.name.toLowerCase() === position.toLowerCase());
          if (found) positionId = found.id;
        }
        const token = Cookies.get('token');
        const res = await fetch(`${API_BASE_URL}/staff`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, positionId }),
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
