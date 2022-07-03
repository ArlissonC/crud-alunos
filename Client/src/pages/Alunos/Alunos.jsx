import styles from "./Alunos.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Trash, Pen, SignOut, User } from "phosphor-react";

const Alunos = () => {
  return (
    <div className="container d-flex justify-content-center flex-column">
      <header>
        <div className="d-flex justify-content-around mt-5">
          <span>
            <User size={19} className="m-2" />
            Bem-vindo, <strong>Arlisson</strong>
          </span>
          <Link className="btn btn-success" to="/aluno/novo/0">
            <span>Novo Aluno</span>
          </Link>
          <button type="button" className="btn">
            <SignOut size={22} />
          </button>
        </div>
      </header>
      <form className="form-group mt-5 mb-3">
        <input type="text" placeholder="Nome" className="form-control" />
        <button type="button" className="btn btn-success mt-2 w-100">
          Filtrar aluno por nome
        </button>
      </form>
      <h1>Relação de Alunos</h1>
      <ul className="row justify-content-between mt-3 w-100">
        <li className={`card ${styles.card_width}`}>
          <div className="d-flex justify-content-between p-4">
            <div className="d-flex flex-column gap-3">
              <b>
                Nome: <b>Paulo</b>
              </b>
              <b>
                E-mail: <b>paulo@email.com</b>
              </b>
              <b>
                Idade: <b>22</b>
              </b>
            </div>
            <div className="d-flex flex-column gap-2">
              <button type="button" className="btn">
                <Pen size={24} />
              </button>
              <button type="button" className="btn">
                <Trash size={24} />
              </button>
            </div>
          </div>
        </li>
        <li className={`card ${styles.card_width}`}>
          <div className="d-flex justify-content-between p-4">
            <div className="d-flex flex-column gap-3">
              <b>
                Nome: <b>Paulo</b>
              </b>
              <b>
                E-mail: <b>paulo@email.com</b>
              </b>
              <b>
                Idade: <b>22</b>
              </b>
            </div>
            <div className="d-flex flex-column gap-2">
              <button type="button" className="btn">
                <Pen size={24} />
              </button>
              <button type="button" className="btn">
                <Trash size={24} />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Alunos;
