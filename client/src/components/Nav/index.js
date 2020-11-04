import React from "react";
import Icon from "../../img/icon.png";
import UserModelo from "../../img/user1.jpg";

import { Link } from "react-router-dom";

export default function Index() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      id="main-navbar"
    >
      <Link className="navbar-brand" to="/">
        <img src={Icon} height="60" alt="" loading="lazy" />
      </Link>
      <Link className="navbar-brand mx-3" to="/usuario">
        <img
          src={UserModelo}
          width="50"
          height="50"
          className="rounded-circle border border-dark"
          loading="lazy"
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="#">
              <i className="fas fa-users fa-lg"></i> Amigos{" "}
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/calendario">
              <i className="fas fa-calendar-alt fa-lg"></i> Calendário{" "}
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="#">
              <i className="fas fa-user-cog fa-lg"></i> Editar Perfil{" "}
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="#">
              <i className="fas fa-cogs fa-lg"></i> Configuração{" "}
            </Link>
          </li>
          <hr />
          <li className="nav-item active">
            <a className="nav-link" href="#">
              <i className="fas fa-power-off"></i> Sair
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
