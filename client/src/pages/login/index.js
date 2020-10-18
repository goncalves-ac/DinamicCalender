import React, {useState, useEffect} from "react";
import Logo_Black from "./../../img/logo-black.png";
import "./style.css";

export default function Login() {

    const [email, setEmail] = useState("");
    useEffect(()=>{
        console.log(email);
    }, [email])

    return (
        <div className="row no-gutters my-bg-orange-0" id="container-base-login">
        <div className="align-self-center container-md text-center col-lg-4 col-md-6 col-sm-12">
            <form className="form-signin">
                <img className="mb-4" src={Logo_Black} alt="" width="80"/>
                <h1 className="h3 mb-3 font-weight-normal">Calendário Dinâmico</h1>

                <label htmlFor="inputEmail" className="sr-only"><i className="fas fa-at"></i> Email</label>
                <input name="email" type="email" id="inputEmail" className="form-control my-1" placeholder="Email"
                       required="" autoFocus="" value={email} onChange={(event) => {
                           setEmail(event.target.value);
                }}/>

                <label htmlFor="inputPassword" className="sr-only"><i className="fas fa-key"></i> Senha</label>
                <input name="senha" type="password" id="inputPassword" className="form-control my-1"
                       placeholder="Senha" required=""/>
                <button className="btn btn-lg btn-block my-bg-orange-1 my-2" type="submit">Entrar <i
                    className="fas fa-chevron-right"></i></button>
            </form>
            <a href="/cadastro" className="btn btn-lg btn-block my-bg-orange-1 my-2"><i
                className="fas fa-user-plus"></i> Cadastre-se</a>
            <hr/>
            <a href="#" className="btn btn-lg btn-block btn-danger"><i className="fab fa-google"></i> Login Google</a>
            <a href="#" className="btn btn-lg btn-block btn-primary"><i className="fab fa-facebook"></i> Login Facebook</a>
        </div>
        </div>
    );
}