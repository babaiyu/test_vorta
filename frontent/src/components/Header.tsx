import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";

export default function Header() {
  return (
    <>
      <Box px={4} mb="10" bg="gray.100">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Box>Logo</Box>

          <Flex alignItems="center">
            <Stack direction="row" spacing={7}>
              <Button>Lorem Ipsum</Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded="full"
                  cursor="pointer"
                  minW={0}
                >
                  <Avatar size="sm" name="Bayu Permana" />
                </MenuButton>
                <MenuList alignItems="center">
                  <br />
                  <Center>
                    <Avatar size="2xl" name="Bayu Permana" />
                  </Center>
                  <br />
                  <Center>
                    <p>Bayu Permana</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Sign Out</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
