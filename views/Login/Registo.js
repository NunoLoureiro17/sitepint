import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginButton from './Botaologin';
import {auth} from '../../firebase'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

function Registo() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefone, setTelefone] = useState('');
  const navigate = useNavigate();
  const [emailEnviado, setEmailEnviado] = useState(false); // Estado para controlar se o email de verificação foi enviado
  const [error, setError] = useState('');

  function handleRegisto(e) {
    setError('');
    setEmailEnviado('');
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential)
      
      const user = userCredential.user;

      // Enviar email de verificação
      sendEmailVerification(user)
        .then(() => {
          setEmailEnviado(true); // Define o estado para indicar que o email de verificação foi enviado
          console.log('Email de verificação enviado');

          const novoUtilizador = {
            IDTIPOUTILIZADOR: 6, // ID do tipo de utilizador externo
            NOME: nome,
            CONTACTO: telefone,
            EMAIL: email,
            PASSWORD: ''
          };
    
          axios.post('https://bacnkend.onrender.com/utilizadores/create', novoUtilizador)
            .then(response => {
              const utilizadorCriado = response.data;
              console.log(utilizadorCriado);
            })
            .catch(error => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.log('Erro ao enviar email de verificação:', error);
        });
    })
    .catch((error) => {
      console.log(error)
      setError('Erro! Email ou palavra passe inválidos!');
    })
  }

  return (
    <div className='Registo' style={{ margin: 'auto', width: '500px' }}>
      <br /><br /><br />
      <p className="titulo" style={{ fontSize: '40px' }}>Registo</p>
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
        <p style={{ textAlign: 'left' }}>Email:</p>
        <input
          type="email"
          placeholder="Email"
          style={{ width: '100%', marginBottom: '10px' }}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <br />
      <div>
        <p style={{ textAlign: 'left' }}>Palavra-Passe (mín. 6 caracteres):</p>
        <input
          type="password"
          placeholder="Palavra-Passe"
          style={{ width: '100%', marginBottom: '10px' }}
          value={password}
          onChange={e => setPassword(e.target.value)}
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
          
      {emailEnviado && (
        <div>
          <p>Foi enviado um email de verificação! <a href="Login">Fazer Login</a></p>
        </div>
      )}
      
      <div>
        <button className="btn btn-primary" onClick={handleRegisto} style={{ backgroundColor: '#15659F'}}>Registar</button>&nbsp;
        <a href="Login">Já tem conta? Faça Login.</a>
      </div>
    </div>
  );
}


export default Registo;
