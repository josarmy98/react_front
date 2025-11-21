import apiClient from "./client";

export interface Auto {
  id: number;
  marca: string;
  modelo: string;
  anio: number; // Changed from año to anio to match typical API responses or keep consistent. User asked for 'anio' in prompt but file had 'año'. I will stick to user request 'anio' but check if I need to map it. The user prompt said: "anio: number".
  patente: string;
  color?: string;
  vin?: string;
}

export interface AutoCreate {
  marca: string;
  modelo: string;
  anio: number;
  patente: string;
}

export const getAutos = async (): Promise<Auto[]> => {
  try {
    const response = await apiClient.get<Auto[]>("/api/autos/");
    return response.data;
  } catch (error) {
    console.error("Error fetching autos:", error);
    throw error;
  }
};

export const getAuto = async (id: number | string): Promise<Auto> => {
  try {
    const response = await apiClient.get<Auto>(`/api/autos/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching auto ${id}:`, error);
    throw error;
  }
};

export const createAuto = async (data: AutoCreate): Promise<Auto> => {
  try {
    const response = await apiClient.post<Auto>("/api/autos/", data);
    return response.data;
  } catch (error) {
    console.error("Error creating auto:", error);
    throw error;
  }
};

export const updateAuto = async (
  id: number | string,
  data: Partial<AutoCreate>
): Promise<Auto> => {
  try {
    const response = await apiClient.patch<Auto>(`/api/autos/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating auto ${id}:`, error);
    throw error;
  }
};

export const deleteAuto = async (id: number | string): Promise<void> => {
  try {
    await apiClient.delete(`/api/autos/${id}/`);
  } catch (error) {
    console.error(`Error deleting auto ${id}:`, error);
    throw error;
  }
};

