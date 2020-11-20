import React, { useContext, useEffect, useState } from "react";
import api from "../../api";
import { AuthContext } from "../../providers/AuthProvider";
import CardAmigo from "../CardAmigo";
import "./ListaAmigos.css";

const ListaAmigos = () => {
  const [amigos, setAmigos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFriends = async () => {
      const { data } = await api.get(`/amigos`);
      return data;
    };

    try {
      setLoading(true);
      setError(null);
      const data = getFriends();
      console.log(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e.response.data.message);
    }
  }, []);

  return (
    <div className=" col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-sm-12">
      <div className="people-nearby">
        {(loading && <i className="fas fa-spinner" />) ||
          amigos.map((amigo) => (
            <CardAmigo key={amigo.id} userInfo={amigo} search={false} />
          ))}
        {!loading && amigos.length < 1 && (
          <p>Você ainda não tem nenhum amigo 😔</p>
        )}
      </div>
    </div>
  );
};

export default ListaAmigos;
