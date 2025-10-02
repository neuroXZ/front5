"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { Competency } from "../columns";
import EditForm from "./editForm";
import { API_BASE_URL } from "@/lib/api";
import Cookies from "js-cookie";

interface ViewDataProps {
  data: Competency;
}

type Cluster = {
  id: string;
  name: string;
};

export default function ViewData({ data }: ViewDataProps) {
  const [clusterName, setClusterName] = useState<string>("");

  useEffect(() => {
    const fetchCluster = async () => {
      const token = Cookies.get("token");
      const res = await fetch(`${API_BASE_URL}/cluster/${data.clusterId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const cluster: Cluster = await res.json();
        setClusterName(cluster.name);
      } else {
        setClusterName("-");
      }
    };
    if (data.clusterId) fetchCluster();
  }, [data.clusterId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Eye className="h-4 w-4 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary">Maklumat Competency</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div><span className="font-semibold">Nama:</span></div>
          <div className="w-full rounded-md border px-3 py-2 bg-muted">{data.name}</div>
          <div><span className="font-semibold">Cluster:</span></div>
          <div className="w-full rounded-md border px-3 py-2 bg-muted">{clusterName}</div>
          <div><span className="font-semibold">Deskripsi:</span></div>
          <div className="w-full rounded-md border px-3 py-2 bg-muted">{data.description}</div>
          <div className="flex justify-end items-center gap-2">
            <span className="font-semibold text-primary">Action:</span>
            <EditForm data={data} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}