"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

// Dummy data for the sample report
const SAMPLE_REPORT = [
	{
		name: "Ali Bin Abu",
		role: "Programmer",
		gaps: ["SQL", "API Security"],
		recommendations: ["Advanced SQL Training", "API Security Workshop"],
	},
	{
		name: "Siti Binti Ahmad",
		role: "System Analyst",
		gaps: ["Project Management"],
		recommendations: ["Agile Project Management Training"],
	},
	{
		name: "John Tan",
		role: "Network Engineer",
		gaps: ["Cloud Security"],
		recommendations: ["Cloud Security Essentials"],
	},
];

interface TnaReportRow {
	name: string;
	role: string;
	gaps: string[];
	recommendations: string[];
}

function downloadCSV(filename: string, rows: TnaReportRow[]) {
	const headers = ["Nama Pekerja", "Jawatan", "Kompetensi Kurang", "Cadangan Latihan"];
	const csv = [headers.join(",")]
		.concat(
			rows.map((r) => {
				const gaps = Array.isArray(r.gaps) ? r.gaps.join("; ") : r.gaps;
				const recs = Array.isArray(r.recommendations) ? r.recommendations.join("; ") : r.recommendations;
				return [r.name, r.role, `"${gaps}"`, `"${recs}"`].join(",");
			})
		)
		.join("\n");

	const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.setAttribute("download", filename);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

export default function TnaDocumentation() {
	const [search, setSearch] = React.useState("");

	const filtered = React.useMemo(() => {
		if (!search) return SAMPLE_REPORT;
		const q = search.toLowerCase();
		return SAMPLE_REPORT.filter((r) =>
			r.name.toLowerCase().includes(q) || r.role.toLowerCase().includes(q) || r.gaps.join(" ").toLowerCase().includes(q)
		);
	}, [search]);

	return (
		<div className="max-w-5xl mx-auto p-6">
			<header className="mb-6">
				<h1 className="text-3xl font-bold">System Training Need Analysis (TNA) — Documentation</h1>
				<p className="text-muted-foreground mt-2">Dummy documentation and interactive preview component for Next.js + shadcn projects.</p>
			</header>

			<Card className="mb-6">
				<CardHeader>
					<CardTitle>Quick Actions</CardTitle>
					<CardDescription>Export or copy sample TNA report for your project.</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col md:flex-row gap-3 items-start md:items-center">
					<div className="flex-1">
						<Input placeholder="Cari nama / jawatan / kompetensi" value={search} onChange={(e) => setSearch(e.target.value)} />
					</div>

					<div className="flex gap-2">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button onClick={() => downloadCSV("tna_report.csv", filtered)}>Export CSV</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Muat turun laporan TNA sebagai CSV.</p>
							</TooltipContent>
						</Tooltip>

						<Button variant="outline" onClick={() => navigator.clipboard.writeText(JSON.stringify(filtered, null, 2))}>
							Copy JSON
						</Button>
					</div>
				</CardContent>
			</Card>

			<section className="mb-6">
				<Card>
					<CardHeader>
						<CardTitle>Dokumentasi Ringkas</CardTitle>
						<CardDescription>Ringkasan objektif, skop dan modul sistem TNA.</CardDescription>
					</CardHeader>
					<CardContent>
						<h3 className="text-lg font-semibold">Objektif</h3>
						<ul className="list-disc ml-5 mt-2">
							<li>Mengenalpasti jurang kompetensi pekerja.</li>
							<li>Memudahkan perancangan latihan oleh HR dan pengurus.</li>
							<li>Menghasilkan laporan yang sistematik dan boleh dieksport.</li>
						</ul>

						<Separator className="my-4" />

						<h3 className="text-lg font-semibold">Skop</h3>
						<p className="mt-2">
							Pengguna: HR, Manager, Employee, Training Provider. Fungsi utama termasuk pengurusan kompetensi, penilaian, analisis jurang, cadangan latihan dan laporan.
						</p>

						<Separator className="my-4" />

						<h3 className="text-lg font-semibold">Modul Utama</h3>
						<ol className="list-decimal ml-5 mt-2">
							<li>Modul Pengguna (Auth & Roles)</li>
							<li>Modul Kompetensi (Job Role & Competency Framework)</li>
							<li>Modul Penilaian (Self & Supervisor)</li>
							<li>Modul Analisis Jurang (Gap Analysis)</li>
							<li>Modul Cadangan Latihan & Integrasi Katalog</li>
							<li>Modul Laporan & Dashboard</li>
						</ol>
					</CardContent>
				</Card>
			</section>

			<section>
				<Card>
					<CardHeader>
						<CardTitle>Sample TNA Report</CardTitle>
						<CardDescription>Contoh laporan TNA ringkas — boleh diedit dan dieksport.</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="overflow-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Nama Pekerja</TableHead>
										<TableHead>Jawatan</TableHead>
										<TableHead>Kompetensi Kurang</TableHead>
										<TableHead>Cadangan Latihan</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filtered.map((r, idx) => (
										<TableRow key={idx}>
											<TableCell>{r.name}</TableCell>
											<TableCell>{r.role}</TableCell>
											<TableCell>{r.gaps.join(", ")}</TableCell>
											<TableCell>{r.recommendations.join(", ")}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			</section>

			<footer className="mt-6 text-sm text-muted-foreground">
				Template ini direka untuk memberikan rangka dokumentasi yang mudah diintegrasi ke dalam projek Next.js dengan shadcn UI. Sesuaikan data & struktur mengikut keperluan organisasi anda.
			</footer>
		</div>
	);
}
