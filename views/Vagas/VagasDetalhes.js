import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import '../../App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useParams, useNavigate } from 'react-router-dom';

function VagasDetalhes() {
  const { id } = useParams();
  const [vagaDetalhes, setVagaDetalhes] = useState(null);
  const [tipoVaga, setTipoVaga] = useState('');
  const [experiencia, setExperiencia] = useState('');
  const [carreira, setCarreira] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vagaResponse = await axios.get(`https://bacnkend.onrender.com/vagas/get/${id}`);
        if (!vagaResponse.data) {
          console.log('Erro ao buscar vaga');
          return;
        }
        setVagaDetalhes(vagaResponse.data);

        const tipoVagaResponse = await axios.get(`https://bacnkend.onrender.com/tipovaga/get/${vagaResponse.data.IDTIPOVAGA}`);
        setTipoVaga(tipoVagaResponse.data ? tipoVagaResponse.data.NOMETIPO : '');

        const experienciaResponse = await axios.get(`https://bacnkend.onrender.com/experiencia/get/${vagaResponse.data.IDEXPERIENCIA}`);
        setExperiencia(experienciaResponse.data ? experienciaResponse.data.NOMEEXPERIENCIA : '');

        const carreiraResponse = await axios.get(`https://bacnkend.onrender.com/carreira/get/${vagaResponse.data.IDCARREIRA}`);
        setCarreira(carreiraResponse.data ? carreiraResponse.data.NOMECARREIRA : '');

        const localizacaoResponse = await axios.get(`https://bacnkend.onrender.com/localizacao/get/${vagaResponse.data.IDLOCALIZACAO}`);
        setLocalizacao(localizacaoResponse.data ? localizacaoResponse.data.NOMELOCALIZACAO : '');
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  if (!vagaDetalhes) {
    return <p>Carregando detalhes da vaga...</p>;
  }

  const { TITULO, DESCRICAO, DATAHORA } = vagaDetalhes;

  const handleVoltar = () => {
    navigate(-1); // Navega para a página anterior
  };



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <Container>
      <br />
      <Row>
        <Col>
          <br />
          <Card>
            <Card.Body>
              <Card.Title>
                <br />
                <h2 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left', margin: '0 5%' }}>{TITULO}</h2>
                <p style={{ color: '#15659F', textAlign: 'right', fontSize: 'small', margin: '0 5%' }}>
                  {formatDate(DATAHORA)}
                </p>
                <br />
              </Card.Title>
              <br />
              <p style={{ margin: '0 5%' }}>Tipo de Vaga: {tipoVaga}</p>
              <p style={{ margin: '0 5%' }}>Experiência: {experiencia}</p>
              <p style={{ margin: '0 5%' }}>Carreira: {carreira}</p>
              <p style={{ margin: '0 5%' }}>Localização: {localizacao}</p>
              <br /><br />
              <p style={{ margin: '0 5%' }}>{DESCRICAO}</p>
              <br />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <div className="d-flex justify-content-end">
        <Button variant="light" className="mr-2" onClick={handleVoltar}>Voltar</Button>&nbsp;
        <Button variant="primary" onClick={() => navigate(`/Vagas/Editar/${vagaDetalhes.IDVAGA}`)} style={{ backgroundColor: '#15659F' }}>Editar</Button>&nbsp;
        <Button variant="primary" onClick={() => navigate(`/CriarRecomendacao/Vaga/${vagaDetalhes.IDVAGA}`)} style={{ backgroundColor: '#15659F' }}>Criar Recomendação</Button>&nbsp;
        <Button variant="primary" onClick={() => navigate(`/ListaRecomendacoes/Vaga/${vagaDetalhes.IDVAGA}`)} style={{ backgroundColor: '#15659F' }}>Lista de Recomendações</Button>&nbsp;
        <Button variant="primary" onClick={() => navigate(`/CriarCandidatura/Vaga/${vagaDetalhes.IDVAGA}`)} style={{ backgroundColor: '#15659F' }}>Candidatar-se</Button>&nbsp;
        <Button variant="primary" onClick={() => navigate(`/ListaCandidaturas/Vaga/${vagaDetalhes.IDVAGA}`)} style={{ backgroundColor: '#15659F' }}>Lista de Candidaturas</Button>
      </div>
    </Container>
  );
}

export default VagasDetalhes;
