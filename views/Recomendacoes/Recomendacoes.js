import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import { Container, Row, Col, Card, Pagination, Button, Form } from 'react-bootstrap';

function ListaRecomendacoes() {
  const navigate = useNavigate();
  const [recomendacoes, setRecomendacoes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [recomendacoesPerPage] = useState(3); // Quantidade de recomendações por página
  const [searchTerm, setSearchTerm] = useState('');
  const { id } = useParams();

  const fetchRecomendacoes = async () => {
    try {
      const response = await axios.get('https://bacnkend.onrender.com/recomendacao/list');
      const data = response.data.filter((recomendacao) => recomendacao.IDVAGA === Number(id));
      setRecomendacoes(data);
      setTotalPages(Math.ceil(data.length / recomendacoesPerPage));
    } catch (error) {
      console.log('Error fetching recomendacoes:', error);
    }
  };

  useEffect(() => {
    fetchRecomendacoes();
  }, [id, recomendacoesPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    if (searchTerm === '') {
      // Redefinir a pesquisa
      fetchRecomendacoes();
    } else {
      const filtered = recomendacoes.filter((recomendacao) =>
        recomendacao.NOMERECOMENDADO.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setRecomendacoes(filtered);
      setCurrentPage(1);
      setTotalPages(Math.ceil(filtered.length / recomendacoesPerPage));
    }
  };

  const indexOfLastRecomendacao = currentPage * recomendacoesPerPage;
  const indexOfFirstRecomendacao = indexOfLastRecomendacao - recomendacoesPerPage;
  const currentRecomendacoes = recomendacoes.slice(indexOfFirstRecomendacao, indexOfLastRecomendacao);

  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <Container>
      <br />
      <br />
      <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>
        Lista de Recomendações
      </h1>
      <br />
      <br />
      <Row>
        <Col>
          <div className="recomendacoes-list row">
            <div className="mb-3 d-flex justify-content-between">
              <Col md={4}>
                <div className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Pesquisar recomendações"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%' }}
                  />
                  <Button
                    variant="primary"
                    onClick={handleSearch}
                    style={{ backgroundColor: '#15659F', marginLeft: '10px' }}
                  >
                    Pesquisar
                  </Button>
                </div>
              </Col>
            </div>
          </div>
        </Col>
      </Row>
      <br />

      {currentRecomendacoes && currentRecomendacoes.length > 0 ? (
        currentRecomendacoes.map((recomendacao) => (
          <div key={recomendacao.IDRECOMENDACAO} className="col-md-12">
            <Card className="recomendacao-card">
              <Card.Body>
                <Card.Title style={{ color: '#15659F', textAlign: 'left' }}>
                  {recomendacao.NOMERECOMENDADO}
                </Card.Title>
                <Card.Text className="descricao">{recomendacao.MENSAGEM}</Card.Text>
                <div style={{ textAlign: 'right' }}>
                  <Link to={`/DetalhesRecomendacoes/${recomendacao.IDRECOMENDACAO}/Vaga/${recomendacao.IDVAGA}`}>
                    <Button variant="primary" style={{ backgroundColor: '#15659F' }}>
                      Ver mais
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
            <br />
          </div>
        ))
      ) : (
        <p>Nenhuma recomendação encontrada.</p>
      )}

      <Pagination className="mt-3 justify-content-center">
        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastRecomendacao >= recomendacoes.length}
        />
        <Pagination.Last
          onClick={() => handlePageChange(Math.ceil(recomendacoes.length / recomendacoesPerPage))}
          disabled={currentPage === Math.ceil(recomendacoes.length / recomendacoesPerPage)}
        />
      </Pagination>
      <div style={{ textAlign: 'right' }}>
        <Button variant="light" className="mr-2" onClick={handleVoltar}>
          Voltar
        </Button>
      </div>
    </Container>
  );
}

export default ListaRecomendacoes;