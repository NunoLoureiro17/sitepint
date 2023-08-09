import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

function CriarBeneficios() {
  const navigate = useNavigate();
  const { idnegocio } = useParams();

  const [formData, setFormData] = useState({
    IDUTILIZADOR: 2,
    IDUTILIZADORINTERNO: 2,
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
    const fetchData = async () => {
      try {
        const categoriasBeneficioResponse = await axios.get('https://bacnkend.onrender.com/categoriabeneficios/list');
        setCategoriasBeneficio(categoriasBeneficioResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const existingBeneficio = await axios.get('https://bacnkend.onrender.com/beneficios', {
      params: {
        IDBENEFICIO: formData.IDBENEFICIO,
      },
    });

    if (existingBeneficio.length > 0) {

      console.log('Benefício já existe!');
      return;
    }

    await axios.post('https://bacnkend.onrender.com/beneficios/create', formData);
    navigate(-1);
  } catch (error) {
    console.log('Error:', error.response.data);
    console.log('Status code:', error.response.status);
    console.log('Headers:', error.response.headers);
  }
};

// Resto do código...


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container style={{ fontWeight: 'bold', textAlign: 'left' }}>
      <br />
      <br />
      <div className="criar-beneficios">
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Criar Benefício</h1>
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
          <Row>
            <Col md={6}>
              <Form.Group controlId="formDatapublicacao">
                <Form.Label className="label-left">Data de Publicação</Form.Label>
                <Form.Control
                  type="date"
                  name="DATAPUBLICACAO"
                  value={formData.DATAPUBLICACAO}
                  onChange={handleChange}
                  required
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
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formCategoriaBeneficio">
                <Form.Label className="label-left">Categoria de Benefício</Form.Label>
                <Form.Control
                  as="select"
                  name="IDCATEGORIABENEFICIO"
                  value={formData.IDCATEGORIABENEFICIO}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione</option>
                  {categoriasBeneficio.map((categoria) => (
                    <option key={categoria.IDCATEGORIABENEFICIO} value={categoria.IDCATEGORIABENEFICIO}>
                      {categoria.NOMECATEGORIA}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <br />
          <br />
          <Button variant="light" className="mr-2" onClick={() => navigate(-1)}>
            Voltar
          </Button>
          <Button variant="primary" type="submit" style={{ backgroundColor: '#15659F' }}>
            Criar Benefício
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default CriarBeneficios;
