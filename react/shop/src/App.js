import {useState} from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from 'axios';

import itemData from './data.js';
import ItemDetail from './pages/itemDetail.js';

import {Outlet, Route, Routes, useNavigate} from 'react-router-dom';

function App() {

  let [items, setItems] = useState(itemData);

  // 페이지 이동을 도와주는 useNavigate()
  let navigate = useNavigate();

  return (
    <div className="App">

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={() => navigate('/')}>BingBong Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#features">features</Nav.Link>
            <Nav.Link onClick={() => navigate('/detail')}>detail</Nav.Link>
          {/*
            navigate(1) : 앞으로 가기
            navigate(-1) : 뒤로 가기
           */}
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
                 items.map(item => {
                      return (
                          <Card navigate = {navigate} item={item} />
                      )
                    })
                  }
                </Row>
              </Container>
              <button onClick={() => {
                axios.get('https://codingapple1.github.io/shop/data2.json')
                    .then((data) => {
                      data.data.map(item => {items.push(item)});
                      setItems([...items]);
                    })
                    .catch(() => {
                      console.log("통신실패함")
                    })

                // 동시에 여러개 ajax 요청하기
                // Promise.all(
                //     axios.get('url1'),
                //     axios.get('url2')
                // )
                //     .then((data) => {})
              }}>버튼</button>
            </div>
          </div>
        } />
        <Route path="/detail/:itemId" element={<ItemDetail items={items} />} />
        <Route path="*" element={<h4>없는 페이지다. (404)</h4>} />

        {/*
         - Nested Routes?
         Route 태그 안에 Route 태그가 또 들어간 것
         아래의 member, location 은 각각 /about/member, /about/location 을 의미한다.

         - 바깥 Route 태그의 element 와 내부 Route 태그의 element 가 동시에 보인다.
         단 바깥 element html 에 <Outlet /> 사용해줘야 함
         <Outlet /> 이 기입된 위치에 내부 Route 태그의 element html 이 들어감

         - Nested Routes 가 쓰이는 경우
         여러 페이지를 제작해야 하는데, 각 페이지간의 유사한 부분이 많을 때
         */}
        <Route path="/about" element={<About/>}>
          <Route path="member" element={<div>멤버 about 임</div>} />
          <Route path="location" element={<div>위치 about 임</div>}/>
        </Route>
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
  let itemId = item.id;

  return (
    <Col>
      <div onClick={() => props.navigate(`/detail/${itemId}`)}>
        <img className="item-image" src={itemImage} alt="이미지 로드 에러" />
        <h4>{itemTitle}</h4>
        <p>{itemContent}</p>
        <p>{itemPrice}</p>
      </div>
    </Col>
  )
}

function About() {
  return (
    <div>
      <h4>회사 정보임</h4>
      <Outlet />
    </div>
  )
}

export default App;
