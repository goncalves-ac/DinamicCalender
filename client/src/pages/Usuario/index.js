import React from "react";
import "./Usuario.css";

import PerfilUsuario from "../../components/PerfilUsuario";
import ListaAmigos from "../../components/ListaAmigos";
import Nav from "../../components/Nav"
import FotoPerfil from "../../components/FotoPerfil";

export default function Usuario () {
    return (
        <section>
            <Nav />
            <FotoPerfil />
            <div className="container my-5">
                <ul className="nav nav-tabs font-weight-bold" id="main-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a aria-controls="home" aria-selected="true" className="nav-link active" data-toggle="tab"
                           href="#home" id="home-tab"
                           role="tab"> Timeline </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a aria-controls="profile" aria-selected="false" className="nav-link" data-toggle="tab"
                           href="#profile" id="profile-tab"
                           role="tab"> Amigos </a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div aria-labelledby="home-tab" className="tab-pane fade show active w-100 p-3" id="home"
                         role="tabpanel">
                        <PerfilUsuario />
                    </div>

                    <div aria-labelledby="profile-tab" className="tab-pane fade" id="profile" role="tabpanel">
                        <ListaAmigos />
                    </div>

                    <div aria-labelledby="contact-tab" className="tab-pane fade" id="contact" role="tabpanel">

                    </div>
                </div>
            </div>
        </section>
    );
}