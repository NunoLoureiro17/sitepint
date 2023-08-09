import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {auth} from '../../firebase'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

function CriarUtilizador() {
  const navigate = useNavigate();
  const [emailEnviado, setEmailEnviado] = useState(false); // Estado para controlar se o email de verificação foi enviado
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    IDTIPOUTILIZADOR: '',
    NOME: '',
    CONTACTO: '',
    EMAIL: '',
    PASSWORD: '',
  });
  const [tiposUtilizador, setTiposUtilizador] = useState([]);

  useEffect(() => {
    const fetchTiposUtilizador = async () => {
      try {
        const response = await axios.get('https://bacnkend.onrender.com/tipoutilizadores/list');
        const data = response.data;
        setTiposUtilizador(data);
      } catch (error) {
        console.log('Error fetching user types:', error);
      }
    };

    fetchTiposUtilizador();
  }, []);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    setError('');
    setEmailEnviado('');
    e.preventDefault();

    try {
      createUserWithEmailAndPassword(auth, formData.EMAIL, formData.PASSWORD)
      .then((userCredential) => {
        
      console.log(userCredential)
      
      const user = userCredential.user;

      // Enviar email de verificação
      sendEmailVerification(user)
      .then(() => {
        setEmailEnviado(true); // Define o estado para indicar que o email de verificação foi enviado
        console.log('Email de verificação enviado');

        axios.post('https://bacnkend.onrender.com/utilizadores/create', formData);
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
    catch (error) {
      console.log('Error creating user:', error);
    }
  };

  return (
    <Container>
      <br /><br />
      <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Criar Utilizador</h1>
      <br />
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formNome">
          <Form.Label column sm={2}>
            Nome
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="NOME"
              value={formData.NOME}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>
        <br />
        <Form.Group as={Row} controlId="formContacto">
          <Form.Label column sm={2}>
            Contacto
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="CONTACTO"
              value={formData.CONTACTO}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>
        <br />
        <Form.Group as={Row} controlId="formEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              name="EMAIL"
              value={formData.EMAIL}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>
        <br />
        <Form.Group as={Row} controlId="formPassword">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              name="PASSWORD"
              value={formData.PASSWORD}
              onChange={handleChange}
              minLength={6}
              required
            />
          </Col>
        </Form.Group>
        <br />
        <Form.Group as={Row} controlId="formTipoUtilizador">
          <Form.Label column sm={2}>
            Tipo de Utilizador
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="select"
              name="IDTIPOUTILIZADOR"
              value={formData.IDTIPOUTILIZADOR}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um tipo</option>
              {tiposUtilizador.map((tipo) => (
                <option key={tipo.IDTIPOUTILIZADOR} value={tipo.IDTIPOUTILIZADOR}>
                  {tipo.NOMETIPO}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {emailEnviado && (
        <div>
          <p>Foi enviado um email de verificação!</p>
        </div>
        )}
        <Button variant="light" onClick={handleVoltar}>
          Voltar
        </Button>&nbsp;
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Criar
        </Button>
      </Form>
    </Container>
  );
}

export default CriarUtilizador;
