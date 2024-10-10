import {
  Button,
  Center,
  Container,
  FormLabel,
  Input,
  Text,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Added for redirecting after success

const CreateBlogs = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); 
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/blog/create`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        setSuccess("Blog created successfully!");
        setTitle("");
        setDescription("");
        setError("");
        setLoading(false); // Stop loading
        navigate("/blogs"); // Redirect to blogs page after success
      }
    } catch (error) {
      setError("Error in creating the blog. Please try again.");
      setSuccess("");
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Center>
        <Text fontWeight="600" fontSize="25" p={10}>
          Create Blog
        </Text>
      </Center>

      <Container border="1px solid black" mt={30} p={10}>
        {error && <Text color="red.500">{error}</Text>}
        {success && <Text color="green.500">{success}</Text>}
        
        <FormLabel>Title</FormLabel>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title here!"
        />
        
        <FormLabel pt={2}>Description</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description..."
        />
        
        <Center pt={5}>
          <Button
            onClick={handleSubmit}
            colorScheme="green"
            size="md"
            width="full"
            isDisabled={loading} // Disable button when loading
          >
            {loading ? <Spinner size="sm" /> : "Create Blog"} {/* Show spinner when loading */}
          </Button>
        </Center>
      </Container>
    </>
  );
};

export default CreateBlogs;
