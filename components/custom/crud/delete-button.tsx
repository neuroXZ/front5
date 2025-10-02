'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';



interface DeleteButtonProps {
  endpoint: string; // Contoh: '/staff', '/unitType'
  id: string | number;
  onDeleted?: () => void; // Callback selepas delete berjaya
}

export default function DeleteButton({ endpoint, id, onDeleted }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = Cookies.get('token');

  const handleDelete = async () => {
    if (!confirm('Anda pasti mahu padam data ini?')) return;
    setLoading(true);
    setError('');
    try {
      const res = await axios.delete(`${endpoint}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        if (onDeleted) onDeleted();
      } else {
        setError(res.data.message || 'Gagal padam data');
      }
    } catch {
      setError('Ralat rangkaian');
    }
    setLoading(false);
  };

  return (
    <div>
      <Button variant="destructive" onClick={handleDelete} disabled={loading}>
        {loading ? 'Memadam...' : 'Padam'}
      </Button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
}