import styles from "./Login.module.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserCircle, LockKey } from "phosphor-react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPaswword] = useState("");

  const Navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await api.post("api/account/loginuser", data);
      localStorage.setItem("email", email);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("expiration", response.data.expiration);
      console.log(response);
      Navigate("/alunos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <section>
        <form
          onSubmit={login}
          className={`d-flex flex-column w-100 ${styles.form}`}
        >
          <h1 className="mb-3">Cadastro de Alunos</h1>
          <div className="position-relative">
            <UserCircle
              className={`position-absolute ${styles.icon_login}`}
              size={24}
            />
            <input
              className="w-100"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="position-relative">
            <LockKey
              className={`position-absolute ${styles.icon_login}`}
              size={24}
            />
            <input
              className="w-100"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPaswword(e.target.value)}
            />
          </div>

          <button className="btn btn-success" type="submit">
            Login
          </button>
        </form>
      </section>
    </div>
  );
};

export default Login;
