"use client";

import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { API_BASE_URL } from "@/lib/api";
import { addMultiplePositionCompetencies } from './action/add';
import { Checkbox } from "@/components/ui/checkbox";
import { deletePositionCompetencyById } from './action/delete';

import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
    ColumnDef,
} from '@tanstack/react-table';


const Page = () => {
    // Bulk delete mapping function
    const handleBulkDeleteMapping = async () => {
        if (!selectedPositionId) {
            setError('Invalid positionId. Pilih position dulu.');
            return;
        }
        // Cari PositionCompetency yang nak delete (pastikan ada field id)
        const toDelete = positionCompetencies.filter(pc =>
            selectedRows.includes(pc.competencyId) && pc.positionId === selectedPositionId
        );
        if (toDelete.length === 0) {
            setError('No mapped competencies selected to delete.');
            return;
        }
        try {
            for (const pc of toDelete) {
                const errorMsg = await deletePositionCompetencyById(pc.id);
                if (errorMsg) {
                    setError(errorMsg);
                    return;
                }
            }
            // Refresh positionCompetencies
            const token = Cookies.get('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const res = await axios.get(`${API_BASE_URL}/positionCompetency?positionId=${selectedPositionId}`, { headers });
            setPositionCompetencies(res.data);
            setError('');
        } catch (err: unknown) {
            if (typeof err === 'object' && err !== null) {
                const errorObj = err as { message?: string };
                setError('Bulk delete error: ' + (errorObj.message || JSON.stringify(err)));
            } else {
                setError('Bulk delete error: ' + String(err));
            }
        }
    };

    const handleAddMapping = async () => {
        if (!selectedPositionId) {
            setError('Invalid positionId. Pilih position dulu.');
            return;
        }
        // Only add unmapped competencies
        const toAdd = competencies.filter(comp => {
            if (!selectedRows.includes(comp.id)) return false;
            const alreadyMapped = positionCompetencies.some((pc) =>
                pc.competencyId === comp.id && pc.positionId === selectedPositionId
            );
            return !alreadyMapped;
        });
        if (toAdd.length === 0) {
            setError('No new competencies selected to add.');
            return;
        }
        // Prepare array for addMultiplePositionCompetencies
        const competenciesToAdd = toAdd.map(comp => ({ id: comp.id, level: newLevels[comp.id] }));
        const errorMsg = await addMultiplePositionCompetencies(selectedPositionId, competenciesToAdd);
        if (errorMsg) {
            setError(errorMsg);
            return;
        }
        // Refresh positionCompetencies
        const token = Cookies.get('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.get(`${API_BASE_URL}/positionCompetency?positionId=${selectedPositionId}`, { headers });
        setPositionCompetencies(res.data);
        setError('');
    };
    const [competencies, setCompetencies] = useState<Array<{ id: string, name: string, clusterId: string }>>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    type PositionCompetency = { id: string; competencyId: string; positionId: string; level?: number };
    const [positionCompetencies, setPositionCompetencies] = useState<PositionCompetency[]>([]);
    const [clusters, setClusters] = useState<Array<{ id: string, name: string }>>([]);
    const [selectedCluster, setSelectedCluster] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    // Store newLevel for unmapped competencies
    const [newLevels, setNewLevels] = useState<{ [id: string]: string }>({});
    // Tidak perlu id dari URL
    const [positions, setPositions] = useState<Array<{ id: string, name: string }>>([]);
    const [selectedPositionId, setSelectedPositionId] = useState<string>('');
    const [selectedPositionName, setSelectedPositionName] = useState<string>('');

    // TanStack Table logic
    const filteredCompetencies = useMemo(() => {
        let result = competencies;
        if (selectedCluster) {
            result = result.filter(c => c.clusterId === selectedCluster);
        }
        if (searchTerm.trim() !== '') {
            result = result.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        return result;
    }, [competencies, selectedCluster, searchTerm]);
    const allSelected = filteredCompetencies.length > 0 && filteredCompetencies.every(c => selectedRows.includes(c.id));
    const handleSelectAll = React.useCallback((checked: boolean) => {
        if (checked) {
            setSelectedRows(filteredCompetencies.map(c => c.id));
        } else {
            setSelectedRows([]);
        }
    }, [filteredCompetencies]);
    const handleRowSelect = React.useCallback((id: string, checked: boolean) => {
        setSelectedRows(prev => checked ? [...prev, id] : prev.filter(rowId => rowId !== id));
    }, []);

    const columns = useMemo<ColumnDef<{ id: string; name: string; clusterId: string }, unknown>[]>(() => [
        {
            id: 'select',
            header: () => (
                <Checkbox
                    checked={allSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={selectedRows.includes(row.original.id)}
                    onCheckedChange={(checked) => handleRowSelect(row.original.id, checked as boolean)}
                    aria-label={`Select ${row.original.name}`}
                />
            ),
        },
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ row }) => row.original.name,
        },
        {
            id: 'level',
            header: 'Level',
            cell: ({ row }) => {
                const comp = row.original;
                const mapping = positionCompetencies.find(pc => pc.competencyId === comp.id && pc.positionId === selectedPositionId);
                const showLevel = mapping && typeof mapping.level === 'number' ? String(mapping.level) : newLevels[comp.id] ?? '';
                const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    if (mapping) {
                        setPositionCompetencies(prev => prev.map(pc =>
                            pc.competencyId === comp.id ? { ...pc, level: Number(value) } : pc
                        ));
                    } else {
                        setNewLevels(prev => ({ ...prev, [comp.id]: value }));
                    }
                };
                return (
                    <input
                        type="number"
                        className="border rounded px-2 py-1 w-16"
                        value={showLevel}
                        onChange={handleLevelChange}
                        min={1}
                        disabled={!selectedPositionId}
                    />
                );
            },
        },
        {
            id: 'action',
            header: 'Action',
            cell: ({ row }) => {
                const comp = row.original;
                const mapping = positionCompetencies.find(pc => pc.competencyId === comp.id && pc.positionId === selectedPositionId);
                if (!selectedPositionId) {
                    return <span className="text-gray-400">Pilih Position</span>;
                }
                if (mapping && typeof mapping.level === 'number') {
                    return (
                        <div className="flex items-center gap-2">
                            <span className="bg-green-600 text-white px-2 py-1 rounded">Active</span>
                        </div>
                    );
                }
                return <span className="bg-red-600 text-white px-2 py-1 rounded">Deactive</span>;
            },
        },
    ], [allSelected, selectedRows, handleSelectAll, handleRowSelect, positionCompetencies, selectedPositionId, newLevels, setPositionCompetencies, setNewLevels]);


    const table = useReactTable({
        data: filteredCompetencies,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: false,
    });

    // Tidak perlu useEffect untuk id dari URL

    useEffect(() => {
        const token = Cookies.get('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        // Fetch clusters (category)
        axios.get(`${API_BASE_URL}/cluster`, { headers })
            .then(res => setClusters(res.data))
            .catch(err => setError("Cluster fetch error: " + err.message));
        // Fetch competencies
        axios.get(`${API_BASE_URL}/competency`, { headers })
            .then(res => setCompetencies(res.data))
            .catch(err => setError("Competency fetch error: " + err.message));
    }, []);

    // Fetch position list
    useEffect(() => {
        const token = Cookies.get('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        axios.get(`${API_BASE_URL}/position`, { headers })
            .then(res => setPositions(res.data))
            .catch(err => setError("Position fetch error: " + err.message));
    }, []);

    // Update mapping competency bila pilih position
    useEffect(() => {
        const token = Cookies.get('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        if (selectedPositionId) {
            axios.get(`${API_BASE_URL}/positionCompetency?positionId=${selectedPositionId}`, { headers })
                .then(res => setPositionCompetencies(res.data))
                .catch(err => setError("PositionCompetency fetch error: " + err.message));
        } else {
            setPositionCompetencies([]);
        }
    }, [selectedPositionId]);

    return (
        <div>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <div className="mb-5 mt-5 grid grid-cols-2">
                <div className="text-left">
                    <Input
                        placeholder="Search Competency Name ..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="text-right">{selectedPositionName ? (<span className="font-bold text-primary">{selectedPositionName}</span>) : 'Position Name'} | Mapping</div>
            </div>
            <div className="mb-4 flex gap-2">
                <div className="rounded-md border p-3 basis-[30%] max-w-[30%]">
                    <h1><span className="font-bold">Total</span> Competency | {competencies.filter(c => !selectedCluster || c.clusterId === selectedCluster).length}</h1>
                    {/* Kategori competency */}
                    <div>
                        <div className="flex flex-col gap-2 mt-2">
                            <Button
                                variant={!selectedCluster ? "default" : "outline"}
                                size="sm"
                                className="w-full"
                                onClick={() => setSelectedCluster("")}
                            >
                                All Category
                            </Button>
                            {clusters.map(cluster => (
                                <Button
                                    key={cluster.id}
                                    variant={selectedCluster === cluster.id ? "default" : "outline"}
                                    size="sm"
                                    className="w-full"
                                    onClick={() => setSelectedCluster(cluster.id)}
                                >
                                    {cluster.name}
                                </Button>
                            ))}

                        </div>
                        {/* Senarai Position - letak di bawah kategori */}
                        <div className="mt-4">
                            <hr className='mt-10 mb-10'/>
                            <h2 className="font-bold mb-5">Senarai Position (klik untuk pilih)</h2>
                            <div className="max-h-60 overflow-y-auto border rounded p-2 bg-white">
                                {positions.map(pos => (
                                    <div
                                        key={pos.id}
                                        className={`cursor-pointer py-2 px-2 rounded ${selectedPositionId === pos.id ? 'bg-blue-100 font-bold' : ''}`}
                                        onClick={() => { setSelectedPositionId(pos.id); setSelectedPositionName(pos.name); }}
                                    >
                                        {pos.name}
                                    </div>
                                ))}
                                {positions.length > 10 && (
                                    <div className="text-xs text-gray-400 mt-2">Scroll untuk lihat lebih banyak...</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-md border p-3 basis-[70%] max-w-[70%]">
                    <div className="mb-3 flex items-center justify-between">
                        <div className="text-left">
                            {/* Dynamic Core Competency header */}
                            {(() => {
                                // Get cluster name
                                let coreName = "All";
                                if (selectedCluster) {
                                    const clusterObj = clusters.find(c => c.id === selectedCluster);
                                    if (clusterObj) coreName = clusterObj.name;
                                }
                                // Count active competencies for selected position
                                const activeCount = filteredCompetencies.filter(comp => {
                                    return positionCompetencies.some(pc => pc.competencyId === comp.id && pc.positionId === selectedPositionId);
                                }).length;
                                const totalCount = filteredCompetencies.length;
                                return (
                                    <h1>{coreName} Competency | {activeCount} of {totalCount}</h1>
                                );
                            })()}
                        </div>
                        <div className="text-right flex flex-row gap-2">
                            <Button variant="outline" size="sm" className="mt-2" onClick={handleAddMapping} disabled={!selectedPositionId}>Add</Button>
                            <Button variant="outline" size="sm" className="mt-2" onClick={handleBulkDeleteMapping} disabled={!selectedPositionId}>Remove</Button>
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="rounded-lg border overflow-hidden bg-white">
                            <table className="w-full">
                                <thead>
                                    {table.getHeaderGroups().map(headerGroup => (
                                        <tr key={headerGroup.id} className="bg-blue-600 text-white text-left">
                                            {headerGroup.headers.map(header => (
                                                <th key={header.id} className="px-3 py-2">
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody>
                                    {table.getPaginationRowModel().rows.map(row => (
                                        <tr key={row.id} className="border-b hover:bg-blue-50">
                                            {row.getVisibleCells().map(cell => (
                                                <td key={cell.id} className="px-3 py-2">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t">
                                <div className="text-sm text-gray-600">
                                    {selectedRows.length} of {filteredCompetencies.length} row(s) selected.
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">Rows per page</span>
                                    <select className="border rounded px-2 py-1 text-sm" value={table.getState().pagination?.pageSize || 10} onChange={e => table.setPageSize(Number(e.target.value))}>
                                        {[10, 20, 50].map(size => <option key={size} value={size}>{size}</option>)}
                                    </select>
                                    <span className="text-sm">Page {table.getState().pagination?.pageIndex + 1 || 1} of {table.getPageCount()}</span>
                                    <button className="px-2 py-1" onClick={() => table.setPageIndex(0)} disabled={table.getState().pagination?.pageIndex === 0}>{'<<'}</button>
                                    <button className="px-2 py-1" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>{'<'}</button>
                                    <button className="px-2 py-1" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>{'>'}</button>
                                    <button className="px-2 py-1" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={table.getState().pagination?.pageIndex === table.getPageCount() - 1}>{'>>'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Page