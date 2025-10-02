import PositionTableClient from "./action/tableClient";
import { Position, Grade } from "./columns";
import { API_BASE_URL } from "@/lib/api";
import { cookies } from "next/headers";
import axios from "axios";

async function getPositions(): Promise<Position[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const response = await axios.get(`${API_BASE_URL}/position`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

async function getGrades(): Promise<Grade[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const response = await axios.get(`${API_BASE_URL}/grade`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export default async function PositionPage() {
  const [positions, grades] = await Promise.all([getPositions(), getGrades()]);

  return (
    <div className="container mx-auto py-10">
      <PositionTableClient positions={positions} grades={grades} />
    </div>
  );
}

