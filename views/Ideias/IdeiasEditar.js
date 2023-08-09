import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function IdeiasEditar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    TITULO: 'Ideia1',
    DESCRICAO: 'Descrição Ideia1',
    DATA: '2022-02-15T12:30:00.000Z',
    IDCATEGORIAIDEIA: '1',
    IDUTILIZADOR: '',
  });

  const [categoriasIdeia, setCategoriasIdeia] = useState([]);

  useEffect(() => {
    axios.get(`https://bacnkend.onrender.com/ideias/get/${id}`)
      .then((response) => {
        const ideiaData = response.data;
        setFormData(ideiaData);
      })
      .catch((error) => {
        console.log('Error fetching ideia details:', error);
      });

    axios.get(`https://bacnkend.onrender.com/categoriaideias/list`)
      .then((response) => {
        const categoriasIdeiaData = response.data;
        setCategoriasIdeia(categoriasIdeiaData);
      })
      .catch((error) => {
        console.log('Error fetching categorias ideia:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`https://bacnkend.onrender.com/ideias/update/${id}`, formData)
      .then((response) => {
        console.log('Ideia updated successfully:', response.data);
        navigate(`/Ideias/detalhes/${id}`);
      })
      .catch((error) => {
        console.log('Error updating ideia:', error);
      });
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <Container style={{ fontWeight: 'bold', textAlign: 'left' }}>
      <br /><br />
      <div className="ideia-editar">
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Editar Ideia</h1>
        <br />
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
                  required
                />
              </Form.Group>
              <br />
            </Col>
          </Row>
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
          <br />
          <Row>
            <Col md={6}>
              <Form.Group controlId="formData">
                <Form.Label className="label-left">Data</Form.Label>
                <Form.Control
                  type="date"
                  name="DATA"
                  value={formData.DATA}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <br />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formCategoriaIdeia">
                <Form.Label className="label-left">Categoria da Ideia</Form.Label>
                <Form.Control
                  as="select"
                  name="IDCATEGORIAIDEIA"
                  value={formData.IDCATEGORIAIDEIA}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione a categoria da ideia</option>
                  {categoriasIdeia.map((categoriaIdeia) => (
                    <option key={categoriaIdeia.IDCATEGORIAIDEIA} value={categoriaIdeia.IDCATEGORIAIDEIA}>
                      {categoriaIdeia.NOMECATEGORIA}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <br /><br />
            </Col>
          </Row>
          <Button variant="light" className="mr-2" onClick={handleVoltar}>Voltar</Button>&nbsp;
          <Button variant="primary" type="submit" style={{ backgroundColor: '#15659F' }}>Atualizar Ideia</Button>
        </Form>
      </div>
    </Container>
  );
}

export default IdeiasEditar;
