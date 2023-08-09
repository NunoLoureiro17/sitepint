import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import { Container, Row, Col, Card, Pagination, Button, Form } from 'react-bootstrap';

function Entrevistas() {
  const navigate = useNavigate();
  const [entrevistas, setEntrevistas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entrevistasPerPage] = useState(3); // Quantidade de entrevistas por página
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedEntrevista, setSelectedEntrevista] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    const fetchEntrevistas = async () => {
      try {
        const response = await axios.get('https://bacnkend.onrender.com/Entrevista/list');
        const data = response.data;
        setEntrevistas(data);
        setTotalPages(Math.ceil(data.length / entrevistasPerPage));
      } catch (error) {
        console.log('Error fetching entrevistas:', error);
      }
    };

    fetchEntrevistas();
  }, [entrevistasPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = async () => {
    if (searchTerm === '') {
      fetchEntrevistas();
      return;
    }
  
    try {
      const response = await axios.get('https://bacnkend.onrender.com/Entrevista/list');
      const data = response.data;
      const filtered = data.filter((entrevista) =>
        entrevista.TITULO.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setEntrevistas(filtered);
      setTotalPages(Math.ceil(filtered.length / entrevistasPerPage));
      setCurrentPage(1);
    } catch (error) {
      console.log('Error fetching entrevistas:', error);
    }
  };

  const fetchEntrevistas = async () => {
    try {
      const response = await axios.get('https://bacnkend.onrender.com/Entrevista/list');
      const data = response.data;
      setEntrevistas(data);
      setTotalPages(Math.ceil(data.length / entrevistasPerPage));
    } catch (error) {
      console.log('Error fetching entrevistas:', error);
    }
  };

  const indexOfLastEntrevista = currentPage * entrevistasPerPage;
  const indexOfFirstEntrevista = indexOfLastEntrevista - entrevistasPerPage;
  const currentEntrevistas = entrevistas.slice(indexOfFirstEntrevista, indexOfLastEntrevista);


  const handleDelete = async () => {
    try {
      if (!selectedEntrevista) return;

      const response = await axios.delete(`https://bacnkend.onrender.com/Entrevista/delete/${selectedEntrevista.IDENTREVISTA}`);
      if (response.status === 200) {
        // Remove a entrevista excluída da lista
        setEntrevistas((prevEntrevistas) => prevEntrevistas.filter((entrevista) => entrevista.IDENTREVISTA !== selectedEntrevista.IDENTREVISTA));
        setShowConfirmation(false);
      }
    } catch (error) {
      console.log('Error deleting entrevista:', error);
    }
  };


  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <Container>
      <br />
      <br />
      <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>
        Lista de Entrevistas
      </h1>
      <br />
      <br />
      <Row>
        <Col>
          <div className="entrevistas-list row">
            <div className="mb-3 d-flex justify-content-between">
              <Col md={4}>
                <div className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Pesquisar entrevistas"
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

      {currentEntrevistas && currentEntrevistas.length > 0 ? (
        currentEntrevistas.map((entrevista) => (
          <div key={entrevista.IDENTREVISTA} className="col-md-12">
            <Card className="entrevista-card">
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <Card.Title style={{ color: '#15659F' ,fontWeight: 'bold' , textAlign: 'left' }}>
                    {entrevista.TITULO}
                  </Card.Title >
                  <div  style={{ color: '#15659F', fontWeight: 'bold', textAlign: 'right', fontSize: 'small' }} >
                    {new Date(entrevista.DATACRIACAO).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </div>
                <Card.Text className="descricao">
                  {entrevista.DESCRICAO}
                </Card.Text>
                <div style={{ textAlign: 'right' }}>
                  <Link to={`/Entrevista/Detalhes/${entrevista.IDENTREVISTA}`}>
                    <Button variant="primary" style={{ backgroundColor: '#15659F' }}>
                      Ver mais
                    </Button>
                  </Link>
                  <Button
                  variant="danger"
                  onClick={() => {
                  setSelectedEntrevista(entrevista);
                  setShowConfirmation(true);
                  }}
                  style={{ marginLeft: '10px' }}
                  >
                  Apagar Entrevista
                  </Button>
                </div>
              </Card.Body>
            </Card>
            <br />
          </div>
        ))
      ) : (
        <p>Nenhuma entrevista encontrada.</p>
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
          disabled={indexOfLastEntrevista >= entrevistas.length}
        />
        <Pagination.Last
          onClick={() => handlePageChange(Math.ceil(entrevistas.length / entrevistasPerPage))}
          disabled={currentPage === Math.ceil(entrevistas.length / entrevistasPerPage)}
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

export default Entrevistas;
