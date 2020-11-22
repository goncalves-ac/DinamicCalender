import React, { useEffect, useState } from "react";
import { useContext } from "react";
import api from "../api";
import { AuthContext } from "../providers/AuthProvider";

const useAuthUserFriendlist = () => {
  const { authState } = useContext(AuthContext);
  const [authUserFriendlistIds, setAuthUserFriendlistIds] = useState([]);
  const [loadingAuthUserFriendList, setLoadingAuthUserFriendList] = useState(
    true
  );

  useEffect(() => {
    setLoadingAuthUserFriendList(false);
  }, [authUserFriendlistIds]);

  useEffect(() => {
    const fetchAuthUserFriends = async () => {
      try {
        const { data } = await api.get(`/amigos`);

        const acceptedFriends = data.filter(
          (invite) => invite.status === "ACCEPTED"
        );
        const acceptedFriendsIdUsuario1List = acceptedFriends
          .filter(
            (invite) => invite.idUsuario1 !== authState.userInfo.idUsuario
          )
          .map((invite) => invite.idUsuario1);
        const acceptedFriendsIdUsuario2List = acceptedFriends
          .filter(
            (invite) => invite.idUsuario2 !== authState.userInfo.idUsuario
          )
          .map((invite) => invite.idUsuario2);

        const friendList = [
          ...authState.userInfo.amigosRequisitados,
          ...authState.userInfo.requisicoesAmigos,
        ].filter(
          (amigo) =>
            acceptedFriendsIdUsuario1List.includes(amigo.idUsuario) ||
            acceptedFriendsIdUsuario2List.includes(amigo.idUsuario)
        );

        setAuthUserFriendlistIds(friendList.map((friend) => friend.idUsuario));
      } catch (e) {
        alert("Houve um erro. Por favor atualize a página.");
        setAuthUserFriendlistIds([]);
      }
    };

    if (authState.userInfo) {
      fetchAuthUserFriends();
    }
  }, [authState]);

  return { authUserFriendlistIds, loadingAuthUserFriendList };
};

export default useAuthUserFriendlist;
