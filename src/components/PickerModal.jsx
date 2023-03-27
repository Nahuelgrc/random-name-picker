import {
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Image,
  ModalBody,
  Text,
} from "@chakra-ui/react";
import { useGiphy } from "../hooks";
import { Spinner } from "@chakra-ui/react";

export const PickerModal = ({ pickedName, isOpen, onClose, showGif }) => {
  const { gifUrl, isLoading } = useGiphy({ pickedName, isOpen });

  return (
    <Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent alignItems="center">
          <ModalHeader>{pickedName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {showGif &&
              (isLoading ? (
                <Spinner size="xl" />
              ) : (
                <>
                  <Image src={gifUrl} />
                  <Text>Powered by GIPHY</Text>
                </>
              ))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};
