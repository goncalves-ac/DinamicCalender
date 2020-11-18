import React, { useEffect, useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Usuario from "./pages/Usuario";
import Calendario from "./pages/Calendario";
import EditarPerfil from "./pages/EditarPerfil";
import CalendarioDinamico from "./pages/CalendarioDinamico";
import { AuthContext } from "./providers/AuthProvider";

const Routes = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const AuthConsumer = AuthContext.Consumer;

  useEffect(() => {
    if (Date.parse(authState.expiresAt) < new Date().getTime) {
      setAuthState({
        jwttoken: null,
        expiresAt: null,
        userInfo: {},
      });
    }
  }, [authState]);

  const getAuthRoutes = () => {
    return (
      <Switch>
        <Route path="/" exact>
          <AuthConsumer>
            {({ authState }) => <Usuario userInfo={authState.userInfo} />}
          </AuthConsumer>
        </Route>
        <Route path="/login" exact>
          <Redirect to="/" />
        </Route>
        <Route path="/cadastro" exact>
          <Redirect to="/" />
        </Route>
        <Route path="/usuario" exact>
          <AuthConsumer>
            {({ authState }) => <Usuario userInfo={authState.userInfo} />}
          </AuthConsumer>
        </Route>
        <Route path="/calendario" exact>
          <Calendario />
        </Route>
        <Route path="/editarPerfil" exact>
          <EditarPerfil />
        </Route>
      </Switch>
    );
  };

  const getUnauthRoutes = () => {
    return (
      <Switch>
        <Route path="/" exact>
          <CalendarioDinamico />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/cadastro" exact>
          <Cadastro />
        </Route>
        <Route path="/usuario" exact>
          <Redirect to="/" />
        </Route>
        <Route path="/calendario" exact>
          <Redirect to="/" />
        </Route>
        <Route path="/editarPerfil" exact>
          <Redirect to="/" />
        </Route>
      </Switch>
    );
  };

  return (
    <BrowserRouter>
      <Switch>
        {(authState.jwttoken && getAuthRoutes()) || getUnauthRoutes()}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
