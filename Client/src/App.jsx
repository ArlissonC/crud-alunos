import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { NotePencil, Trash, Pen } from "phosphor-react";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function App() {
  const baseUrl = "https://localhost:5001/api/alunos";

  const [data, setData] = useState();
  const [updateData, setUpdateData] = useState(true);
  const [selectedStudentObj, setSelectedStudent] = useState({
    id: "",
    nome: "",
    email: "",
    idade: "",
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const [showModal, setShowModal] = useState(false);
  const openCloseModalInclude = () => {
    setShowModal(!showModal);
  };
  const [showModalEdit, setShowModalEdit] = useState(false);
  const openCloseModalEdit = () => {
    setShowModalEdit(!showModalEdit);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedStudent({
      ...selectedStudentObj,
      [name]: value,
    });
  };

  const listStudents = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    listStudents();
    setUpdateData(false);
  }, [updateData]);

  const addStudent = async () => {
    delete selectedStudentObj.id;
    selectedStudentObj.idade = parseInt(selectedStudentObj.idade);
    await axios
      .post(baseUrl, selectedStudentObj)
      .then((response) => {
        setUpdateData(true);
        openCloseModalInclude();
        Toast.fire({
          icon: "success",
          title: "Aluno adicionado!",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectedStudent = (id) => {
    const edit = data.filter((s) => s.id === id)[0];
    setSelectedStudent(edit);
    openCloseModalEdit();
  };

  const editStudent = async () => {
    selectedStudentObj.idade = parseInt(selectedStudentObj.idade);
    await axios
      .put(`${baseUrl}/${selectedStudentObj.id}`, selectedStudentObj)
      .then((response) => {
        setUpdateData(true);
        openCloseModalEdit();
        Toast.fire({
          icon: "success",
          title: "Aluno editado!",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteStudent = async (id) => {
    await Swal.fire({
      title: "Excluir Aluno?",
      text: "Esta ação não poderá ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${baseUrl}/${id}`)
            .then((response) => {
              setUpdateData(true);
            })
            .catch((error) => {
              console.log(error);
            });
          Swal.fire("Excluído!", "Aluno excluído.", "success");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App container pt-5">
      <h3>Cadastro de Alunos</h3>
      <header>
        <button
          className="btn btn-success d-flex gap-2  align-items-center mb-5"
          onClick={openCloseModalInclude}
        >
          <NotePencil size={26} />
          Incluir novo aluno
        </button>
      </header>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Idade</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.id}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.email}</td>
                <td>{aluno.idade}</td>
                <td>
                  <div className="d-flex justify-content-center gap-3">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => selectedStudent(aluno.id)}
                    >
                      <Pen size={20} />
                      <span className="p-1">Editar</span>
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => deleteStudent(aluno.id)}
                    >
                      <Trash size={20} />
                      <span className="p-1">Excluir</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal isOpen={showModal}>
        <ModalHeader>Incluir Alunos</ModalHeader>
        <ModalBody>
          <div className="form-group d-flex flex-column gap-3">
            <label>
              <span>Nome:</span>
              <input
                type="text"
                name="nome"
                className="form-control"
                onChange={handleChange}
              />
            </label>
            <label>
              <span>E-mail:</span>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={handleChange}
              />
            </label>
            <label>
              <span>Idade:</span>
              <input
                type="text"
                name="idade"
                className="form-control"
                onChange={handleChange}
              />
            </label>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={addStudent}>
            Incluir
          </button>
          <button className="btn btn-primary" onClick={openCloseModalInclude}>
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      {/* Modal Editar */}
      <Modal isOpen={showModalEdit}>
        <ModalHeader>Editar Alunos</ModalHeader>
        <ModalBody>
          <div className="form-group d-flex flex-column gap-3">
            <label>
              <span>ID:</span>
              <input
                type="text"
                className="form-control"
                readOnly
                value={selectedStudentObj && selectedStudentObj.id}
              />
            </label>
            <label>
              <span>Nome:</span>
              <input
                type="text"
                name="nome"
                className="form-control"
                onChange={handleChange}
                value={selectedStudentObj && selectedStudentObj.nome}
              />
            </label>
            <label>
              <span>E-mail:</span>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={handleChange}
                value={selectedStudentObj && selectedStudentObj.email}
              />
            </label>
            <label>
              <span>Idade:</span>
              <input
                type="text"
                name="idade"
                className="form-control"
                onChange={handleChange}
                value={selectedStudentObj && selectedStudentObj.idade}
              />
            </label>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={editStudent}>
            Editar
          </button>
          <button className="btn btn-primary" onClick={openCloseModalEdit}>
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
