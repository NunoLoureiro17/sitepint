import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import { getAuth, reauthenticateWithCredential, updatePassword, EmailAuthProvider, signOut } from 'firebase/auth';

function AlterarPassword() {
  const [passwordAntiga, setPasswordAntiga] = useState('');
  const [novaPassword, setNovaPassword] = useState('');
  const [erroPasswordAntiga, setErroPasswordAntiga] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'PASSWORD_ANTIGA') {
      setPasswordAntiga(value);
    } else if (name === 'NOVA_PASSWORD') {
      setNovaPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
        console.log('Utilizador não autenticado');
        return;
    }
    const credential = EmailAuthProvider.credential(user.email, passwordAntiga);
    reauthenticateWithCredential(user, credential)
        .then(() => {
            updatePassword(user, novaPassword)
              .then(() => {
                console.log('Password alterada com sucesso!');
                const auth = getAuth();

                try {
                  signOut(auth);
                  console.log('Logout realizado com sucesso');
              
                  localStorage.clear();
                  navigate('/Login');
                } catch (error) {
                  console.log('Erro ao fazer logout:', error);
                }
              })
              .catch((error) => {
                console.log('Erro ao alterar a password:', error);
                setErroPasswordAntiga('Verifique a nova password!');
              });
        })
        .catch((error) => {
            console.log('Erro ao reautenticar:', error);
            if (error.code === 'auth/wrong-password') {
              setErroPasswordAntiga('A password antiga está incorreta!');
            }
        });
  };

  const handleCancelar = () => {
    navigate('/Perfil'); 
  };

  return (
    <Container style={{ fontWeight: 'bold', textAlign: 'left' }}>
      <br />
      <br />
      <div className="alterar-password">
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Alterar Password</h1>
        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formPasswordAntiga">
            <Form.Label className="label-left">Password Antiga</Form.Label>
            <Form.Control
              type="password"
              name="PASSWORD_ANTIGA"
              value={passwordAntiga}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formNovaPassword">
            <Form.Label className="label-left">Nova Password (mín. 6 caracteres)</Form.Label>
            <Form.Control
              type="password"
              name="NOVA_PASSWORD"
              value={novaPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <br />
          {erroPasswordAntiga && <p style={{ color: 'red' }}>{erroPasswordAntiga}</p>}
          <Button variant="light" className="mr-2" onClick={handleCancelar}>
            Cancelar
          </Button>&nbsp;
          <Button variant="primary" type="submit" style={{ backgroundColor: '#15659F' }}>
            Alterar Password
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default AlterarPassword;