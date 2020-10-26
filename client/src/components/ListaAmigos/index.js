import React from "react";
import "./ListaAmigos.css";

const ListaAmigos = () => {
    return (
        <div className=" col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-sm-12">

            <form className="form-inline py-3">
                <input aria-label="Search" className="form-control col-md-10 col-sm-11 p-1"
                       placeholder="Buscar Amigo..."
                       type="search" />
                    <button className="btn btn-success col-md-2 col-sm-1 p-1" type="submit">
                        <i className="fas fa-search fa-lg"></i>
                    </button>
            </form>

            <div className="people-nearby">
                <div className="nearby-user">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-9">
                            <img alt="user" className="profile-photo-lg"
                                 src="https://bootdey.com/img/Content/avatar/avatar7.png" />
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-12">
                            <h5><a className="profile-link" href="#">Sophia Silva</a></h5>
                            <p>Assim como tudo na vida, todo início de um processo deve ser realizado com cautela.</p>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-3">
                            <button className="btn btn-info btn-circle pull-right"><i
                                className="fas fa-user-plus fa-lg"></i></button>
                        </div>
                    </div>
                </div>

                <div className="nearby-user">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-9">
                            <img alt="user" className="profile-photo-lg"
                                 src="https://bootdey.com/img/Content/avatar/avatar6.png" />
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-12">
                            <h5><a className="profile-link" href="#">Lucio Santos</a></h5>
                            <p>Aprenda a viver sem as pessoas que vivem sem você.</p>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-3">
                            <button className="btn btn-info btn-circle pull-right"><i
                                className="fas fa-user-plus fa-lg"></i></button>
                        </div>
                    </div>
                </div>

                <div className="nearby-user">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-9">
                            <img alt="user" className="profile-photo-lg"
                                 src="https://bootdey.com/img/Content/avatar/avatar5.png" />
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-12">
                            <h5><a className="profile-link" href="#">Ariel Pereira</a></h5>
                            <p>Em um mundo feito de aparências, feliz é aquele que é feito de verdades.</p>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-3">
                            <button className="btn btn-info btn-circle pull-right"><i
                                className="fas fa-user-plus fa-lg"></i></button>
                        </div>
                    </div>
                </div>

                <div className="nearby-user">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-9">
                            <img alt="user" className="profile-photo-lg"
                                 src="https://bootdey.com/img/Content/avatar/avatar3.png" />
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-12">
                            <h5><a className="profile-link" href="#">Ana Carol</a></h5>
                            <p>Um brinde ao que é vivido e não postado.</p>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-3">
                            <button className="btn btn-info btn-circle pull-right"><i
                                className="fas fa-user-plus fa-lg"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListaAmigos;