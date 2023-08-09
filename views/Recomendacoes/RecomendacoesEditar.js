import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditarRecomendacao() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recomendacaoDetalhes, setRecomendacaoDetalhes] = useState(null);
  const [formData, setFormData] = useState({
    NOMERECOMENDADO: '',
    EMAILRECOMENDADO: '',
    CONTACTORECOMENDADO: '',
    MENSAGEM: '',
  });

  useEffect(() => {
    axios
      .get(`https://bacnkend.onrender.com/recomendacao/get/${id}`)
      .then((response) => {
        const recomendacaoData = response.data;
        setRecomendacaoDetalhes(recomendacaoData);
        setFormData({
          NOMERECOMENDADO: recomendacaoData.NOMERECOMENDADO,
          EMAILRECOMENDADO: recomendacaoData.EMAILRECOMENDADO,
          CONTACTORECOMENDADO: recomendacaoData.CONTACTORECOMENDADO,
          MENSAGEM: recomendacaoData.MENSAGEM,
        });
      })
      .catch((error) => {
        console.log('Error fetching recomendacao details:', error);
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
      .put(`https://bacnkend.onrender.com/recomendacao/update/${id}`, formData)
      .then((response) => {
        console.log('Recomendacao updated successfully:', response.data);
        handleVoltar(-1);
      })
      .catch((error) => {
        console.log('Error updating recomendacao:', error);
      });
  };

  return (
    <Container style={{ fontWeight: 'bold', textAlign: 'left' }}>
      <br />
      <br />
      <div className="recomendacao-editar">
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Editar Recomendação</h1>
        <Form onSubmit={handleSubmit}>
          <br />
          <Row>
            <Col md={6}>
              <Form.Group controlId="formNomeRecomendado">
                <Form.Label className="label-left">Nome do Recomendado</Form.Label>
                <Form.Control
                  type="text"
                  name="NOMERECOMENDADO"
                  value={formData.NOMERECOMENDADO}
                  onChange={handleChange}
                />
              </Form.Group>
              <br />
            </Col>
            <Col md={6}>
              <Form.Group controlId="formEmailRecomendado">
                <Form.Label className="label-left">E-mail do Recomendado</Form.Label>
                <Form.Control
                  type="email"
                  name="EMAILRECOMENDADO"
                  value={formData.EMAILRECOMENDADO}
                  onChange={handleChange}
                />
              </Form.Group>
              <br />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formContatoRecomendado">
                <Form.Label className="label-left">Contato do Recomendado</Form.Label>
                <Form.Control
                  type="text"
                  name="CONTACTORECOMENDADO"
                  value={formData.CONTACTORECOMENDADO}
                  onChange={handleChange}
                />
              </Form.Group>
              <br />
            </Col>
          </Row>
          <Col md={6}>
            <Form.Group controlId="formMensagem">
              <Form.Label className="label-left">Mensagem</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="MENSAGEM"
                value={formData.MENSAGEM}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <br />
          <div className="d-flex justify-content-end">
            <Button variant="light" className="mr-2" onClick={handleVoltar}>
              Voltar
            </Button>&nbsp;
            <Button variant="primary" type="submit" style={{ backgroundColor: '#15659F' }}>
              Atualizar Recomendação
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default EditarRecomendacao;
