import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

function CriarRecomendacao() {
  const navigate = useNavigate();
  const { id } = useParams();
  const userData = JSON.parse(localStorage.getItem('user'));
  const userId = userData.IDUTILIZADOR;

  const [formData, setFormData] = useState({
    NOMERECOMENDADO: '',
    EMAILRECOMENDADO: '',
    CONTACTORECOMENDADO: '',
    MENSAGEM: '',
    IDVAGA: id,
    IDUTILIZADOR: userId,
  });

  useEffect(() => {
    const fetchVaga = async () => {
      try {
        const response = await axios.get(`https://bacnkend.onrender.com/vaga/${id}`);
        const data = response.data;
        setFormData((prevData) => ({
          ...prevData,
          VAGA: data.NOMEVAGA,
        }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchVaga();
  }, [id]);

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
      await axios.post('https://bacnkend.onrender.com/recomendacao/create', formData);
      navigate('/ListaRecomendacoes/Vaga/'+id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container style={{ fontWeight: 'bold', textAlign: 'left' }}>
      <br />
      <br />
      <div className="criar-recomendacao">
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Criar Recomendação</h1>
        <Form onSubmit={handleSubmit}>
          <br />
          <br />
          <Row>
            <Col md={6}>
              <Form.Group controlId="formVaga">
                <Form.Label className="label-left">Vaga</Form.Label>
                <Form.Control
                  type="text"
                  name="VAGA"
                  value={formData.IDVAGA}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formNomeRecomendado">
                <Form.Label className="label-left">Nome do Recomendado</Form.Label>
                <Form.Control
                  type="text"
                  name="NOMERECOMENDADO"
                  value={formData.NOMERECOMENDADO}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <br />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formEmailRecomendado">
                <Form.Label className="label-left">E-mail do Recomendado</Form.Label>
                <Form.Control
                  type="email"
                  name="EMAILRECOMENDADO"
                  value={formData.EMAILRECOMENDADO}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <br />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formContactoRecomendado">
                <Form.Label className="label-left">Contacto do Recomendado</Form.Label>
                <Form.Control
                  type="tel"
                  name="CONTACTORECOMENDADO"
                  value={formData.CONTACTORECOMENDADO}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <br />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formMensagem">
                <Form.Label className="label-left">Mensagem</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="MENSAGEM"
                  value={formData.MENSAGEM}
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
          </Button>&nbsp;
          <Button variant="primary" type="submit" style={{ backgroundColor: '#15659F' }}>
            Criar Recomendação
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default CriarRecomendacao;
