"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { API_BASE_URL } from "@/lib/api";
import Cookies from "js-cookie";

export default function CreateClusterForm() {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const token = Cookies.get("token");
    const res = await fetch(`${API_BASE_URL}/cluster`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        color,
        level: level ? Number(level) : null,
        description,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess("Cluster berjaya ditambah!");
      setName("");
      setColor("#000000");
      setLevel("");
      setDescription("");
      window.location.reload();
    } else {
      setError(data.message || "Gagal tambah Cluster");
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
        placeholder="Nama Cluster"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Textarea
        name="description"
        className="bg-white text-black"
        placeholder="Deskripsi Cluster"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        name="level"
        type="number"
        className="bg-white text-black"
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
      <Button type="submit" className="w-full bg-white text-black">Create Cluster</Button>
    </form>
  );
}