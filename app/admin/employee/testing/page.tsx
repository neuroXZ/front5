"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { API_BASE_URL } from "@/lib/api";
import Cookies from "js-cookie";

export default function StaffCreateForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("");
  const [positionId, setPositionId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [staffOrgId, setStaffOrgId] = useState("");
  const [password, setPassword] = useState("");
  const [positions, setPositions] = useState<Array<{ id: string; name: string }>>([]);
  const [units, setUnits] = useState<Array<{ id: string; name: string }>>([]);
  const [staffs, setStaffs] = useState<Array<{ id: string; name: string }>>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch positions, units, and staff (for supervisor)
  useEffect(() => {
    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };
    fetch(`${API_BASE_URL}/position`, { headers })
      .then(res => res.json())
      .then(data => setPositions(data));
    fetch(`${API_BASE_URL}/unit`, { headers })
      .then(res => res.json())
      .then(data => setUnits(data));
    fetch(`${API_BASE_URL}/staff`, { headers })
      .then(res => res.json())
      .then(data => setStaffs(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const token = Cookies.get("token");
    const res = await fetch(`${API_BASE_URL}/staff`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        email,
        image,
        gender,
        positionId,
        unitId,
        staffOrgId,
        password,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess("Staff berjaya ditambah!");
      setName("");
      setEmail("");
      setImage("");
      setGender("");
      setPositionId("");
      setUnitId("");
      setStaffOrgId("");
      setPassword("");
    } else {
      setError(data.message || "Gagal tambah Staff");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-4">
      <Input
        name="name"
        placeholder="Nama Staff"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <Input
        name="email"
        type="email"
        placeholder="Email Staff"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <Input
        name="image"
        placeholder="Image URL"
        value={image}
        onChange={e => setImage(e.target.value)}
      />
      <Select value={gender} onValueChange={setGender} required>
        <SelectTrigger className="bg-white text-black w-full">
          <SelectValue placeholder="Pilih Jantina" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Lelaki">Lelaki</SelectItem>
          <SelectItem value="Perempuan">Perempuan</SelectItem>
        </SelectContent>
      </Select>
      <Select value={positionId} onValueChange={setPositionId} required>
        <SelectTrigger className="bg-white text-black w-full">
          <SelectValue placeholder="Pilih Position" />
        </SelectTrigger>
        <SelectContent>
          {positions.map(pos => (
            <SelectItem key={pos.id} value={pos.id}>{pos.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={unitId} onValueChange={setUnitId} required>
        <SelectTrigger className="bg-white text-black w-full">
          <SelectValue placeholder="Pilih Unit" />
        </SelectTrigger>
        <SelectContent>
          {units.map(unit => (
            <SelectItem key={unit.id} value={unit.id}>{unit.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={staffOrgId} onValueChange={setStaffOrgId}>
        <SelectTrigger className="bg-white text-black w-full">
          <SelectValue placeholder="Pilih Supervisor (optional)" />
        </SelectTrigger>
        <SelectContent>
          {staffs.map(staff => (
            <SelectItem key={staff.id} value={staff.id}>{staff.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      <Button type="submit" className="w-full bg-white text-black">Tambah Staff</Button>
    </form>
  );
}