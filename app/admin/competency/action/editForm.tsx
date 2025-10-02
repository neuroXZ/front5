"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import Cookies from "js-cookie";
import { Competency } from "../columns";

type Cluster = {
  id: string;
  name: string;
};

interface EditFormProps {
  data: Competency;
}

export default function EditForm({ data }: EditFormProps) {
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [clusterId, setClusterId] = useState(data.clusterId);
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchClusters = async () => {
      const token = Cookies.get("token");
      const res = await fetch(`${API_BASE_URL}/cluster`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setClusters(data);
    };
    fetchClusters();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const token = Cookies.get("token");
    const res = await fetch(`${API_BASE_URL}/competency/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description, clusterId }),
    });
    const result = await res.json();
    if (res.ok) {
      setSuccess("Competency berjaya dikemaskini!");
      window.location.reload();
    } else {
      setError(result.message || "Gagal kemaskini Competency");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className="h-4 w-4 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary">Kemaskini Competency</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            name="name"
            placeholder="Nama Competency"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Select value={clusterId} onValueChange={setClusterId} required>
            <SelectTrigger className="bg-white text-black w-full">
              <SelectValue placeholder="Pilih Cluster" />
            </SelectTrigger>
            <SelectContent className="max-h-48 overflow-y-auto">
              {clusters.map((ut) => (
                <SelectItem key={ut.id} value={ut.id}>
                  {ut.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea
            name="description"
            placeholder="Deskripsi Department"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-600">{success}</div>}
          <Button type="submit">Kemaskini Department</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}