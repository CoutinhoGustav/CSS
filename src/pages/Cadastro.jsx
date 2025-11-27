import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../pages/css/Cadastro.css';

const Cadastro = () => {
  const [tipo, setTipo] = useState('pf');
  const [nome, setNome] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  // Máscara CPF/CNPJ
  const formatDocumento = (value) => {
    const cleaned = value.replace(/\D/g, "");

    if (tipo === "pf") {
      return cleaned
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      return cleaned
        .slice(0, 14)
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }
  };

  const handleDocumentoChange = (e) => {
    setCpfCnpj(formatDocumento(e.target.value));
  };

  const handleCadastro = (e) => {
    e.preventDefault();

    const cleaned = cpfCnpj.replace(/\D/g, "");

    const novoUsuario = {
      tipo,
      nome,
      documento: cleaned,
      senha,
    };

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.find((u) => u.documento === cleaned);
    if (existe) {
      alert("Documento já cadastrado!");
      return;
    }

    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");
    
    // 🔥 Redireciona imediatamente para o login
    navigate("/login");
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="back-button">
          <Link to="/login">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
        </div>

        <h2>Cadastrar Usuário</h2>

        <form onSubmit={handleCadastro}>

          <div className="input-group">
            <label>Tipo de Cadastro</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="pf">Pessoa Física</option>
              <option value="pj">Pessoa Jurídica</option>
            </select>
          </div>

          <div className="input-group">
            <label>Nome / Razão Social</label>
            <input
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>{tipo === 'pf' ? "CPF" : "CNPJ"}</label>
            <input
              type="text"
              value={cpfCnpj}
              onChange={handleDocumentoChange}
              maxLength={tipo === "pf" ? 14 : 18}
              required
              placeholder={tipo === "pf" ? "000.000.000-00" : "00.000.000/0000-00"}
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button type="submit">Cadastrar</button>

        </form>
      </div>
    </div>
  );
};

export default Cadastro;
