import { Button, Stack, Input } from "@chakra-ui/react";
import { useCallback, useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
// import { useDropzone } from "react-dropzone";

export const InputNames = () => {
  // const onDrop = useCallback((acceptedFiles) => {
  //   console.log("acceptedFiles", acceptedFiles);
  // }, []);

  // const { getRootProps } = useDropzone({
  //   onDrop,
  //   accept: { "image/png": [".png"], "image/jpg": [".jpg", ".jpeg"] },
  //   maxFiles: 1,
  // });

  const [inputName, setInputName] = useState("");
  const [pickedName, setPickedName] = useState("");
  const { addName } = useContext(AppContext);

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      onAddName();
    }
  };

  const onAddName = () => {
    if (inputName === "") { // || names.includes(inputName)) {
      setInputName("");
      return;
    }

    addName(inputName);
    setInputName("");
  };

  const onPickName = () => {
    const randomIndex = Math.floor(Math.random() * names.length);
    setPickedName(names[randomIndex]);
  };

  return (
    <Stack w="full" h="full" p={10} spacing={10} alignItems="center">
      <Stack spacing={3}>
        <Input
          type="text"
          name="name"
          value={inputName}
          placeholder="Person name"
          onKeyDown={handleEnter}
          onChange={(event) => {
            setInputName(event.target.value);
          }}
        />
        <Button onClick={onAddName} mt={3} colorScheme="green">
          Add Name
        </Button>
        <Button onClick={onPickName}>Pick!</Button>
        {pickedName && <p>{pickedName}</p>}
        {/* <Stack {...getRootProps()}>
          <p>
            Or.. drag 'n' drop an image with names , or click to select an image
            file
          </p>
        </Stack> */}
      </Stack>
    </Stack>
  );
};
