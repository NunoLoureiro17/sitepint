import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function BeneficiosEditar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    IDUTILIZADOR: 2,
    IDUTILIZADORINTERNO:2 ,
    IDRECURSOSHUMANOS: 1,
    IDCATEGORIABENEFICIO: '',
    TITULO: '',
    DATAPUBLICACAO: '',
    DATAVALIDADE: '',
    IMAGEM: 'semimagem',
    DESCRICAO: '',
  });

  const [categoriasBeneficio, setCategoriasBeneficio] = useState([]);

  useEffect(() => {
    axios.get(`https://bacnkend.onrender.com/beneficios/get/${id}`)
      .then((response) => {
        const beneficioData = response.data;
        setFormData(beneficioData);
      })
      .catch((error) => {
        console.log('Error fetching beneficio details:', error);
      });

    axios.get(`https://bacnkend.onrender.com/categoriabeneficios/list`)
      .then((response) => {
        const categoriasBeneficioData = response.data;
        setCategoriasBeneficio(categoriasBeneficioData);
      })
      .catch((error) => {
        console.log('Error fetching categorias beneficio:', error);
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

    axios.put(`https://bacnkend.onrender.com/beneficios/update/${id}`, formData)
      .then((response) => {
        console.log('Beneficio updated successfully:', response.data);
        navigate(-1);
      })
      .catch((error) => {
        console.log('Error updating beneficio:', error);
      });
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <Container style={{ fontWeight: 'bold', textAlign: 'left' }}>
      <br /><br />
      <div className="beneficio-criar">
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Editar Benefício</h1>
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
              <Form.Group controlId="formCategoriaBeneficio">
                <Form.Label className="label-left">Categoria do Benefício</Form.Label>
                <Form.Control
                  as="select"
                  name="IDCATEGORIABENEFICIO"
                  value={formData.IDCATEGORIABENEFICIO}
                  onChange={handleChange}
                >
                  <option value="">Selecione a categoria do benefício</option>
                  {categoriasBeneficio.map((categoriaBeneficio) => (
                    <option key={categoriaBeneficio.IDCATEGORIABENEFICIO} value={categoriaBeneficio.IDCATEGORIABENEFICIO}>
                      {categoriaBeneficio.NOMECATEGORIA}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <br />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formDataPublicacao">
                <Form.Label className="label-left">Data de Publicação</Form.Label>
                <Form.Control
                  type="date"
                  name="DATAPUBLICACAO"
                  value={formData.DATAPUBLICACAO}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formDataValidade">
                <Form.Label className="label-left">Data de Validade</Form.Label>
                <Form.Control
                  type="date"
                  name="DATAVALIDADE"
                  value={formData.DATAVALIDADE}
                  onChange={handleChange}
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
              />
            </Form.Group>
          </Col>
          <br />
          <Button variant="light" className="mr-2" onClick={handleVoltar}>Voltar</Button>&nbsp;
          <Button variant="primary" type="submit" style={{ backgroundColor: '#15659F' }}>Atualizar Benefício</Button>
        </Form>
      </div>
    </Container>
  );
}

export default BeneficiosEditar;
