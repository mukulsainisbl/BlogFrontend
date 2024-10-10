import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink, Flex } from "@chakra-ui/react";

const Navbar = () => {
  const links = [
    {
      to: "/",
      label: "Home",
    },
    {
        to:"/blogs",
        label:"Blogs"
    },

    {
      to: "/create-blogs",
      label: "Create Blogs",
    },

    {
      to: "/login",
      label: "Login",
    },
    {
      to: "/signup",
      label: "Signup",
    },
  ];
  return (
    <Flex
      justifyContent={"space-evenly"}
      fontSize={21}
      color={"white"}
      bg={"blackAlpha.900"}
      fontWeight={600}
    >
      {links.map((link) => (
        <ChakraLink
          to={link.to}
          key={link.to}
          as={ReactRouterLink}
          _hover={{ textDecor: "none" }}
        >
          {link.label}
        </ChakraLink>
      ))}
    </Flex>
  );
};

export default Navbar;
