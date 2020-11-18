import React, { useEffect } from "react";
import "./Usuario.css";

import PerfilUsuario from "../../components/PerfilUsuario";
import ListaAmigos from "../../components/ListaAmigos";
import ListaBusca from "../../components/ListaBusca";
import Nav from "../../components/Nav";
import DadosUsuario from "../../components/DadosUsuario";
import avatarPlaceholder from "../../img/avatar-placeholder.png";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

export default function Usuario({ userInfo }) {
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    console.log(authState);
  }, [authState]);

  return (
    <section>
      <Nav />
      <DadosUsuario
        avatarUrl={
          (userInfo.avatarUrl &&
            `${process.env.REACT_APP_API_URL}/${userInfo.avatarUrl}`) ||
          avatarPlaceholder
        }
        name={userInfo.nome}
        surname={userInfo.sobrenome}
        description={userInfo.descricao}
      />
      <div className="container my-5">
        <ul
          className="nav nav-tabs font-weight-bold"
          id="main-tab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <a
              aria-controls="home"
              aria-selected="true"
              className="nav-link active"
              data-toggle="tab"
              href="#home"
              id="home-tab"
              role="tab"
            >
              {" "}
              <i className="fas fa-stream"></i> Timeline{" "}
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              aria-controls="profile"
              aria-selected="false"
              className="nav-link"
              data-toggle="tab"
              href="#profile"
              id="profile-tab"
              role="tab"
            >
              {" "}
              <i className="fas fa-users"></i> Amigos{" "}
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              aria-controls="search"
              aria-selected="false"
              className="nav-link"
              data-toggle="tab"
              href="#search"
              id="search-tab"
              role="tab"
            >
              {" "}
              <i className="fas fa-search"></i> Buscar{" "}
            </a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            aria-labelledby="home-tab"
            className="tab-pane fade show active w-100 p-3"
            id="home"
            role="tabpanel"
          >
            <PerfilUsuario />
          </div>

          <div
            aria-labelledby="profile-tab"
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
          >
            <ListaAmigos />
          </div>

          <div
            aria-labelledby="search-tab"
            className="tab-pane fade"
            id="search"
            role="tabpanel"
          >
            <ListaBusca />
          </div>
        </div>
      </div>
    </section>
  );
}
