"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/lib/api";
import Cookies from "js-cookie";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Position = { id: string; name: string };
type Unit = { id: string; name: string };
type StaffOrg = { id: string; name: string };

export default function CreateEmployeeForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [staffOrgId, setStaffOrgId] = useState("");
  const [staffOrg, setStaffOrg] = useState<StaffOrg[]>([]);
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [units, setUnits] = useState<Unit[]>([]);
  const [unitId, setUnitId] = useState<string>("");
  const [positions, setPositions] = useState<Position[]>([]);
  const [positionId, setPositionId] = useState<string>("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchPositions = async () => {
      const token = Cookies.get("token");
      const res = await fetch(`${API_BASE_URL}/position`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setPositions(data);
    };
    fetchPositions();

    const fetchUnits = async () => {
      const token = Cookies.get("token");
      const res = await fetch(`${API_BASE_URL}/unit`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setUnits(data);
    };
    fetchUnits();

    const fetchStaffOrg = async () => {
      const token = Cookies.get("token");
      const res = await fetch(`${API_BASE_URL}/staff`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setStaffOrg(data);
    };
    fetchStaffOrg();

  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!name || !email || !unitId || !positionId || !gender || !staffOrgId) {
      setError("Sila isi semua field wajib.");
      return;
    }
    const token = Cookies.get("token");
    const body: {
      name: string;
      email: string;
      image: string;
      positionId: string;
      unitId: string;
      gender: string;
      staffOrgId: string;
      password?: string;
    } = { name, email, image, positionId, unitId, gender, staffOrgId, password };
    const res = await fetch(`${API_BASE_URL}/staff`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess("Employee berjaya ditambah!");
      setName("");
      setEmail("");
      setImage("");
      setPassword("");
      setUnitId("");
      setPositionId("");
      setStaffOrgId("");
      setGender("");
      window.location.reload();
    } else {
      setError(data.message || "Gagal tambah Employee");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-4">


      <Input
        name="name"
        className="bg-white text-black"
        placeholder="Nama Employee"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <Input
        name="email"
        className="bg-white text-black"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        name="image"
        className="bg-white text-black"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Select value={gender} onValueChange={setGender} required>
        <SelectTrigger className="bg-white text-black w-full">
          <SelectValue placeholder="Pilih Gender" />
        </SelectTrigger>
        <SelectContent className="w-full">
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
        </SelectContent>
      </Select>

      <Select value={positionId} onValueChange={setPositionId} required>
        <SelectTrigger className="bg-white text-black w-full">
          <SelectValue placeholder="Pilih Position" />
        </SelectTrigger>
        <SelectContent className="h-60 w-full">
          {positions.map((ut) => (
            <SelectItem key={ut.id} value={ut.id}>
              {ut.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={unitId} onValueChange={setUnitId} required>
        <SelectTrigger className="bg-white text-black w-full">
          <SelectValue placeholder="Pilih Unit" />
        </SelectTrigger>
        <SelectContent className="h-60 w-full">
          {units.map((ut) => (
            <SelectItem key={ut.id} value={ut.id}>
              {ut.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={staffOrgId} onValueChange={setStaffOrgId} required>
        <SelectTrigger className="bg-white text-black w-full">
          <SelectValue placeholder="Pilih Staff Organization" />
        </SelectTrigger>
        <SelectContent className="h-60 w-full">
          {staffOrg.map((ut) => (
            <SelectItem key={ut.id} value={ut.id}>
              {ut.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        name="password"
        className="bg-white text-black"
        placeholder="Staff Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      <Button type="submit" className="w-full bg-white text-black">
        Create Employee
      </Button>
    </form>
  );
}