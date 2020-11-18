import React, { useState } from "react";
import AuthSSO, { authMethods } from "../../components/AuthSSO";
import { Link, Redirect } from "react-router-dom";
import Logo_Black from "./../../img/logo-black.png";
import "./style.css";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import api from "../../api";

export default function Login() {
  const { setAuthState } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirectOnLogin, setRedirect] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormError(null);
      setLoading(true);
      const { data } = await api.post("/authenticate", {
        username,
        password,
      });
      setAuthState({
        jwttoken: data.jwttoken,
        userInfo: data.infoUsuario,
        expiresAt: data.expiresAt,
      });
      setTimeout(() => {
        setLoading(false);
        setRedirect(true);
      }, 1000);
    } catch (e) {
      setLoading(false);
      const errorData = e.response.data;
      if (errorData.status === 401) {
        setFormError("Email ou senha inválidos.");
      } else {
        setFormError("Ocorreu um erro. Por favor, tente novamente.");
      }
    }
  };

  if (redirectOnLogin) return <Redirect to="/" />;

  return (
    <div className="row no-gutters my-bg-orange-0" id="container-base-login">
      <div className="align-self-center container-md text-center col-lg-4 col-md-6 col-sm-12">
        <form className="form-signin" onSubmit={handleLoginSubmit}>
          <img className="mb-4" src={Logo_Black} alt="" width="100" />
          <h1 className="h3 mb-3 font-weight-normal">Calendário Dinâmico</h1>
          <p className="mb-0 text-danger">{formError}</p>
          <label htmlFor="inputEmail" className="sr-only">
            <i className="fas fa-at"></i> Email
          </label>
          <input
            name="email"
            type="email"
            id="inputEmail"
            className="form-control my-1"
            placeholder="Email"
            autoFocus=""
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            required
          />

          <label htmlFor="inputPassword" className="sr-only">
            <i className="fas fa-key"></i> Senha
          </label>
          <input
            name="senha"
            type="password"
            id="inputPassword"
            className="form-control my-1"
            placeholder="Senha"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            required
          />
          <button
            className="btn btn-lg btn-block my-bg-orange-1 my-color-white my-2"
            type="submit"
          >
            {(loading && <i className="fas fa-spinner" />) || (
              <>
                Entrar <i className="fas fa-chevron-right"></i>
              </>
            )}
          </button>
        </form>
        <Link
          to="/cadastro"
          className="btn btn-lg btn-block my-bg-orange-1 my-2 my-color-white"
        >
          <i className="fas fa-user-plus my-color-white"></i> Cadastre-se
        </Link>
        <hr />
        <a
          href="#"
          onClick={() => {
            AuthSSO(authMethods.GOOGLE);
          }}
          className="btn btn-lg btn-block btn-danger"
        >
          <i className="fab fa-google"></i> Login Google
        </a>
        <a
          href="#"
          onClick={() => {
            AuthSSO(authMethods.FACEBOOK);
          }}
          className="btn btn-lg btn-block btn-primary"
        >
          <i className="fab fa-facebook"></i> Login Facebook
        </a>
      </div>
    </div>
  );
}
