import React, { useState } from "react";
import api from "../../api";
import Logo_Black from "./../../img/logo-black.png";
import "./style.css";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [genero, setGenero] = useState("");

  const birthInput = React.createRef();

  const handleBirthInputFocus = () => (birthInput.current.type = "date");
  const handleBirthInputBlur = () => {
    if (birthInput.current.value === "") {
      birthInput.current.type = "text";
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(nascimento);
    try {
      const { data } = await api.post("/usuario", {
        nome,
        sobrenome,
        nascimento,
        email,
        senha,
        genero,
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="row no-gutters my-bg-orange-0" id="container-base-cadastro">
      <div className="align-self-center container-md text-center col-lg-5">
        <form className="form-signin" onSubmit={handleFormSubmit}>
          <img className="mb-4" src={Logo_Black} alt="" width="120" />
          <h2 className="h3 mb-3 font-weight-normal">Cadastro</h2>

          <div className="row no-gutters">
            <input
              name="nome"
              type="text"
              className="col-md-6 col-sm-12 form-control p-2"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <input
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
            name="email"
            type="email"
            className="form-control my-1 p-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
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
              <option value="m">Masculino</option>
              <option value="f">Feminino</option>
              <option value="o">Outro</option>
            </select>
          </div>
          <p className="text-muted m-2 text-justify">
            <i className="fas fa-exclamation-circle fa-lg"></i>
            Ao clicar em CADASTRAR, você esta concordando com nossos{" "}
            <a href="#">Termos de Uso</a>,<a href="#">Política de Dados</a> e{" "}
            <a href="#">Utilização de Cookies</a>. Você pode receber
            notificações e cancelar quando quiser.
          </p>
          <button
            className="btn btn-lg btn-block my-bg-orange-1 my-2 my-color-white"
            type="submit"
          >
            <i className="fas fa-check-circle"></i> CADASTRAR
          </button>
        </form>
      </div>
    </div>
  );
}
