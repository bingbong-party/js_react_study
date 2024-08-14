import logo from './logo.svg';

import mainBg from './image/main_bg.jpg';
import item1 from './image/item1.jpg';
import item2 from './image/item2.jpg';
import item3 from './image/item3.jpg';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
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

      <div className='main-bg' style={{ backgroundImage: 'url(' + mainBg + ')' }}></div>

      <div>
        <Container>
          <Row style={{ paddingTop: "3%" }}>
            <Col>
              <img className="item-image" src={item1} alt="이미지 로드 에러" />
              <h4>상품명</h4>
              <p>상품설명</p>
            </Col>
            <Col><img className="item-image" src={item2} alt="이미지 로드 에러" />
              <h4>상품명</h4>
              <p>상품설명</p>
              </Col>
            <Col><img className="item-image" src={item3} alt="이미지 로드 에러" />
              <h4>상품명</h4>
              <p>상품설명</p>
              </Col>
          </Row>
        </Container>
      </div>

    </div>
  );
}

export default App;
