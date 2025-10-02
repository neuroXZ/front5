"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import Cookies from "js-cookie";
import { Assessment } from "../columns";

interface EditFormProps {
  data: Assessment;
}

export default function EditForm({ data }: EditFormProps) {
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [startDate, setStartDate] = useState(data.startDate ? new Date(data.startDate).toISOString().slice(0,16) : "");
  const [endDate, setEndDate] = useState(data.endDate ? new Date(data.endDate).toISOString().slice(0,16) : "");
  const [weightageSelf, setWeightageSelf] = useState(data.weightageSelf !== null ? data.weightageSelf : "");
  const [weightageSuperior, setWeightageSuperior] = useState(data.weightageSuperior !== null ? data.weightageSuperior : "");
  const [weightagePeer, setWeightagePeer] = useState(data.weightagePeer !== null ? data.weightagePeer : "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const token = Cookies.get("token");
    const res = await fetch(`${API_BASE_URL}/assessment/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
        startDate,
        endDate,
        weightageSelf: weightageSelf === "" ? null : Number(weightageSelf),
        weightageSuperior: weightageSuperior === "" ? null : Number(weightageSuperior),
        weightagePeer: weightagePeer === "" ? null : Number(weightagePeer),
      }),
    });
    const result = await res.json();
    if (res.ok) {
      setSuccess("Assessment berjaya dikemaskini!");
      window.location.reload();
    } else {
      setError(result.message || "Gagal kemaskini Assessment");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className="h-4 w-4 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary">Kemaskini Assessment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            name="name"
            placeholder="Nama Assessment"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Textarea
            name="description"
            placeholder="Deskripsi Cluster"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="datetime-local"
            name="startDate"
            placeholder="Tarikh Mula" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            type="datetime-local"
            name="endDate"
            placeholder="Tarikh Tamat"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <Input
            type="number"
            name="weightageSelf"
            placeholder="Weightage Self"
            value={weightageSelf}
            onChange={(e) => setWeightageSelf(e.target.value)}
          />
          <Input
            type="number"
            name="weightageSuperior"
            placeholder="Weightage Superior"
            value={weightageSuperior}
            onChange={(e) => setWeightageSuperior(e.target.value)}
          />
          <Input
            type="number"
            name="weightagePeer"
            placeholder="Weightage Peer"
            value={weightagePeer}
            onChange={(e) => setWeightagePeer(e.target.value)}
          />
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-600">{success}</div>}
          <Button type="submit">Kemaskini Assessment</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}