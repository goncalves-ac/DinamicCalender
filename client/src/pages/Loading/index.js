import React from "react";

const Loading = () => {
  return (
    <div className="full-height d-flex flex-column align-items-center justify-content-center">
      <span style={{ height: "fit-content" }}>
        <i className="fas fa-spinner my-blue-1 fa-3x" />
      </span>
      <h2 className="my-blue-1 fa-2x">Carregando...</h2>
    </div>
  );
};

export default Loading;
