import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function OportunidadesEditar() {
  const { id } = useParams();
  const currentDate = new Date().toISOString().slice(0, 16);
  const navigate = useNavigate();
  const [documentoFile, setDocumentoFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDocumentoFile(file);
  };

  const [formData, setFormData] = useState({
    TITULO: '',
    DESCRICAO: '',
    DATACRIACAO: currentDate,
    IDLOCALIZACAO: '',
    IDESTADOOPORTUNIDADE: '',
    IDAREANEGOCIO: '',
    INFORMACOESADICIONAIS: '',
    DOCUMENTO: null
  });

  const handleVoltar = () => {
    navigate(-1);
  };

  const [localizacoes, setLocalizacoes] = useState([]);
  const [estadosOportunidade, setEstadosOportunidade] = useState([]);
  const [areasNegocio, setAreasNegocio] = useState([]);

  useEffect(() => {
    axios
      .get(`https://bacnkend.onrender.com/oportunidades/get/${id}`)
      .then((response) => {
        const oportunidadeData = response.data;
        setFormData(oportunidadeData);
      })
      .catch((error) => {
        console.log('Error fetching oportunidade details:', error);
      });

    axios
      .get(`https://bacnkend.onrender.com/localizacao/list`)
      .then((response) => {
        const localizacoesData = response.data;
        setLocalizacoes(localizacoesData);
      })
      .catch((error) => {
        console.log('Error fetching localizacoes:', error);
      });

    axios
      .get(`https://bacnkend.onrender.com/estadooportunidade/list`)
      .then((response) => {
        const estadosOportunidadeData = response.data;
        setEstadosOportunidade(estadosOportunidadeData);
      })
      .catch((error) => {
        console.log('Error fetching estadosOportunidade:', error);
      });

    axios
      .get(`https://bacnkend.onrender.com/areanegocio/list`)
      .then((response) => {
        const areasNegocioData = response.data;
        setAreasNegocio(areasNegocioData);
      })
      .catch((error) => {
        console.log('Error fetching areasNegocio:', error);
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

    axios
      .put(`https://bacnkend.onrender.com/oportunidades/update/${id}`, formData)
      .then((response) => {
        console.log('Oportunidade updated successfully:', response.data);
        handleVoltar();
      })
      .catch((error) => {
        console.log('Error updating oportunidade:', error);
      });
  };

  return (
    <Container style={{ fontWeight: 'bold', textAlign: 'left' }}>
      <br /><br />
      <div className="oportunidade-editar">
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Editar Oportunidade</h1>
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
              <Form.Group controlId="formEstadoOportunidade">
                <Form.Label className="label-left">Estado da Oportunidade</Form.Label>
                <Form.Control
                  as="select"
                  name="IDESTADOOPORTUNIDADE"
                  value={formData.IDESTADOOPORTUNIDADE}
                  onChange={handleChange}
                >
                  <option value="">Selecione o estado da oportunidade</option>
                  {estadosOportunidade.map((estadoOportunidade) => (
                    <option key={estadoOportunidade.IDESTADOOPORTUNIDADE} value={estadoOportunidade.IDESTADOOPORTUNIDADE}>
                      {estadoOportunidade.NOMEESTADO}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <br />
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
                >
                  <option value="">Selecione a localização</option>
                  {localizacoes.map((localizacao) => (
                    <option key={localizacao.IDLOCALIZACAO} value={localizacao.IDLOCALIZACAO}>
                      {localizacao.NOMELOCALIZACAO}
                    </option>
                  ))}            </Form.Control>
              </Form.Group>
              <br />
            </Col>
            <Col md={6}>
                  <Form.Group controlId="formAreaNegocio">
                    <Form.Label className="label-left">Área de Negócio</Form.Label>
                    <Form.Control
                      as="select"
                      name="IDAREANEGOCIO"
                      value={formData.IDAREANEGOCIO}
                      onChange={handleChange}
                    >
                      <option value="">Selecione a área de negócio</option>
                      {areasNegocio.map((areaNegocio) => (
                        <option key={areaNegocio.IDAREANEGOCIO} value={areaNegocio.IDAREANEGOCIO}>
                          {areaNegocio.NOMEAREANEGOCIO}
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
              <br />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formDocumento">
                <Form.Label className="label-left">Documento </Form.Label>
                <Form.Control
                  type="file"
                  name="DOCUMENTO"
                  onChange={handleFileChange}
                  accept=".zip"
                />
              </Form.Group>

              <br />
            </Col>
          </Row>
          <Button variant="light" className="mr-2" onClick={handleVoltar}>Voltar</Button>&nbsp;
          <Button variant="primary" type="submit" style={{ backgroundColor: '#15659F' }}>Atualizar Oportunidade</Button>
        </Form>
      </div>
    </Container>
  );
}

export default OportunidadesEditar;