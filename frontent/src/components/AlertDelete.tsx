import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: any;
  onDelete?: () => void;
}

export default function AlertDelete({
  isOpen,
  onClose,
  data,
  onDelete,
}: Props) {
  const alertRef = React.useRef<any>();

  return (
    <AlertDialog
      leastDestructiveRef={alertRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Hapus Pasien</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Anda yakin ingin menghapus {data?.name}?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={alertRef} onClick={onClose}>
            Tidak
          </Button>
          <Button onClick={onDelete} colorScheme="red" ml={3}>
            Ya
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
