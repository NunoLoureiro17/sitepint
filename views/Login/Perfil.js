import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(null); // Variável de estado para armazenar o tipo de usuário
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = localStorage.getItem('user');
      const parsedUserData = JSON.parse(userData);
      setUsuario(parsedUserData);

      try {
        const response = await axios.get('https://bacnkend.onrender.com/tipoutilizadores/list');
        if (response.status !== 200) {
          console.log('Error fetching user types');
          return;
        }
        const userTypesData = response.data;
        const tipoUsuario = userTypesData.find((tipo) => tipo.IDTIPOUTILIZADOR === parsedUserData.IDTIPOUTILIZADOR);
        setTipoUsuario(tipoUsuario);
      } catch (error) {
        console.log('Error fetching user types:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!usuario || !tipoUsuario) {
    return <p>Carregando perfil...</p>;
  }

  const { IDUTILIZADOR, NOME, CONTACTO, EMAIL } = usuario;
  const { NOMETIPO } = tipoUsuario;

  const handleEditarPerfil = () => {
    navigate(`/Perfil/Editar`);
  };

  const handleAlterarPassword = () => {
    navigate(`/Perfil/AlterarPassword`);
  };

  const handleVoltar = () => {
    navigate('/');
  };

  return (
    <Container>
      <br />
      <br />
      <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Perfil</h1>
      <br />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>
                <h2 className="perfil-titulo">{NOME}</h2>
                <br />
              </Card.Title>
              <div className="perfil-dados">
                <p>ID do Utilizador: {IDUTILIZADOR}</p>
                <p>Tipo de Utilizador: {NOMETIPO}</p>
                <p>Nome: {NOME}</p>
                <p>Contacto: {CONTACTO}</p>
                <p>Email: {EMAIL}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <div className="d-flex justify-content-end">
        <Button variant="light" className="mr-2" onClick={handleVoltar}>
          Voltar
        </Button>&nbsp;
        <Button variant="primary" onClick={handleAlterarPassword} style={{ backgroundColor: '#15659F' }}>
          Alterar Password
        </Button>&nbsp;
        <Button variant="primary" onClick={handleEditarPerfil} style={{ backgroundColor: '#15659F' }}>
          Editar
        </Button>
      </div>
    </Container>
  );
}

export default Perfil;
