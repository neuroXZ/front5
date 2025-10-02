import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '@/lib/api';
import { Table } from '@tanstack/react-table';
import { UnitType } from '../columns';
import { useState } from 'react';

interface DeleteBulkProps {
	table: Table<UnitType>;
}

export default function DeleteBulk({ table }: DeleteBulkProps) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleDelete = async () => {
		setLoading(true);
		setError('');
		const selectedRows = table.getSelectedRowModel().rows;
		let failed = 0;
		for (const row of selectedRows) {
			const token = Cookies.get('token');
			const res = await fetch(`${API_BASE_URL}/unitType/${row.original.id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!res.ok) failed++;
		}
		setLoading(false);
		if (failed === 0) {
			window.location.reload();
		} else {
			setError(`Gagal padam ${failed} data.`);
		}
	};

	return (
		<>
			<Button variant="destructive" onClick={handleDelete} disabled={loading || table.getSelectedRowModel().rows.length === 0}>
				{loading ? 'Deleting...' : 'Delete'}
			</Button>
			{error && <div className="text-red-500 mt-2">{error}</div>}
		</>
	);
}
