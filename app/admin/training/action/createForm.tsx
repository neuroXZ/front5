"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { API_BASE_URL } from "@/lib/api";
import Cookies from "js-cookie";

export default function CreateTrainingForm() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
    const res = await fetch(`${API_BASE_URL}/training`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        startDate: toISOString(startDate),
        endDate: toISOString(endDate),
        description,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess("Training berjaya ditambah!");
      setName("");
      setStartDate("");
      setEndDate("");
      setDescription("");
      window.location.reload();
    } else {
      setError(data.message || "Gagal tambah Training");
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
        placeholder="Nama Training"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Textarea
        name="description"
        className="bg-white text-black"
        placeholder="Deskripsi Training"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {/* Start Date Calendar Picker */}
  <label className=" text-white" htmlFor="startDate">Tarikh Mula</label>
      <input
        type="datetime-local"
        name="startDate"
        id="startDate"
        className="w-full px-3 py-2 border rounded bg-white text-black"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
  <label className="text-white" htmlFor="endDate">Tarikh Tamat</label>
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
      <Button type="submit" className="w-full bg-white text-black">Create Training</Button>
    </form>
  );
}