import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import RoutingLinks from './RoutingLinks';
import Usuario from "./pages/Usuario";
import Calendario from "./pages/Calendario";
import EditarPerfil from "./pages/EditarPerfil";
import Calendario_Dinamico from "./pages/CalendarioDinamico";

const Routes = () => {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact><RoutingLinks/></Route>
      <Route path="/login" exact><Login /></Route>
      <Route path="/cadastro" exact><Cadastro /></Route>
      <Route path="/usuario" exact><Usuario /></Route>
      <Route path="/calendario" exact><Calendario /></Route>
      <Route path="/editarPerfil" exact><EditarPerfil /></Route>
      <Route path="/calendario_dinamico" exact><Calendario_Dinamico /></Route>
    </Switch>
      
    </BrowserRouter>
  );
};

export default Routes;
