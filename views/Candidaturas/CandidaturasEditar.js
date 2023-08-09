import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

function CandidaturasEditar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const idFromURL = location.pathname.split('/').pop();

  const [vaga, setVaga] = useState(null);
  const [experiencia, setExperiencia] = useState('');
  const [tipoCandidatura, setTipoCandidatura] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cv, setCv] = useState(null);
  const [experiencias, setExperiencias] = useState([]);
  const [tiposCandidatura, setTiposCandidatura] = useState([]);

  useEffect(() => {
    const fetchCandidatura = async () => {
      try {
        const response = await axios.get(`https://bacnkend.onrender.com/candidaturas/get/${id}`);
        const candidaturaData = response.data;
        setExperiencia(candidaturaData.IDEXPERIENCIA);
        setTipoCandidatura(candidaturaData.IDTIPOCANDIDATURA);
        setDescricao(candidaturaData.DESCRICAO);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchVaga = async () => {
      try {
        const response = await axios.get(`https://bacnkend.onrender.com/vagas/get/${idFromURL}`);
        const data = response.data;
        const currentVaga = data.find((item) => item.IDVAGA === Number(idFromURL));
        setVaga(currentVaga);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchExperiencias = async () => {
      try {
        const response = await axios.get('https://bacnkend.onrender.com/experiencia/list');
        setExperiencias(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTiposCandidatura = async () => {
      try {
        const response = await axios.get('https://bacnkend.onrender.com/tipocandidatura/list');
        setTiposCandidatura(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCandidatura();
    fetchVaga();
    fetchExperiencias();
    fetchTiposCandidatura();
  }, [id, idFromURL]);

  const handleVoltar = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://bacnkend.onrender.com/candidaturas/update/${id}`, {
        IDEXPERIENCIA: experiencia,
        IDTIPOCANDIDATURA: tipoCandidatura,
        DESCRICAO: descricao,
        CV: cv
      });

      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const vagaId = vaga ? vaga.IDVAGA : '';

  return (
    <Container style={{ fontWeight: 'bold', textAlign: 'left' }}>
      <br />
      <br />
      <div className="candidaturas-criar">
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Editar Candidatura</h1>
        <Form onSubmit={handleSubmit}>
          <br />
          <br />
          <Row>
          <p>O valor da vaga é: {vagaId}</p>
            <Col md={6}>
                <Form.Group controlId="formVaga">
                  <Form.Label className="label-left">Vaga</Form.Label>
                  <Form.Control
                    type="text"
                    name="vaga"
                    value={id}
                    readOnly
                  />
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
                  name="experiencia"
                  value={experiencia}
                  onChange={(e) => setExperiencia(e.target.value)}
                  required
                >
                  <option value="">Selecione uma experiência</option>
                  {experiencias.map((exp) => (
                    <option key={exp.IDEXPERIENCIA} value={exp.IDEXPERIENCIA}>
                      {exp.NOMEEXPERIENCIA}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <br />
            </Col>
            <Col md={6}>
              <Form.Group controlId="formTipoCandidatura">
                <Form.Label className="label-left">Tipo de Candidatura</Form.Label>
                <Form.Control
                  as="select"
                  name="tipoCandidatura"
                  value={tipoCandidatura}
                  onChange={(e) => setTipoCandidatura(e.target.value)}
                  required
                >
                  <option value="">Selecione um tipo de candidatura</option>
                  {tiposCandidatura.map((tipo) => (
                    <option key={tipo.IDTIPOCANDIDATURA} value={tipo.IDTIPOCANDIDATURA}>
                      {tipo.NOMETIPOCANDIDATURA}
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
                  name="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={6}>
              <Form.Group controlId="formCv">
                <Form.Label className="label-left">CV</Form.Label>
                <Form.Control
                  type="file"
                  name="cv"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setCv(e.target.files[0])}
                />
              </Form.Group>
              <br />
            </Col>
          </Row>
          <br />
          <Button variant="light" className="mr-2" onClick={handleVoltar}>Voltar</Button>&nbsp;
          <Button variant="primary" type="submit" style={{ backgroundColor: '#15659F' }} onClick={handleSubmit}>Atualizar Candidatura</Button>
        </Form>
      </div>
    </Container>
  );
}

export default CandidaturasEditar;