import DepartmentTableClient from "./action/tableClient";
import { Department, UnitType } from "./columns";
import { API_BASE_URL } from "@/lib/api";
import { cookies } from "next/headers";
import axios from "axios";

async function getDepartments(): Promise<Department[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const response = await axios.get(`${API_BASE_URL}/unit`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

async function getUnitTypes(): Promise<UnitType[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const response = await axios.get(`${API_BASE_URL}/unitType`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export default async function DepartmentPage() {
  const [departments, unitTypes] = await Promise.all([getDepartments(), getUnitTypes()]);

  return (
    <div className="container mx-auto py-10">
      <DepartmentTableClient departments={departments} unitTypes={unitTypes} />
    </div>
  );
}

