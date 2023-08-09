import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function DetalhesReunioes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reuniaoDetalhes, setReuniaoDetalhes] = useState(null);

  useEffect(() => {
    const fetchReuniao = async () => {
      try {
        const response = await axios.get(`https://bacnkend.onrender.com/reuniao/get/${id}`);
        setReuniaoDetalhes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchReuniao();
    }
  }, [id]);

  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <Container>
      <br />
      <br />
      {reuniaoDetalhes ? (
        <Row>
          <Col>
            <Card>
              <Card.Body style={{ margin: '0 5%' }}>
                <div className="d-flex justify-content-between">
                  <h2 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>
                    {reuniaoDetalhes.TITULO}
                  </h2>
                  <p style={{ color: '#15659F', fontSize: 'small' }}>
                    {new Date(reuniaoDetalhes.DATACRIACAO).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <br />
                <p>Descrição: {reuniaoDetalhes.DESCRICAO}</p>
                <p>Data e Hora: {new Date(reuniaoDetalhes.DATAHORA).toLocaleString()}</p>
                <p>Local: {reuniaoDetalhes.LOCAL}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <p>Carregando detalhes da reunião...</p>
      )}
      <br />
      <div className="d-flex justify-content-end">
        <Button variant="light" className="mr-2" onClick={handleVoltar}>
          Voltar
        </Button>
        &nbsp;
        {reuniaoDetalhes && (
          <Link to={`/Reunioes/Editar/${id}`}>
            <Button variant="primary" style={{ backgroundColor: '#15659F' }}>
              Editar
            </Button>
          </Link>
        )}
      </div>
    </Container>
  );
}

export default DetalhesReunioes;
