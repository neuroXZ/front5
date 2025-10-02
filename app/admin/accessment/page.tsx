import { columns, Assessment } from "./columns"
import { DataTable } from "./data-table"
import { API_BASE_URL } from "@/lib/api"
import { cookies } from "next/headers"
import axios from "axios"


async function getData(): Promise<Assessment[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const response = await axios.get(`${API_BASE_URL}/assessment`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}


export default async function AssessmentPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}