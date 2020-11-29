import React, { useState } from "react";
import { authMethods, providerObject } from "../../components/AuthSSO";

import { Link, Redirect } from "react-router-dom";
import Logo_Black from "./../../img/logo-black.png";
import "./style.css";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import api from "../../api";
import firebase from "firebase";

export default function Login() {
  const { setAuthState } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirectOnLogin, setRedirect] = useState(false);
  const [redirectSso, setRedirectSso] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    try {
      setFormError(null);
      setLoading(true);
      const { data } = await api.post("/authenticate", {
        username,
        password,
      });
      setAuthState({
        userInfo: data.infoUsuario,
        expiresAt: data.expiresAt,
      });
      localStorage.setItem("eat", data.expiresAt);
      setLoading(false);
      setRedirect(true);
    } catch (e) {
      setLoading(false);
      if (e.response) {
        const errorData = e.response.data;
        if (errorData.status === 401) {
          setFormError("Email ou senha inválidos.");
        } else {
          setFormError("Ocorreu um erro. Por favor, tente novamente.");
        }
      } else {
        setFormError("Ocorreu um erro. Por favor, tente novamente.");
      }
    }
  };

  const authAux = (method) => {
    if (loading) return;
    setLoading(true);
    try {
      firebase
        .auth()
        .signInWithPopup(providerObject(method))
        .then((result) => {
          console.log(result);
          var user = {
            uuid: result.user.uid,
            nome: result.user.displayName,
            email:
              result.user.email != null
                ? result.user.email
                : result.additionalUserInfo.profile.email,
            avatarUrl: result.user.photoURL,
          };

          api.post("/sso", user).then((r) => {
            if (r.data.infoUsuario) {
              setAuthState({
                userInfo: r.data.infoUsuario,
                expiresAt: r.data.expiresAt,
              });
              localStorage.setItem("eat", r.data.expiresAt);
              setRedirect(true);
            } else {
              user.sobrenome = user.nome.split(" ").slice(1).join(" ");
              user.nome = user.nome.split(" ").slice(0, 1).join(" ");
              setRedirectSso(user);
            }
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (e) {
      setLoading(false);
      console.log(e);
      setFormError(
        "Não foi possível fazer login com esta conta externa. Tente utilizar Email e Senha, ou Cadastre-se."
      );
    }
  };

  if (redirectSso !== false) {
    return (
      <Redirect
        to={{ pathname: "/cadastro", state: { ssoData: redirectSso } }}
      />
    );
  }

  if (redirectOnLogin) return <Redirect to="/" />;

  return (
    <div className="row no-gutters my-bg-orange-0" id="container-base-login">
      <div className="align-self-center container-md text-center col-lg-4 col-md-6 col-sm-12">
        <form className="form-signin" onSubmit={handleLoginSubmit}>
          <img className="mb-3" src={Logo_Black} alt="" width="80" />
          <h1 className="h4 mb-2 font-weight-normal">Calendário Dinâmico</h1>
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
        <Link
          to="/recuperarsenha"
          className="btn btn-lg btn-block my-bg-orange-1 my-2 my-color-white"
        >
          <i className="fas fa-lock my-color-white"></i> Esqueci minha senha
        </Link>
        <hr />
        <a
          href="#"
          onClick={() => {
            authAux(authMethods.GOOGLE);
          }}
          className="btn btn-lg btn-block btn-danger"
        >
          {(loading && <i className="fas fa-spinner" />) || (
            <>
              <i className="fab fa-google"></i> Login Google
            </>
          )}
        </a>
        <a
          href="#"
          onClick={() => {
            authAux(authMethods.FACEBOOK);
          }}
          className="btn btn-lg btn-block btn-primary"
        >
          {(loading && <i className="fas fa-spinner" />) || (
            <>
              <i className="fab fa-facebook"></i> Login Facebook
            </>
          )}
        </a>
      </div>
    </div>
  );
}
