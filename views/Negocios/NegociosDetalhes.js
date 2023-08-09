import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import '../../App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useParams, useNavigate } from 'react-router-dom';

function NegociosDetalhes() {
  const { id } = useParams();
  const [negocioDetalhes, setNegocioDetalhes] = useState(null);
  const [localizacao, setLocalizacao] = useState('');
  const [areaNegocio, setAreaNegocio] = useState('');
  const [oportunidade, setOportunidade] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const negocioResponse = await axios.get(`https://bacnkend.onrender.com/Negocios/get/${id}`);
        if (!negocioResponse.data) {
          console.log('Erro ao buscar negócio');
          return;
        }
        setNegocioDetalhes(negocioResponse.data);

        const localizacaoResponse = await axios.get(`https://bacnkend.onrender.com/localizacao/list`);
        const localizacaoData = localizacaoResponse.data.find(item => item.IDLOCALIZACAO === negocioResponse.data.IDLOCALIZACAO);
        setLocalizacao(localizacaoData ? localizacaoData.NOMELOCALIZACAO : '');

        const areaNegocioResponse = await axios.get(`https://bacnkend.onrender.com/areanegocio/list`);
        const areaNegocioData = areaNegocioResponse.data.find(item => item.IDAREANEGOCIO === negocioResponse.data.IDAREANEGOCIO);
        setAreaNegocio(areaNegocioData ? areaNegocioData.NOMEAREANEGOCIO : '');

        const oportunidadeResponse = await axios.get(`https://bacnkend.onrender.com/oportunidades/list`);
        const oportunidadeData = oportunidadeResponse.data.find(item => item.IDOPORTUNIDADE === negocioResponse.data.IDOPORTUNIDADE);
        setOportunidade(oportunidadeData ? oportunidadeData.TITULO : '');
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  if (!negocioDetalhes) {
    return <p>Carregando detalhes do negócio...</p>;
  }

  const { TITULO, DESCRICAO, INFORMACOESADICIONAIS, DOCUMENTO, DATAINICIOSERVICO, DATAFIMSERVICO, DATACONCRETIZACAO } = negocioDetalhes;

  const handleVoltar = () => {
    navigate(-1); 
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
                  {formatDate(DATACONCRETIZACAO)}
                </p>
                <br />
              </Card.Title>
              <br />
              <p style={{ margin: '0 5%' }}>Descrição: {DESCRICAO}</p>
              <p style={{ margin: '0 5%' }}>Informações Adicionais: {INFORMACOESADICIONAIS}</p>
              <p style={{ margin: '0 5%' }}>Documento: {DOCUMENTO}</p>
              <p style={{ margin: '0 5%' }}>Localização: {localizacao}</p>
              <p style={{ margin: '0 5%' }}>Área de Negócio: {areaNegocio}</p>
              <p style={{ margin: '0 5%' }}>Oportunidade associada: {oportunidade}</p>
              <p style={{ margin: '0 5%' }}>Data de Início do Serviço: {formatDate(DATAINICIOSERVICO)}</p>
              <p style={{ margin: '0 5%' }}>Data de Fim do Serviço: {formatDate(DATAFIMSERVICO)}</p>
              <br />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <div className="d-flex justify-content-end">
        <Button variant="light" className="mr-2" onClick={handleVoltar}>Voltar</Button>&nbsp;
        <Button variant="primary" onClick={() => navigate(`/Negocios/Editar/${negocioDetalhes.IDNEGOCIO}`)} style={{ backgroundColor: '#15659F' }}>Editar</Button>&nbsp;
        <Button variant="primary" onClick={() => navigate(`/InteracoesNegocios/${negocioDetalhes.IDNEGOCIO}`)} style={{ backgroundColor: '#15659F' }}>Lista de interações</Button>
      </div>
    </Container>
  );
}

export default NegociosDetalhes;
