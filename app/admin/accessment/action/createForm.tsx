"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { API_BASE_URL } from "@/lib/api";
import Cookies from "js-cookie";

export default function CreateAssessmentForm() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [weightageSelf, setWeightageSelf] = useState<number | null>(null);
  const [weightageSuperior, setWeightageSuperior] = useState<number | null>(null);
  const [weightagePeer, setWeightagePeer] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Convert input value to ISO string for Prisma
  const toISOString = (value: string) => value ? new Date(value).toISOString() : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const token = Cookies.get("token");
    const res = await fetch(`${API_BASE_URL}/assessment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
        startDate: toISOString(startDate),
        endDate: toISOString(endDate),
        weightageSelf: weightageSelf !== null ? parseFloat(weightageSelf.toString()) : null,
        weightageSuperior: weightageSuperior !== null ? parseFloat(weightageSuperior.toString()) : null,
        weightagePeer: weightagePeer !== null ? parseFloat(weightagePeer.toString()) : null,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess("Assessment berjaya ditambah!");
      setName("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setWeightageSelf(null);
      setWeightageSuperior(null);
      setWeightagePeer(null);
      window.location.reload();
    } else {
      setError(data.message || "Gagal tambah Assessment");
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
        placeholder="Nama Assessment"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Textarea
        name="description"
        className="bg-white text-black"
        placeholder="Deskripsi Assessment"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor="startDate" className="block mb-1">Tarikh Mula</label>
      <input
        type="datetime-local"
        name="startDate"
        id="startDate"
        className="w-full px-3 py-2 border rounded bg-white text-black"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
      <label htmlFor="endDate" className="block mb-1">Tarikh Tamat</label>
      <input
        type="datetime-local"
        name="endDate"
        id="endDate"
        className="w-full px-3 py-2 border rounded bg-white text-black"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />
      <Input
        name="weightageSelf"
        type="number"
        min={0}
        max={100}
        step="0.01"
        className="bg-white text-black"
        placeholder="Weightage Self (0-100)"
        value={weightageSelf !== null ? weightageSelf : ""}
        onChange={(e) => setWeightageSelf(e.target.value ? parseFloat(e.target.value) : null)}
        required
      />
      <Input
        name="weightageSuperior"
        type="number"
        min={0}
        max={100}
        step="0.01"
        className="bg-white text-black"
        placeholder="Weightage Superior (0-100)"
        value={weightageSuperior !== null ? weightageSuperior : ""}
        onChange={(e) => setWeightageSuperior(e.target.value ? parseFloat(e.target.value) : null)}
        required
      />
      <Input
        name="weightagePeer"
        type="number"
        min={0}
        max={100}
        step="0.01"
        className="bg-white text-black"
        placeholder="Weightage Peer (0-100)"
        value={weightagePeer !== null ? weightagePeer : ""}
        onChange={(e) => setWeightagePeer(e.target.value ? parseFloat(e.target.value) : null)}
        required
      />

      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      <Button type="submit" className="w-full bg-white text-black">Create Assessment</Button>
    </form>
  );
}