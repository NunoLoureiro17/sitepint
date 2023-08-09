import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function DetalhesEntrevista() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entrevistaDetalhes, setEntrevistaDetalhes] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchEntrevista = async () => {
      try {
        const response = await axios.get(`https://bacnkend.onrender.com/Entrevista/get/${id}`);
        setEntrevistaDetalhes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('https://bacnkend.onrender.com/Utilizadores/list');
        setUserDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEntrevista();
    fetchUserDetails();
  }, [id]);

  const handleVoltar = () => {
    navigate(-1);
  };

  const getUserDetails = () => {
    if (entrevistaDetalhes && userDetails) {
      const userId = entrevistaDetalhes.IDUTILIZADOR;
      const user = userDetails.find((user) => user.IDUTILIZADOR === userId);
      return user;
    }
    return null;
  };

  const user = getUserDetails();

  return (
    <Container>
      <br />
      <br />
      {entrevistaDetalhes && user ? (
        <Row>
          <Col>
            <Card>
              <Card.Body style={{ margin: '0 5%' }}>
                <br />
                <Card.Title style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>
                    {entrevistaDetalhes.TITULO}
                  </h2>
                  <p style={{ color: '#15659F', fontSize: 'small' }}>
                    {new Date(entrevistaDetalhes.DATACRIACAO).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </Card.Title>
                <br />
                <p>Nome: {user.NOME}</p>
                <p>Email: {user.EMAIL}</p>
                <p>Data Marcada: {new Date(entrevistaDetalhes.DATAHORA).toLocaleString()}</p>
                <p>Local: {entrevistaDetalhes.LOCAL}</p>
                <p>Descrição: {entrevistaDetalhes.DESCRICAO}</p>
                <p>Notas: {entrevistaDetalhes.NOTAS ? entrevistaDetalhes.NOTAS : 'N/A'}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <p>Carregando detalhes da entrevista...</p>
      )}
      <br />
      <div className="d-flex justify-content-end">
        <Button variant="light" className="mr-2" onClick={handleVoltar}>
          Voltar
        </Button>
        &nbsp;
        {entrevistaDetalhes && (
          <Link to={`/Entrevista/Editar/${id}`}>
            <Button variant="primary" style={{ backgroundColor: '#15659F' }}>
              Editar
            </Button>
          </Link>
        )}
      </div>
    </Container>
  );
}

export default DetalhesEntrevista;
