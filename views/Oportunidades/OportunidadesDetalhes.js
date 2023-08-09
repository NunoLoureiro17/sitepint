import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import '../../App.css';
import { useParams, useNavigate, Link } from 'react-router-dom';

function OportunidadesDetalhes() {
  const { id } = useParams();
  const [oportunidadeDetalhes, setOportunidadeDetalhes] = useState(null);
  const [localizacao, setLocalizacao] = useState('');
  const [estadoOportunidade, setEstadoOportunidade] = useState('');
  const [areaNegocio, setAreaNegocio] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [informacoesAdicionais, setInformacoesAdicionais] = useState('');
  const [documento, setDocumento] = useState(null);
  const [dataCriacao, setDataCriacao] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const oportunidadeResponse = await axios.get(`https://bacnkend.onrender.com/oportunidades/get/${id}`);
        if (!oportunidadeResponse.data) {
          console.log('Erro ao buscar oportunidade');
          return;
        }
        const {
          IDLOCALIZACAO,
          IDESTADOOPORTUNIDADE,
          IDAREANEGOCIO,
          TITULO,
          DESCRICAO,
          INFORMACOESADICIONAIS,
          DOCUMENTO,
          DATACRIACAO
        } = oportunidadeResponse.data;

        setOportunidadeDetalhes(oportunidadeResponse.data);

        const localizacaoResponse = await axios.get('https://bacnkend.onrender.com/localizacao/list');
        const estadoOportunidadeResponse = await axios.get('https://bacnkend.onrender.com/estadooportunidade/list');
        const areaNegocioResponse = await axios.get('https://bacnkend.onrender.com/areanegocio/list');

        const localizacaoData = localizacaoResponse.data.find(loc => loc.IDLOCALIZACAO === IDLOCALIZACAO);
        const estadoOportunidadeData = estadoOportunidadeResponse.data.find(estado => estado.IDESTADOOPORTUNIDADE === IDESTADOOPORTUNIDADE);
        const areaNegocioData = areaNegocioResponse.data.find(area => area.IDAREANEGOCIO === IDAREANEGOCIO);

        setLocalizacao(localizacaoData?.NOMELOCALIZACAO || '');
        setEstadoOportunidade(estadoOportunidadeData?.NOMEESTADO || '');
        setAreaNegocio(areaNegocioData?.NOMEAREANEGOCIO || '');
        setTitulo(TITULO);
        setDescricao(DESCRICAO);
        setInformacoesAdicionais(INFORMACOESADICIONAIS);
        setDocumento(DOCUMENTO);
        setDataCriacao(DATACRIACAO);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  if (!oportunidadeDetalhes) {
    return <p>Carregando detalhes da oportunidade...</p>;
  }

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
                <h2 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left', margin: '0 5%' }}>{titulo}</h2>
                <p style={{ color: '#15659F', textAlign: 'right', fontSize: 'small', margin: '0 5%' }}>{formatDate(dataCriacao)}</p>
                <br />
              </Card.Title>
              <br />
              <p style={{ margin: '0 5%' }}>Localização: {localizacao}</p>
              <p style={{ margin: '0 5%' }}>Estado Oportunidade: {estadoOportunidade}</p>
              <p style={{ margin: '0 5%' }}>Área de Negócio: {areaNegocio}</p>
              <p style={{ margin: '0 5%' }}>Descrição: {descricao}</p>
              <p style={{ margin: '0 5%' }}>Informações Adicionais: {informacoesAdicionais}</p>
              <p style={{ margin: '0 5%' }}>Documento: {documento}</p>
              <br />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <div className="d-flex justify-content-end">
        <Button variant="light" className="mr-2" onClick={handleVoltar}>
          Voltar
        </Button>
        &nbsp;
        <Link to={`/Oportunidades/Editar/${id}`}>
          <Button variant="primary" style={{ backgroundColor: '#15659F' }}>
            Editar
          </Button>
        </Link>
        &nbsp;
        <Link to={`/InteracoesOportunidades/${id}`}>
          <Button variant="primary" style={{ backgroundColor: '#15659F' }}>
            Lista de Interações
          </Button>
        </Link>
      </div>
    </Container>
  );
}

export default OportunidadesDetalhes;
