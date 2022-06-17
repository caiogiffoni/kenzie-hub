import {
  Box,
  Input,
  FormLabel,
  FormErrorMessage,
  FormControl,
  Textarea,
} from "@chakra-ui/react";

export const TextareaDiv = ({ name, label, register, error = "", ...rest }) => {
  return (
    <FormControl isInvalid={error}>
      <Box w="100%" mt="15px">
        <FormLabel color="#F8F9FA" fontSize="xs" htmlFor={name}>
          {label}
        </FormLabel>
      </Box>
      <Textarea
        border="none"
        bg="#343B41"
        color="#F8F9FA"
        {...register(name)}
        {...rest}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};
