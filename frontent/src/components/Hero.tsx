import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import React from "react";

interface Props {
  onAddPatient: () => void;
}

export default function Hero({ onAddPatient }: Props) {
  return (
    <>
      <Box px={4}>
        <Container maxW="6xl">
          <Flex justifyContent="center" alignItems="center">
            <Box p="2">
              <Heading size="xl">Data Pasien</Heading>
            </Box>
            <Spacer />
            <Box>
              <Button
                colorScheme="red"
                leftIcon={<CloseIcon />}
                variant="outline"
                mr="4"
              >
                Non-Aktifkan
              </Button>
              <Button
                colorScheme="teal"
                leftIcon={<AddIcon />}
                onClick={onAddPatient}
              >
                Tambah Pasien
              </Button>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
