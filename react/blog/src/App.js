import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  // state 사용하는 이유
  // state는 데이터가 변경되면 html도 자동 재렌더링됨
  // 따라서 바뀐 데이터가 html에 적용됨
  // 변경된 데이터가 html에 자동 적용 되게 하고 싶을 때 사용하면 됨
  // (자주 변경되는 데이터는 State를 사용하면 좋음)
  
  // state 사용 법 - 잠깐 저장하고 싶은 데이터를 괄호 안에 넣음
  // a: state에 보관했던 데이터
  // b: state변경을 도와주는 함수
  let [blogTitle, func] = useState('내 블로그다 이 자식아')
  let [postTitle, func1] = useState(['버스트 공략', '레데리2 고수 되는 법', '노멘 최소 스펙'])

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{ color: 'white', fontSize: '20px' }}>
          {blogTitle}
        </h4>
      </div>

      <div className="post-list">
        <h4>{postTitle[0]}</h4>
        <p>2월 17일 발행</p>
      </div>

      <div className="post-list">
        <h4>{postTitle[1]}</h4>
        <p>2월 17일 발행</p>
      </div>

      <div className="post-list">
        <h4>{postTitle[2]}</h4>
        <p>2월 17일 발행</p>
      </div>
    </div>
  );
}

export default App;
