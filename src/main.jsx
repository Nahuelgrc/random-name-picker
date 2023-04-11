import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, Container, Flex } from '@chakra-ui/react';
import { InputNames, ListNames } from './sections';
import { AppProvider } from './provider/AppProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <ChakraProvider>
        <Container maxW="container.xl" p={0}>
          <Flex h="100vh" py={10}>
            <ListNames />
            <InputNames />
          </Flex>
        </Container>
      </ChakraProvider>
    </AppProvider>
  </React.StrictMode>,
);
