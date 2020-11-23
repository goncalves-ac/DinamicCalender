import React, { useContext, useState } from "react";
import "./AtualizarSenhaEsquecida.css";
import Logo from "../../img/logo-default.png";
import api from "../../api";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, Redirect, useParams } from "react-router-dom";
import { useEffect } from "react";

const AtualizarSenhaEsquecida = () => {
  const { setAuthState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [confirmarSenhaNova, setConfirmarSenhaNova] = useState("");
  const [formError, setFormError] = useState(null);
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);
  const { token } = useParams();

  useEffect(() => {
    const logout = async () => {
      try {
        await api.post("/unauthenticate");
        setAuthState({
          expiresAt: null,
          userInfo: null,
        });
        localStorage.removeItem("eat");
      } catch (e) {
        console.log(e);
      }
    };
    logout();
  }, []);

  const handleEditPasswordSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (senhaNova !== confirmarSenhaNova) {
      setFormError("A confirmação não é igual a nova senha.");
      return;
    }
    setFormError(null);
    const formData = {
      novaSenha: senhaNova,
    };

    try {
      setLoading(true);
      setFormSubmitSuccess(false);
      await api.patch(`/usuario?token=${token}`, formData);
      setFormSubmitSuccess(true);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setFormSubmitSuccess(false);
      if (e.response.data.status >= 400 && e.response.data.status <= 500) {
        setFormError(e.response.data.message);
      } else {
        setFormError("Ocorreu um erro. Por favor, tente novamente.");
      }
    }
  };

  const handleSendRecoverMail = async (e) => {
    e.preventDefault();
    if (loading) return;
    setFormError(null);
    const formData = {
      email,
    };

    try {
      setLoading(true);
      setFormSubmitSuccess(false);
      await api.post(`/usuario/recover-password`, formData);
      setFormSubmitSuccess(true);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setFormSubmitSuccess(false);
      if (e.response.data.status >= 400 && e.response.data.status <= 500) {
        setFormError(e.response.data.message);
      } else {
        setFormError("Ocorreu um erro. Por favor, tente novamente.");
      }
    }
  };

  if (!token) {
    return (
      <section className="my-center">
        <img src={Logo} width="150" className="mb-3" />
        <div className="my-input-new-password">
          {(formSubmitSuccess && (
            <p className="text-success">
              Um email com instruções para alterar sua senha será enviado para
              você. Por favor, verifique sua caixa de entrada e sua caixa de
              spam e siga as instruções contidas no email.
            </p>
          )) || <p className="text-danger">{formError}</p>}
          {(formSubmitSuccess && (
            <Link to="/" className="text-primary">
              Voltar
            </Link>
          )) || (
            <form className="form-signin" onSubmit={handleSendRecoverMail}>
              <input
                name="email"
                type="email"
                className="form-control my-1 p-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button
                className="btn btn-lg btn-block my-bg-orange-1 my-2 my-color-white mt-2"
                type="submit"
              >
                {(loading && <i className="fas fa-spinner" />) || (
                  <>
                    {" "}
                    <i className="fas fa-lock"></i> RECUPERAR SENHA
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    );
  } else {
    return (
      <section className="my-center">
        <img src={Logo} width="150" className="mb-3" />
        <div className="my-input-new-password">
          {(formSubmitSuccess && (
            <p className="text-success">Senha alterada com sucesso.</p>
          )) || <p className="text-danger">{formError}</p>}
          {(formSubmitSuccess && (
            <Link to="/login" className="text-primary">
              Fazer login
            </Link>
          )) || (
            <form className="form-signin" onSubmit={handleEditPasswordSubmit}>
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
          )}
        </div>
      </section>
    );
  }
};

export default AtualizarSenhaEsquecida;
