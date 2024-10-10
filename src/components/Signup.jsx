import {
  Container,
  Select,
  Input,
  FormLabel,
  Text,
  Center,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const toast = useToast(); // For showing feedback to the user

  const handleSignUp = (e) => {
    const { value, name } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleRegister = async () => {
    // Basic form validation
    if (!data.username || !data.password || !data.role) {
      toast({
        title: "Error",
        description: "Please fill out all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/user/register`,
        data
      );
      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Account created successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login");
      }
    } catch (error) {
      setError("Registration failed, Please try again...");
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Center p={10}>
        <Text fontWeight={600} fontSize={25}>
          Enter Credentials
        </Text>
      </Center>
      <Container border={"1px dashed grey"} p={10}>
        {error && <Text color="red.500">{error}</Text>}
        <FormLabel>Enter Username</FormLabel>
        <Input
          value={data.username}
          name="username"
          onChange={handleSignUp}
          placeholder="Enter Username"
          mb={4}
        />
        <FormLabel>Password</FormLabel>
        <Input
          value={data.password}
          name="password"
          onChange={handleSignUp}
          placeholder="Enter Password"
          type="password"
          mb={4}
        />
        <FormLabel>Select Role</FormLabel>
        <Select
          value={data.role}
          name="role"
          onChange={handleSignUp}
          placeholder="Choose Role"
          mb={6}
        >
          <option value="author">Author</option>
          <option value="reader">Reader</option>
          <option value="admin">Admin</option>
        </Select>
        <Center>
          <Button onClick={handleRegister} colorScheme="red" width="full">
            Sign Up
          </Button>
        </Center>
      </Container>
    </>
  );
};

export default Signup;
