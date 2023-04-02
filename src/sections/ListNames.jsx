import {
  Button, Stack, Text, Heading, Flex, Box,
} from '@chakra-ui/react';
import { MinusIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { useAppProvider } from '../provider/AppProvider';

export function ListNamesItem({ name, removeElement }) {
  const [showButton, setShowButton] = useState(false);

  return (
    <Flex
      justifyContent="space-between"
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <Stack>
        <Text>{name}</Text>
      </Stack>
      <Stack justifyContent="end">
        {showButton
          && (
          <Button
            onClick={() => removeElement(name)}
            colorScheme="red"
            size="xs"
          >
            <MinusIcon />
          </Button>
          )}
      </Stack>
    </Flex>
  );
}

export function ListNames() {
  const { list, cleanList, removeElement } = useAppProvider();

  return (
    <Stack w="full" h="full" p={5} spacing={5} alignItems="center">
      <Heading size="lg">Names</Heading>
      {list.length === 0 ? (
        <Text>Empty list</Text>
      ) : (
        <Stack w="275px" alignItems="center">
          <Stack mb={1} w="full">
            {list.map((name, index) => <ListNamesItem name={name} key={index} removeElement={removeElement} />)}
          </Stack>
          <Button onClick={cleanList} colorScheme="red" w="full">
            Clear list
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
