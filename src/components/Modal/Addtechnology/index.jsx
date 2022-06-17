import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import { InputDiv } from "../../InputDiv";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../../services/api";

export function Addtechnology({ children, token, user, setUser }) {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Campo obrigatório")
      .min(3, "Minimo 3 caracteres"),
    status: yup
      .string()
      .required("Escolha um status")
      .test("choosenSts", "Escolha o status da tecnologia", (value) => value),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitFunction = (data) => {
    api
      .post("/users/techs", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((_) => {
        api.get(`/users/${user.id}`).then((res) => {
          localStorage.setItem("@KenzieHub:user", JSON.stringify(res.data));
          setUser(res.data);
        });
        toast({
          title: "Tecnologia criada",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((err) => console.log(err));

    reset({ ...register });
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        w="32px"
        h="32px"
        bg="#212529"
        color="#FFFFFF"
        fontSize="xl"
      >
        {children}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <ModalContent mt="130px" w="270px" borderRadius="3px">
            <ModalHeader color="#F8F9FA" fontSize="xs" bgColor="#343B41">
              Cadastrar tecnologia
            </ModalHeader>
            <ModalCloseButton color="#868E96" fontSize="10px" />
            <ModalBody bgColor="#212529">
              <InputDiv
                label="Nome"
                name="title"
                register={register}
                error={errors.title?.message}
                placeholder="Digite a tecnologia"
              />
              <FormControl isInvalid={errors.status?.message}>
                <FormLabel
                  color="#F8F9FA"
                  fontSize="xs"
                  htmlFor="course_module"
                  mt="20px"
                >
                  Selecionar status
                </FormLabel>
                <Select
                  color="#a3a5a7"
                  bg="#343B41"
                  border="none"
                  {...register("status")}
                >
                  <option
                    style={{ color: "white", backgroundColor: "#343B41" }}
                    value=""
                    hidden
                  >
                    Selecionar status
                  </option>
                  <option
                    value="Iniciante"
                    style={{ color: "white", backgroundColor: "#343B41" }}
                  >
                    Iniciante
                  </option>
                  <option
                    value="Intermediário"
                    style={{ color: "white", backgroundColor: "#343B41" }}
                  >
                    Intermediário
                  </option>
                  <option
                    value="Avançado"
                    style={{ color: "white", backgroundColor: "#343B41" }}
                  >
                    Avançado
                  </option>
                </Select>
                <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter bgColor="#212529" border="none">
              <Button
                type="submit"
                isFullWidth
                bg="#FF577F"
                color="#FFF"
                fontSize="12px"
              >
                Cadastrar Tecnologia
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
