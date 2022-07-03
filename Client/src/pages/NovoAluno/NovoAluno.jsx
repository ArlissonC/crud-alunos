import styles from "./NovoAluno.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserPlus, ArrowUDownLeft } from "phosphor-react";
import { Link, useParams } from "react-router-dom";

const NovoAluno = () => {
  const { alunoId } = useParams();

  return (
    <div className={`container ${styles.margin_top}`}>
      <div className="d-flex justify-content-evenly">
        <div className="d-flex flex-column justify-content-between align-items-center">
          <UserPlus size={152} />
          <h2>{alunoId === "0" ? "Incluir Novo Aluno" : "Atualizar Aluno"}</h2>
          <Link to="/alunos" className="btn">
            <ArrowUDownLeft size={32} />
            <span className="m-3">Retornar</span>
          </Link>
        </div>
        <form className="form-group w-50 d-flex flex-column gap-3">
          <input className="form-control p-3" type="text" placeholder="Nome" />
          <input
            className="form-control p-3"
            type="email"
            placeholder="E-mail"
          />
          <input className="form-control p-3" type="text" placeholder="Idade" />
          <button className="btn btn-success">
            {alunoId === "0" ? "Incluir" : "Atualizar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NovoAluno;
