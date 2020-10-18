import React from "react";
import Logo_Black from "./../../img/logo-black.png";
import "./style.css";

export default function Cadastro() {
    return (
        <div className="row no-gutters my-bg-orange-0" id="container-base-cadastro">
            <div className="align-self-center container-md text-center col-lg-5">
                <form className="form-signin">
                    <img className="mb-4" src={Logo_Black} alt="" width="50"/>
                    <h2 className="h3 mb-3 font-weight-normal">Cadastro</h2>

                    <div className="row no-gutters">
                        <input name="nome" type="email" className="col-md-6 col-sm-12 form-control p-1" placeholder="Nome" required=""/>
                        <input name="sobrenome" type="email" className="col-md-6 col-sm-12 form-control p-1" placeholder="Sobrenome" required=""/>
                    </div>

                    <input name="email" type="email" className="form-control my-1" placeholder="Email" required=""/>
                    <input name="senha" type="password" className="form-control my-1" placeholder="Senha" required=""/>

                    <div className="row no-gutters">
                        <input type="date" className="col-md-6 col-sm-12 form-control p-1"
                               placeholder="Data de Nascimento"/>
                        <select className="col-md-6 col-sm-12 form-control p-1" name="genero" required="">
                            <option disabled="" hidden="" selected="selected">Selecione seu Gênero</option>
                            <option value="m">Masculino</option>
                            <option value="f">Feminino</option>
                            <option value="o">Outro</option>
                        </select>
                    </div>
                    <p className="text-muted m-2 text-justify">
                        <i className="fas fa-exclamation-circle fa-lg"></i>
                        Ao clicar em CADASTRAR, você esta
                        concordando com nossos <a href="#">Termos de Uso</a>,
                        <a href="#">Política de Dados</a> e <a href="#">Utilização de Cookies</a>.
                        Você pode receber notificações e cancelar quando quiser.
                    </p>
                    <button className="btn btn-lg btn-block my-bg-orange-1 my-2" type="submit">
                        <i className="fas fa-check-circle"></i> CADASTRAR
                    </button>
                </form>
            </div>
        </div>
    );
}