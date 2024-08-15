import logo from './logo.svg';

import { useState } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import itemData from './data.js';
import ItemDetail from './itemDetail.js';

import { Routes, Route, Link } from 'react-router-dom';

function App() {

  let [items] = useState(itemData);

  return (
    <div className="App">

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">BingBong Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#features">features</Nav.Link>
            <Nav.Link href="#pricing">pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <div>
            <div className='main-bg' style={{ backgroundImage: 'url(' + './images/main_bg.jpg' + ')' }}></div>

            <div>
              <Container>
                <Row style={{ paddingTop: "3%" }}>
                  {
                    items.map(function (item) {
                      return (
                        <Card item={item} />
                      )
                    })
                  }
                </Row>
              </Container>
            </div>
          </div>
        } />
        <Route path="/detail" element={<ItemDetail item={items[0]} />} />
      </Routes>

    </div>
  );
}

function Card(props) {
  let item = props.item;
  let itemTitle = item.title;
  let itemContent = item.content;
  let itemImage = item.image;
  let itemPrice = item.price;

  return (
    <Col>
      <Link to="/detail">
        <img className="item-image" src={itemImage} alt="이미지 로드 에러" />
        <h4>{itemTitle}</h4>
        <p>{itemContent}</p>
        <p>{itemPrice}</p>
      </Link>
    </Col>
  )
}

export default App;
