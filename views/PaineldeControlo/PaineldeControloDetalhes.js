import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useParams, useNavigate, Link } from 'react-router-dom';

function UserDetails() {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://bacnkend.onrender.com/utilizadores/get/${id}`);
        if (!response.ok) {
          console.log('Error fetching user details');
          return;
        }
        const data = await response.json();
        setUserDetails(data);

        const userTypeResponse = await fetch(`https://bacnkend.onrender.com/tipoutilizadores/get/${data.IDTIPOUTILIZADOR}`);
        if (!userTypeResponse.ok) {
          console.log('Error fetching user type details');
          return;
        }
        const userTypeData = await userTypeResponse.json();
        setUserType(userTypeData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (!userDetails || !userType) {
    return <p>Loading user details...</p>;
  }

  const { NOME, CONTACTO, EMAIL } = userDetails;
  const { NOMETIPO } = userType;

  const handleVoltar = () => {
    navigate(-1); // Navega para a página anterior
  };

  return (
    <Container>
      <br />
      <br />
      <div style={{ textAlign: 'left' }}>
      </div>
      <br />
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>
                <br />
                <h2 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left', margin: '0 5%' }}>{NOME}</h2>
                <br />
              </Card.Title>
              <div style={{ margin: '0 5%' }}>
                <p>Nome: {NOME}</p>
                <p>Contacto: {CONTACTO}</p>
                <p>Email: {EMAIL}</p>
                <p>Tipo de Utilizador: {NOMETIPO}</p>
              </div>
              <br />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      <div className="d-flex justify-content-end">
        <Button variant="light" className="mr-2" onClick={handleVoltar}>
          Voltar
        </Button>&nbsp;
        <Button
          variant="primary"
          as={Link}
          to={`/PaineldeControlo/Editar/${userDetails.IDUTILIZADOR}`}
          style={{ backgroundColor: '#15659F' }}
        >
          Editar
        </Button>
      </div>
    </Container>
  );
}

export default UserDetails;
