import {useParams} from "react-router-dom";
import styled from "styled-components";
import {useEffect, useState} from "react";

import {Nav} from "react-bootstrap";

let YellowBtn = styled.button`
    background: ${props => props.bgColor};
    color: ${props => props.bgColor == 'blue' ? "white" : "black"};
    padding: 10px
`

// styled components 는 기존 스타일을 복제해서 쓸 수도 있다.
// let NewBtn = styled.button(YellowBtn)`
//      이 부분은 기존 YellowBtn 외의 사항을 커스터마이징할 수 있음
// `

function ItemDetail(props) {
    let [alertStatus, setAlertStatus] = useState(true);
    let [inputData, setInputData] = useState('');
    let [numberAlertStatus, setNumberAlertStatus] = useState(false);

    let [showTabNumber, setShowTabNumber] = useState(1);

    let [tabFade, setTabFade] = useState(false);

    // useEffect 는 mount, update 시 실행 됨
    useEffect(() => {
        // 해당 부분 코드는 mount, update 시에 실행됨 (렌더링 다 끝나고 동작)
        let timer = setTimeout(() => {
            setAlertStatus(false)
        }, 2000);

        if (containsNonNumeric(inputData)) {
            setNumberAlertStatus(true)
        } else {
            setNumberAlertStatus(false)
        }

        // return() => 문은 useEffect 동작 전에 실행된다
        return () => {
            // return 문에서는 아래처럼 기존 코드를 청소(?)하는 코드를 많이 작성한다.
            clearTimeout(timer);
        }
    }, [inputData]);
    // 뒷부분 []은 useEffect 실행조건 널을 수 있음
    // 즉, 위 처럼 alertStatus 가 들어가있으면 alertStatus 값이 변경될 때 실행됨

    useEffect(() => {
        /**
         * <시간차를 두고 setTabFace 를 다시 true 로 변경하는 이유>
         * useState 는 변경함수를 연속으로 실행할 경우에 마지막 값으로 퉁쳐서 한번만 실행된다. => 리액트의 automatic batching 기능
         * 즉, 시간차 없이 setTabFade(false); setTabFade(true); 가 연속으로 실행되면 setTabFade(true) 한 번만 실행되는 것과 같음.
         * 따라서 우리가 원하는 애니메이션 결과를 얻을 수 없기 때문에
         * setTimeout 함수를 사용해 두 함수 간의 시간차를 두는 것이다.
         *
         * 아래처럼 작성할 경우 setTabFade(false) 실행 후, 10ms 뒤에 setTabFade(true) 실행 됨
         */
        let fadeTimer = setTimeout(() => { setTabFade(true)}, 10)

        return () => {
            clearTimeout(fadeTimer);
            setTabFade(false);
        }
    }, [showTabNumber]);

    let {itemId} = useParams();

    // === 사용 시 타입까지 같은지 비교하기 때문에 원하는 결과를 얻지 못할 수 있음
    let item = props.items.find(data => data.id == itemId);

    let itemTitle = item.title;
    let itemContent = item.content;
    let itemImage = item.image;
    let itemPrice = item.price;

    return (
        <div className="container">
            <div className="alert alert-warning" style={{display: alertStatus ? "block" : "none"}}>
                2초 이내 구매시 할인
            </div>
            <div className="row">
                <div className="col-md-6">
                    <img src={itemImage} width="100%"/>
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{itemTitle}</h4>
                    <p>{itemContent}</p>
                    <p>{itemPrice}</p>
                    <div className="alert alert-danger" role="alert"
                         style={{display: numberAlertStatus ? "block" : "none"}}>
                        좋은 말 할 때 숫자만 입력해라
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="type only number"
                               aria-label="Recipient's username" aria-describedby="button-addon2"
                               onChange={(e) => {
                                   setInputData(e.target.value)
                               }}/>
                        <button className="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
                    </div>
                    <YellowBtn bgColor="blue">주문하기</YellowBtn>
                    <YellowBtn bgColor="yellow">주문하기</YellowBtn>
                </div>
            </div>

            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={() => {
                        setShowTabNumber(1)
                    }}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={() => {
                        setShowTabNumber(2)
                    }}>버튼2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={() => {
                        setShowTabNumber(3)
                    }}>버튼3</Nav.Link>
                </Nav.Item>
            </Nav>

            <div className={"start" + (tabFade ? " end" : "")}>
            {/*<div className={`start${tabFade ? " end" : ""}`}>*/}
                <TabContents showTabNumber={showTabNumber}/>
            </div>
        </div>
    )
}

function containsNonNumeric(value) {
    // 입력값에서 공백 제거
    const trimmedValue = value.replace(/\s+/g, '');

    // 숫자 외의 문자 검사
    const nonNumericPattern = /[^0-9]/;
    return nonNumericPattern.test(trimmedValue);
}

function TabContents({showTabNumber}) { // 이런식으로 {} 를 사용하면 props 사용 없이 매개변수 사용 가능
    if (showTabNumber == 1) {
        return (
            <div>내용1</div>
        )
    } else if (showTabNumber == 2) {
        return (
            <div>내용2</div>
        )
    } else if (showTabNumber == 3) {
        return (
            <div>내용3</div>
        )
    } else {
        return (
            <div>에러내용</div>
        )
    }
}

export default ItemDetail;