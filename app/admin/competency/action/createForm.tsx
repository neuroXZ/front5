"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { API_BASE_URL } from "@/lib/api";
import Cookies from "js-cookie";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Cluster = {
  id: string;
  name: string;
};

export default function CreateDepartmentForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [clusterId, setClusterId] = useState<string>("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch cluster dari API
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
    const res = await fetch(`${API_BASE_URL}/competency`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description, clusterId }),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess("Department berjaya ditambah!");
      setName("");
      setDescription("");
      setClusterId("");
      window.location.reload();
    } else {
      setError(data.message || "Gagal tambah Department");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-sm mx-auto mt-4"
    >
      <Input
        name="name"
        className="bg-white text-black"
        placeholder="Nama Department"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Select value={clusterId} onValueChange={setClusterId} required>
        <SelectTrigger className="bg-white text-black w-full">
          <SelectValue placeholder="Pilih Cluster" />
        </SelectTrigger>
        <SelectContent className="h-60 w-full">
          
            {clusters.map((ut) => (
              <SelectItem key={ut.id} value={ut.id}>
                {ut.name}
              </SelectItem>
            ))}
          
        </SelectContent>
      </Select>
      <Textarea
        name="description"
        className="bg-white text-black"
        placeholder="Deskripsi Department"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      <Button type="submit" className="w-full bg-white text-black">
        Create Organisasi Type
      </Button>
    </form>
  );
}