import axios from "axios";

const URL = process.env.URL;

export const getPatients = async () => {
  return await axios.get(`${URL}/patients`);
};

export const changePatientStatus = async (id: number, status: boolean) => {
  const payload = { isActive: status };
  return await axios.patch(`${URL}/patients/changeStatus/${id}`, payload);
};
