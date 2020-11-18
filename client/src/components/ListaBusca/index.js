import React, { useContext, useEffect, useState } from "react";
import api from "../../api";
import { AuthContext } from "../../providers/AuthProvider";
import CardAmigo from "../CardAmigo";
import "./ListaBusca.css";

const ListaAmigos = () => {
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
      if (!postSearch) {
        setPostSearch(true);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setAmigos([]);
      setFormError(e.response.data.message);
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
    <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-sm-12">
      <form className="form-inline py-3" onSubmit={handleSearchFriends}>
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
          {(loading && <i className="fas fa-spinner"></i>) || (
            <i className="fas fa-search fa-lg my-color-white"></i>
          )}
        </button>
      </form>
      {!postSearch && (
        <p className="text-info">Pesquise pessoas por nome acima</p>
      )}
      {postSearch && (
        <>
          {(formError && <p className="text-danger">{formError}</p>) || (
            <h4 className="my-text-align anim-fade-in">Pessoas encontradas</h4>
          )}
        </>
      )}

      <div className="people-nearby pt-0">
        {amigos.map((amigo) => (
          <CardAmigo key={amigo.idUsuario} userInfo={amigo} search={true} />
        ))}
      </div>
    </div>
  );
};

export default ListaAmigos;
