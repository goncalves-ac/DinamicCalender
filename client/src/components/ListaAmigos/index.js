import React from "react";
import CardAmigo from "../CardAmigo";
import "./ListaAmigos.css";

const ListaAmigos = () => {
  const amigos = [
    {
      id: 1,
      avatarUrl: "https://bootdey.com/img/Content/avatar/avatar7.png",
      userName: "Sophia Silva",
      profileLink: "#",
      userDesc:
        "Assim como tudo na vida, todo início de um processo deve ser realizado com cautela.",
    },
    {
      id: 2,
      avatarUrl: "https://bootdey.com/img/Content/avatar/avatar6.png",
      userName: "Lucio Santos",
      profileLink: "#",
      userDesc: "Aprenda a viver sem as pessoas que vivem sem você.",
    },
    {
      id: 3,
      avatarUrl: "https://bootdey.com/img/Content/avatar/avatar5.png",
      userName: "Ariel Pereira",
      profileLink: "#",
      userDesc:
        "Em um mundo feito de aparências, feliz é aquele que é feito de verdades.",
    },
    {
      id: 4,
      avatarUrl: "https://bootdey.com/img/Content/avatar/avatar3.png",
      userName: "Ana Carol",
      profileLink: "#",
      userDesc: "Um brinde ao que é vivido e não postado.",
    },
]


    return (
        <div className=" col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-sm-12">
            <div className="people-nearby">
                {amigos.map(amigo => <CardAmigo userInfo={amigo}/>)}
            </div>
        </div>
    );
}


export default ListaAmigos;
