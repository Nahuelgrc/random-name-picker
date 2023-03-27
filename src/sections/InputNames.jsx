import {
  Button,
  Stack,
  Input,
  Checkbox,
  Tooltip,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useState, useCallback } from "react";
import { PickerModal } from "../components";
import { useDropzone } from "react-dropzone";
import { convertImageToText } from "../utils";
import { useAppProvider } from "../provider/AppProvider";

export const InputNames = () => {
  const [name, setName] = useState("");
  const [pickedName, setPickedName] = useState("");
  const [showGif, setShowGif] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addBulkToList, addToList, list } = useAppProvider();

  const onDrop = useCallback((file) => {
    if (!file || !file[0]) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUri = reader.result;
      convertImageToText(imageDataUri).then((textArray) => {
        addBulkToList(textArray);
      });
    };
    reader.readAsDataURL(file[0]);
  }, []);

  const { getRootProps } = useDropzone({
    onDrop,
    accept: { "image/png": [".png"], "image/jpg": [".jpg", ".jpeg"] },
    maxFiles: 1,
  });

  const onPickName = () => {
    if (list.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * list.length);
    setPickedName(list[randomIndex]);
    onOpen();
  };

  const onInputChange = ({ target }) => {
    const { value } = target;
    setName(value);
  };

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (/^\s*$/.test(name)) {
        return;
      }

      addToList(name.trim());
      setName("");
    },
    [name]
  );

  return (
    <Stack w="full" h="full" p={5} spacing={10} alignItems="center">
      <Stack spacing={3}>
        <form as="form" onSubmit={onSubmit}>
          <Stack alignItems="center" spacing={3} w="full">
            <Input
              type="text"
              name="name"
              value={name}
              placeholder="Person name"
              onChange={onInputChange}
            />
            <Button
              type="submit"
              colorScheme="green"
              alignItems="center"
              w="full"
            >
              Add Name
            </Button>
          </Stack>
        </form>
        <Stack
          border="1px"
          borderColor="green"
          alignItems="center"
          p={3}
          {...getRootProps()}
          cursor="pointer"
        >
          <Text w={250} textAlign="center" fontSize="xl">
            Or drag and drop an image with names, or click to select an image
            file
          </Text>
        </Stack>
        <Button onClick={onPickName} isDisabled={list.length === 0}>
          Pick!
        </Button>
        <Checkbox
          defaultChecked
          colorScheme="green"
          onChange={(e) => setShowGif(e.target.checked)}
        >
          <Tooltip label="A gif will be shown in a modal if selected  ">
            Show gif based on picked name
          </Tooltip>
        </Checkbox>
        <PickerModal
          pickedName={pickedName}
          isOpen={isOpen}
          onClose={onClose}
          showGif={showGif}
        />
      </Stack>
    </Stack>
  );
};
