import axios from "axios";

const URL = process.env.URL;

export const getPatients = async () => {
  return await axios.get(`${URL}/patients`);
};

export const changePatientStatus = async (id: number, status: boolean) => {
  const payload = { isActive: status };
  return await axios.patch(`${URL}/patients/changeStatus/${id}`, payload);
};

export const addPatient = async (payload: any) => {
  return await axios.post(`${URL}/patients`, payload);
};

export const updatePatient = async (id: number, payload: any) => {
  return await axios.patch(`${URL}/patients/${id}`, payload);
};

export const deletePatient = async (id: number) => {
  return await axios.delete(`${URL}/patients/${id}`);
};

export const getTreatments = async () => {
  return await axios.get(`${URL}/treatments`);
};

export const getLocations = async () => {
  return await axios.get(`${URL}/locations`);
};
