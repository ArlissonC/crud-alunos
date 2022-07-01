import styles from "./Login.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserCircle, LockKey } from "phosphor-react";

const Login = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <section>
        <form className={`d-flex flex-column w-100 ${styles.form}`}>
          <h1 className="mb-3">Cadastro de Alunos</h1>
          <div className="position-relative">
            <UserCircle
              className={`position-absolute ${styles.icon_login}`}
              size={24}
            />
            <input className="w-100" type="email" placeholder="E-mail" />
          </div>
          <div className="position-relative">
            <LockKey
              className={`position-absolute ${styles.icon_login}`}
              size={24}
            />
            <input className="w-100" type="password" placeholder="Senha" />
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
