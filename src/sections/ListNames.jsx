import { Button, Stack, Text, Heading, Flex, Box } from "@chakra-ui/react";
import { useAppProvider } from "../provider/AppProvider";
import { MinusIcon } from "@chakra-ui/icons";
import { useState } from "react";

export const ListNames = () => {
  const { list, cleanList, removeElement } = useAppProvider();
  const [indexButtonColor, setIndexButtonColor] = useState({});

  return (
    <Stack w="full" h="full" p={5} spacing={5} alignItems="center">
      <Heading size="lg">Names</Heading>
      {list.length == 0 ? (
        <Text>Empty list</Text>
      ) : (
        <Stack w="275px" alignItems="center">
          <Stack mb={1} w="full">
            {list.map((name, index) => {
              return (
                <Flex
                  key={index}
                  justifyContent="space-between"
                  onMouseEnter={() => {
                    setIndexButtonColor({ ...indexButtonColor, [index]: true });
                  }}
                  onMouseLeave={() => {
                    setIndexButtonColor({
                      ...indexButtonColor,
                      [index]: false,
                    });
                  }}
                >
                  <Stack>
                    <Text>{name}</Text>
                  </Stack>
                  <Stack justifyContent="end">
                    <Button
                      onClick={() => {
                        removeElement(name);
                      }}
                      size="xs"
                      colorScheme={indexButtonColor[index] ? "red" : "white"}
                    >
                      <MinusIcon />
                    </Button>
                  </Stack>
                </Flex>
              );
            })}
          </Stack>

          <Button onClick={cleanList} colorScheme="red" w="full">
            Clear list
          </Button>
        </Stack>
      )}
    </Stack>
  );
};
