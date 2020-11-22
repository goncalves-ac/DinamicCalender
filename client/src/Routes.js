import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Usuario from "./pages/Usuario";
import Calendario from "./pages/Calendario";
import EditarPerfil from "./pages/EditarPerfil";
import CalendarioDinamico from "./pages/CalendarioDinamico";
import { AuthContext } from "./providers/AuthProvider";
import api from "./api";

const Routes = () => {
  const { setAuthState } = useContext(AuthContext);
  const AuthConsumer = AuthContext.Consumer;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const retrieveSession = async () => {
      const expiresAt = localStorage.getItem("eat");

      if (expiresAt && Date.parse(expiresAt) > new Date().getTime()) {
        try {
          const { data } = await api.get("/usuario");
          setAuthState({
            userInfo: data[0],
            expiresAt,
          });
        } catch (e) {
          try {
            await api.post("/unauthenticate");
            setAuthState({
              userInfo: null,
              expiresAt: null,
            });
          } catch (e) {
          } finally {
            localStorage.removeItem("eat");
          }
        }
      } else {
        try {
          setAuthState({
            userInfo: null,
            expiresAt: null,
          });
          localStorage.removeItem("eat");
          await api.post("/unauthenticate");
        } catch (e) {}
      }
      setLoading(false);
    };
    retrieveSession();
  }, []);

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

  if (loading) {
    return (
      <div className="full-height d-flex flex-column align-items-center justify-content-center">
        <span style={{ height: "fit-content" }}>
          <i className="fas fa-spinner my-blue-1 fa-3x" />
        </span>
        <h2 className="my-blue-1 fa-2x">Carregando...</h2>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <AuthConsumer>
          {({ authState }) =>
            (authState.expiresAt && getAuthRoutes()) || getUnauthRoutes()
          }
        </AuthConsumer>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
