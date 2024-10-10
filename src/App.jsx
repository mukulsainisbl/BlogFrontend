import { Route, Router } from "react-router-dom";
import "./App.css";
import { Center } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import AllRoutes from "./components/AllRoutes";

function App() {
  return (
    <>
      <AllRoutes/>
      <Navbar/>

    </>
  );
}

export default App;
