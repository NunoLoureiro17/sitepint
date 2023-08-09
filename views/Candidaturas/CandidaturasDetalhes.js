import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function CandidaturasDetalhes() {
  const { id, idvaga } = useParams();
  const [candidaturaDetalhes, setCandidaturaDetalhes] = useState(null);
  const [utilizador, setUtilizador] = useState(null);
  const [vagaDetalhes, setVagaDetalhes] = useState(null);
  const [tipoCandidatura, setTipoCandidatura] = useState(null);
  const [experiencia, setExperiencia] = useState(null);
  const [aprovacao, setEstadoAprovacao] = useState(null);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchCandidatura = async () => {
      try {
        const candidaturaResponse = await axios.get(`https://bacnkend.onrender.com/Candidaturas/list`);
        if (!candidaturaResponse.data) {
          console.log('Erro ao buscar candidatura');
          return;
        }
        const candidatura = candidaturaResponse.data.find((candidato) => candidato.IDCANDIDATURA === Number(id));
        setCandidaturaDetalhes(candidatura);

        const utilizadorResponse = await axios.get(`https://bacnkend.onrender.com/Utilizadores/list`);
        if (!utilizadorResponse.data) {
          console.log('Erro ao buscar utilizador');
          return;
        }
        const utilizador = utilizadorResponse.data.find((user) => user.IDUTILIZADOR === candidatura?.IDUTILIZADOR);
        setUtilizador(utilizador);

        const vagaResponse = await axios.get(`https://bacnkend.onrender.com/vagas/get/${idvaga}`);
        if (!vagaResponse.data) {
          console.log('Erro ao buscar vaga');
          return;
        }
        setVagaDetalhes(vagaResponse.data);

        const tipoCandidaturaResponse = await axios.get(`https://bacnkend.onrender.com/TipoCandidatura/list`);
        if (!tipoCandidaturaResponse.data) {
          console.log('Erro ao buscar tipo de candidatura');
          return;
        }
        const tipoCandidatura = tipoCandidaturaResponse.data.find(
          (tipo) => tipo.IDTIPOCANDIDATURA === candidatura?.IDTIPOCANDIDATURA
        );
        setTipoCandidatura(tipoCandidatura);

        const experienciaResponse = await axios.get(`https://bacnkend.onrender.com/experiencia/list`);
        if (!experienciaResponse.data) {
          console.log('Erro ao buscar experiência');
          return;
        }
        const experiencia = experienciaResponse.data.find(
          (exp) => exp.IDEXPERIENCIA === candidatura?.IDEXPERIENCIA
        );
        setExperiencia(experiencia);

        const aprovacaoResponse = await axios.get(`https://bacnkend.onrender.com/aprovacao/list`);
        if (!aprovacaoResponse.data) {
          console.log('Erro ao buscar aprovação');
          return;
        }
        const aprovacao = aprovacaoResponse.data.find(
          (apr) => apr.IDAPROVACAO === candidatura?.IDAPROVACAO
        );
        setEstadoAprovacao(aprovacao);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCandidatura();
  }, [id, idvaga]);

  const handleVoltar = () => {
    navigate(-1); // Navega para a página anterior
  };

  const handleAprovarCandidato = () => {
    try {
      if (candidaturaDetalhes?.IDAPROVACAO == 1) {
        axios.put(`https://bacnkend.onrender.com/Candidaturas/update/${candidaturaDetalhes?.IDCANDIDATURA}`, {
          IDAPROVACAO: 2, // ID do estado "Aprovado" na tabela "Aprovacao"
          DATAAPROVACAO: new Date(), // Inserir a data atual
        });

        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejeitarCandidato = () => {
    try {
      if (candidaturaDetalhes?.IDAPROVACAO == 1) {
        axios.put(`https://bacnkend.onrender.com/Candidaturas/update/${candidaturaDetalhes?.IDCANDIDATURA}`, {
          IDAPROVACAO: 3,
          DATAAPROVACAO: null,
        });

        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <br /> <br />
      <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>
        Detalhes da Candidatura
      </h1>
      <br /> <br />
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <p>Nome do Utilizador: {utilizador?.NOME}</p>
              <p>Contato: {utilizador?.CONTACTO}</p>
              <p>Email: {utilizador?.EMAIL}</p>
              <p>Experiência: {experiencia?.NOMEEXPERIENCIA}</p>
              <p>Tipo de Candidatura: {tipoCandidatura?.NOMETIPOCANDIDATURA}</p>
              <p>Descrição: {candidaturaDetalhes?.DESCRICAO}</p>
              <p>CV: {candidaturaDetalhes?.CV}</p>
              <p>Estado de Aprovação: {aprovacao?.NOMEAPROVACAO}</p>
              <p>Data de Aprovação: {candidaturaDetalhes?.DATAAPROVACAO}</p>
              <p>Feedback: {candidaturaDetalhes?.FEEDBACK}</p>
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
        <Link to={`/EditarCandidaturas/${id}/Vaga/${idvaga}`}>
          <Button variant="primary" style={{ backgroundColor: '#15659F' }}>
            Editar
          </Button>&nbsp;
        </Link>
        <Link to={`/CriarEntrevista/user/${utilizador?.IDUTILIZADOR}/${candidaturaDetalhes?.IDCANDIDATURA}`}>
          <Button variant="primary" style={{ backgroundColor: '#15659F' }}>
            Criar Entrevista
          </Button>
        </Link>
        &nbsp;
        <Link to={`/FeedbackCandidaturas/${id}/Vaga/${idvaga}`}>
          <Button variant="secondary">
            Enviar Feedback
          </Button>
        </Link>
        &nbsp;
        <Button variant="success" onClick={handleAprovarCandidato}>
          Aprovar Candidato
        </Button>&nbsp;
        <Button variant="danger" onClick={handleRejeitarCandidato}>
          Rejeitar Candidato
        </Button>
      </div>
    </Container>
  );
}

export default CandidaturasDetalhes;
