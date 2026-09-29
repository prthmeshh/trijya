import { works as sampleWorks } from '../data/sampleData';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

/**
 * Fetch all works from backend, with fallback to sampleData
 */
export async function getWorks() {
  try {
    const res = await fetch(`${API_BASE_URL}/works`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    if (data.success && Array.isArray(data.works)) {
      return data.works;
    }
    return sampleWorks;
  } catch (err) {
    console.warn('API getWorks failed, using fallback sample data:', err);
    return sampleWorks;
  }
}

/**
 * Fetch a single work by ID
 */
export async function getWorkById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/works/${id}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    if (data.success && data.work) {
      return data.work;
    }
    return sampleWorks.find(w => String(w.id) === String(id)) || null;
  } catch (err) {
    console.warn(`API getWorkById(${id}) failed, checking fallback:`, err);
    return sampleWorks.find(w => String(w.id) === String(id)) || null;
  }
}

/**
 * Create a new work
 */
export async function createWork(workData) {
  const res = await fetch(`${API_BASE_URL}/works`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(workData)
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'साहित्य जोडताना त्रुटी आली');
  }
  return data;
}

/**
 * Update an existing work
 */
export async function updateWork(id, workData) {
  const res = await fetch(`${API_BASE_URL}/works/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(workData)
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'साहित्य अद्ययावत करताना त्रुटी आली');
  }
  return data;
}

/**
 * Delete a work
 */
export async function deleteWork(id) {
  const res = await fetch(`${API_BASE_URL}/works/${id}`, {
    method: 'DELETE'
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'साहित्य हटवताना त्रुटी आली');
  }
  return data;
}

