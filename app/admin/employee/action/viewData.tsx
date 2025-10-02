"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import Image from "next/image";
import { Employee } from "../columns";
import EditForm from "./editForm";
import { API_BASE_URL } from "@/lib/api";
import Cookies from "js-cookie";

interface ViewDataProps {
  data: Employee;
}

type Position = {
  id: string;
  name: string;
};
type Unit = {
  id: string;
  name: string;
};
type StaffOrg = {
  id: string;
  name: string;
};

export default function ViewData({ data }: ViewDataProps) {
  const [positionName, setPositionName] = useState<string>("");
  const [unitName, setUnitName] = useState<string>("");
  const [staffOrgName, setStaffOrgName] = useState<string>("");

  useEffect(() => {
    const fetchPosition = async () => {
      const token = Cookies.get("token");
      const res = await fetch(`${API_BASE_URL}/position/${data.positionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const position: Position = await res.json();
        setPositionName(position.name);
      } else {
        setPositionName("-");
      }
    };
    if (data.positionId) fetchPosition();
  }, [data.positionId]);

  useEffect(() => {
    const fetchUnit = async () => {
      const token = Cookies.get("token");
      const res = await fetch(`${API_BASE_URL}/unit/${data.unitId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const unit: Unit = await res.json();
        setUnitName(unit.name);
      } else {
        setUnitName("-");
      }
    };
    if (data.unitId) fetchUnit();
  }, [data.unitId]);

  useEffect(() => {
    const fetchStaffOrgs = async () => {
      const token = Cookies.get("token");
      const res = await fetch(`${API_BASE_URL}/staff/${data.staffOrgId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const staffOrg: StaffOrg = await res.json();
        setStaffOrgName(staffOrg.name);
      } else {
        setStaffOrgName("-");
      }
    };
    if (data.staffOrgId) fetchStaffOrgs();
  }, [data.staffOrgId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Eye className="h-4 w-4 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary">Maklumat Position</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">

          <div><span className="font-semibold">Image:</span></div>
          <div className="w-full rounded-md border px-3 py-2 bg-muted flex items-center justify-center">
            <Image
              src={data.image || "/avatar1.png"}
              alt="Employee Image"
              width={64}
              height={64}
              className="rounded-full object-cover"
              unoptimized
            />
          </div>
          <div><span className="font-semibold">Nama:</span></div>
          <div className="w-full rounded-md border px-3 py-2 bg-muted">{data.name}</div>
          <div><span className="font-semibold">Email:</span></div>
          <div className="w-full rounded-md border px-3 py-2 bg-muted">{data.email}</div>
          <div><span className="font-semibold">Gender:</span></div>
          <div className="w-full rounded-md border px-3 py-2 bg-muted">{data.gender}</div>
          <div><span className="font-semibold">Position:</span></div>
          <div className="w-full rounded-md border px-3 py-2 bg-muted">{positionName}</div>
          <div><span className="font-semibold">Unit:</span></div>
          <div className="w-full rounded-md border px-3 py-2 bg-muted">{unitName}</div>
          <div><span className="font-semibold">Staff Organization:</span></div>
          <div className="w-full rounded-md border px-3 py-2 bg-muted">{staffOrgName}</div>

          <div className="flex justify-end items-center gap-2">
            <span className="font-semibold text-primary">Action:</span>
            <EditForm data={data} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}