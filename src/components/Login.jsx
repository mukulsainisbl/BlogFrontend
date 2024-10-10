import {
  Button,
  InputGroup,
  InputRightElement,
  Center,
  Container,
  FormLabel,
  Input,
  FormControl,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value, // Dynamically updates based on input name
    });
  };

  const handleLogin = async () => {
   
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/user/login`, loginData);
      console.log(response)
      
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Updated to response.data.token
        localStorage.setItem("userId", response.data.userId); // Updated to response.data.userId
        alert("You are successfully logged In")
       navigate("/blogs");
      } 
    } catch (error) {
      setError("Login failed. Please try again." ,error); // Properly setting error message
    }
  };

  return (
    <>
      <Center p={10} fontWeight={600} fontSize={25} mb={4}>
        Login
       
      </Center>
      
      
      <Container mt={5} padding={10} border={"1px solid black"}>
      {error && <Text color="red.500">{error}</Text>}
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            value={loginData.username}
            name="username"
            onChange={handleInputChange}
            type="email"
            placeholder="Enter Email"
            size="md"
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              value={loginData.password}
              name="password"
              onChange={handleInputChange}
              pr="4.5rem"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={togglePasswordVisibility}
                aria-label={isPasswordVisible ? "Hide password" : "Show password"}
              >
                {isPasswordVisible ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Center pt={5}>
          <Button
            onClick={handleLogin}
            colorScheme="teal"
            size="md"
            width="full"
          >
            Login
          </Button>
        </Center>
      </Container>
    </>
  );
};

export default Login;
