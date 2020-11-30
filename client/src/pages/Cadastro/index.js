import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import api from "../../api";
import ModalOverlay from "../../components/ModalOverlay";
import Logo_Black from "./../../img/logo-black.png";
import "./style.css";
import Cookies from "./Cookies";
import PoliticaDeDados from "./PoliticaDeDados";
import TermosDeUso from "./TermosDeUso";

export default function Cadastro(props) {
  var user = {
    nome: "",
    sobrenome: "",
    email: "",
  };
  try {
    user.nome = props.location.state.ssoData.nome;
    user.sobrenome = props.location.state.ssoData.sobrenome;
    user.email = props.location.state.ssoData.email;
  } catch (e) {}

  const externalAvatarUrl = props.location.state.ssoData.avatarUrl;

  const [nome, setNome] = useState(user.nome);
  const [sobrenome, setSobrenome] = useState(user.sobrenome);
  const [nascimento, setNascimento] = useState("");
  const [email, setEmail] = useState(user.email);
  const [senha, setSenha] = useState("");
  const [genero, setGenero] = useState("");
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirectOnSuccess, setRedirectOnSuccess] = useState(false);
  const [useTermsModalVisible, setUseTermsModalVisible] = useState(false);
  const [useCookiesVisible, setUseCookiesVisible] = useState(false);
  const [usePoliticaDeDadosVisible, setUsePoliticaDeDadosVisible] = useState(
    false
  );

  const birthInput = React.createRef();

  const handleBirthInputFocus = () => (birthInput.current.type = "date");
  const handleBirthInputBlur = () => {
    if (birthInput.current.value === "") {
      birthInput.current.type = "text";
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormError(null);
      setLoading(true);
      await api.post("/usuario", {
        nome,
        sobrenome,
        nascimento,
        email,
        senha,
        genero,
        avatarUrl: externalAvatarUrl || null,
      });
      setTimeout(() => {
        setLoading(false);
        setRedirectOnSuccess(true);
      }, 1000);
    } catch (e) {
      if (e.response) {
        const errorData = e.response.data;
        setLoading(false);
        if (errorData.status === 400) {
          setFormError(errorData.message);
        } else {
          setFormError("Ocorreu um erro. Por favor, tente novamente.");
        }
      } else {
        setFormError("Ocorreu um erro. Por favor, tente novamente.");
      }
    }
  };

  if (redirectOnSuccess) return <Redirect to="/login" />;

  const handleCloseUseTerms = () => {
    setUseTermsModalVisible(false);
  };

  const handleCloseUseCookies = () => {
    setUseCookiesVisible(false);
  };

  const handleCloseUsePoliticaDeDados = () => {
    setUsePoliticaDeDadosVisible(false);
  };

  return (
    <>
      {useTermsModalVisible && (
        <ModalOverlay handleCloseModal={handleCloseUseTerms}>
          <TermosDeUso />
        </ModalOverlay>
      )}

      {useCookiesVisible && (
        <ModalOverlay handleCloseModal={handleCloseUseCookies}>
          <Cookies />
        </ModalOverlay>
      )}

      {usePoliticaDeDadosVisible && (
        <ModalOverlay handleCloseModal={handleCloseUsePoliticaDeDados}>
          <PoliticaDeDados />
        </ModalOverlay>
      )}

      <div
        className="row no-gutters my-bg-orange-0"
        id="container-base-cadastro"
      >
        <div className="align-self-center container-md text-center col-lg-5">
          <form className="form-signin" onSubmit={handleFormSubmit} autoComplete="off">
            <img className="mb-3" src={Logo_Black} alt="" width="80" />
            <h2 className="h4 mb-1 font-weight-normal">Cadastro</h2>
            <p className="mb-0 text-danger">{formError}</p>
            <div className="row no-gutters">
              <input
                autoComplete="off"
                name="nome"
                type="text"
                className="col-md-6 col-sm-12 form-control p-2"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
              <input
                autoComplete="off"
                name="sobrenome"
                type="text"
                className="col-md-6 col-sm-12 form-control p-2"
                placeholder="Sobrenome"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
                required
              />
            </div>

            <input
              autoComplete="off"
              name="email"
              type="email"
              className="form-control my-1 p-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              autoComplete="off"
              name="senha"
              type="password"
              className="form-control my-1 p-2"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <div className="row no-gutters">
              <input
                type="text"
                className="col-md-6 col-sm-12 form-control p-2"
                placeholder="Data de Nascimento"
                onFocus={handleBirthInputFocus}
                onBlur={handleBirthInputBlur}
                ref={birthInput}
                value={nascimento}
                onChange={(e) => setNascimento(e.target.value)}
              />
              <select
                className="col-md-6 col-sm-12 form-control p-2"
                name="genero"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                required
              >
                <option value="" disabled hidden>
                  Selecione seu Gênero
                </option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="O">Outro</option>
              </select>
            </div>
            <p className="text-muted m-2 text-justify">
              <i className="fas fa-exclamation-circle fa-lg"></i>
              Ao clicar em CADASTRAR, você esta concordando com nossos{" "}
              <button
                type="button"
                className="my-modal-open-btn 
                btn-outline-none"
                onClick={() => {
                  setUseTermsModalVisible(true);
                }}
              >
                Termos de Uso
              </button>
              ,{" "}
              <button
                type="button"
                className="my-modal-open-btn 
btn-outline-none"
                onClick={() => {
                  setUsePoliticaDeDadosVisible(true);
                }}
              >
                Política de Dados
              </button>{" "}
              e{" "}
              <button
                type="button"
                className="my-modal-open-btn 
btn-outline-none"
                onClick={() => {
                  setUseCookiesVisible(true);
                }}
              >
                Utilização de Cookies
              </button>
              . Você pode excluir sua conta quando quiser.
            </p>
            <button
              type="submit"
              className="btn btn-lg btn-block my-bg-orange-1 my-2 my-color-white"
            >
              {(loading && <i className="fas fa-spinner" />) || (
                <>
                  <i className="fas fa-check-circle"></i> CADASTRAR
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
