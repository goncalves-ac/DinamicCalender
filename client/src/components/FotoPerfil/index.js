import React from "react";
import "./FotoPerfil.css";

const FotoPerfil = () => {
    return (
        <div className="container">
            <div className="span3 well">
                <div className="text-center">
                    <a href="#aboutModal" data-toggle="modal" data-target="#myModal" >
                        src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRbezqZpEuwGSvitKy3wrwnth5kysKdRqBW54cAszm_wiutku3R"
                        name="aboutme" width="140" height="140" className="rounded-circle mt-3"></a>
                    <h3 className="my-orange-1 my-3">Joe Sixpack</h3>
                    <p className="container-sm text-center text-light col-lg-5 col-md-8 col-sm-11">“No momento em que
                        verdadeiramente entendo meu inimigo, o suficiente para derrotá-lo, então naquele mesmo momento
                        eu também o amo.”</p>
                </div>
            </div>
        </div>
    );
}

export default FotoPerfil;