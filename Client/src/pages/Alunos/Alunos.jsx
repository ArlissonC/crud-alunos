import styles from "./Alunos.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import { Link, useNavigate } from "react-router-dom";
import { Trash, Pen, SignOut, User } from "phosphor-react";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Swal from "sweetalert2";

const Alunos = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filtro, setFiltro] = useState([]);

  const [alunos, setAlunos] = useState([]);

  console.log(alunos);

  const Navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const searchAlunos = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const dadosFiltrados = alunos.filter((i) => {
        return Object.values(i)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setFiltro(dadosFiltrados);
    } else {
      setFiltro(alunos);
    }
  };

  const getAlunos = () => {
    api.get("api/alunos", authorization).then((response) => {
      setAlunos(response.data);
      setLoading(false);
    }, token);
  };

  const editAluno = async (id) => {
    try {
      Navigate(`/aluno/novo/${id}`);
    } catch (error) {}
  };

  const deleteAluno = async (id) => {
    try {
      await Swal.fire({
        title: "Tem certeza?",
        text: "Esta ação não poderá ser desfeita!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, deletar!",
      }).then((result) => {
        if (result.isConfirmed) {
          api.delete(`api/alunos/${id}`, authorization);
          setAlunos(alunos.filter((aluno) => aluno.id != id));
          Swal.fire("Deletado!", "Aluno deletado com sucesso.", "success");
        }
      });
    } catch (error) {}
  };

  useEffect(() => {
    getAlunos();
  }, []);

  const logout = () => {
    localStorage.clear();
    localStorage.setItem("token", "");
    authorization.headers = "";
    Navigate("/");
  };

  return (
    <div className="container d-flex justify-content-center flex-column">
      <header>
        <div className="d-flex justify-content-around mt-5">
          <span>
            <User size={19} className="m-2" />
            Bem-vindo, <strong>{email}</strong>
          </span>
          <Link className="btn btn-success" to="/aluno/novo/0">
            <span>Novo Aluno</span>
          </Link>
          <button type="button" onClick={logout} className="btn">
            <SignOut size={22} />
          </button>
        </div>
      </header>
      <form className="form-group mt-5 mb-3">
        <input
          type="text"
          placeholder="Filtrar por nome"
          className="form-control"
          onChange={(e) => searchAlunos(e.target.value)}
        />
      </form>
      <h1>Relação de Alunos</h1>
      {loading && <p>Aguarde...</p>}
      <ul className="row justify-content-between mt-3 w-100">
        {alunos &&
          (searchInput.length > 1 ? filtro : alunos).map((aluno) => (
            <li key={aluno.id} className={`card mb-5 ${styles.card_width}`}>
              <div className="d-flex justify-content-between p-4">
                <div className="d-flex flex-column gap-3">
                  <b>
                    Nome: <b>{aluno.nome}</b>
                  </b>
                  <b>
                    E-mail: <b>{aluno.email}</b>
                  </b>
                  <b>
                    Idade: <b>{aluno.idade}</b>
                  </b>
                </div>
                <div className="d-flex flex-column gap-2">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => editAluno(aluno.id)}
                  >
                    <Pen size={24} />
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => deleteAluno(aluno.id)}
                  >
                    <Trash size={24} />
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Alunos;
