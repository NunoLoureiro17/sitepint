import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditarInteracaoOportunidade() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interacaoDetalhes, setInteracaoDetalhes] = useState(null);
  const [tipoContatos, setTipoContatos] = useState([]);

  const [formData, setFormData] = useState({
    TITULO: '',
    DESCRICAO: '',
    DATAHORA: '',
    CONTACTO: 2222 , 
    IDTIPOCONTATO: '',
  });

  useEffect(() => {
    axios
      .get(`https://bacnkend.onrender.com/interacoesoportunidades/get/${id}`)
      .then((response) => {
        const interacaoData = response.data;
        setInteracaoDetalhes(interacaoData);
        setFormData({
          TITULO: interacaoData.TITULO,
          DESCRICAO: interacaoData.DESCRICAO,
          DATAHORA: interacaoData.DATAHORA,
          CONTACTO: interacaoData.CONTACTO,
          IDTIPOCONTATO: interacaoData.IDTIPOCONTACTO,
        });
      })
      .catch((error) => {
        console.log('Error fetching interacao details:', error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get('https://bacnkend.onrender.com/tipocontacto/list')
      .then((response) => {
        setTipoContatos(response.data);
      })
      .catch((error) => {
        console.log('Error fetching tipo de contato:', error);
      });
  }, []);

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
      .put(`https://bacnkend.onrender.com/interacoesoportunidades/update/${id}`, formData)
      .then((response) => {
        console.log('Interacao updated successfully:', response.data);
        handleVoltar();
      })
      .catch((error) => {
        console.log('Error updating interacao:', error);
      });
  };

  return (
    <Container style={{ fontWeight: 'bold', textAlign: 'left' }}>
      <br />
      <br />
      <div className="interacao-editar">
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Editar Interação de Oportunidade</h1>
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
            <Col md={6}>
              <Form.Group controlId="formTipoContato">
                <Form.Label className="label-left">Tipo de Contato</Form.Label>
                <Form.Control
                  as="select"
                  name="IDTIPOCONTATO"
                  value={formData.IDTIPOCONTATO}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  {tipoContatos.map((tipoContato) => (
                    <option key={tipoContato.IDTIPOCONTACTO} value={tipoContato.IDTIPOCONTACTO}>
                      {tipoContato.NONMETIPOCONTACTO}
                    </option>
                  ))}
                </Form.Control>
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
              <Form.Group controlId="formContato">
                <Form.Label className="label-left">Contato</Form.Label>
                <Form.Control
                  type="text"
                  name="CONTACTO"
                  value={formData.CONTACTO}
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

          <div className="d-flex justify-content-end">
            <Button variant="light" className="mr-2" onClick={handleVoltar}>
              Voltar
            </Button>&nbsp;
            <Button variant="primary" type="submit" style={{ backgroundColor: '#15659F' }}>
              Atualizar Interação
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default EditarInteracaoOportunidade;
