import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

function CriarInteracaoNegocio() {
  const navigate = useNavigate();
  const { idnegocio } = useParams();

  const [formData, setFormData] = useState({
    IDNEGOCIO: idnegocio,
    IDTIPOCONTACTO: '',
    TITULO: '',
    CONTACTO: '',
    DATAHORA: '',
    DESCRICAO: '',
  });

  const [tiposContacto, setTiposContacto] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tiposContactoResponse = await axios.get('https://bacnkend.onrender.com/tipocontacto/list');
        setTiposContacto(tiposContactoResponse.data);
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
      const formattedDataHora = new Date(formData.DATAHORA).toISOString();

      await axios.post('https://bacnkend.onrender.com/interacoesnegocios/create', {
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
      <div className="criar-interacao-negocio">
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Criar Interação de Negócio</h1>
        <Form onSubmit={handleSubmit}>
          <br />
          <br />
          <Row>
            <Col md={6}>
              <Form.Group controlId="formTipoContacto">
                <Form.Label className="label-left">Tipo de Contato</Form.Label>
                <Form.Control
                  as="select"
                  name="IDTIPOCONTACTO"
                  value={formData.IDTIPOCONTACTO}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione</option>
                  {tiposContacto.map((tipo) => (
                    <option key={tipo.IDTIPOCONTACTO} value={tipo.IDTIPOCONTACTO}>
                      {tipo.NONMETIPOCONTACTO}
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
              <Form.Group controlId="formContacto">
                <Form.Label className="label-left">Contato</Form.Label>
                <Form.Control
                  name="CONTACTO"
                  value={formData.CONTACTO}
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
            Criar Interação
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default CriarInteracaoNegocio;
