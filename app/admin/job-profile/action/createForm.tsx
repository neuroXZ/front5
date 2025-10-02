"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { API_BASE_URL } from "@/lib/api";
import Cookies from "js-cookie";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Grade = {
  id: string;
  name: string;
};

export default function CreatePositionForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [grades, setGrades] = useState<Grade[]>([]);
  const [gradeId, setGradeId] = useState<string>("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch unit types dari API
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
    const res = await fetch(`${API_BASE_URL}/position`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description, gradeId }),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess("Position berjaya ditambah!");
      setName("");
      setDescription("");
      setGradeId("");
      window.location.reload();
    } else {
      setError(data.message || "Gagal tambah Position");
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
        placeholder="Nama Position"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Select value={gradeId} onValueChange={setGradeId} required>
        <SelectTrigger className="bg-white text-black w-full">
          <SelectValue placeholder="Pilih Grade" />
        </SelectTrigger>
        <SelectContent className="h-60 w-full">

            {grades.map((ut) => (
              <SelectItem key={ut.id} value={ut.id}>
                {ut.name}
              </SelectItem>
            ))}
          
        </SelectContent>
      </Select>
      <Textarea
        name="description"
        className="bg-white text-black"
        placeholder="Deskripsi Position"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      <Button type="submit" className="w-full bg-white text-black">
        Create Position
      </Button>
    </form>
  );
}