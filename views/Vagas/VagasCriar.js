import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

function CriarVaga() {
  const navigate = useNavigate();
  const { idnegocio } = useParams();

  const [formData, setFormData] = useState({
    IDVAGA: '',
    IDUTILIZADOR: 2,
    IDUTILIZADORINTERNO: 2,
    IDRECURSOSHUMANOS: 1,
    IDLOCALIZACAO: '',
    IDTIPOVAGA: '',
    IDEXPERIENCIA: '',
    IDCARREIRA: '',
    TITULO: '',
    DESCRICAO: '',
    DATAHORA: '',
  });

  const [localizacoes, setLocalizacoes] = useState([]);
  const [tiposVaga, setTiposVaga] = useState([]);
  const [experiencias, setExperiencias] = useState([]);
  const [carreiras, setCarreiras] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localizacoesResponse = await axios.get('https://bacnkend.onrender.com/localizacao/list');
        const tiposVagaResponse = await axios.get('https://bacnkend.onrender.com/tipovaga/list');
        const experienciasResponse = await axios.get('https://bacnkend.onrender.com/experiencia/list');
        const carreirasResponse = await axios.get('https://bacnkend.onrender.com/carreira/list');
        setLocalizacoes(localizacoesResponse.data);
        setTiposVaga(tiposVagaResponse.data);
        setExperiencias(experienciasResponse.data);
        setCarreiras(carreirasResponse.data);
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

      await axios.post('https://bacnkend.onrender.com/vagas/create', {
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
      <div className="criar-vaga">
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Criar Vaga</h1>
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
          <Row>
            <Col md={6}>
              <Form.Group controlId="formLocalizacao">
                <Form.Label className="label-left">Localização</Form.Label>
                <Form.Control
                  as="select"
                  name="IDLOCALIZACAO"
                  value={formData.IDLOCALIZACAO}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione uma localização</option>
                  {localizacoes.map((localizacao) => (
                    <option key={localizacao.IDLOCALIZACAO} value={localizacao.IDLOCALIZACAO}>
                      {localizacao.NOMELOCALIZACAO}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <br />
            </Col>
            <Col md={6}>
              <Form.Group controlId="formTipoVaga">
                <Form.Label className="label-left">Tipo de Vaga</Form.Label>
                <Form.Control
                  as="select"
                  name="IDTIPOVAGA"
                  value={formData.IDTIPOVAGA}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione um tipo de vaga</option>
                  {tiposVaga.map((tipoVaga) => (
                    <option key={tipoVaga.IDTIPOVAGA} value={tipoVaga.IDTIPOVAGA}>
                      {tipoVaga.NOMETIPO}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <br />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formExperiencia">
                <Form.Label className="label-left">Experiência</Form.Label>
                <Form.Control
                  as="select"
                  name="IDEXPERIENCIA"
                  value={formData.IDEXPERIENCIA}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione uma experiência</option>
                  {experiencias.map((experiencia) => (
                    <option key={experiencia.IDEXPERIENCIA} value={experiencia.IDEXPERIENCIA}>
                      {experiencia.NOMEEXPERIENCIA}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <br />
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCarreira">
                <Form.Label className="label-left">Carreira</Form.Label>
                <Form.Control
                  as="select"
                  name="IDCARREIRA"
                  value={formData.IDCARREIRA}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione uma carreira</option>
                  {carreiras.map((carreira) => (
                    <option key={carreira.IDCARREIRA} value={carreira.IDCARREIRA}>
                      {carreira.NOMECARREIRA}
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
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <br />
          <Button variant="light" className="mr-2" onClick={handleVoltar}>
            Voltar
          </Button>
          <Button variant="primary" type="submit" style={{ backgroundColor: '#15659F' }}>
            Criar Vaga
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default CriarVaga;
