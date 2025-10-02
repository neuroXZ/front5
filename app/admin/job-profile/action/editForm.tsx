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
import { Position } from "../columns";

type Grade = {
  id: string;
  name: string;
};

interface EditFormProps {
  data: Position;
}

export default function EditForm({ data }: EditFormProps) {
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [gradeId, setGradeId] = useState(data.gradeId);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchGrades = async () => {
      const token = Cookies.get("token");
      const res = await fetch(`${API_BASE_URL}/grade`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setGrades(data);
    };
    fetchGrades();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const token = Cookies.get("token");
    const res = await fetch(`${API_BASE_URL}/position/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description, gradeId }),
    });
    const result = await res.json();
    if (res.ok) {
      setSuccess("Position berjaya dikemaskini!");
      window.location.reload();
    } else {
      setError(result.message || "Gagal kemaskini Position");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className="h-4 w-4 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary">Kemaskini Position</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            name="name"
            placeholder="Nama Position"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Select value={gradeId} onValueChange={setGradeId} required>
            <SelectTrigger className="bg-white text-black w-full">
              <SelectValue placeholder="Pilih Grade" />
            </SelectTrigger>
            <SelectContent className="max-h-48 overflow-y-auto">
              {grades.map((grade) => (
                <SelectItem key={grade.id} value={grade.id}>
                  {grade.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea
            name="description"
            placeholder="Deskripsi Position"
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