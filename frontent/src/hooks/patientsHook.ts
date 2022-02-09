import { useEffect, useState } from "react";
import { addPatient, changePatientStatus, getPatients } from "../services/api";

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

  const _addPatient = async (value: any) => {
    try {
      const result = await addPatient(value);
      if (result.data) await onGetPatients();
      return true;
    } catch (error) {
      console.log("Error => ", error);
      return false;
    }
  };

  useEffect(() => {
    onGetPatients();
  }, []);

  return { patients, changeStatus, _addPatient };
}
