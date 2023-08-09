import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function DetalhesRecomendacao() {
  const { id } = useParams();
  const [recomendacaoDetalhes, setRecomendacaoDetalhes] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecomendacao = async () => {
      try {
        const response = await axios.get(`https://bacnkend.onrender.com/recomendacao/get/${id}`);
        setRecomendacaoDetalhes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecomendacao();
  }, [id]);

  const handleVoltar = () => {
    navigate(-1); // Navega para a página anterior
  };

  return (
    <Container>
      <br />
      <br />
      <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Detalhes da Recomendação</h1>
      <br />
      <br />
      {recomendacaoDetalhes ? (
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <p style={{ fontWeight: 'bold' , fontSize: 'Large'}}>{recomendacaoDetalhes.NOMERECOMENDADO}</p>
                <p>E-mail: {recomendacaoDetalhes.EMAILRECOMENDADO}</p>
                <p>Contacto: {recomendacaoDetalhes.CONTACTORECOMENDADO}</p>
                <p>Mensagem: {recomendacaoDetalhes.MENSAGEM}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <p>Carregando detalhes da recomendação...</p>
      )}
      <br />
      <div className="d-flex justify-content-end">
        <Button variant="light" className="mr-2" onClick={handleVoltar}>
          Voltar
        </Button>
        &nbsp;
        <Link to={`/EditarRecomendacao/${id}`}>
          <Button variant="primary" style={{ backgroundColor: '#15659F' }}>
            Editar
          </Button>&nbsp;
        </Link>
      </div>
    </Container>
  );
}

export default DetalhesRecomendacao;
