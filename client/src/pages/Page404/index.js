import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="full-height d-flex flex-column align-items-center justify-content-center">
      <h3 className="text-center text-white">
        Parece que o que você está procurando não existe{" "}
        <span role="img" aria-label="Emoji Pensando">
          🤔
        </span>
      </h3>
      <Link className="my-blue-1 text-center" to="/">
        Clique aqui para voltar
      </Link>
    </div>
  );
};

export default Page404;
