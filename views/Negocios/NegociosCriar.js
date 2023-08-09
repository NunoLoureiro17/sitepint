import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

function NegociosCriar() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    TITULO: '',
    IDGESTORPROJETOS: 4,
    IDUTILIZADORINTERNO: 4,
    GES_IDUTILIZADOR: 1,
    IDUTILIZADOR: 1,
    DESCRICAO: '',
    INFORMACOESADICIONAIS: '',
    DOCUMENTO: null,
    DATAINICIOSERVICO: '',
    DATAFIMSERVICO: '',
    IDOPORTUNIDADE: '',
    IDLOCALIZACAO: '',
    IDAREANEGOCIO: '', 
    DATACONCRETIZACAO: '2023-07-17',
  });

  const [localizacoes, setLocalizacoes] = useState([]);
  const [oportunidades, setOportunidades] = useState([]);
  const [areasNegocio, setAreasNegocio] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localizacoesResponse = await axios.get('https://bacnkend.onrender.com/localizacao/list');
        const oportunidadesResponse = await axios.get('https://bacnkend.onrender.com/oportunidades/list');
        const areasNegocioResponse = await axios.get('https://bacnkend.onrender.com/areanegocio/list');
        setLocalizacoes(localizacoesResponse.data);
        setOportunidades(oportunidadesResponse.data);
        setAreasNegocio(areasNegocioResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post('https://bacnkend.onrender.com/Negocios/Create', formData);
      navigate(-1);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <Container style={{ fontWeight: 'bold', textAlign: 'left' }}>
      <br />
      <br />
      <div className="negocios-criar">
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Criar Negócio</h1>
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
          <Row>
            <Col md={6}>
              <Form.Group controlId="formVaga">
                <Form.Label className="label-left">Oportunidade</Form.Label>
                <Form.Control
                  as="select"
                  name="IDOPORTUNIDADE"
                  value={formData.IDOPORTUNIDADE}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione uma oportunidade</option>
                  {oportunidades.map((oportunidade) => (
                    <option key={oportunidade.IDOPORTUNIDADE} value={oportunidade.IDOPORTUNIDADE}>
                      {oportunidade.TITULO}
                    </option>
                  ))}
                </Form.Control>
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
              <Form.Group controlId="formDataInicioServico">
                <Form.Label className="label-left">Data de Início do Serviço</Form.Label>
                <Form.Control
                  type="date"
                  name="DATAINICIOSERVICO"
                  value={formData.DATAINICIOSERVICO}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formDataFimServico">
                <Form.Label className="label-left">Data de Fim do Serviço</Form.Label>
                <Form.Control
                  type="date"
                  name="DATAFIMSERVICO"
                  value={formData.DATAFIMSERVICO}
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
                  value={formData.DOCUMENTO || ''}
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
            Criar
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default NegociosCriar;
