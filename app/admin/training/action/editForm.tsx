"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import Cookies from "js-cookie";
import { Training } from "../columns";

interface EditFormProps {
  data: Training;
}

export default function EditForm({ data }: EditFormProps) {
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [startDate, setStartDate] = useState(data.startDate ? new Date(data.startDate).toISOString().slice(0,16) : "");
  const [endDate, setEndDate] = useState(data.endDate ? new Date(data.endDate).toISOString().slice(0,16) : "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const token = Cookies.get("token");
    const toISOString = (value: string) => value ? new Date(value).toISOString() : null;
    const res = await fetch(`${API_BASE_URL}/training/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
        startDate: toISOString(startDate),
        endDate: toISOString(endDate),
      }),
    });
    const result = await res.json();
    if (res.ok) {
      setSuccess("Training berjaya dikemaskini!");
      window.location.reload();
    } else {
      setError(result.message || "Gagal kemaskini Training");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className="h-4 w-4 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary">Kemaskini Training</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            name="name"
            placeholder="Nama Training"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Textarea
            name="description"
            placeholder="Deskripsi Training"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className="block text-sm font-medium text-white mb-1" htmlFor="startDate">Tarikh Mula</label>
          <input
            type="datetime-local"
            name="startDate"
            id="startDate"
            className="w-full px-3 py-2 border rounded bg-white text-black"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <label className="block text-sm font-medium text-white mb-1" htmlFor="endDate">Tarikh Tamat</label>
          <input
            type="datetime-local"
            name="endDate"
            id="endDate"
            className="w-full px-3 py-2 border rounded bg-white text-black"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-600">{success}</div>}
          <Button type="submit">Kemaskini Training</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}