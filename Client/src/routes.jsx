import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Alunos from "./pages/Alunos/Alunos";
import NovoAluno from "./pages/NovoAluno/NovoAluno";

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/alunos" element={<Alunos />}></Route>
        <Route path="/aluno/novo/:alunoId" element={<NovoAluno />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
