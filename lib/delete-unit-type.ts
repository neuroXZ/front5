import Cookies from "js-cookie"
import { API_BASE_URL } from "@/lib/api"

/**
 * Delete unit type by id. Returns true if success, false if fail.
 * @param id id of the unit type
 * @returns boolean
 */
export async function deleteUnitType(id: string | number): Promise<boolean> {
  const token = Cookies.get("token")
  if (!token) return false
  try {
    const res = await fetch(`${API_BASE_URL}/unittype/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.ok
  } catch {
    return false
  }
}
