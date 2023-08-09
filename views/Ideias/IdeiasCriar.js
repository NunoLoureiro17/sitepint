import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useHistory , useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';


function IdeiaCriar() {
  const userData = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    GES_IDUTILIZADOR: null,
    IDUTILIZADORINTERNO: null,
    IDGESTORIDEIAS: null,
    IDCATEGORIAIDEIA: '',
    IDAPROVACAO: 1,
    IDUTILIZADOR: 1,
    TITULO: '',
    DATA: new Date().toISOString().slice(0, 16),
    DESCRICAO: '',
    DOCUMENTO: null,
  });
  const [categoriaIdeias, setCategoriaIdeias] = useState([]);

  useEffect(() => {
    fetch('https://bacnkend.onrender.com/categoriaideias/list')
      .then(response => response.json())
      .then(data => setCategoriaIdeias(data))
      .catch(error => console.log(error));
  }, []);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDocumentoChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      DOCUMENTO: file,
    }));
  };


  const handleVoltar = () => {
    navigate(-1);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
 
    try {
      axios.post('https://bacnkend.onrender.com/ideias/create', formData);
      navigate('/Ideias');
    } catch (error) {
      console.log(error.response.data);
      console.log(error.message);
    }
  };

  return (
    <Container style={{ fontWeight: 'bold', textAlign: 'left' }}>
      <br /><br />
      <div className="ideia-criar">
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Criar Ideia</h1>
        <Form onSubmit={handleSubmit}>
          <br /><br />
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
              <br />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formIDCATEGORIAIDEIA">
                <Form.Label className="label-left">Categoria Ideia</Form.Label>
                <Form.Control
                  as="select"
                  name="IDCATEGORIAIDEIA"
                  value={formData.IDCATEGORIAIDEIA}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categoriaIdeias.map((categoriaIdeia) => (
                    <option key={categoriaIdeia.IDCATEGORIAIDEIA} value={categoriaIdeia.IDCATEGORIAIDEIA}>
                      {categoriaIdeia.NOMECATEGORIA}
                    </option>
                  ))}
                </Form.Control>
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
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={6}>
              <Form.Group controlId="formDocumento">
                <Form.Label className="label-left">Documento</Form.Label>
                <Form.Control
                  type="file"
                  name="DOCUMENTO"
                  onChange={handleDocumentoChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <br /><br />
          <Button variant="light" className="mr-2" onClick={handleVoltar}>Voltar</Button>&nbsp;
          <Button variant="primary" type="submit" style={{ backgroundColor: '#15659F' }} >Criar</Button>
        </Form>
      </div>
    </Container>
  );
}

export default IdeiaCriar;
