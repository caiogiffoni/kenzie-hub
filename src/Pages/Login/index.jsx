import {
  Box,
  Text,
  VStack,
  Flex,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//import { addPointerEvent } from "framer-motion";

import api from "../../services/api";

import { InputDiv } from "../../components/InputDiv";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

export const Login = ({ authenticated, setAuthenticated }) => {
  const schema = yup.object().shape({
    email: yup.string().required("Campo obrigatório").email("Email inválido"),
    password: yup.string().required("Campo obrigatório"),
  });

  const history = useHistory();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  if (authenticated) return <Redirect to="/dashboard" />;

  const onSubmitFunction = (data) => {
    api
      .post("/sessions", data)
      .then((res) => {
        toast({
          title: "Conta acessada.",
          status: "success",
          isClosable: true,
        });
        const { token, user } = res.data;
        localStorage.setItem("@KenzieHub:token", JSON.stringify(token));
        localStorage.setItem("@KenzieHub:user", JSON.stringify(user));
        setAuthenticated(true);
        history.push("/dashboard");
      })
      .catch((err) => {
        toast({
          title:
            err.response.data.message ===
            "Incorrect email / password combination"
              ? "Email ou senha incorretos."
              : err.response.data.message,
          status: "error",
          isClosable: true,
        });
      });
  };

  return (
    <Flex
      width="100vw"
      height="100vh"
      bgColor="#121214"
      direction="column"
      justify="center"
      align="center"
    >
      <Heading color="#FF577F" fontSize="xl">
        Kenzie Hub
      </Heading>
      <VStack
        w="280px"
        h="450px"
        bgColor="#212529"
        p="15px 20px"
        borderRadius="4px"
        mt="10px"
      >
        <Heading color="#FFF" fontSize="lg">
          Login
        </Heading>
        <form onSubmit={handleSubmit(onSubmitFunction)}>
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

          <Button
            w="100%"
            mt="20px"
            bgColor="#FF577F"
            color="#FFF"
            type="submit"
            borderRadius="4px"
            fontWeight="light"
          >
            Entrar
          </Button>
        </form>
        <Box pt="30px">
          <Text color="#868E96" fontSize="xs">
            Ainda não possui uma conta?
          </Text>
        </Box>
        <Button
          w="210px"
          bgColor="#868E96"
          color="#FFF"
          borderRadius="4px"
          fontWeight="light"
          onClick={() => history.push("/signin")}
        >
          Cadastre-se
        </Button>
      </VStack>
    </Flex>
  );
};
