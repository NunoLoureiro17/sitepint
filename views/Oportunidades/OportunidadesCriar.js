import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

function OportunidadesCriar() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const userData = JSON.parse(localStorage.getItem('user'));

  const [formData, setFormData] = useState({
    GES_IDUTILIZADOR: null,
    IDUTILIZADORINTERNO: null,
    IDGESTORPROJETOS: null,
    IDLOCALIZACAO: 1,
    IDUTILIZADOR: userData.IDUTILIZADOR,
    IDESTADOOPORTUNIDADE: 1,
    IDAREANEGOCIO: 1,
    TITULO: '',
    DESCRICAO: '',
    INFORMACOESADICIONAIS: '',
    DOCUMENTO: null,
    DATACRIACAO: new Date().toISOString().slice(0, 16),
  });

  const [localizacoes, setLocalizacoes] = useState([]);
  const [areasNegocio, setAreasNegocio] = useState([]);
  const [estadosOportunidade, setEstadosOportunidade] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localizacoesResponse = await axios.get('https://bacnkend.onrender.com/localizacao/list');
        const areasNegocioResponse = await axios.get('https://bacnkend.onrender.com/areanegocio/list');
        const estadosOportunidadeResponse = await axios.get('https://bacnkend.onrender.com/estadooportunidade/list');

        setLocalizacoes(localizacoesResponse.data);
        setAreasNegocio(areasNegocioResponse.data);
        setEstadosOportunidade(estadosOportunidadeResponse.data);
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
      await axios.post('https://bacnkend.onrender.com/oportunidades/create', formData);
      navigate('/Oportunidades');
    } catch (error) {
      console.log(error.response.data);
      console.log(error.message);
    }
  };

  return (
    <Container style={{ fontWeight: 'bold', textAlign: 'left' }}>
      <br />
      <br />
      <div className="oportunidades-criar">
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Criar Oportunidade</h1>
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
            </Col>
            <Col md={6}>
              <Form.Group controlId="formEstadoOportunidade">
                <Form.Label className="label-left">Estado da Oportunidade</Form.Label>
                <Form.Control
                  as="select"
                  name="IDESTADOOPORTUNIDADE"
                  value={formData.IDESTADOOPORTUNIDADE}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione um estado da oportunidade</option>
                  {estadosOportunidade.map((estadoOportunidade) => (
                    <option
                      key={estadoOportunidade.IDESTADOOPORTUNIDADE}
                      value={estadoOportunidade.IDESTADOOPORTUNIDADE}
                    >
                      {estadoOportunidade.NOMEESTADO}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <br />
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
            </Col>
            <Col md={6}>
              <Form.Group controlId="formAreaNegocio">
                <Form.Label className="label-left">Área de Negócio</Form.Label>
                <Form.Control
                  as="select"
                  name="IDAREANEGOCIO"
                  value={formData.IDAREANEGOCIO}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione uma área de negócio</option>
                  {areasNegocio.map((areaNegocio) => (
                    <option key={areaNegocio.IDAREANEGOCIO} value={areaNegocio.IDAREANEGOCIO}>
                      {areaNegocio.NOMEAREANEGOCIO}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <br />
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
            <Col md={6}>
              <Form.Group controlId="formInformacoesAdicionais">
                <Form.Label className="label-left">Informações Adicionais</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="INFORMACOESADICIONAIS"
                  value={formData.INFORMACOESADICIONAIS}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
            Criar Oportunidade
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default OportunidadesCriar;
