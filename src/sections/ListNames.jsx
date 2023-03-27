import { Button, ListItem, Stack, List, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { getNameList } from "../utils/localStorage";

export const ListNames = () => {
  const { nameList } = useContext(AppContext);

  const onClearList = () => {
    setNames([]);
    setPickedName("");
  };

  return (
    <Stack w="full" h="full" p={10} spacing={10} alignItems="center">
      <List>
        {nameList.length == 0 ? (
          <Text> Empty list </Text>
        ) : (
          <>
            {nameList.map((name) => (
              <ListItem key={name}>{name}</ListItem>
            ))}

            <Button onClick={onClearList} mt={5} colorScheme="red">
              Clear list
            </Button>
          </>
        )}
        {/* {names.length > 0 && (
            <>
              {names.map((name) => (
                <ListItem key={name}>{name}</ListItem>
              ))}

              <Button onClick={onClearList} mt={5}>
                Clear list
              </Button>
            </>
          )} */}
      </List>
    </Stack>
  );
};
