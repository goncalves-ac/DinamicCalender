import React from "react";
import { createPortal } from "react-dom";
import { ToastContainer } from "react-toastify";

const MyToastContainer = () => {
  const targetDiv = document.getElementById("toast-div");
  return createPortal(<ToastContainer />, targetDiv);
};

export default MyToastContainer;
