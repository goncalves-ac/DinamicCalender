import React, {useContext, useState} from "react";
import "./AtualizarSenhaEsquecida.css";
import api from "../../api";
import {AuthContext} from "../../providers/AuthProvider";
import useAuthorization from "../../hooks/useAuthorization";


const AtualizarSenhaEsquecida = () => {

    const { authState, setAuthState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [senhaNova, setSenhaNova] = useState("");
    const [confirmarSenhaNova, setConfirmarSenhaNova] = useState("");
    const [passwordFormError, setPasswordFormError] = useState(null);
    const [passwordSubmitSuccess, setPasswordSubmitSuccess] = useState(false);

    const { authorization } = useAuthorization();

    const handleEditPasswordSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        if (senhaNova !== confirmarSenhaNova) {
            setPasswordFormError("A confirmação não é igual a nova senha.");
            return;
        }
        setPasswordFormError(null);
        const formData = {
            novaSenha: senhaNova,
        };

        try {
            setLoading(true);
            setPasswordSubmitSuccess(false);
            await api.patch(
                `/usuario/${authState.userInfo.idUsuario}`,
                formData,
                authorization
            );
            setPasswordSubmitSuccess(true);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            setPasswordSubmitSuccess(false);
            if (e.response.data.status === 401) {
                setPasswordFormError("Senha atual incorreta.");
            } else if (e.response.data.status === 400) {
                setPasswordFormError(e.response.data.message);
            } else {
                setPasswordFormError("Ocorreu um erro. Por favor, tente novamente.");
            }
        }
    };

    return (
        <>
            <div id="container-base-cadastro">
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
        </>
    );
}

export default AtualizarSenhaEsquecida;