import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useParams } from 'react-router-dom';

function Sobre() {
    return (
        <Container>
            <Row>
                <Col>
                    <br /><br />
                    <h1 style={{ fontWeight: 'bold', color: '#15659F', textAlign: 'left' }}>Sobre</h1>
                    <br /><br />
                    <Card>
                        <Card.Body>
                            <Card.Title><p class="titulo">Quem Somos</p></Card.Title>
                            {<p>A Softinsa é uma empresa de serviços de tecnologia da informação e desenvolvimento de software. Ela faz parte do grupo IBM, atuando como uma subsidiária da IBM Portugal. A Softinsa oferece uma ampla gama de serviços, incluindo consultoria em TI, desenvolvimento de software, gerenciamento de projetos, suporte técnico e soluções personalizadas para empresas de diversos setores. A empresa tem como objetivo ajudar os seus clientes a otimizar os seus processos de negócio, melhorar a eficiência operacional e impulsionar a transformação digital por meio de soluções inovadoras e tecnologicamente avançadas.</p>}
                        </Card.Body>
                    </Card>
                    <br /><br />
                    <Card>
                        <Card.Body>
                            <Card.Title><p class="titulo">Centros</p></Card.Title>
                            {<p>Os Centros de Inovação de Tomar, Viseu, Fundão, Portalegre e Vila Real são especializados na prestação de serviços e na gestão e desenvolvimento de aplicações, com capacidade regional e global, fazendo parte da rede internacional de Centros de Inovação da IBM. Seguem um modelo integrado, multi-site e multi-cliente, tirando partido de tecnologias de alto valor de modo a ajudar as empresas a transformarem e a fazerem crescer os seus negócios.</p>}
                        </Card.Body>
                    </Card>
                    <br /><br />
                    <Card>
                        <Card.Body>
                            <Card.Title><p class="titulo">Contactos</p></Card.Title>
                            {<p>Telefone: +351 213 219 600<br></br>Comercial: comercial@pt.softinsa.com<br></br>Marketing: marketing@pt.softinsa.com<br></br>Receção: geral@pt.softinsa.com</p>}
                        </Card.Body>
                    </Card>
                    <br />
                </Col>
            </Row>
        </Container>
    );
}
export default Sobre;