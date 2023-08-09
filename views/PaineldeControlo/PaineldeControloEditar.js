    import React, { useState, useEffect } from 'react';
    import { Container, Form, Button, Row, Col } from 'react-bootstrap';
    import axios from 'axios';
    import { useParams, useNavigate } from 'react-router-dom';

    function UserEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        NOME: '',
        EMAIL: '',
        PASSWORD: '',
        CONTACTO: '',
        IDTIPOUTILIZADOR: '',
    });
    const [userTypes, setUserTypes] = useState([]);

    
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`https://bacnkend.onrender.com/utilizadores/list`);
                if (response.status !== 200) {
                    console.log('Error fetching user details');
                    return;
                }
                const userData = response.data.find((user) => user.IDUTILIZADOR === parseInt(id));
                setFormData(userData);
            } catch (error) {
                console.log('Error fetching user details:', error);
            }
        };
        
    
        const fetchUserTypes = async () => {
            try {
              const response = await axios.get('https://bacnkend.onrender.com/tipoutilizadores/list');
              if (response.status !== 200) {
                console.log('Error fetching user types');
                return;
              }
              const userTypesData = response.data;
              setUserTypes(userTypesData);
            } catch (error) {
              console.log('Error fetching user types:', error);
            }
          };
    
        const fetchData = async () => {
        await Promise.all([fetchUserDetails(), fetchUserTypes()]);
        };
    
        fetchData();
    }, [id]);
    

    const handleChange = (e) => {
        setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        axios.put(`https://bacnkend.onrender.com/utilizadores/update/${id}`, formData)
        .then((response) => {
            console.log('User updated successfully:', response.data);
            navigate(`/PaineldeControlo/Detalhes/${id}`);
        })
        .catch((error) => {
            console.log('Error updating user:', error);
        });
    };

    const handleVoltar = () => {
        navigate(-1);
    };

    return (
        <Container style={{ fontWeight: 'bold', textAlign: 'left' }}>
        <br /><br />
        <div className="user-edit">
            <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Editar Utilizador</h1>
            <br />
            <Form onSubmit={handleSubmit}>
            <br />
            <Row>
                <Col md={6}>
                <Form.Group controlId="formNome">
                    <Form.Label className="label-left">Nome</Form.Label>
                    <Form.Control
                    type="text"
                    name="NOME"
                    value={formData.NOME}
                    onChange={handleChange}
                    required
                    />
                </Form.Group>
                <br />
                </Col>
                <Col md={6}>
                <Form.Group controlId="formEmail">
                    <Form.Label className="label-left">Email</Form.Label>
                    <Form.Control
                    type="email"
                    name="EMAIL"
                    value={formData.EMAIL}
                    onChange={handleChange}
                    required
                    />
                </Form.Group>
                <br />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                <Form.Group controlId="formPassword">
                    <Form.Label className="label-left">Password</Form.Label>
                    <Form.Control
                    type="password"
                    name="PASSWORD"
                    value={formData.PASSWORD}
                    onChange={handleChange}
                    minLength={6}
                    />
                </Form.Group>
                <br />
                </Col>
                <Col md={6}>
                <Form.Group controlId="formContacto">
                    <Form.Label className="label-left">Contacto</Form.Label>
                    <Form.Control
                    type="text"
                    name="CONTACTO"
                    value={formData.CONTACTO}
                    onChange={handleChange}
                    />
                </Form.Group>
                <br />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                <Form.Group controlId="formTipoUtilizador">
                    <Form.Label className="label-left">Tipo de Utilizador</Form.Label>
                    <Form.Control
                    as="select"
                    name="IDTIPOUTILIZADOR"
                    value={formData.IDTIPOUTILIZADOR}
                    onChange={handleChange}
                    required
                    >
                    <option value="">Selecione o tipo de utilizador</option>
                    {userTypes.map((userType) => (
                        <option key={userType.IDTIPOUTILIZADOR} value={userType.IDTIPOUTILIZADOR}>
                        {userType.NOMETIPO}
                        </option>
                    ))}
                    </Form.Control>
                </Form.Group>
                <br />
                </Col>
            </Row>
            <Button variant="light" className="mr-2" onClick={handleVoltar}>Voltar</Button>&nbsp;
            <Button variant="primary" type="submit" style={{ backgroundColor: '#15659F' }}>Atualizar Utilizador</Button>
            </Form>
        </div>
        </Container>
    );
    }

    export default UserEdit;
