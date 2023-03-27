import React from "react";
import ReactDOM from "react-dom/client";
import { InputNames, ListNames } from "./sections";
import { ChakraProvider, Container, Flex } from "@chakra-ui/react";
import { AppProvider } from "./context/AppProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
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
  </React.StrictMode>
);
