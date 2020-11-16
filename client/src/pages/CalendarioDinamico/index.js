import React from 'react';
import './CalendarioDinamico.css';
import CD from "../../img/CD.png";
import CD_EX from "../../img/calendario-ex.PNG";
import {Link} from "react-router-dom";

export default function Calendario_Dinamico () {
    return (
        <main className="d-flex justify-content-end mt-5 my-mr-100">
            <section className="width-index">
                <div className="my-text-align mb-5">
                    <img src={CD} alt="" width="500"/>
                </div>
                <p className="my-color-white text-justify">
                    Bem Vindo a solução dos seus problemas. Estou aqui para ajudá-lo facilmente a gerenciar seus compromissos,
                    afazeres e horários... Assim, a organização de suas tarefas potencializará sua entregas e a cumprir suas
                    promesas. Estarei com você para dinamizar sua vida.
                </p>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="my-text-align mb-5">
                        <img src={CD_EX} alt="" width="80%"/>
                    </div>
                    <div>
                        <h4 className="my-blue-1">Recursos:</h4>
                        <ul className="my-color-white list-recursos fa-ul">
                            <li>
                                <i className="fas fa-fw fa-bullseye"></i>
                                <i className="fas fa-fw fa-caret-right tam-seta"></i>
                                <h5>Clique duas vezes pode fazer notas na tela, o que é conveniente e útil.</h5>
                            </li>
                            <li>
                                <i className="fas fa-fw fa-fill-drip"></i>
                                <i className="fas fa-fw fa-caret-right tam-seta"></i>
                                <h5> Definir cor de fundo para os eventos.</h5>
                            </li>
                            <li>
                                <i className="fas fa-fw fa-route"></i>
                                <i className="fas fa-fw fa-caret-right tam-seta"></i>
                                <h5> Mover os eventos entre os dias.</h5>
                            </li>
                            <li>
                                <i className="far fa-fw fa-calendar-alt"></i>
                                <i className="fas fa-fw fa-caret-right tam-seta"></i>
                                <h5> Disposição do calendário em mês, semana, dia e lista.</h5>
                            </li>
                            <li>
                                <i className="fas fa-fw fa-users"></i>
                                <i className="fas fa-fw fa-caret-right tam-seta"></i>
                                <h5> Marque eventos com seus amigos.</h5>
                            </li>
                            <li>
                                <i className="fas fa-fw fa-unlock-alt"></i>
                                <i className="fas fa-fw fa-caret-right tam-seta"></i>
                                <h5> Seus eventos podem ser públicos ou privados.</h5>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="fixed-bottom my-btn-fixed-left">
                    <Link to="/cadastro" className="btn btn-lg btn-block my-bg-orange-1 my-2 my-color-white mr-3" type="submit">
                        <i className="fas fa-check-circle"></i> CADASTRAR
                    </Link>
                    <Link to="/login" className="btn btn-lg btn-block my-bg-orange-1 my-2 my-color-white" type="submit">
                        ENTRAR  <i className="fas fa-chevron-right"></i>
                    </Link>
                </div>
            </section>
        </main>
    );
}