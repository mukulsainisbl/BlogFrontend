import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Blogs from "./Blogs";
import CreateBlogs from "./CreateBlogs";
import PrivateRoute from "./PrivateRoute";

const Navbar = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route
        path="/create-blogs"
        element={
          <PrivateRoute>
            <CreateBlogs />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default Navbar;
