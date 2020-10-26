import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import RoutingLinks from './RoutingLinks';
import Usuario from "./pages/Usuario";

const Routes = () => {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact><RoutingLinks/></Route>
      <Route path="/login" exact><Login /></Route>
      <Route path="/cadastro" exact><Cadastro /></Route>
      <Route path="/usuario" exact><Usuario /></Route>
    </Switch>
      
    </BrowserRouter>
  );
};

export default Routes;
