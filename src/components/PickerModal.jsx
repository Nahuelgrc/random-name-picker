import React from 'react';
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
  Spinner,
} from '@chakra-ui/react';
import { useGiphy } from '../hooks';

export function PickerModal({
  pickedName, isOpen, onClose, showGif,
}) {
  const { gifUrl, isLoading } = useGiphy({ pickedName, isOpen });

  return (
    <Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent alignItems="center">
          <ModalHeader>{pickedName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {showGif
              && (isLoading ? (
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
}
