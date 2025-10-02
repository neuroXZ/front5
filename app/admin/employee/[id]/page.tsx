
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Employee = {
  image?: string;
  name?: string;
  email?: string;
  gender?: string;
  positionId?: string;
  unitId?: string;
  staffOrgId?: string;
};

type Competency = {
  id: string;
  name?: string;
  level: number;
  positionId?: string;
  competency?: { name: string };
};

function CompetencyTable({ positionId }: { positionId: string }) {
  const [competencies, setCompetencies] = useState<Competency[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchCompetencies = async () => {
      setLoading(true);
      const token = Cookies.get("token");
      const res = await fetch(`${API_BASE_URL}/positionCompetency?positionId=${positionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setCompetencies(data);
      }
      setLoading(false);
    };
    if (positionId) fetchCompetencies();
  }, [positionId]);

  if (loading) return <div>Loading competencies...</div>;
  if (!competencies.length) return <div>No competencies found for this position.</div>;

  // Only show competencies for the current positionId
  const filtered = competencies.filter(c => c.positionId === positionId);
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginatedRows = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600">
              <th className="text-left text-white px-2 py-2">Competency</th>
              <th className="text-left text-white px-2 py-2">Level</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((c, idx) => (
              <tr key={c.id} className={idx < paginatedRows.length - 1 ? "border-b border-gray-200" : ""}>
                <td className="px-2 py-2">{c.competency?.name || c.name || '-'}</td>
                <td className="px-2 py-2">{c.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div>No competencies found for this position.</div>
        )}
      </div>
      {/* Pagination controls styled like screenshot */}
      <div className="flex items-center justify-between mt-2 p-2">
        <span>{filtered.length} of {competencies.length} row(s) selected.</span>
        <div className="flex items-center gap-4">
          <span>Rows per page</span>
          <select
            className="border rounded px-2 py-1"
            value={rowsPerPage}
            onChange={e => {
              setRowsPerPage(Number(e.target.value));
              setPage(1);
            }}
          >
            {[10, 20, 50, 100].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <span>Page {page} of {totalPages}</span>
          <div className="space-x-1">
            <button
              className="px-2 py-1 rounded bg-gray-100"
              onClick={() => setPage(1)}
              disabled={page === 1}
            >&lt;&lt;</button>
            <button
              className="px-2 py-1 rounded bg-gray-100"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >&lt;</button>
            <button
              className="px-2 py-1 rounded bg-gray-100"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >&gt;</button>
            <button
              className="px-2 py-1 rounded bg-gray-100"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
            >&gt;&gt;</button>
          </div>
        </div>
      </div>
  </>
  );
}

export default function EmployeeDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<Employee | null>(null);
  const [positionName, setPositionName] = useState<string>("");
  const [unitName, setUnitName] = useState<string>("");
  const [staffOrgName, setStaffOrgName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      const res = await fetch(`${API_BASE_URL}/staff/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const emp = await res.json();
        setData(emp);
        // fetch position name
        if (emp.positionId) {
          const posRes = await fetch(`${API_BASE_URL}/position/${emp.positionId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (posRes.ok) {
            const pos = await posRes.json();
            setPositionName(pos.name);
          } else {
            setPositionName("-");
          }
        }
        // fetch unit name
        if (emp.unitId) {
          const unitRes = await fetch(`${API_BASE_URL}/unit/${emp.unitId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (unitRes.ok) {
            const unit = await unitRes.json();
            setUnitName(unit.name);
          } else {
            setUnitName("-");
          }
        }
        // fetch staff org name
        if (emp.staffOrgId) {
          const staffOrgRes = await fetch(`${API_BASE_URL}/staff/${emp.staffOrgId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (staffOrgRes.ok) {
            const staffOrg = await staffOrgRes.json();
            setStaffOrgName(staffOrg.name);
          } else {
            setStaffOrgName("-");
          }
        }
      }
    };
    if (id) fetchData();
  }, [id]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center gap-2">
        Go Back to Employee
      </div>
      <div className="w-full rounded-md border p-3">
        <h1 className="text-2xl" ><span className="font-bold">Employee</span> Detail</h1>
      </div>
      <div className="gap-4 py-4 grid grid-cols-1 md:grid-cols-[70%_29%]">
        <div className="rounded-md border p-3">
          <div className="space-y-2">
            <div className="gap-4 grid p-1.5 grid-cols-1 md:grid-cols-[20%_80%]">
              <div className="w-full rounded-md border px-3 py-3 bg-muted flex items-center justify-center">
                <Image
                  src={data.image || "/avatar1.png"}
                  alt="Employee Image"
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                  unoptimized
                />
              </div>
              <div className="px-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xl">{data.name}</span>
                    <hr className="flex-1 mx-2 border-t border-gray-300" />
                    <span>{/* icon di sini, contoh: */}icon | icon</span>
                  </div>
                  <div className="text-sm">{positionName || data.positionId}</div>
                </div>
                <div className="mt-3">
                  <p><span className="font-semibold">Grade : </span></p>
                  <p><span className="font-semibold">Gender : </span>{data.gender}</p>
                  <p><span className="font-semibold">Unit : </span>{unitName || data.unitId}</p>
                  <hr className="my-2" />
                  <p><span className="font-semibold">Staff Organization : </span>{staffOrgName || data.staffOrgId}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-md border p-3">
          <h2 className="text-lg font-bold mb-2">User Info</h2>
          <hr className="my-2" />
          <p><span className="font-semibold">Username : </span></p>
          <p><span className="font-semibold">Email : </span>{data.email}</p>
          <p><span className="font-semibold">Date Register : </span></p>
          <p><span className="font-semibold">User Role : </span></p>
        </div>
      </div>
      <div className="gap-4 py-4 grid grid-cols-1 md:grid-cols-[29%_70%]">
        <div className="rounded-md border p-3">
          <h2 className="text-lg font-bold mb-5">Mapping Category</h2>
          <div className="space-y-2">
            <Button variant="outline" className="w-full">Core</Button>
            <Button variant="outline" className="w-full">Generic</Button>
            <Button variant="outline" className="w-full">Function</Button>
          </div>
        </div>
        <div className="rounded-md border p-3">
          <h2 className="text-lg font-bold mb-5">Competency Statistic</h2>
          {/* Dynamic competency table from /positionCompetency */}
          {data?.positionId ? (
            <CompetencyTable positionId={data.positionId} />
          ) : (
            <p className="text-sm text-muted-foreground">No position assigned.</p>
          )}
        </div>
      </div>
    </div>
  );
}