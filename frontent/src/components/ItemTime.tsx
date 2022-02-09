import { Button, Flex } from "@chakra-ui/react";

const dataTime = [
  "12.30",
  "13.00",
  "13.30",
  "14.00",
  "14.30",
  "15.00",
  "15.30",
  "16.00",
];

interface Props {
  onChange: (v: string) => void;
  value: string;
}

export default function ItemTime({ onChange, value }: Props) {
  const renderArr = () => {
    let arr: any[] = [];

    dataTime.forEach((item) => {
      arr.push(
        <Button
          onClick={() => onChange(item)}
          key={item}
          mr={2}
          mb={3}
          variant={value === item ? "solid" : "outline"}
          colorScheme={value === item ? "blue" : "blackAlpha"}
        >
          {item}
        </Button>
      );
    });

    return arr;
  };

  return <Flex flexWrap="wrap">{renderArr()}</Flex>;
}
