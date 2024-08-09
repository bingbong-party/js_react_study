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
  let [blogTitle, func] = useState('내 블로그다 이 자식아');
  let [postTitles, upStairSort] = useState(['버스트 공략', '레데리2 고수 되는 법', '노멘 최소 스펙']);
  let [likeCountArray, plusLikeCount] = useState([3, 5, 2]);

  function clickLikeButton(index) {
    console.log("왜실행됨????????")
    likeCountArray[index]++;

    /**
     * plusLikeCount([likeCountArray]) 와 같이 하면 바로 html에 적용되지 않음
     * State변경할 때, 주소값이 동일하면 변경되지 않음.
     * 즉, 배열의 요소들 중 일부 값을 바꾼다고 주소값이 변경되는 것은 아니기 때문에
     * 데이터 변경이 적용되지 않는 것임
     * 
     * 이 때 plusLikeCount([...likeCountArray])처럼 하면 또 다른 주소값이 부여된
     * 전혀 다른 배열이 생성되기 때문에, State변경이 적용되고 html에도 바로바로 변경값이 적용된다.
     */

    plusLikeCount([...likeCountArray])
  }

  function titleUpstairSort() {
    postTitles.sort();
    upStairSort([...postTitles])
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{ color: 'white', fontSize: '20px' }}>
          {blogTitle}
        </h4>
      </div>

      <button onClick={() => titleUpstairSort()}>제목 오름차순 정렬</button>

      <div className="post-list">
        <h4>{postTitles[0]} <span onClick={() => { clickLikeButton(0) }}>👍</span> {likeCountArray[0]} </h4>
        <p>2월 17일 발행</p>
      </div>

      <div className="post-list">
        <h4>{postTitles[1]} <span onClick={() => { clickLikeButton(1) }}>👍</span> {likeCountArray[1]} </h4>
        <p>2월 17일 발행</p>
      </div>

      <div className="post-list">
        <h4>{postTitles[2]} <span onClick={() => { clickLikeButton(2) }}>👍</span> {likeCountArray[2]} </h4>
        <p>2월 17일 발행</p>
      </div>
    </div>
  );
}

export default App;
