import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function DetalhesInteracaoNegocio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interacaoDetalhes, setInteracaoDetalhes] = useState(null);
  const [negocioDetalhes, setNegocioDetalhes] = useState(null);
  const [tipoContatoDetalhes, setTipoContatoDetalhes] = useState(null);

  useEffect(() => {
    const fetchInteracao = async () => {
      try {
        const response = await axios.get(`https://bacnkend.onrender.com/interacoesnegocios/get/${id}`);
        setInteracaoDetalhes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchInteracao();
    }
  }, [id]);

  useEffect(() => {
    const fetchNegocioDetalhes = async () => {
      try {
        const response = await axios.get('https://bacnkend.onrender.com/negocios/list');
        const negocio = response.data.find(item => item.IDNEGOCIO === interacaoDetalhes?.IDNEGOCIO);
        setNegocioDetalhes(negocio);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTipoContatoDetalhes = async () => {
      try {
        const response = await axios.get('https://bacnkend.onrender.com/tipocontacto/list');
        const tipoContato = response.data.find(item => item.IDTIPOCONTACTO === interacaoDetalhes?.IDTIPOCONTACTO);
        setTipoContatoDetalhes(tipoContato);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNegocioDetalhes();
    fetchTipoContatoDetalhes();
  }, [interacaoDetalhes]);

  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <Container>
      <br />
      <br />
      {interacaoDetalhes && negocioDetalhes && tipoContatoDetalhes ? (
        <Row>
          <Col>
            <Card>
              <Card.Body style={{ margin: '0 5%' }}>
                <br />
                <Card.Title style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>
                    {interacaoDetalhes.TITULO}
                  </h2>
                  <p style={{ color: '#15659F', fontSize: 'small' }}>
                    {new Date(interacaoDetalhes.DATAHORA).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </Card.Title>
                <br />
                <p>Negócio: {negocioDetalhes.TITULO}</p>
                <p>Tipo de Contato: {tipoContatoDetalhes.NONMETIPOCONTACTO}</p>
                <p>Contato: {interacaoDetalhes.CONTACTO}</p>
                <p>Descrição: {interacaoDetalhes.DESCRICAO}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <p>Carregando detalhes da interação...</p>
      )}
      <br />
      <div className="d-flex justify-content-end">
        <Button variant="light" className="mr-2" onClick={handleVoltar}>
          Voltar
        </Button>
        &nbsp;
        {interacaoDetalhes && (
          <Link to={`/InteracoesNegocios/Editar/${id}`}>
            <Button variant="primary" style={{ backgroundColor: '#15659F' }}>
              Editar
            </Button>
          </Link>
        )}
      </div>
    </Container>
  );
}

export default DetalhesInteracaoNegocio;