import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '@/lib/api';

/**
 * Delete a competency mapping for a position by mapping id
 * @param {string} id - ID of the positionCompetency mapping
 * @returns {Promise<string>} - Error message or empty string
 */
export async function deletePositionCompetencyById(id: string) {
	const token = Cookies.get('token');
	const headers = token ? { Authorization: `Bearer ${token}` } : {};
	try {
		await axios.delete(`${API_BASE_URL}/positionCompetency/${id}`, { headers });
		return '';
	} catch (err: unknown) {
		if (typeof err === 'object' && err !== null) {
			const errorObj = err as { message?: string };
			return 'Delete mapping error: ' + (errorObj.message || JSON.stringify(err));
		}
		return 'Delete mapping error: ' + String(err);
	}
}
