import React from "react";
import CardAmigo from "../CardAmigo";
import "./ListaBusca.css";

const ListaAmigos = () => {
    const amigos = [
        {
        avatarUrl:"https://bootdey.com/img/Content/avatar/avatar7.png",
        userName:"Sophia Silva",
        profileLink:"#",
        userDesc:"Assim como tudo na vida, todo início de um processo deve ser realizado com cautela."
    },
    {
        avatarUrl:"https://bootdey.com/img/Content/avatar/avatar6.png",
        userName:"Lucio Santos",
        profileLink:"#",
        userDesc:"Aprenda a viver sem as pessoas que vivem sem você."
    },
    {
        avatarUrl:"https://bootdey.com/img/Content/avatar/avatar5.png",
        userName:"Ariel Pereira",
        profileLink:"#",
        userDesc:"Em um mundo feito de aparências, feliz é aquele que é feito de verdades."
    },
    {
        avatarUrl:"https://bootdey.com/img/Content/avatar/avatar3.png",
        userName:"Ana Carol",
        profileLink:"#",
        userDesc:"Um brinde ao que é vivido e não postado."
    },
]

    return (
        <div className=" col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-sm-12">

            <form className="form-inline py-3">
                <input aria-label="Search" className="form-control col-md-10 col-sm-11 p-1"
                       placeholder="Buscar Amigo..."
                       type="search" />
                    <button className="btn col-md-2 col-sm-1 p-1 my-bg-orange-1" type="submit">
                        <i className="fas fa-search fa-lg my-color-white"></i>
                    </button>
            </form>

            <div className="people-nearby">
                {amigos.map(amigo => <CardAmigo userInfo={amigo}/>)}
            </div>
        </div>
    );
}

export default ListaAmigos;