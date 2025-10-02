"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { API_BASE_URL } from "@/lib/api";
import Cookies from "js-cookie";

export default function CreateUnitTypeForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const token = Cookies.get("token");
    const res = await fetch(`${API_BASE_URL}/unitType`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description }),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess("UnitType berjaya ditambah!");
      setName("");
      setDescription("");
      window.location.reload(); // <-- Tambah di sini
    } else {
      setError(data.message || "Gagal tambah UnitType");
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
        placeholder="Nama UnitType"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Textarea
        name="description"
        className="bg-white text-black"
        placeholder="Deskripsi UnitType"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      <Button type="submit" className="w-full bg-white text-black">Create Organisasi Type</Button>
    </form>
  );
}