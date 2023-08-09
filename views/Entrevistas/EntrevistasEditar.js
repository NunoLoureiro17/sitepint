import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditarEntrevista() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [entrevistaDetalhes, setEntrevistaDetalhes] = useState(null);
  const [formData, setFormData] = useState({
    TITULO: '',
    DESCRICAO: '',
    DATAHORA: '',
    LOCAL: '',
    NOTAS: '',
  });

  useEffect(() => {
    axios
      .get(`https://bacnkend.onrender.com/Entrevista/get/${id}`)
      .then((response) => {
        const entrevistaData = response.data;
        setEntrevistaDetalhes(entrevistaData);
        setFormData({
          TITULO: entrevistaData.TITULO,
          DESCRICAO: entrevistaData.DESCRICAO,
          DATAHORA: entrevistaData.DATAHORA,
          LOCAL: entrevistaData.LOCAL,
          NOTAS: entrevistaData.NOTAS || '',
        });
      })
      .catch((error) => {
        console.log('Error fetching entrevista details:', error);
      });
  }, [id]);

  const handleVoltar = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`https://bacnkend.onrender.com/Entrevista/update/${id}`, formData)
      .then((response) => {
        console.log('Entrevista updated successfully:', response.data);
        handleVoltar();
      })
      .catch((error) => {
        console.log('Error updating entrevista:', error);
      });
  };

  return (
    <Container style={{ fontWeight: 'bold', textAlign: 'left' }}>
      <br />
      <br />
      <div className="entrevista-editar">
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Editar Entrevista</h1>
        <Form onSubmit={handleSubmit}>
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
                />
              </Form.Group>
              <br />
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
                />
              </Form.Group>
              <br />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formDataHora">
                <Form.Label className="label-left">Data e Hora</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="DATAHORA"
                  value={formData.DATAHORA}
                  onChange={handleChange}
                />
              </Form.Group>
              <br />
            </Col>
            <Col md={6}>
              <Form.Group controlId="formLocal">
                <Form.Label className="label-left">Local</Form.Label>
                <Form.Control
                  type="text"
                  name="LOCAL"
                  value={formData.LOCAL}
                  onChange={handleChange}
                />
              </Form.Group>
              <br />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formNotas">
                <Form.Label className="label-left">Notas</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="NOTAS"
                  value={formData.NOTAS}
                  onChange={handleChange}
                />
              </Form.Group>
              <br />
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            <Button variant="light" className="mr-2" onClick={handleVoltar}>
              Voltar
            </Button>&nbsp;
            <Button variant="primary" type="submit" style={{ backgroundColor: '#15659F' }}>
              Atualizar Entrevista
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default EditarEntrevista;
