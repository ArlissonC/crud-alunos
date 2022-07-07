import styles from "./NovoAluno.module.css";
import { UserPlus, ArrowUDownLeft } from "phosphor-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

const NovoAluno = () => {
  const { alunoId } = useParams();

  const [id, setId] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState(0);

  const Navigate = useNavigate();

  const token = localStorage.getItem("token");
  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (alunoId === "0") return;
    else loadAluno();
  }, [alunoId]);

  const loadAluno = async () => {
    try {
      const response = await api.get(`api/alunos/${alunoId}`, authorization);
      const { id, nome, email, idade } = response.data;

      setId(id);
      setNome(nome);
      setEmail(email);
      setIdade(idade);
    } catch (error) {
      Navigate("/alunos");
    }
  };

  const saveOrUpdate = async (e) => {
    e.preventDefault();

    const data = {
      nome,
      email,
      idade,
    };

    try {
      if (alunoId === "0") {
        await api.post("api/alunos", data, authorization);
      } else {
        data.id = id;
        await api.put(`api/alunos/${id}`, data, authorization);
      }
      Navigate("/alunos");
    } catch (error) {
      console.log(error);
    }
  };

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
        <form
          className="form-group w-50 d-flex flex-column gap-3"
          onSubmit={saveOrUpdate}
        >
          <input
            className="form-control p-3"
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            className="form-control p-3"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-control p-3"
            type="text"
            placeholder="Idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />
          <button className="btn btn-success">
            {alunoId === "0" ? "Incluir" : "Atualizar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NovoAluno;
