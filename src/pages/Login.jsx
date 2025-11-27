import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../pages/css/Login.css';

const Login = () => {
  const [documento, setDocumento] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  // Tema claro/escuro
  useEffect(() => {
    const themeChangeIcon = document.getElementById('themeChangeIcon');

    const applyTheme = (theme) => {
      if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        themeChangeIcon.classList.replace('fa-moon', 'fa-sun');
      } else {
        document.body.classList.remove('dark-theme');
        themeChangeIcon.classList.replace('fa-sun', 'fa-moon');
      }
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    const handleThemeChange = () => {
      let theme = 'light';
      if (document.body.classList.toggle('dark-theme')) {
        theme = 'dark';
        themeChangeIcon.classList.replace('fa-moon', 'fa-sun');
      } else {
        themeChangeIcon.classList.replace('fa-sun', 'fa-moon');
      }
      localStorage.setItem('theme', theme);
    };

    themeChangeIcon.addEventListener('click', handleThemeChange);

    return () => {
      themeChangeIcon.removeEventListener('click', handleThemeChange);
    };
  }, []);

  // Sem máscara — apenas salva o valor digitado
  const handleDocumentoChange = (e) => {
    setDocumento(e.target.value.replace(/\D/g, '')); // mantém só números
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const docLimpo = documento.replace(/\D/g, ''); // garante sem formatação
    const users = JSON.parse(localStorage.getItem('usuarios') || '[]');

    const user = users.find(
      (u) => u.documento === docLimpo && u.senha === senha
    );

    if (user) {
      alert(`Bem-vindo(a), ${user.nome}`);
      navigate('/dashboard');
    } else {
      alert("Documento ou senha incorretos!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleLogin}>
          
          <div className="theme-change">
            <i className="fa-solid fa-moon" id="themeChangeIcon"></i>
          </div>

          <div className="back-button">
            <Link to="/">
              <i className="fa-solid fa-arrow-left"></i>
            </Link>
          </div>

          <h2>Login</h2>

          <div className="input-group">
            <label>CPF ou CNPJ</label>
            <input
              type="text"
              value={documento}
              onChange={handleDocumentoChange}
              placeholder="Somente números"
              maxLength={14} // 11 CPF, 14 CNPJ
              required
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>

          <button type="submit">Entrar</button>

          <div className="register-link">
            <p>Ainda não tem conta?</p>
            <Link to="/cadastro">Cadastrar-se</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
