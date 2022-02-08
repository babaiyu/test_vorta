import { useEffect, useState } from "react";
import { changePatientStatus, getPatients } from "../services/api";

export default function patientsHook() {
  const [patients, setPatients] = useState([]);

  async function onGetPatients() {
    try {
      const result = await getPatients();
      setPatients(result.data?.patients);
    } catch (error) {
      console.log("Error => ", error);
    }
  }

  const changeStatus = async (id: number, status: boolean) => {
    try {
      const result = await changePatientStatus(id, status);
      if (result.data) await onGetPatients();
    } catch (error) {
      console.log("Error => ", error);
    }
  };

  useEffect(() => {
    onGetPatients();
  }, []);

  return { patients, changeStatus };
}
