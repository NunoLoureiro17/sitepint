import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function ImagemComponent() {
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    const timestamp = Date.now();
    const imageURLWithCacheBust = `http://localhost:3002/Beneficios/imagem/1?timestamp=${timestamp}`;

    fetch(imageURLWithCacheBust)
      .then(response => response.blob())
      .then(blob => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          const imageURL = event.target.result;
          setImageURL(imageURL);
        };
        fileReader.readAsDataURL(blob);
        console.log(imageURL);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Img src={imageURL} /> 
          </Card>
          <p>{imageURL}</p> 
        </Col>
      </Row>
    </Container>
  );
}

export default ImagemComponent;
