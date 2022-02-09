import {
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  DeleteIcon,
  StarIcon,
  SunIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import dayjs from "dayjs";

interface Props {
  data: any[];
  onChangeStatus: (id: number, status: boolean) => void;
  onChangeAppointment: (data: any) => void;
  onUpdate: (data: any) => void;
  onDelete: (data: any) => void;
}

export default function List({
  data,
  onChangeStatus,
  onChangeAppointment,
  onUpdate,
  onDelete,
}: Props) {
  return (
    <>
      <Container maxW="6xl" mt="5">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                <Checkbox />
              </Th>
              <Th>Nama</Th>
              <Th>No ID</Th>
              <Th>No Telpon</Th>
              <Th>Asuransi</Th>
              <Th>Appointment Berikutnya</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item?.id}>
                <Td>
                  <Checkbox />
                </Td>
                <Td>
                  <Box>
                    <b>{item?.name}</b>
                    <br />
                    <small>{item?.is_active ? "Aktif" : "Non-Aktif"}</small>
                  </Box>
                </Td>
                <Td>{item?.id_number || "-"}</Td>
                <Td>{item?.phone_number || "-"}</Td>
                <Td>-</Td>
                <Td>
                  <Flex>
                    <Box>
                      <Stack>
                        <p>
                          <StarIcon /> {item?.treatment?.name || "-"}
                        </p>
                      </Stack>
                      <Stack>
                        <p>
                          <CalendarIcon />{" "}
                          {dayjs(item?.date).format("dddd, DD MMM YY")} :{" "}
                          {item?.time_start} - {item?.time_end}
                        </p>
                      </Stack>
                    </Box>
                    <Spacer />
                    <Box>
                      <Menu>
                        {({ isOpen }) => (
                          <>
                            <MenuButton isActive={isOpen} as={Button}>
                              {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            </MenuButton>
                            <MenuList>
                              <MenuItem
                                onClick={() => onChangeAppointment(item)}
                                icon={<CalendarIcon />}
                              >
                                Ubah Appointment
                              </MenuItem>
                              {item?.is_active ? (
                                <MenuItem
                                  onClick={() =>
                                    onChangeStatus(item?.id, false)
                                  }
                                  icon={<CloseIcon />}
                                >
                                  Non-Aktifkan
                                </MenuItem>
                              ) : (
                                <MenuItem
                                  onClick={() => onChangeStatus(item?.id, true)}
                                  icon={<CheckIcon />}
                                >
                                  Aktifkan
                                </MenuItem>
                              )}
                              <MenuItem
                                onClick={() => onUpdate(item)}
                                icon={<SunIcon />}
                              >
                                Ubah Data
                              </MenuItem>
                              <MenuItem
                                onClick={() => onDelete(item)}
                                icon={<DeleteIcon />}
                              >
                                Hapus
                              </MenuItem>
                            </MenuList>
                          </>
                        )}
                      </Menu>
                    </Box>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>
    </>
  );
}
