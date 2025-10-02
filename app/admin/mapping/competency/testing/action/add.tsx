/**
 * Add multiple competency mappings for a position
 * @param {string} positionId - ID of the selected position
 * @param {Array<{id: string, level: string}>} competenciesToAdd - Array of competency objects with id and level
 * @returns {Promise<string>} - Error message or empty string
 */
export async function addMultiplePositionCompetencies(
  positionId: string,
  competenciesToAdd: Array<{ id: string; level: string }>
) {
  const token = Cookies.get('token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  try {
    for (const comp of competenciesToAdd) {
      if (!comp.id || !comp.level) continue;
      const postData = {
        positionId,
        competencyId: comp.id,
        level: Number(comp.level)
      };
      await axios.post(`${API_BASE_URL}/positionCompetency`, postData, { headers });
    }
    return '';
  } catch (err: unknown) {
    if (typeof err === 'object' && err !== null) {
      const errorObj = err as { response?: { data?: { message?: string } }; message?: string };
      return 'Add mapping error: ' + (errorObj.response?.data?.message || errorObj.message || JSON.stringify(err));
    }
    return 'Add mapping error: ' + String(err);
  }
}
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '@/lib/api';

/**
 * Add competency mapping for a position
 * @param {string} positionId - ID of the selected position
 * @param {string} competencyId - ID of the competency to map
 * @param {number} level - Level value to assign
 * @returns {Promise<any>} - API response
 */
export async function addPositionCompetency(positionId: string, competencyId: string, level: number) {
  const token = Cookies.get('token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const postData = {
    positionId,
    competencyId,
    level,
  };
  try {
    const res = await axios.post(`${API_BASE_URL}/positionCompetency`, postData, { headers });
    return res.data;
  } catch (err: unknown) {
    if (typeof err === 'object' && err !== null) {
      const errorObj = err as { response?: { data?: { message?: string } }; message?: string };
      throw new Error(errorObj.response?.data?.message || errorObj.message || JSON.stringify(err));
    }
    throw new Error(String(err));
  }
}
