import React, { useContext } from "react";
import Icon from "../../img/icon.png";
import avatarPlaceholder from "../../img/avatar-placeholder.png";

import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

import "./Nav.css";
import api from "../../api";

export default function Nav() {
  const { authState, setAuthState } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await api.post("/unauthenticate");
    } catch (e) {
    } finally {
      setAuthState({
        expiresAt: null,
        userInfo: null,
      });
      localStorage.removeItem("eat");
    }
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      id="main-navbar"
    >
      <Link className="navbar-brand" to="/">
        <img src={Icon} height="60" alt="" loading="lazy" />
      </Link>
      {authState.userInfo && (
        <Link className="navbar-brand mx-3" to="/usuario">
          <img
            src={authState.userInfo.avatarUrl || avatarPlaceholder}
            width="50"
            height="50"
            className="rounded-circle border border-dark"
            loading="lazy"
            alt="Avatar do usuário"
          />
        </Link>
      )}
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
      {(authState.userInfo && (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/calendario">
                    <span>
                      <i className="fas fa-calendar-alt fa-lg"></i>
                    </span>
                    Calendário{" "}
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/editarPerfil">
                    <span>
                      <i className="fas fa-user-cog fa-lg"></i>
                    </span>
                    Editar Perfil{" "}
                  </Link>
                </li>
                <li className="nav-item active">
                  <button className="nav-link" onClick={handleLogout}>
                    <span>
                      <i className="fas fa-power-off"></i>
                    </span>{" "}
                    Sair
                  </button>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      )) || (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/cadastro">
                    <span>
                      <i className="fas fa-check-circle"></i>
                    </span>
                    Cadastrar{" "}
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/login">
                    <span>
                      <i className="fas fa-chevron-right"></i>
                    </span>
                    Entrar{" "}
                  </Link>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
}
