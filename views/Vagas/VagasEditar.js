import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Navigate, useHistory, useNavigate, useParams } from 'react-router-dom';

function VagasEditar() {
  const { id } = useParams();
  const currentDate = new Date().toISOString().slice(0, 16);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    TITULO: '',
    DESCRICAO: '',
    DATAHORA: currentDate, // Define a data atual como valor inicial
    IDLOCALIZACAO: '',
    IDTIPOVAGA: '',
    IDEXPERIENCIA: '',
    IDCARREIRA: ''
  });
    
  const handleVoltar = () => {
    navigate(-1);
  };

  const [localizacoes, setLocalizacoes] = useState([]);
  const [tipoVagas, setTipoVagas] = useState([]);
  const [experiencias, setExperiencias] = useState([]);
  const [carreiras, setCarreiras] = useState([]);

  useEffect(() => {
    axios.get(`https://bacnkend.onrender.com/vagas/get/${id}`)
      .then((response) => {
        const vagaData = response.data;
        setFormData(vagaData);
      })
      .catch((error) => {
        console.log('Error fetching vaga details:', error);
      });

    axios.get(`https://bacnkend.onrender.com/localizacao/list`)
      .then((response) => {
        const localizacoesData = response.data;
        setLocalizacoes(localizacoesData);
      })
      .catch((error) => {
        console.log('Error fetching localizacoes:', error);
      });

    axios.get(`https://bacnkend.onrender.com/tipovaga/list`)
      .then((response) => {
        const tipoVagasData = response.data;
        setTipoVagas(tipoVagasData);
      })
      .catch((error) => {
        console.log('Error fetching tipoVagas:', error);
      });

    axios.get(`https://bacnkend.onrender.com/experiencia/list`)
      .then((response) => {
        const experienciasData = response.data;
        setExperiencias(experienciasData);
      })
      .catch((error) => {
        console.log('Error fetching experiencias:', error);
      });

    axios.get(`https://bacnkend.onrender.com/carreira/list`)
      .then((response) => {
        const carreirasData = response.data;
        setCarreiras(carreirasData);
      })
      .catch((error) => {
        console.log('Error fetching carreiras:', error);
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
      .put(`https://bacnkend.onrender.com/vagas/update/${id}`, formData)
      .then((response) => {
        console.log('Vaga updated successfully:', response.data);
        console.log(currentDate);
        handleVoltar();
      })
      .catch((error) => {
        console.log('Error updating vaga:', error);
        
      });
  };

  

  return (
    <Container style={{ fontWeight: 'bold', textAlign: 'left' }}>
      <br /><br />
      <div className="vaga-editar">
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Editar Vaga</h1>
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
              <Form.Group controlId="formLocalizacao">
                <Form.Label className="label-left">Localização</Form.Label>
                <Form.Control
                  as="select"
                  name="IDLOCALIZACAO"
                  value={formData.IDLOCALIZACAO}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione a localização</option>
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
                  <option value="">Selecione o tipo de vaga</option>
                  {tipoVagas.map((tipoVaga) => (
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
                  <option value="">Selecione a experiência</option>
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
              <option value="">Selecione a carreira</option>
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
    <Button variant="light" className="mr-2" onClick={handleVoltar}>Voltar</Button>&nbsp;
    <Button variant="primary" type="submit" style={{ backgroundColor: '#15659F' }}>Atualizar Vaga</Button>
    </Form>
    </div>
  </Container>

  );
  }

export default VagasEditar;