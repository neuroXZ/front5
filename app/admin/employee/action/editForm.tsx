"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import Cookies from "js-cookie";
import { Employee } from "../columns";

type Position = {
  id: string;
  name: string;
};
type Unit = {
  id: string;
  name: string;
};
type StaffOrg = {
  id: string;
  name: string;
};

interface EditFormProps {
  data: Employee;
}

export default function EditForm({ data }: EditFormProps) {

  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [gender, setGender] = useState(data.gender);
  const [password, setPassword] = useState(data.password);
  const [image, setImage] = useState(data.image);
  const [units, setUnits] = useState<Unit[]>([]);
  const [unitId, setUnitId] = useState(data.unitId);
  const [staffOrgs, setStaffOrgs] = useState<StaffOrg[]>([]);
  const [staffOrgId, setStaffOrgId] = useState(data.staffOrgId);
  const [positions, setPositions] = useState<Position[]>([]);
  const [positionId, setPositionId] = useState(data.positionId);
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

    const fetchStaffOrgs = async () => {
      const token = Cookies.get("token");
      const res = await fetch(`${API_BASE_URL}/staff`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setStaffOrgs(data);
    };
    fetchStaffOrgs();
  }, []);

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const token = Cookies.get("token");
    // Hanya hantar staffOrgId jika ada
    const body: {
      name: string;
      email: string;
      image: string;
      positionId: string;
      unitId: string;
      password: string;
      gender: string;
      staffOrgId?: string;
    } = { name, email, image, positionId, unitId, password, gender };
    if (staffOrgId) body.staffOrgId = staffOrgId;
    const res = await fetch(`${API_BASE_URL}/staff/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const result = await res.json();
    if (res.ok) {
      setSuccess("Employee berjaya dikemaskini!");
      window.location.reload();
    } else {
      setError(result.message || "Gagal kemaskini Employee");
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
          <Input
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            name="image"
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
            <SelectContent className="max-h-48 overflow-y-auto">
              {positions.map((position) => (
                <SelectItem key={position.id} value={position.id}>
                  {position.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={unitId} onValueChange={setUnitId} required>
            <SelectTrigger className="bg-white text-black w-full">
              <SelectValue placeholder="Pilih Unit" />
            </SelectTrigger>
            <SelectContent className="max-h-48 overflow-y-auto">
              {units.map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={staffOrgId} onValueChange={setStaffOrgId} required>
            <SelectTrigger className="bg-white text-black w-full">
              <SelectValue placeholder="Pilih Staff Organization" />
            </SelectTrigger>
            <SelectContent className="max-h-48 overflow-y-auto">
              {staffOrgs.map((staffOrg) => (
                <SelectItem key={staffOrg.id} value={staffOrg.id}>
                  {staffOrg.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          />
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-600">{success}</div>}
          <Button type="submit">Kemaskini Department</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}