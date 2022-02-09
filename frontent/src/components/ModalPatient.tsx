import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import Calendar from "react-calendar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { customRegex } from "../utils";
import itemHook from "../hooks/itemHook";
import "react-calendar/dist/Calendar.css";
import ItemTime from "./ItemTime";
import dayjs from "dayjs";
import { useEffect } from "react";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  title: string;
  onSave: (v: any) => void;
  dataEdit?: any;
  type: "add" | "update" | "update_full" | "";
}

const schema = yup.object({
  name: yup.string().required("Wajib Diisi!"),
  phoneNumber: yup
    .string()
    .matches(customRegex.phone, "Format nomor telepon tidak sesuai!")
    .min(10, "Minimal 10 digit angka!")
    .max(15, "Maksimal 15 digit angka!")
    .required("Wajib Diisi!"),
  isActive: yup.string().required("Wajib Pilih!"),
  treatmentId: yup.string().required("Wajib Pilih!"),
  locationId: yup.string().required("Wajib Pilih!"),
  date: yup.string().required("Wajib Pilih!"),
  time_start: yup.string().required("Wajib Pilih!"),
});

export default function ModalPatient({
  onClose,
  isOpen,
  title,
  onSave,
  dataEdit,
  type,
}: Props) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    getValues,
    watch,
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const { treatments, locations } = itemHook();

  const onSubmit = (data: any) => {
    const getTime = data?.time_start.split(".");
    const timeEnd =
      getTime[1] === "00" ? `${getTime[0]}.30` : `${+getTime[0] + 1}.00`;

    const payload = {
      name: data?.name,
      phone_number: data?.phoneNumber,
      is_active: +data?.isActive === 1 ? true : false,
      treatmentId: +data?.treatmentId,
      locationId: +data?.locationId,
      date: data?.date ? dayjs(data?.date).format("YYYY-MM-DD") : "",
      time_start: data?.time_start,
      time_end: timeEnd,
      create_date: new Date(),
      update_date: new Date(),
    };

    console.log("Payload => ", payload);
    onSave(payload);
  };

  const _onClose = () => {
    Promise.all([reset()]).then(() => onClose());
  };

  const onGetDataEdit = () => {
    setValue("name", dataEdit?.name || "");
    setValue("phoneNumber", dataEdit?.phone_number || "");
    setValue("isActive", dataEdit?.is_active ? "1" : "0");
    setValue("treatmentId", String(dataEdit?.treatmentId || ""));
    setValue("locationId", String(dataEdit?.locationId || ""));
    setValue("date", dayjs(dataEdit?.date).toDate() || "");
    setValue("time_start", dataEdit?.time_start || "");
  };

  useEffect(() => {
    onGetDataEdit();
  }, [dataEdit]);

  return (
    <Modal onClose={_onClose} isOpen={isOpen}>
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent maxW="3xl">
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* ONLY WHEN EDITING */}
            {dataEdit && (
              <Alert>
                <AlertIcon />
                Masukkan informasi {type === "update" &&
                  "jadwal appointment"}{" "}
                baru untuk pasien, {dataEdit?.name}
              </Alert>
            )}

            {/* FORMS */}
            {/* Name */}
            <FormControl hidden={type === "update"} isInvalid={errors?.name}>
              <FormLabel htmlFor="name">Nama</FormLabel>
              <Input
                id="name"
                placeholder="Masukkan Nama"
                type="text"
                {...register("name")}
              />
              <FormErrorMessage>
                {errors?.name && errors?.name?.message}
              </FormErrorMessage>
            </FormControl>

            {/* Phone Number */}
            <FormControl
              hidden={type === "update"}
              isInvalid={errors?.phoneNumber}
            >
              <FormLabel htmlFor="phoneNumber">Nomor Telepon</FormLabel>
              <Input
                id="phoneNumber"
                placeholder="Masukkan Nomor Telepon"
                type="text"
                {...register("phoneNumber")}
              />
              <FormErrorMessage>
                {errors?.phoneNumber && errors?.phoneNumber?.message}
              </FormErrorMessage>
            </FormControl>

            {/* Is Active */}
            <FormControl
              hidden={type === "update"}
              isInvalid={errors?.isActive}
            >
              <FormLabel htmlFor="isActive">Status</FormLabel>
              <Select
                id="isActive"
                placeholder="Pilih Status"
                {...register("isActive")}
              >
                <option value={"1"}>Aktif</option>
                <option value={"0"}>Non-Aktif</option>
              </Select>
              <FormErrorMessage>
                {errors?.isActive && errors?.isActive?.message}
              </FormErrorMessage>
            </FormControl>

            {/* Treatments & Locations */}
            <Flex>
              <FormControl isInvalid={errors?.treatmentId}>
                <FormLabel htmlFor="treatmentId">Treatment</FormLabel>
                <Select
                  id="treatmentId"
                  placeholder="Pilih Treatment"
                  {...register("treatmentId")}
                >
                  {treatments.map((item) => (
                    <option key={item?.id} value={item?.id}>
                      {item?.name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors?.treatmentId && errors?.treatmentId?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl maxW="5" />
              <FormControl isInvalid={errors?.locationId}>
                <FormLabel htmlFor="locationId">Lokasi</FormLabel>
                <Select
                  id="locationId"
                  placeholder="Pilih Lokasi"
                  {...register("locationId")}
                >
                  {locations.map((item) => (
                    <option key={item?.id} value={item?.id}>
                      {item?.name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors?.locationId && errors?.locationId?.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>

            {/* Date & Time Start - End */}
            <Flex>
              <FormControl isInvalid={errors?.date}>
                <FormLabel htmlFor="date">Tanggal</FormLabel>
                <Calendar
                  onChange={(val: any) => setValue("date", val)}
                  minDate={new Date()}
                  defaultValue={getValues("date")}
                />
                <FormErrorMessage>
                  {errors?.date && errors?.date?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl maxW="5" />
              <FormControl isInvalid={errors?.time_start}>
                <FormLabel htmlFor="time_start">Waktu</FormLabel>
                <ItemTime
                  onChange={(v) => {
                    setValue("time_start", v);
                  }}
                  value={watch("time_start")}
                />
                <FormErrorMessage>
                  {errors?.time_start && errors?.time_start?.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>

            {/*  */}
            {/* END FORMS */}
          </ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              type="button"
              mr={3}
              onClick={_onClose}
              leftIcon={<CloseIcon />}
            >
              Batal
            </Button>
            <Button type="submit" colorScheme="blue" leftIcon={<CheckIcon />}>
              {dataEdit ? "Ubah" : "Simpan"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
