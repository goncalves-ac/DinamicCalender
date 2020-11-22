import React, { useEffect, useState } from "react";
import api from "../../api";
import CardAmigo from "../CardAmigo";
import "./ListaAmigos.css";

const ListaAmigos = ({ friendList }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredFriendList, setFilteredFriendList] = useState([]);
  const [filterQuery, setFilterQuery] = useState([]);

  useEffect(() => {
    if (filterQuery !== "") {
      setFilteredFriendList(
        friendList.filter((friend) => {
          const friendFullname = `${friend.nome} ${friend.sobrenome}`;
          if (friendFullname.match(filterQuery)) {
            return true;
          } else {
            return false;
          }
        })
      );
    } else {
      setFilteredFriendList(friendList);
    }
    console.log(friendList);
  }, [friendList, filterQuery]);

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e.response.data.message);
    }
  }, []);

  return (
    <div className=" col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-sm-12 my-profile-page-content-container-sizing">
      <div className="people-nearby">
        <h3 className="mb-3 text-center h4 my-blue-1 my-bolder">Amigos</h3>

        {friendList.length > 0 && (
          <input
            placeholder="Filtre seus amigos pelo nome..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="form-control my-1 p-2"
            type="text"
            name="filter-friends"
          />
        )}

        <div className="people-nearby pt-0 overflow-auto h-75">
          {(loading && <i className="fas fa-spinner" />) || (
            <>
              {(filteredFriendList.length > 0 &&
                filteredFriendList.map((friend) => (
                  <CardAmigo
                    key={friend.idUsuario}
                    userInfo={friend}
                    mode="FRIENDLIST"
                  />
                ))) ||
                (friendList.length > 0 && (
                  <p className="text-center">Nenhum amigo encontrado</p>
                ))}
            </>
          )}
          {!loading && friendList.length < 1 && (
            <p className="text-center">Você ainda não tem nenhum amigo 😔</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListaAmigos;
