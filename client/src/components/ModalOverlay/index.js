import React from "react";
import { createPortal } from "react-dom";
import "./styles.css";

const ModalOverlay = ({ children, handleCloseModal, closeButton = true }) => {
  const targetDiv = document.getElementById("modal-layer");
  const overlayRef = React.createRef();

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleCloseModal();
    }
  };

  return createPortal(
    <div
      ref={overlayRef}
      className="modal-overlay"
      onClick={handleOverlayClick}
    >
      <div className="modal-content">
        {children}
        {closeButton && (
          <button
            className="modal-close-btn 
btn-outline-none"
            onClick={handleCloseModal}
          >
            <i className="fas fa-times fa-2x" />
          </button>
        )}
      </div>
    </div>,
    targetDiv
  );
};

export default ModalOverlay;
