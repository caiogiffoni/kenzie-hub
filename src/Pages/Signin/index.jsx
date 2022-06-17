import {
  Text,
  VStack,
  Flex,
  Button,
  Heading,
  Select,
  FormLabel,
  FormErrorMessage,
  FormControl,
  useToast,
  Box,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//import { addPointerEvent } from "framer-motion";

import api from "../../services/api";

import { InputDiv } from "../../components/InputDiv";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

export const Signin = ({ authenticated }) => {
  const schema = yup.object().shape({
    // VALIDAÇÃO FORMULÁRIO
    name: yup
      .string()
      .required("Campo obrigatório")
      .min(5, "Mínimo de 5 caracteres"),
    email: yup.string().required("Campo obrigatório").email("Email inválido"),
    password: yup
      .string()
      .required("Campo obrigatório")
      .min(8, "Mínimo de 8 caracteres"),
    confirmPassword: yup
      .string()
      .required("Campo obrigatório")
      .oneOf([yup.ref("password")], "Senha não confere!"),
    course_module: yup
      .string()
      .required("Escolha um módulo")
      .test("choosenMod", "Escolha o módulo que você está", (value) => value),
  });

  const history = useHistory();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  if (authenticated) return <Redirect to="/" />;

  const onSubmitFunction = (data) => {
    data = { ...data, bio: "-", contact: "-" }; // SUBMETER FORMULÁRIO. VALORES NULOS PARA API ACEITAR
    api
      .post("/users", data)
      .then((_) => {
        toast({
          title: "Sua conta foi criada!",
          status: "success",
          isClosable: true,
        });
        history.push("/");
      })
      .catch((err) => {
        toast({
          title: `${
            err.response.data.message === "Email already exists"
              ? "Email já existente"
              : err.response.data.message
          }`,
          status: "error",
          isClosable: true,
        });
      });
  };

  return (
    <Flex
      width="100vw"
      minH="100vh"
      bgColor="#121214"
      direction="column"
      justify="flex-start"
      align="center"
      pt="20px"
    >
      <Flex
        m="15px 0px 20px 0px "
        justify="space-around"
        minWidth={["280px", "500px"]}
      >
        <Heading color="#FF577F" fontSize="xl">
          Kenzie Hub
        </Heading>
        <Button
          w={["80px", "120px"]}
          bgColor="#212529"
          height="26px"
          color="#FFF"
          fontSize={["10px", "14px", "16px"]}
          onClick={() => history.push("/")}
        >
          Voltar
        </Button>
      </Flex>
      <VStack
        minWidth={["200px", "400px"]}
        bgColor="#212529"
        p="10px 20px"
        m="0px 20px"
        borderRadius="8px"
      >
        <Heading color="#FFF" fontSize="lg">
          Crie sua conta
        </Heading>
        <Text color="#868E96" fontSize="10px">
          Rápido e grátis. Vamos nessa!
        </Text>
        <Box
          onSubmit={handleSubmit(onSubmitFunction)}
          as="form"
          w="calc(100% - 20px)"
        >
          <InputDiv
            label="Nome"
            name="name"
            register={register}
            error={errors.name?.message}
            placeholder="Digite seu nome"
          />
          <InputDiv
            label="Email"
            name="email"
            register={register}
            error={errors.email?.message}
            placeholder="Digite seu email"
          />
          <InputDiv
            label="Senha"
            name="password"
            register={register}
            error={errors.password?.message}
            placeholder="Digite sua senha"
          />
          <InputDiv
            label="Confirmação de senha"
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword?.message}
            placeholder="Confirme sua senha"
          />
          <FormControl isInvalid={errors.course_module?.message}>
            <FormLabel
              color="#F8F9FA"
              fontSize="xs"
              htmlFor="course_module"
              mt="20px"
            >
              Selecionar módulo
            </FormLabel>
            <Select
              color="#a3a5a7"
              bg="#343B41"
              border="none"
              {...register("course_module")}
            >
              <option
                style={{ color: "white", backgroundColor: "#343B41" }}
                value=""
                hidden
              >
                Selecionar módulo
              </option>
              <option
                value="Primeiro módulo"
                style={{ color: "white", backgroundColor: "#343B41" }}
              >
                Primeiro módulo
              </option>
              <option
                value="Segundo módulo"
                style={{ color: "white", backgroundColor: "#343B41" }}
              >
                Segundo módulo
              </option>
              <option
                value="Terceiro módulo"
                style={{ color: "white", backgroundColor: "#343B41" }}
              >
                Terceiro módulo
              </option>
              <option
                value="Quarto módulo"
                style={{ color: "white", backgroundColor: "#343B41" }}
              >
                Quarto módulo
              </option>
            </Select>
            <FormErrorMessage>{errors.course_module?.message}</FormErrorMessage>
          </FormControl>

          <Button
            isFullWidth
            mt="20px"
            bgColor="#59323F"
            color="#FFF"
            type="submit"
            borderRadius="4px"
            fontWeight="light"
          >
            Cadastrar
          </Button>
        </Box>
      </VStack>
    </Flex>
  );
};
