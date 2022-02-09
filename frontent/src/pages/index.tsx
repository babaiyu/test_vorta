import { useDisclosure } from "@chakra-ui/react";
import type { NextPage } from "next";
import Header from "../components/Header";
import Hero from "../components/Hero";
import List from "../components/List";
import ModalPatient from "../components/ModalPatient";
import patientsHook from "../hooks/patientsHook";

const Home: NextPage = () => {
  const { patients, changeStatus, _addPatient } = patientsHook();
  const modal = useDisclosure();

  const onChangeStatus = async (id: number, status: boolean) => {
    await changeStatus(id, status);
  };

  const onSavePatient = async (v: any) => {
    await _addPatient(v)
      .then((res) => {
        if (res) modal.onClose();
      })
      .catch((err) => {
        modal.onClose();
      })
      .finally(() => modal.onClose());
  };

  return (
    <>
      <Header />
      <Hero onAddPatient={modal.onOpen} />
      <List
        data={patients}
        onChangeStatus={(id: number, status: boolean) =>
          onChangeStatus(id, status)
        }
      />

      <ModalPatient
        onClose={modal.onClose}
        isOpen={modal.isOpen}
        title="Tambah Pasien"
        onSave={(v: any) => onSavePatient(v)}
      />
    </>
  );
};

export default Home;
