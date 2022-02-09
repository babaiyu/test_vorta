import { toast, useDisclosure, useToast } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useMemo, useState } from "react";
import AlertDelete from "../components/AlertDelete";
import Header from "../components/Header";
import Hero from "../components/Hero";
import List from "../components/List";
import ModalPatient from "../components/ModalPatient";
import patientsHook from "../hooks/patientsHook";

type typeOfModal = "add" | "update" | "update_full" | "";

const Home: NextPage = () => {
  const {
    patients,
    changeStatus,
    _addPatient,
    _updatePatient,
    _deletePatient,
  } = patientsHook();
  const [modalType, setModalType] = useState<typeOfModal>("");
  const [dataEdit, setDataEdit] = useState<any>(undefined);

  const modal = useDisclosure();
  const alert = useDisclosure();
  const toast = useToast();

  const onChangeStatus = async (id: number, status: boolean) => {
    try {
      await changeStatus(id, status);
      toast({
        title: "Success",
        description: "Berhasil ubah status pasien",
        status: "success",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Oops, terjadi kesalahan!",
        status: "error",
      });
    }
  };

  const onSavePatient = async (v: any) => {
    try {
      if (modalType === "add") {
        await _addPatient(v);
        toast({
          title: "Success",
          description: "Berhasil menambahkan pasien baru",
          status: "success",
        });
      } else if (modalType === "update" || modalType === "update_full") {
        await _updatePatient(dataEdit?.id, v);
        toast({
          title: "Success",
          description: "Berhasil ubah data pasien",
          status: "success",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Oops, terjadi kesalahan!",
        status: "error",
      });
    } finally {
      modal.onClose();
    }
  };

  const onDeletePatient = async () => {
    try {
      await _deletePatient(dataEdit?.id);
      toast({
        title: "Success",
        description: "Berhasil hapus pasien",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Oops, terjadi kesalahan!",
        status: "error",
      });
    } finally {
      alert.onClose();
      setDataEdit(undefined);
    }
  };

  const onModalAdd = () => {
    setModalType("add");
    modal.onOpen();
  };
  const onModalEdit = (data: any) => {
    setModalType("update");
    setDataEdit(data);
    modal.onOpen();
  };
  const onModalUpdate = (data: any) => {
    setModalType("update_full");
    setDataEdit(data);
    modal.onOpen();
  };
  const onAlertOpen = (data: any) => {
    setDataEdit(data);
    alert.onOpen();
  };
  const onModalClose = () => {
    setModalType("");
    setDataEdit(undefined);
    modal.onClose();
  };

  const modalTitle = useMemo(() => {
    switch (modalType) {
      case "add":
        return "Tambah Pasien";
      case "update":
        return "Ubah Jadwal Appointment";
      case "update_full":
        return "Ubah Data Pasien";
      default:
        return "";
    }
  }, [modalType]);

  return (
    <>
      <Header />
      <Hero onAddPatient={onModalAdd} />
      <List
        data={patients}
        onChangeStatus={onChangeStatus}
        onChangeAppointment={onModalEdit}
        onUpdate={onModalUpdate}
        onDelete={onAlertOpen}
      />

      <ModalPatient
        onClose={onModalClose}
        isOpen={modal.isOpen}
        title={modalTitle}
        dataEdit={dataEdit}
        type={modalType}
        onSave={(v: any) => onSavePatient(v)}
      />

      <AlertDelete
        isOpen={alert.isOpen}
        onClose={alert.onClose}
        data={dataEdit}
        onDelete={onDeletePatient}
      />
    </>
  );
};

export default Home;
