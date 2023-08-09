import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

function CriarReuniao() {
  const navigate = useNavigate();
  const { idoportunidade } = useParams();

  const [formData, setFormData] = useState({
    IDOPORTUNIDADE: idoportunidade,
    IDUTILIZADOR: 1,
    TITULO: '',
    DESCRICAO: '',
    DATAHORA: '',
    LOCAL: '',
    DATACRIACAO: new Date().toISOString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedDataHora = new Date(formData.DATAHORA).toLocaleString('en-US', { timeZone: 'UTC' });

      await axios.post('https://bacnkend.onrender.com/reuniao/create', {
        ...formData,
        DATAHORA: formattedDataHora,
      });

      navigate(-1);
    } catch (error) {
      console.log('Error:', error.response.data);
      console.log('Status code:', error.response.status);
      console.log('Headers:', error.response.headers);
    }
  };

  return (
    <Container style={{ fontWeight: 'bold', textAlign: 'left' }}>
      <br />
      <br />
      <div className="criar-reuniao">
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Criar Reunião</h1>
        <Form onSubmit={handleSubmit}>
          <br />
          <br />
          <Row>
            <Col md={6}>
              <Form.Group controlId="formTitulo">
                <Form.Label className="label-left">Título</Form.Label>
                <Form.Control
                  type="text"
                  name="TITULO"
                  value={formData.TITULO}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formDataHora">
                <Form.Label className="label-left">Data e Hora</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="DATAHORA"
                  value={formData.DATAHORA}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formDescricao">
                <Form.Label className="label-left">Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="DESCRICAO"
                  value={formData.DESCRICAO}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formLocal">
                <Form.Label className="label-left">Local</Form.Label>
                <Form.Control
                  type="text"
                  name="LOCAL"
                  value={formData.LOCAL}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <br />
          <Button variant="light" className="mr-2" onClick={handleVoltar}>
            Voltar
          </Button>
          <Button variant="primary" type="submit" style={{ backgroundColor: '#15659F' }}>
            Criar Reunião
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default CriarReuniao;
