import React, { useState, useEffect, useContext } from "react";
import Nav from "../../components/Nav";
import "./EditarPerfil.css";
import AvatarPlaceholder from "../../img/avatar-placeholder.png";
import { AuthContext } from "../../providers/AuthProvider";
import api from "../../api";

export default function EditarPerfil() {
  const parseNascimento = (nascimento) => {
    if (nascimento.match("^[0-9]{2}/[0-9]{2}/[0-9]{4}$")) {
      const nascimentoValues = nascimento.split("/");
      return `${nascimentoValues[2]}-${nascimentoValues[1]}-${nascimentoValues[0]}`;
    } else if (nascimento.match("T")) {
      const nascimentoValues = nascimento.split("T")[0].split("-");
      return `${nascimentoValues[2]}/${nascimentoValues[1]}/${nascimentoValues[0]}`;
    } else {
      return nascimento;
    }
  };

  const { authState, setAuthState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState(authState.userInfo.nome);
  const [sobrenome, setSobrenome] = useState(authState.userInfo.sobrenome);
  const [email, setEmail] = useState(authState.userInfo.email);
  const [nascimento, setNascimento] = useState(
    parseNascimento(authState.userInfo.nascimento)
  );
  const [genero, setGenero] = useState(authState.userInfo.genero);
  const [descricao, setDescricao] = useState(
    authState.userInfo.descricao || ""
  );
  const [avatarUrl, setAvatarUrl] = useState(
    (authState.userInfo.avatarUrl &&
      `${process.env.REACT_APP_API_URL}/${authState.userInfo.avatarUrl}`) ||
      AvatarPlaceholder
  );
  const [profileFormError, setProfileFormError] = useState(null);
  const [profileFormSubmitSuccess, setProfileFormSubmitSuccess] = useState(
    false
  );

  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [confirmarSenhaNova, setConfirmarSenhaNova] = useState("");
  const [passwordFormError, setPasswordFormError] = useState(null);
  const [passwordSubmitSuccess, setPasswordSubmitSuccess] = useState(false);

  const [fileExceedsSize, setFileExceedsSize] = useState(false);

  const [file, setFile] = useState(null);

  const birthInput = React.createRef();

  const handleBirthInputFocus = () => (birthInput.current.type = "date");
  const handleBirthInputBlur = () => {
    if (birthInput.current.value === "") {
      birthInput.current.type = "text";
    }
  };

  useEffect(() => {
    setProfileFormSubmitSuccess(false);
    if (file instanceof File) {
      if (file.size > 540 * 1000) {
        setFileExceedsSize(true);
        setProfileFormError(
          "Tamanho da imagem excede o tamanho máximo de 540KB"
        );
        setFile(null);
        return;
      } else {
        setAvatarUrl(window.URL.createObjectURL(file));
        setFileExceedsSize(false);
        setProfileFormError(null);
      }
    }
  }, [file]);

  const inputRef = React.createRef();

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
    document.querySelector("#arquivo").value = e.target.files[0].name;
  };

  const handleEditProfileSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("sobrenome", sobrenome);
    formData.append("email", email);
    formData.append("nascimento", parseNascimento(nascimento));
    formData.append("genero", genero);
    formData.append("descricao", descricao);
    if (file !== null) {
      formData.append("avatarImg", file);
    }
    try {
      setLoading(true);
      setProfileFormError(null);
      setProfileFormSubmitSuccess(false);
      const { data } = await api.put(
        `/usuario/${authState.userInfo.idUsuario}`,
        formData
      );
      console.log(data);
      setAuthState(Object.assign(authState, { userInfo: data }));

      setProfileFormSubmitSuccess(true);
      setLoading(false);
    } catch (e) {
      setProfileFormSubmitSuccess(false);
      setLoading(false);
      if (e.response) {
        const errorData = e.response.data;
        if (e.response.data.status >= 400 && e.response.data.status < 500) {
          setProfileFormError(errorData.message);
        } else {
          setProfileFormError("Ocorreu um erro. Por favor, tente novamente.");
        }
      } else {
        setProfileFormError("Ocorreu um erro. Por favor, tente novamente.");
      }
    }
  };

  const handleEditPasswordSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (senhaNova !== confirmarSenhaNova) {
      setPasswordFormError("A confirmação não é igual a nova senha.");
      return;
    }
    setPasswordFormError(null);
    const formData = {
      senhaAtual: senhaAntiga,
      novaSenha: senhaNova,
    };

    try {
      setLoading(true);
      setPasswordSubmitSuccess(false);
      await api.patch(`/usuario/${authState.userInfo.idUsuario}`, formData);
      setPasswordSubmitSuccess(true);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setPasswordSubmitSuccess(false);
      if (e.response.data.status === 401) {
        setPasswordFormError("Senha atual incorreta.");
      } else if (
        e.response.data.status >= 400 &&
        e.response.data.status < 500
      ) {
        setPasswordFormError(e.response.data.message);
      } else {
        setPasswordFormError("Ocorreu um erro. Por favor, tente novamente.");
      }
    }
  };

  return (
    <>
      <div id="container-base-cadastro">
        <Nav />
        <div className="container text-center col-12 col-md-8">
          <h2 className="h3 my-4 font-weight-normal my-blue-1">
            Editar Perfil
          </h2>

          <div className="container">
            <ul
              className="nav nav-tabs font-weight-bold"
              id="main-tab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <a
                  aria-controls="perfil"
                  aria-selected="true"
                  className="nav-link active"
                  data-toggle="tab"
                  href="#editar_perfil"
                  id="perfil-tab"
                  role="tab"
                >
                  {" "}
                  <i className="fas fa-address-card"></i> Perfil{" "}
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  aria-controls="password"
                  aria-selected="false"
                  className="nav-link"
                  data-toggle="tab"
                  href="#password"
                  id="password-tab"
                  role="tab"
                >
                  {" "}
                  <i className="fas fa-unlock-alt"></i> Senha{" "}
                </a>
              </li>
            </ul>
            <div
              className="tab-content edit-profile-form-container"
              id="myTabContent"
            >
              <div
                aria-labelledby="perfil-tab"
                className="tab-pane fade show active w-100 p-3"
                id="editar_perfil"
                role="tabpanel"
              >
                <div className="d-flex flex-column-reverse flex-lg-row justify-content-around align-items-center w-100">
                  <form
                    className="form-signin no-gutters w-100"
                    onSubmit={handleEditProfileSubmit}
                    encType="multipart/form-data"
                  >
                    {(profileFormSubmitSuccess && (
                      <p className="text-success">
                        Perfil atualizado com sucesso.
                      </p>
                    )) || <p className="text-danger">{profileFormError}</p>}
                    <div className="row no-gutters mt-2">
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

                    <div className="row no-gutters">
                      <input
                        type="text"
                        className="col-md-6 col-sm-12 form-control p-2"
                        placeholder="Data de Nascimento"
                        value={nascimento}
                        onChange={(e) => setNascimento(e.target.value)}
                        onFocus={handleBirthInputFocus}
                        onBlur={handleBirthInputBlur}
                        ref={birthInput}
                      />
                      <select
                        className="col-md-6 col-sm-12 form-control p-2"
                        name="genero"
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                        required
                      >
                        <option disabled hidden value="">
                          Selecione seu Gênero
                        </option>
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                        <option value="O">Outro</option>
                      </select>
                    </div>
                    <div className="d-flex justify-content-center row">
                      <textarea
                        className="my-textarea mt-2"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Descrição do seu perfil."
                      />
                    </div>
                    <div className="d-flex mt-2 w-100 file-input-container">
                      <div className="my-btn custom-file">
                        <input
                          name="photoProfile"
                          type="file"
                          ref={inputRef}
                          className="custom-file-input"
                          id="validatedCustomFile"
                          accept="image/*"
                          onChange={handleFileSelect}
                          value=""
                        />
                        <span className="pos-icon">
                          <i className="fas fa-camera"></i>
                        </span>
                      </div>
                      <span className="my-input-file" id="arquivo">
                        <p>
                          {(file !== null && file.name) || "Selecione sua foto"}
                        </p>
                      </span>
                    </div>

                    <button
                      className="btn btn-lg btn-block my-bg-orange-1 my-2 my-color-white mt-2"
                      type="submit"
                    >
                      {(loading && <i className="fas fa-spinner" />) || (
                        <>
                          {" "}
                          <i className="fas fa-user-check"></i> ATUALIZAR
                        </>
                      )}
                    </button>
                  </form>

                  <div className="preview-container">
                    <img
                      className="preview-photo"
                      src={avatarUrl}
                      alt="Preview..."
                      id="preview-photo"
                    />
                  </div>
                </div>
              </div>

              <div
                aria-labelledby="password-tab"
                className="tab-pane fade w-100 p-3"
                id="password"
                role="tabpanel"
              >
                {(passwordSubmitSuccess && (
                  <p className="text-success">Senha alterada com sucesso.</p>
                )) || <p className="text-danger">{passwordFormError}</p>}
                <form
                  className="form-signin"
                  onSubmit={handleEditPasswordSubmit}
                >
                  <input
                    name="password"
                    type="password"
                    className="form-control my-1 p-2"
                    placeholder="Senha Atual"
                    value={senhaAntiga}
                    onChange={(e) => setSenhaAntiga(e.target.value)}
                    required
                  />
                  <input
                    name="new-password"
                    type="password"
                    className="form-control my-1 p-2"
                    placeholder="Senha Nova"
                    value={senhaNova}
                    onChange={(e) => setSenhaNova(e.target.value)}
                    required
                  />
                  <input
                    name="confirm-new-password"
                    type="password"
                    className="form-control my-1 p-2"
                    placeholder="Confirmar Senha Nova"
                    value={confirmarSenhaNova}
                    onChange={(e) => setConfirmarSenhaNova(e.target.value)}
                    required
                  />

                  <button
                    className="btn btn-lg btn-block my-bg-orange-1 my-2 my-color-white mt-2"
                    type="submit"
                  >
                    {(loading && <i className="fas fa-spinner" />) || (
                      <>
                        {" "}
                        <i className="fas fa-lock"></i> ATUALIZAR SENHA
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
