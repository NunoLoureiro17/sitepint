import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import '../../App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useParams, useNavigate } from 'react-router-dom';

function IdeiasDetalhes() {
  const { id } = useParams();
  const [ideiaDetalhes, setIdeiaDetalhes] = useState(null);
  const [categoriaNome, setCategoriaNome] = useState(null);
  const [aprovacao, setEstadoAprovacao] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIdeiaDetalhes = async () => {
      try {
        const response = await fetch(`https://bacnkend.onrender.com/ideias/get/${id}`);
        if (!response.ok) {
          console.log('Erro ao buscar ideia');
          return;
        }
        const data = await response.json();
        setIdeiaDetalhes(data);

        const categoriasResponse = await fetch('https://bacnkend.onrender.com/categoriaideias/list');
        if (!categoriasResponse.ok) {
          console.log('Erro ao buscar categorias');
          return;
        }
        const categoriasData = await categoriasResponse.json();
        const categoria = categoriasData.find((categoria) => categoria.IDCATEGORIAIDEIA === data.IDCATEGORIAIDEIA);
        if (categoria) {
          setCategoriaNome(categoria.NOMECATEGORIA);
        }

        const aprovacaoResponse = await axios.get(`https://bacnkend.onrender.com/aprovacao/get/${data.IDAPROVACAO}`);

        const estadoAprovacao = aprovacaoResponse.data;
        setEstadoAprovacao(estadoAprovacao);
      } catch (error) {
        console.log(error);
      }
    };

    fetchIdeiaDetalhes();
  }, [id]);

  if (!ideiaDetalhes || !categoriaNome) {
    return <p>Carregando detalhes da ideia...</p>;
  }

  const { TITULO, DATA, DESCRICAO, DOCUMENTO } = ideiaDetalhes;

  const handleVoltar = () => {
    navigate(-1); 
  };

  const handleRejeitarIdeia = () => {
    try {
      if (ideiaDetalhes?.IDAPROVACAO == 1) {
        axios.put(`https://bacnkend.onrender.com/ideias/update/${ideiaDetalhes?.IDIDEIA}`, {
          IDAPROVACAO: 3, // ID do estado "Desaprovado" na tabela "Aprovacao"
        });

        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAprovarIdeia = () => {
    try {
      if (ideiaDetalhes?.IDAPROVACAO == 1) {
        axios.put(`https://bacnkend.onrender.com/ideias/update/${ideiaDetalhes?.IDIDEIA}`, {
          IDAPROVACAO: 2, // ID do estado "Aprovado" na tabela "Aprovacao"
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

      <br /><br />
      <div style={{ textAlign: 'left' }}>
      </div>
      <br />
      <Row>
        <Col>

          <Card>
            <Card.Body>
              <Card.Title>
                <br />
                <h2 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left', margin: '0 5%' }}>{TITULO}</h2>
                <p style={{ color: '#15659F', textAlign: 'right', fontSize: 'small', margin: '0 5%' }}>
                  {new Date(DATA).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
                <br />
              </Card.Title>
              <div style={{ margin: '0 5%' }}>
                <p>Categoria: {categoriaNome}</p>
                <p>Descrição: {DESCRICAO}</p>
                <p>Estado de Aprovação: {aprovacao?.NOMEAPROVACAO}</p>
                {DOCUMENTO && <p>Documento: {DOCUMENTO}</p>}
              </div>
              <br />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <div className="d-flex justify-content-end">
        <Button variant="light" className="mr-2" onClick={handleVoltar}>Voltar</Button>&nbsp;
        <Button variant="primary" onClick={() => navigate(`/Ideias/Editar/${ideiaDetalhes.IDIDEIA}`)} style={{ backgroundColor: '#15659F' }}>Editar</Button>&nbsp;
        <Button variant="danger" onClick={handleRejeitarIdeia}>Rejeitar Ideia</Button>&nbsp;
        <Button variant="success" onClick={handleAprovarIdeia}>Aprovar Ideia</Button>
      </div>
    </Container>
  );
}

export default IdeiasDetalhes;
