import React from "react";
import "./PerfilUsuario.css";

const PerfilUsuario = () => {
    return (
        <div className="d-flex justify-content-around align-self-center">
            <div className="container mt-3 mb-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h3 className="my-blue-1 my-bolder"><strong>Eventos</strong></h3>
                        <ul className="timeline">
                            <li>
                                <h4>New Web Design</h4>
                                <h6 className="my-blue-1">21 March, 2014</h6>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non
                                    nisi semper, et elementum lorem ornare. Maecenas placerat facilisis mollis. Duis
                                    sagittis ligula in sodales vehicula....</p>
                            </li>
                            <li>
                                <h4>New Web Design</h4>
                                <h6 className="my-blue-1">4 March, 2014</h6>
                                <p>Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque
                                    felis vitae justo accumsan, sed semper nisi sollicitudin...</p>
                            </li>
                            <li>
                                <h4>Awesome Employers</h4>
                                <h6 className="my-blue-1">1 April, 2014</h6>
                                <p>Fusce ullamcorper ligula sit amet quam accumsan aliquet. Sed nulla odio, tincidunt
                                    vitae nunc vitae, mollis pharetra velit. Sed nec tempor nibh...</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PerfilUsuario;