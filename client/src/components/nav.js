import React, {useState, useEffect} from "react";
import Icon from "../img/icon.png";
import UserModelo from "../img/user1.jpg";

export default function Nav() {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" id="main-navbar">
            <a className="navbar-brand" href="#">
                <img src={Icon} height="60" alt="" loading="lazy" />
            </a>
            <a className="navbar-brand mx-3" href="#">
                <img src={UserModelo} width="50" height="50"
                     className="rounded-circle border border-dark" loading="lazy" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#"><i className="fas fa-users fa-lg"></i> Amigos </a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="#"><i
                            className="fas fa-calendar-alt fa-lg"></i> Calendário </a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="#"><i className="fas fa-user-cog fa-lg"></i> Editar Perfil </a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="#"><i className="fas fa-cogs fa-lg"></i> Configuração </a>
                    </li>
                    <hr />
                        <li className="nav-item active">
                            <a className="nav-link" href="#"><i className="fas fa-power-off"></i> Sair</a>
                        </li>
                </ul>
            </div>
        </nav>
    );
}