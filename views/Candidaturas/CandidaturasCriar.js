import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

function CandidaturasCriar() {
  const { id } = useParams(); // Obtém o ID da vaga da URL
  const navigate = useNavigate();
  const location = useLocation();
  const idFromURL = location.pathname.split('/').pop(); // Obtém o ID da URL

  const [vaga, setVaga] = useState(null);
  const [experiencia, setExperiencia] = useState('');
  const [tipoCandidatura, setTipoCandidatura] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cv, setCv] = useState(null);
  const [experiencias, setExperiencias] = useState([]);
  const [tiposCandidatura, setTiposCandidatura] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user'));
  const userId = userData ? userData.IDUTILIZADOR : null;


  useEffect(() => {
    const fetchVaga = async () => {
      try {
        const response = await axios.get(`https://bacnkend.onrender.com/candidaturas/list/${idFromURL}`);
        const data = response.data;
        const currentVaga = data.find((item) => item.IDVAGA === Number(idFromURL)); // Verifica o ID da vaga
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

    fetchVaga();
    fetchExperiencias();
    fetchTiposCandidatura();
  }, [idFromURL]);
  const handleVoltar = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://bacnkend.onrender.com/candidaturas/create', {
        REC_IDUTILIZADOR: null,
        IDUTILIZADORINTERNO: null,
        IDRECURSOSHUMANOS: null,
        IDVAGA: id,
        IDEXPERIENCIA: experiencia,
        IDTIPOCANDIDATURA: tipoCandidatura,
        DESCRICAO: descricao,
        IDUTILIZADOR: userData.IDUTILIZADOR,
        IDAPROVACAO: 1,
        CV: null,
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
        <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Criar Candidatura</h1>
        <Form onSubmit={handleSubmit}>
          <br />
          <br />
          <Row>
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
          <Button variant="primary" type="submit" style={{ backgroundColor: '#15659F' }}>Criar</Button>
        </Form>
      </div>
    </Container>
  );
}

export default CandidaturasCriar;
