import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginButton from './Botaologin';
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

function RegistoGoogle() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefone, setTelefone] = useState('');
  const navigate = useNavigate();

  function handleRegisto(e) {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      console.log('Utilizador não autenticado');
      return;
    }

    const novoUtilizador = {
      IDTIPOUTILIZADOR: 6, // ID do tipo de utilizador externo
      NOME: nome,
      CONTACTO: telefone,
      EMAIL: user.email,
      PASSWORD: ''
    };

    axios.post('https://bacnkend.onrender.com/utilizadores/create', novoUtilizador)
      .then(response => {
        const utilizadorCriado = response.data;
        console.log(utilizadorCriado);
        localStorage.setItem('user', JSON.stringify(utilizadorCriado));
        navigate('/');
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div className='Registo' style={{ margin: 'auto', width: '500px' }}>
      <br /><br /><br />
      <p className="titulo" style={{ fontSize: '40px' }}>Bem-vindo(a)!</p>
      <br />
      <div>
        <p style={{ textAlign: 'left' }}>Nome:</p>
        <input
          type="text"
          placeholder="Nome"
          style={{ width: '100%', marginBottom: '10px' }}
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
      </div>
      <br />
      <div>
        <p style={{ textAlign: 'left' }}>Número de Telemóvel:</p>
        <input
          type="tel"
          placeholder="Número de Telemóvel"
          style={{ width: '100%', marginBottom: '10px' }}
          value={telefone}
          onChange={e => setTelefone(e.target.value)}
        />
      </div>
      <br />
      <div>
        <button className="btn btn-primary" onClick={handleRegisto} style={{ backgroundColor: '#15659F' }}>Continuar</button>&nbsp;
      </div>
    </div>
  );
}


export default RegistoGoogle;