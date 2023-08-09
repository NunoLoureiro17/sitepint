import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../../App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useParams, useNavigate } from 'react-router-dom';

function BeneficiosDetalhes() {
  const { id } = useParams();
  const [beneficioDetalhes, setBeneficioDetalhes] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBeneficioDetalhes = async () => {
      try {
        const response = await fetch(`https://bacnkend.onrender.com/beneficios/get/${id}`);
        if (!response.ok) {
          console.log('Erro ao buscar benefício');
          return;
        }
        const data = await response.json();
        setBeneficioDetalhes(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBeneficioDetalhes();
  }, [id]);

  if (!beneficioDetalhes) {
    return <p>Carregando detalhes do benefício...</p>;
  }

  const { TITULO, DATAPUBLICACAO, DATAVALIDADE, IMAGEM, DESCRICAO } = beneficioDetalhes;

  const handleVoltar = () => {
    navigate(-1); // Navega para a página anterior
  };

  
  return (
    <Container>
      <br />
      <Row>
        <Col>
          <br />
          <Card>
            <Card.Body>
              <Card.Title>
                <br />
                <h2 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left', margin: '0 5%' }}>{TITULO}</h2>
                <p style={{ color: '#15659F', textAlign: 'right', fontSize: 'small', margin: '0 5%' }}>
                  {new Date(DATAPUBLICACAO).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
                <br />
              </Card.Title>
              <br />
              <p style={{ margin: '0 5%' }}>{DESCRICAO}</p>
              <p style={{ margin: '0 5%' }}>Data de Validade: {new Date(DATAVALIDADE).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p> {/* Exibe a data de validade */}
              <br />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <div className="d-flex justify-content-end">
        <Button variant="light" className="mr-2" onClick={handleVoltar}>Voltar</Button>&nbsp;
        <Button variant="primary" onClick={() => navigate(`/Beneficios/Editar/${beneficioDetalhes.IDBENEFICIO}`)} style={{ backgroundColor: '#15659F' }}>Editar</Button>
      </div>
    </Container>
  );
}

export default BeneficiosDetalhes;
