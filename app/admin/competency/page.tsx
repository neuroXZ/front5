import CompetencyTableClient from "./action/tableClient";
import { Competency, Cluster } from "./columns";
import { API_BASE_URL } from "@/lib/api";
import { cookies } from "next/headers";
import axios from "axios";

async function getCompetencies(): Promise<Competency[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const response = await axios.get(`${API_BASE_URL}/competency`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

async function getClusters(): Promise<Cluster[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const response = await axios.get(`${API_BASE_URL}/cluster`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export default async function CompetencyPage() {
  const [competencies, clusters] = await Promise.all([getCompetencies(), getClusters()]);

  return (
    <div className="container mx-auto py-10">
      <CompetencyTableClient competencies={competencies} clusters={clusters} />
    </div>
  );
}

