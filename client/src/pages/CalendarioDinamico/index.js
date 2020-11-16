import React from 'react';
import './CalendarioDinamico.css';
import CD from "../../img/CD.png";
import CD_EX from "../../img/calendario-ex.PNG";
import {Link} from "react-router-dom";

export default function Calendario_Dinamico () {
    return (
        <main className="d-flex justify-content-end mt-5 my-mr-100 my-scroll-hidden">
            <section className="width-index">
                <div className="my-text-align mb-5">
                    <img src={CD} alt="" width="400"/>
                </div>
                <p className="my-color-white text-justify">
                    Bem Vindo a solução dos seus problemas. Estou aqui para ajudá-lo facilmente a gerenciar seus compromissos,
                    afazeres e horários... Assim, a organização de suas tarefas potencializará sua entregas e a cumprir suas
                    promesas. Estarei com você para dinamizar sua vida.
                </p>
                <div className="d-flex justify-content-center align-items-center mt-4">
                    <div className="my-text-align mb-5">
                        <img src={CD_EX} alt="" width="85%"/>
                    </div>
                    <div>
                        <h5 className="my-blue-1">Recursos:</h5>
                        <ul className="my-color-white list-recursos fa-ul">
                            <li className="d-flex justify-content-start align-items-center">
                                <i className="fas fa-fw fa-bullseye"></i>
                                <p>Clique duas vezes pode fazer notas na tela, o que é conveniente e útil.</p>
                            </li>
                            <li className="d-flex justify-content-start align-items-center">
                                <i className="fas fa-fw fa-fill-drip"></i>
                                <p> Definir cor de fundo para os eventos.</p>
                            </li>
                            <li className="d-flex justify-content-start align-items-center">
                                <i className="fas fa-fw fa-route"></i>
                                <p> Mover os eventos entre os dias.</p>
                            </li>
                            <li className="d-flex justify-content-start align-items-center">
                                <i className="far fa-fw fa-calendar-alt"></i>
                                <p> Disposição do calendário em mês, semana, dia e lista.</p>
                            </li>
                            <li className="d-flex justify-content-start align-items-center">
                                <i className="fas fa-fw fa-users"></i>
                                <p> Marque eventos com seus amigos.</p>
                            </li>
                            <li className="d-flex justify-content-start align-items-center">
                                <i className="fas fa-fw fa-unlock-alt"></i>
                                <p> Seus eventos podem ser públicos ou privados.</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="fixed-bottom my-btn-fixed-left">
                    <Link to="/cadastro" className="btn btn-lg btn-block my-bg-orange-1 my-2 my-color-white mr-3 my-font-size" type="submit">
                        <i className="fas fa-check-circle"></i> CADASTRAR
                    </Link>
                    <Link to="/login" className="btn btn-lg btn-block my-bg-orange-1 my-2 my-color-white my-font-size" type="submit">
                        ENTRAR  <i className="fas fa-chevron-right"></i>
                    </Link>
                </div>
            </section>
        </main>
    );
}