import React from "react";
import MyToastContainer from "./components/MyToastContainer";
import { AuthProvider } from "./providers/AuthProvider";
import Routes from "./Routes";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <Routes />
      <MyToastContainer />
    </AuthProvider>
  );
}

export default App;
