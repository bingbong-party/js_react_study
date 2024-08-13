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

  let [modal, setModal] = useState(0);

  let [modalTitle, setModalTitle] = useState("null");
  
  let [modalPostIndex, setModalPostIndex] = useState(null);

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{ color: 'white', fontSize: '20px' }}>
          {blogTitle}
        </h4>
      </div>

      <button onClick={() => titleUpstairSort()}>제목 오름차순 정렬</button>

      {/* <div className="post-list">
        <h4 onClick={() => modal == 1 ? setModal(0) : setModal(1)}>
          {postTitles[0]}
          <span onClick={() => { clickLikeButton(0) }}>👍</span>
          {likeCountArray[0]}
        </h4>
        <p>2월 17일 발행</p>
      </div>

      <div className="post-list">
        <h4>{postTitles[1]} <span onClick={() => { clickLikeButton(1) }}>👍</span> {likeCountArray[1]} </h4>
        <p>2월 17일 발행</p>
      </div>

      <div className="post-list">
        <h4>{postTitles[2]} <span onClick={() => { clickLikeButton(2) }}>👍</span> {likeCountArray[2]} </h4>
        <p>2월 17일 발행</p>
      </div> */}

      {
        postTitles.map(function (postTitle, index) {
          return (
            <div className="post-list" key={index}>
              <h4 onClick={() => {
                if (modalPostIndex == index) {
                  if (modal == 1) {
                    setModal(0)
                  } else {
                    setModal(1)
                  }
                } else {
                  setModalPostIndex(index)
                  setModal(1)
                }

                setModalTitle(postTitle);
              }}>
                {postTitle}
                <span onClick={() => { clickLikeButton(index) }}>👍</span>
                {likeCountArray[index]}
              </h4>
              <p>2월 17일 발행</p>
            </div>
          )
        })
      }

      {
        // html 중간에 조건문 쓰려면 삼항연산자 사용 (if나 반복문 등 사용 불가)
        /**
         * - 부모->자식 컴포넌트로 state전송하려면 props 문법 사용
         * 1. <자식컴포넌트 변수={state이름}>
         * 2. 자식 컴포넌트에서 props 파라미터 받아서 'props.변수' 사용
         * 3. props 전송은 부모->자식 방향만 가능하다
         * 4. 병렬관계의 컴포넌트끼리도 props 전송이 불가능하다
         */
        modal == 1 ? <Modal modalTitle={modalTitle} /> : null // null : 비어있는 html으로 자주 사용
      }


    </div>
  );
}

/**
 * - 컴포넌트
 * 1. function 만들고
 * 2. return() 안에 html 담기
 * 3. <함수명></함수명> 으로 사용
 * 
 * - 언제 컴포넌트를 쓰는가?
 * 1. 반복적인 html 축약
 * 2. 큰페이지들
 * 3. 자주 변경되는 것들
 * 
 * - 컴포넌트의 단점
 * 1. state 가져다 쓸 때 문제가 생김
 * 2. 너무 남발하면 좋지 않음
 * 
 * - 자식 컴포넌트는 부모의 State를 전달받을 수 있음 (ex.Modal 컴포넌트는 App컴포넌트의 postTitles State를 받을 수 있음)
 */
function Modal(props) { // 대문자 시작 -> 컴포넌트 함수 작명 규칙
  return ( // 태그 병렬 사용 불가 & <div></div> 는 <></>로 대체 가능
    <>
      <div className="modal">
        <h4>{props.modalTitle}</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button>글 수정</button>
      </div>
    </>
  )
}

export default App;
