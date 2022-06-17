import {
  Button,
  Flex,
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
  Heading,
  Text,
} from "@chakra-ui/react";

import { InputDiv } from "../InputDiv";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";

export const Card = ({ token, user, setUser, id, title, status }) => {
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
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitFunction = ({ status }) => {
    const data = { status: status };
    api
      .put(`/users/techs/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((_) => {
        api.get(`/users/${user.id}`).then((res) => {
          localStorage.setItem("@KenzieHub:user", JSON.stringify(res.data));
          setUser(res.data);
        });
      })
      .catch((err) => console.log(err));

    onClose();
  };

  const deleteTech = (techId) => {
    api
      .delete(`/users/techs/${techId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((_) => {
        api.get(`/users/${user.id}`).then((res) => {
          localStorage.setItem("@KenzieHub:user", JSON.stringify(res.data));
          setUser(res.data);
        });
      })
      .catch((err) => console.log(err));
    onClose();
  };

  return (
    <>
      <Flex
        minWidth="calc(100% - 20px)"
        h="50px"
        m="10px 10px"
        bg="#121214"
        borderRadius="4px"
        justify="space-between"
        align="center"
        id={id}
        onClick={onOpen}
      >
        <Heading color="#F8F9FA" fontSize="md" pl="10px">
          {title}
        </Heading>
        <Text color="#868E96" fontSize="md" pr="10px">
          {status}
        </Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <ModalContent mt="130px" w="270px" borderRadius="3px">
            <ModalHeader color="#F8F9FA" fontSize="xs" bgColor="#343B41">
              Editar tecnologia
            </ModalHeader>
            <ModalCloseButton color="#868E96" fontSize="10px" />
            <ModalBody bgColor="#212529">
              <InputDiv
                label="Nome"
                name="title"
                register={register}
                error={errors.title?.message}
                placeholder="Digite a tecnologia"
                value={title}
                isReadOnly
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
              <Flex w="100%" justify="space-around">
                <Button
                  type="submit"
                  w="60%"
                  bg="#59323F"
                  color="#FFF"
                  fontSize="12px"
                >
                  Salvar Alterações
                </Button>
                <Button
                  onClick={() => deleteTech(id)}
                  w="25%"
                  bg="#868E96"
                  color="#FFF"
                  fontSize="12px"
                >
                  Excluir
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};
