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
  let [blogTitle, setBlogTitle] = useState('내 블로그다 이 자식아');

  class Post {
    constructor(title, likeCount, content, date) {
      this.title = title;
      this.likeCount = likeCount;
      this.content = content;
      this.date = date;
    }
  }

  let postlist = [];
  postlist.push(new Post('버스트 공략', 0, '버스트 공략입니다', '2월 5일'));
  postlist.push(new Post('레데리2 고수 되는 법', 0, '레데리2 공략입니다', '2월 12일'));
  postlist.push(new Post('노멘 최소 스펙', 0, '노멘3관문 공략입니다', '4월 5일'));

  let [posts, setPosts] = useState(postlist);

  let [postContentInput, setPostContentInput] = useState('');

  let [modalViewState, setModalViewState] = useState(0);

  let [modalTitle, setModalTitle] = useState("null");

  let [modalPost, setModalPost] = useState(new Post);

  let [modalPostIndex, setModalPostIndex] = useState(null);

  function clickLikeButton(index) {
    posts[index].likeCount++;

    /**
     * plusLikeCount([likeCountArray]) 와 같이 하면 바로 html에 적용되지 않음
     * State변경할 때, 주소값이 동일하면 변경되지 않음.
     * 즉, 배열의 요소들 중 일부 값을 바꾼다고 주소값이 변경되는 것은 아니기 때문에
     * 데이터 변경이 적용되지 않는 것임
     * 
     * 이 때 plusLikeCount([...likeCountArray])처럼 하면 또 다른 주소값이 부여된
     * 전혀 다른 배열이 생성되기 때문에, State변경이 적용되고 html에도 바로바로 변경값이 적용된다.
     */
    setPosts([...posts])
  }

  function titleUpstairSort() {
    posts.sort((a, b) => a.title.localeCompare(b.title));
    setPosts([...posts])
  }

  function createPost(title) {
    posts.push(new Post(
      title,
      0,
      '기본 내용입니다',
      '8월 14일'
    ))

    setPosts([...posts])
  }

  function deletePost(index) {
    posts.splice(index, 1);

    if (modalViewState == 1 && modalPostIndex == index) {
      setModalViewState(0);
    }

    setPosts([...posts])
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{ color: 'white', fontSize: '20px' }}>
          {blogTitle}
        </h4>
      </div>

      <button onClick={() => titleUpstairSort()}>제목 오름차순 정렬</button>

      {
        posts.map(function (post, index) {
          let postTitle = post.title;
          let createDate = post.date;
          let likeCount = post.likeCount;
          let content = post.content;

          return (
            <div className="post-list" key={index}>
              <h4 onClick={() => {
                setModalPost(new Post(postTitle, likeCount, content, createDate));

                if (modalPostIndex == index) {
                  if (modalViewState == 1) {
                    setModalViewState(0)
                  } else {
                    setModalViewState(1)
                  }
                } else {
                  setModalPostIndex(index)
                  setModalViewState(1)
                }

                setModalTitle(postTitle);
              }}>
                {postTitle}
                {/** 
                 * stopPropagation() : 이벤트 버블링 막아줌
                 * 이벤트버블링? 하위 html태그의 기능이 상위 html로 퍼지는 현상
                 * 아래에서 stopPropagation()를 쓰지 않으면 좋아요 버튼을 눌러도 모달창 동작이 실행된다.
                 */}
                <span onClick={(e) => { e.stopPropagation(); clickLikeButton(index); }}>👍</span>
                {likeCount}
                <button onClick={(e) => { e.stopPropagation(); deletePost(index); }}>삭제</button>
              </h4>
              <p>{createDate} 발행</p>
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
        modalViewState == 1 ? <Modal modalPost={modalPost} /> : null // null : 비어있는 html으로 자주 사용
      }

      {
        /**
         * 이벤트 헨들러
         * - onChange
         * - onClick
         * - onInput
         * - onMouseOver
         * - onScroll
         */
      }

      <input onChange={(e) => {
        // state변경함수(여기선 setPostContentInput)는 비동기함수임
        setPostContentInput(e.target.value);
      }}></input>
      <button onClick={() => { createPost(postContentInput); setPostContentInput("") }}>저장</button>

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
  let postTitle = props.modalPost.title;
  let createDate = props.modalPost.date;
  let content = props.modalPost.content;

  return ( // 태그 병렬 사용 불가 & <div></div> 는 <></>로 대체 가능
    <>
      <div className="modal">
        <h4>{postTitle}</h4>
        <p>{createDate}</p>
        <p>{content}</p>
        <button>글 수정</button>
      </div>
    </>
  )
}

export default App;
