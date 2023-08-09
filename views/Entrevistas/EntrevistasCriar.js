import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

function CriarEntrevista() {
  const navigate = useNavigate();
  const { iduser, idcandidatura } = useParams();
  const userData = JSON.parse(localStorage.getItem('user'));

  const [formData, setFormData] = useState({
    IDCANDIDATURA: idcandidatura,
    IDUTILIZADOR: iduser,
    IDRECURSOSHUMANOS: null,
    REC_IDUTILIZADOR: userData.IDUTILIZADOR,
    IDPRIORIDADE: '',
    TITULO: '',
    DESCRICAO: '',
    DATAHORA : '',
    DATACRIACAO:'2023-04-16T09:00:00.000Z',
    LOCAL: '',
  });

  const [prioridades, setPrioridades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prioridadesResponse = await axios.get('https://bacnkend.onrender.com/prioridadeentrevista/list');
        setPrioridades(prioridadesResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
      const currentDateTime = new Date().toISOString().slice(0, 16);

      await axios.post('https://bacnkend.onrender.com/entrevista/create', formData);
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
      <div className="criar-entrevista">
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Criar Entrevista</h1>
        <Form onSubmit={handleSubmit}>
          <br />
          <br />
          <Row>
            <Col md={6}>
              <Form.Group controlId="formPrioridade">
                <Form.Label className="label-left">Prioridade</Form.Label>
                <Form.Control
                  as="select"
                  name="IDPRIORIDADE"
                  value={formData.IDPRIORIDADE}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione</option>
                  {prioridades.map((prioridade) => (
                    <option key={prioridade.IDPRIORIDADE} value={prioridade.IDPRIORIDADE}>
                      {prioridade.NOMEPRIORIDADE}
                    </option>
                  ))}
                </Form.Control>
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
          <Row>
            <Col md={12}>
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
          </Row>
          <br />
          <br />
          <Button variant="light" className="mr-2" onClick={handleVoltar}>
            Voltar
          </Button>&nbsp;
          <Button variant="primary" type="submit" style={{ backgroundColor: '#15659F' }}>
            Criar Entrevista
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default CriarEntrevista;
