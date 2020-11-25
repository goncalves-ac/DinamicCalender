import React, { useContext, useEffect, useState } from "react";
import api from "../../api";
import { AuthContext } from "../../providers/AuthProvider";
import CardAmigo from "../CardAmigo";
import "./ListaBusca.css";

const ListaBusca = ({ authUserFriendlistIds, loadingAuthUserFriendList }) => {
  const { authState } = useContext(AuthContext);
  const [amigos, setAmigos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postSearch, setPostSearch] = useState(false);

  const handleSearchFriends = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormError(null);
      const { data } = await api.get(`/usuario?nome=${searchQuery}`);
      setAmigos(
        data.filter((user) => user.idUsuario !== authState.userInfo.idUsuario)
      );
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setAmigos([]);
      if (e.response) {
        const errorData = e.response.data;
        setFormError(errorData.message);
      } else {
        setFormError("Ocorreu um erro. Por favor, tente novamente.");
      }
    } finally {
      if (!postSearch) {
        setPostSearch(true);
      }
    }
  };

  useEffect(() => {
    if (amigos.length < 1 && postSearch) {
      setFormError("Nenhuma pessoa foi encontrada com esse nome");
    } else if (
      amigos.length === 1 &&
      amigos[0].idUsuario === authState.userInfo.idUsuario
    ) {
      setFormError("Nenhuma pessoa foi encontrada com esse nome");
    }
  }, [amigos, postSearch]);

  return (
    <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-sm-12 people-nearby my-profile-page-content-container-sizing">
      <h3 className="mb-2 text-center h4 my-blue-1 my-bolder">
        Encontre pessoas
      </h3>
      <form className="form-inline py-2" onSubmit={handleSearchFriends}>
        <input
          aria-label="Search"
          className="form-control col-md-10 col-sm-11 p-1"
          placeholder="Buscar pessoas por nome"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="btn col-md-2 col-sm-1 p-1 my-bg-orange-1"
          type="submit"
        >
          {(loading && <i className="fas fa-spinner my-color-white"></i>) || (
            <i className="fas fa-search fa-lg my-color-white"></i>
          )}
        </button>
      </form>
      {!postSearch && (
        <p className="text-info">Pesquise pessoas por nome acima</p>
      )}
      {postSearch && (
        <>{formError && <p className="text-danger">{formError}</p>}</>
      )}

      <div className="people-nearby pt-0 overflow-auto h-75">
        {amigos
          .sort((a, b) =>
            `${a.nome} ${a.sobrenome}`.localeCompare(`${b.nome} ${b.sobrenome}`)
          )
          .map((amigo) => (
            <CardAmigo
              key={amigo.idUsuario}
              userInfo={amigo}
              mode="SEARCH"
              authUserFriendlistIds={authUserFriendlistIds}
              loadingAuthUserFriendList={loadingAuthUserFriendList}
            />
          ))}
      </div>
    </div>
  );
};

export default ListaBusca;
