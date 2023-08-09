import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function NegociosEditar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    IDOPORTUNIDADE: 1,
    IDLOCALIZACAO: 1,
    IDAREANEGOCIO: 1,
    TITULO: '',
    DESCRICAO: '',
    INFORMACOESADICIONAIS: null,
    DOCUMENTO: null,
    DATAINICIOSERVICO: '',
    DATAFIMSERVICO: '',
    DATACONCRETIZACAO: '',
    IDVAGA: 1, // Valor inicial da vaga selecionada
  });

  const [oportunidades, setOportunidades] = useState([]);
  const [localizacoes, setLocalizacoes] = useState([]);
  const [areasNegocio, setAreasNegocio] = useState([]);
  const [vagas, setVagas] = useState([]);

  const fetchNegocioData = async () => {
    try {
      const response = await axios.get(`https://bacnkend.onrender.com/Negocios/Get/${id}`);
      setFormData((prevData) => ({
        ...prevData,
        TITULO: response.data.TITULO,
        DESCRICAO: response.data.DESCRICAO,
        INFORMACOESADICIONAIS: response.data.INFORMACOESADICIONAIS,
        DOCUMENTO: response.data.DOCUMENTO,
        DATAINICIOSERVICO: response.data.DATAINICIOSERVICO ? response.data.DATAINICIOSERVICO.substring(0, 16) : '',
        DATAFIMSERVICO: response.data.DATAFIMSERVICO ? response.data.DATAFIMSERVICO.substring(0, 16) : '',
        IDOPORTUNIDADE: response.data.IDOPORTUNIDADE,
        IDLOCALIZACAO: response.data.IDLOCALIZACAO,
        IDAREANEGOCIO: response.data.IDAREANEGOCIO,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const [oportunidadesResponse, localizacoesResponse, areasNegocioResponse, vagasResponse] = await Promise.all([
        axios.get('https://bacnkend.onrender.com/oportunidades/list'),
        axios.get('https://bacnkend.onrender.com/localizacao/list'),
        axios.get('https://bacnkend.onrender.com/areanegocio/list'),
        axios.get('https://bacnkend.onrender.com/vagas/list'),
      ]);

      setOportunidades(oportunidadesResponse.data);
      setLocalizacoes(localizacoesResponse.data);
      setAreasNegocio(areasNegocioResponse.data);
      setVagas(vagasResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNegocioData();
    fetchDropdownData();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = () => {
    navigate('/Negocios');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date().toISOString();

    const negocioData = {
      ...formData,
      DATAINICIOSERVICO: formData.DATAINICIOSERVICO
        ? new Date(formData.DATAINICIOSERVICO + ':00').toISOString()
        : '',
      DATAFIMSERVICO: formData.DATAFIMSERVICO
        ? new Date(formData.DATAFIMSERVICO + ':00').toISOString()
        : '',
      DATACONCRETIZACAO: currentDate,
    };

    try {
      await axios.put(`https://bacnkend.onrender.com/Negocios/Update/${id}`, negocioData);
      navigate('/Negocios');
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Container style={{ fontWeight: 'bold', textAlign: 'left' }}>
      <br />
      <br />
      <div className="negocios-editar">
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Editar Negócio</h1>
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
            <Col md={6}>
              <Form.Group controlId="formInformacoesAdicionais">
                <Form.Label className="label-left">Informações Adicionais</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="INFORMACOESADICIONAIS"
                  value={formData.INFORMACOESADICIONAIS || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={6}>
              <Form.Group controlId="formOportunidade">
                <Form.Label className="label-left">Oportunidade</Form.Label>
                <Form.Control
                  as="select"
                  name="IDOPORTUNIDADE"
                  value={formData.IDOPORTUNIDADE}
                  onChange={handleChange}
                >
                  {oportunidades.map((oportunidade) => (
                    <option key={oportunidade.IDOPORTUNIDADE} value={oportunidade.IDOPORTUNIDADE}>
                      {oportunidade.TITULO}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formLocalizacao">
                <Form.Label className="label-left">Localização</Form.Label>
                <Form.Control
                  as="select"
                  name="IDLOCALIZACAO"
                  value={formData.IDLOCALIZACAO}
                  onChange={handleChange}
                >
                  {localizacoes.map((localizacao) => (
                    <option key={localizacao.IDLOCALIZACAO} value={localizacao.IDLOCALIZACAO}>
                      {localizacao.NOMELOCALIZACAO}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={6}>
              <Form.Group controlId="formAreaNegocio">
                <Form.Label className="label-left">Área de Negócio</Form.Label>
                <Form.Control
                  as="select"
                  name="IDAREANEGOCIO"
                  value={formData.IDAREANEGOCIO}
                  onChange={handleChange}
                >
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
                  type="datetime-local"
                  name="DATAINICIOSERVICO"
                  value={formData.DATAINICIOSERVICO}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formDataFimServico">
                <Form.Label className="label-left">Data de Fim do Serviço</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="DATAFIMSERVICO"
                  value={formData.DATAFIMSERVICO}
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
                  value={formData.DOCUMENTO || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <br />
          <Button variant="light" className="mr-2" onClick={handleCancel}>
            Voltar
          </Button> &nbsp;
          <Button variant="primary" type="submit" style={{ backgroundColor: '#15659F' }}>
            Atualizar Negócio
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default NegociosEditar;
