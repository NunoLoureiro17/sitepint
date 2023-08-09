import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

function PaineldeControlo() {
  const [users, setUsers] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userToRemove, setUserToRemove] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://bacnkend.onrender.com/utilizadores/list');
        const data = response.data;
        setUsers(data);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };

    const fetchUserTypes = async () => {
      try {
        const response = await axios.get('https://bacnkend.onrender.com/tipoutilizadores/list');
        const data = response.data;
        setUserTypes(data);
      } catch (error) {
        console.log('Error fetching user types:', error);
      }
    };

    fetchUsers();
    fetchUserTypes();
  }, []);

  const handleRemoveUser = async (id, name) => {
    setUserToRemove({ id, name });
    setShowConfirmation(true);
  };

  const confirmRemoveUser = async () => {
    try {
      await axios.delete(`https://bacnkend.onrender.com/utilizadores/delete/${userToRemove.id}`);
      setUsers(users.filter((user) => user.IDUTILIZADOR !== userToRemove.id));
      setShowConfirmation(false);
      setUserToRemove(null);
    } catch (error) {
      console.log('Error removing user:', error);
    }
  };

  const cancelRemoveUser = () => {
    setShowConfirmation(false);
    setUserToRemove(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    setSelectedUserType(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const userTypeName = userTypes.find((type) => type.IDTIPOUTILIZADOR === user.IDTIPOUTILIZADOR)?.NOMETIPO || '';
    return (
      user.NOME.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedUserType === '' || user.IDTIPOUTILIZADOR === parseInt(selectedUserType)) &&
      userTypeName
    );
  });

  return (
    <Container>
              <br /><br />
            <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Painel de Controlo</h1>
            <br />
      <br />
      <Row>
        <Col md={4}>
          <Form.Group controlId="formSearch">
            <Form.Control
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="formUserType">
            <Form.Control as="select" value={selectedUserType} onChange={handleUserTypeChange}>
              <option value="">All User Types</option>
              {userTypes.map((type) => (
                <option key={type.IDTIPOUTILIZADOR} value={type.IDTIPOUTILIZADOR}>
                  {type.NOMETIPO}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={2} className="text-right">
          <Button variant="success" as={Link} to="/PaineldeControlo/Criar">
            Criar Utilizador
          </Button>
        </Col>
      </Row>
      <br />
      <br />
      <Row>
        {filteredUsers.map((user) => (
          <Col key={user.IDUTILIZADOR} md={4}>
            <Card style={{ marginBottom: '1rem' }}>
              <Card.Body>
                <Card.Title>{user.NOME}</Card.Title>
                <Card.Text>Email: {user.EMAIL}</Card.Text>
                <Button variant="primary" as={Link} to={`/PaineldeControlo/Detalhes/${user.IDUTILIZADOR}`}>
                  Ver Mais
                </Button>
                <Button
                  variant="danger"
                  style={{ marginLeft: '0.5rem' }}
                  onClick={() => handleRemoveUser(user.IDUTILIZADOR, user.NOME)}
                >
                  Remover
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={showConfirmation} onHide={cancelRemoveUser}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Remove User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove the user "{userToRemove?.name}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={confirmRemoveUser}>
            Remove
          </Button>
          <Button variant="secondary" onClick={cancelRemoveUser}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default PaineldeControlo;
