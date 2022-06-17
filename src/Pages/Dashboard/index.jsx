import { Redirect } from "react-router-dom";
import { useState } from "react";
import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { Addtechnology } from "../../components/Modal/Addtechnology/index.jsx";
import { Card } from "../../components/Card/index.jsx";

export const Dashboard = ({ authenticated, setAuthenticated }) => {
  const [token] = useState(
    JSON.parse(localStorage.getItem("@KenzieHub:token")) || ""
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("@KenzieHub:user")) || ""
  );

  const history = useHistory();

  if (!authenticated) return <Redirect to="/" />; // REDIRECIONAMENTO SE NÃO LOGADO

  return (
    <Container w="100vw" maxW="" minH="100vh" bg="#121214" p="0px 0px 20px 0px">
      <Flex
        p="15px 0px 20px 0px"
        justify="space-around"
        minWidth="280px"
        w={["100%", "80%"]}
        m="0px auto"
      >
        <Heading color="#FF577F" fontSize="xl">
          Kenzie Hub
        </Heading>
        <Button
          w="100px"
          bgColor="#212529"
          height="26px"
          color="#FFF"
          fontSize="12px"
          onClick={() => {
            localStorage.clear();
            setAuthenticated(false);
            history.push("/");
          }}
        >
          Sair
        </Button>
      </Flex>
      <Box
        p="30px 0px 30px 10px"
        borderTop="1px solid #36363b"
        borderBottom="1px solid #36363b"
        w={["100%", "80%"]}
        m="0px auto"
      >
        <Heading color="#F8F9FA" fontSize="md" pl="20px">
          Olá, {user.name}
        </Heading>
        <Text color="#868E96" mt="8px" pl="20px">
          {user.course_module}
        </Text>
      </Box>
      <Flex
        m="30px auto"
        direction="column"
        justify="center"
        align="center"
        maxW="1200px"
      >
        <Flex justify="space-between" pr="10px" w="80%">
          <Heading color="#F8F9FA" fontSize="lg">
            Tecnologias
          </Heading>
          <Addtechnology token={token} user={user} setUser={setUser}>
            {" "}
            {/* MODAL */}+
          </Addtechnology>
        </Flex>
        <Flex
          minW="280px"
          w="80%"
          maxW=""
          bgColor="#212529"
          borderRadius="4px"
          mt="20px"
          direction="column"
          p="10px 0px"
        >
          {user.techs.map(({ id, title, status }) => (
            <Card
              token={token}
              user={user}
              setUser={setUser}
              id={id}
              title={title}
              status={status}
            ></Card>
          ))}
        </Flex>
      </Flex>
    </Container>
  );
};
