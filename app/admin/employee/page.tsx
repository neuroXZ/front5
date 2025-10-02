import EmployeeTableClient from "./action/tableClient";
import { Employee, Position, Unit } from "./columns";
import { API_BASE_URL } from "@/lib/api";
import { cookies } from "next/headers";
import axios from "axios";

async function getEmployees(): Promise<Employee[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const response = await axios.get(`${API_BASE_URL}/staff`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

async function getPositions(): Promise<Position[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const response = await axios.get(`${API_BASE_URL}/position`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

async function getUnits(): Promise<Unit[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const response = await axios.get(`${API_BASE_URL}/unit`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}


export default async function EmployeePage() {
  const [positions, units, employees] = await Promise.all([getPositions(), getUnits(), getEmployees()]);

  return (
    <div className="container mx-auto py-10">
      <EmployeeTableClient positions={positions} units={units} employees={employees}  />
    </div>
  );
}

