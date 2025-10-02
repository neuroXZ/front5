"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import Cookies from "js-cookie";
import { Cluster } from "../columns";

interface EditFormProps {
  data: Cluster;
}

export default function EditForm({ data }: EditFormProps) {
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [level, setLevel] = useState(data.level?.toString() || "");
  const [color, setColor] = useState(data.color || "#000000");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const token = Cookies.get("token");
    const res = await fetch(`${API_BASE_URL}/cluster/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
        level: level ? Number(level) : null,
        color,
      }),
    });
    const result = await res.json();
    if (res.ok) {
      setSuccess("Cluster berjaya dikemaskini!");
      window.location.reload();
    } else {
      setError(result.message || "Gagal kemaskini Cluster");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className="h-4 w-4 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary">Kemaskini Cluster</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            name="name"
            placeholder="Nama Cluster"
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
            name="level"
            type="number"
            placeholder="Level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
          />
          <div>
            <label htmlFor="color" className="block mb-1">Warna</label>
            <Input
              name="color"
              id="color"
              type="color"
              className="bg-white w-12 h-10 p-1"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-600">{success}</div>}
          <Button type="submit">Kemaskini Cluster</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}