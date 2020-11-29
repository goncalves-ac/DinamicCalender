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
import OutroUsuario from "./pages/Usuario/OutroUsuario";
import AtualizarSenhaEsquecida from "./pages/AtualizarSenhaEsquecida";
import Page404 from "./pages/Page404";
import Loading from "./pages/Loading";

const Routes = () => {
  const { authState, setAuthState } = useContext(AuthContext);
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
        <Route path="/usuario/:id" exact>
          <OutroUsuario />
        </Route>
        <Route path="/recuperarsenha" exact>
          <AtualizarSenhaEsquecida />
        </Route>
        <Route path="/recuperarsenha/:token" exact>
          <AtualizarSenhaEsquecida />
        </Route>
        <Route path="*">
          <Page404 />
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
        <Route path="/cadastro" render={(props) => <Cadastro {...props}/>} exact>
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
        <Route path="/usuario/:id" exact>
          <OutroUsuario />
        </Route>
        <Route path="/recuperarsenha" exact>
          <AtualizarSenhaEsquecida />
        </Route>
        <Route path="/recuperarsenha/:token" exact>
          <AtualizarSenhaEsquecida />
        </Route>
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>
    );
  };

  if (loading) return <Loading />;

  return (
    <BrowserRouter>
      {(authState.expiresAt && getAuthRoutes()) || getUnauthRoutes()}
    </BrowserRouter>
  );
};

export default Routes;
