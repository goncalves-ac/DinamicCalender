import React from 'react';
import {createPortal} from 'react-dom';
import './styles.css';


const ModalOverlay = ({children, handleCloseModal}) => {
  const targetDiv = document.getElementById("modal-layer");

  return (
    createPortal(
    <div className="modal-overlay" >
      <div className="modal-content">
      <button className="modal-close-btn" onClick={handleCloseModal}><i className="fas fa-times fa-2x" /></button>
        {children}
      </div>
    </div>, targetDiv)
  );
};

export default ModalOverlay;