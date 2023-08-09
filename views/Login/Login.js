import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginButton from './Botaologin';
import { auth } from '../../firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

function getUserByEmail(email) {
  return axios.get(`https://bacnkend.onrender.com/utilizadores/getemail/${email}`)
    .then(response => {
      const user = response.data;
      console.log(user);

      return user;
    })
    .catch(error => {
      console.error(error);
      return null;
    });
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (user.emailVerified) {
          getUserByEmail(user.email)
            .then((user) => {
              console.log(user);
              localStorage.setItem('user', JSON.stringify(user));
              navigate('/');
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          setError('Verifique o seu email antes de fazer login!');
        }
      })
      .catch((error) => {
        console.log(error);
        setError('As credenciais inseridas são inválidas!');
      });
  }

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      getUserByEmail(user.email)
        .then((user) => {
          if (user) {
            console.log(user);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
          }
          else {
            navigate('/RegistoGoogle');
          }
        })
        .catch((error) => {
          console.error(error);
        });

    } catch (error) {
      console.log(error);
    }
  };


  function handleForgotPassword() {
    navigate('/RecuperarConta');
  }

  return (
    <div className="Login">
      <br /><br /><br /><br /><br /><br />
      <p className="titulo" style={{ fontSize: '40px' }}>Bem-vindo(a)!</p>
      <br />
      <div>
        <p style={{ textAlign: 'left' }}>Email:</p>
        <input
          type="text"
          placeholder="Email"
          style={{ width: '100%' }}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <br />
      <div>

        <div style={{ textAlign: 'left' }}>
          <p>Palavra-Passe:</p>

          <input
            type="password"
            placeholder="Palavra-Passe"
            style={{ width: '100%' }}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div style={{ textAlign: 'left', fontSize: 'small' }}>
          <a href="" onClick={handleForgotPassword}>
            Esqueceu-se da palavra-passe?
          </a>
        </div>
      </div>
      <br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <br />
      <div>
        <button className="btn btn-primary" onClick={handleLogin} style={{ backgroundColor: '#15659F' }}>
          Login
        </button>
        &nbsp;
        <a href="Registo">Ainda não tem conta? Registe-se</a>
      </div>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button className="btn btn-secondary" style={{ backgroundColor: '#006AFF' }}>
          Login com o Facebook
        </button>
        <button className="btn btn-secondary" onClick={handleGoogleLogin} style={{ backgroundColor: '#DB4437' }}>
          Login com o Google
        </button>
      </div>
    </div>
  );
}

export default Login;
