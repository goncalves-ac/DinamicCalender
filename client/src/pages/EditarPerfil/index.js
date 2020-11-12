import React from "react";
import './EditarPerfil.css';
import Logo_Black from "../../img/logo-black.png";
import AvatarPlaceholder from "../../img/avatar-placeholder.png"

import { useState, useEffect } from "react";

export default function EditarPerfil () {
    const birthInput = React.createRef();

    const handleBirthInputFocus = () => birthInput.current.type="date";
    const handleBirthInputBlur = () => {
        if (birthInput.current.value==="") {
            birthInput.current.type="text";
        }
    }

    const [ file, setFile ] = useState(null);
    const [ avatar, setAvatarUrl ] = useState(null);

    useEffect(() => {
        if(file instanceof File ) {
            setAvatarUrl(window.URL.createObjectURL(file));
        }
    }, [file]);

    const inputRef = React.createRef();

    const handleFileSelect = (e) => {
        setFile(e.target.files[0]);
    }

    return (
        <div className="row no-gutters my-bg-orange-0" id="container-base-cadastro">
            <div className="align-self-center container-md text-center col-lg-5">

                <img className="mb-4" src={Logo_Black} alt="" width="120"/>
                <h2 className="h3 mb-3 font-weight-normal my-blue-2">Editar Perfil</h2>

                <div className="container my-5">
                    <ul className="nav nav-tabs font-weight-bold" id="main-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a aria-controls="perfil" aria-selected="true" className="nav-link active" data-toggle="tab"
                               href="#editar_perfil" id="perfil-tab"
                               role="tab"> <i className="fas fa-address-card"></i> Perfil </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a aria-controls="password" aria-selected="false" className="nav-link" data-toggle="tab"
                               href="#password" id="password-tab"
                               role="tab"> <i className="fas fa-unlock-alt"></i> Senha </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div aria-labelledby="perfil-tab" className="tab-pane fade show active w-100 p-3" id="editar_perfil"
                             role="tabpanel">

                            <div className="d-flex justify-content-around align-items-center">

                                <div>
                                    <form className="form-signin">

                                        <div className="row no-gutters">
                                            <input name="nome" type="text" className="col-md-6 col-sm-12 form-control p-2" placeholder="Nome" required/>
                                            <input name="sobrenome" type="text" className="col-md-6 col-sm-12 form-control p-2" placeholder="Sobrenome" required/>
                                        </div>

                                        <input name="email" type="email" className="form-control my-1 p-2" placeholder="Email" required/>

                                        <div className="row no-gutters">
                                            <input type="text" className="col-md-6 col-sm-12 form-control p-2"
                                                   placeholder="Data de Nascimento"
                                                   onFocus={handleBirthInputFocus}
                                                   onBlur={handleBirthInputBlur}
                                                   ref={birthInput} />
                                            <select className="col-md-6 col-sm-12 form-control p-2" name="genero" defaultValue="" required>
                                                <option disabled="" hidden="" value="">Selecione seu Gênero</option>
                                                <option value="m">Masculino</option>
                                                <option value="f">Feminino</option>
                                                <option value="o">Outro</option>
                                            </select>
                                        </div>

                                        <div className="custom-file">
                                            <input name="photoProfile" type="file" ref={inputRef} className="custom-file-input" id="validatedCustomFile" accept="image/*" onChange={handleFileSelect} />
                                            <label className="custom-file-label mt-1 mb-1" htmlFor="validatedCustomFile">Foto ...</label>
                                            <div className="invalid-feedback">Example invalid custom file feedback</div>
                                        </div>

                                        <button className="btn btn-lg btn-block my-bg-orange-1 my-2 my-color-white mt-2" type="submit">
                                            <i className="fas fa-user-check"></i> ATUALIZAR
                                        </button>
                                    </form>
                                </div>

                                <div className="">
                                    <img className="preview-photo" src={avatar || AvatarPlaceholder} alt="Preview..." id="preview-photo" alt="Image preview..." />
                                </div>

                            </div>

                        </div>

                        <div aria-labelledby="password-tab" className="tab-pane fade w-100 p-3" id="password"
                                 role="tabpanel">
                            <form className="form-signin">

                                <input name="password" type="password" className="form-control my-1 p-2" placeholder="Senha Atual" required/>
                                <input name="new-password" type="password" className="form-control my-1 p-2" placeholder="Senha Nova" required/>
                                <input name="confirm-new-password" type="password" className="form-control my-1 p-2" placeholder="Confirmar Senha Nova" required/>

                                <button className="btn btn-lg btn-block my-bg-orange-1 my-2 my-color-white mt-2" type="submit">
                                    <i className="fas fa-lock"></i> ATUALIZAR SENHA
                                </button>
                            </form>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}