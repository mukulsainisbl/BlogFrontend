import axios from "axios";
import { useEffect, useState } from "react";
import { Text, Spinner, Container, Box, Center, Button } from "@chakra-ui/react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/blog/`);

      if (response.status === 200) {
        setBlogs(response.data.blogs);
      } else {
        setError("Failed to fetch Blogs");
      }
    } catch (error) {
      setError("Failed to fetch blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    const option = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-Us", option);
  };

  const userId = localStorage.getItem("userId");

  const handleDelete = async (blogId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${import.meta.env.VITE_APP_API_URL}/blog/delete/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Filter out the deleted blog
      setBlogs(blogs.filter((blog) => blog._id !== blogId)); // Fixed filter condition
    } catch (error) {
      setError("Failed to delete blog. Please try again.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <Container maxW={"4xl"}  textAlign={"center"}>
      <Center p={6}>
        {loading && <Spinner />} {/* Show loading indicator */}
        <Text color={"red"} fontSize={"35"}>All Blogs</Text>
      </Center>

      {error && <Text color="red.500">{error}</Text>} {/* Display error message */}
      {!loading && blogs.length > 0 && (
        <Box>
          {blogs.map((blog) => (
            <Box key={blog._id} p={4} borderWidth="1px" borderRadius="lg" mb={4}>
              <Text fontSize="xl" fontWeight="bold">
                {blog.title}
              </Text>
              <Text fontSize={"lg"}>Description: {blog.description}</Text>
              <Text>Author: {blog.author.username}</Text>
              <Text>Published on: {formatDate(blog.createdAt)}</Text>
              
              {userId === blog.author._id && ( // Check if the logged-in user is the author
                <Button colorScheme="red" onClick={() => handleDelete(blog._id)}>
                  Delete
                </Button>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Blogs;
