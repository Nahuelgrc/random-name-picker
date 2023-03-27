import { Button, ListItem, Stack, List, Text, Heading } from "@chakra-ui/react";
import { useAppProvider } from "../provider/AppProvider";

export const ListNames = () => {
  const { list, cleanList } = useAppProvider();

  return (
    <Stack w="full" h="full" p={5} spacing={5} alignItems="center">
      <Heading size="lg">Names</Heading>
      {list.length == 0 ? (
        <Text>Empty list</Text>
      ) : (
        <List>
          <>
            {list.map((name, index) => (
              <ListItem key={index}>{name}</ListItem>
            ))}

            <Button onClick={cleanList} mt={5} colorScheme="red">
              Clear list
            </Button>
          </>
        </List>
      )}
    </Stack>
  );
};
