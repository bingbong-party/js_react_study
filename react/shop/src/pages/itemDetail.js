import {useParams} from "react-router-dom";
import styled from "styled-components";
import {useEffect, useState} from "react";

let YellowBtn = styled.button`
    background : ${ props => props.bgColor };
    color : ${ props => props.bgColor == 'blue' ? "white" : "black" };
    padding : 10px
`

// styled components 는 기존 스타일을 복제해서 쓸 수도 있다.
// let NewBtn = styled.button(YellowBtn)`
//      이 부분은 기존 YellowBtn 외의 사항을 커스터마이징할 수 있음
// `

function ItemDetail(props) {
    let [alertStatus, setAlertStatus] = useState(true);

    useEffect(() => {
        // 해당 부분 코드는 mount, update 시에 실행됨 (렌더링 다 끝나고 동작)
        setTimeout(() => {setAlertStatus(false)}, 2000)
    });

    let {itemId} = useParams();

    // === 사용 시 타입까지 같은지 비교하기 때문에 원하는 결과를 얻지 못할 수 있음
    let item = props.items.find(data => data.id == itemId);

    let itemTitle = item.title;
    let itemContent = item.content;
    let itemImage = item.image;
    let itemPrice = item.price;

    return (
        <div className="container">
            <div className="alert alert-warning" style={{display : alertStatus?"block":"none"}}>
                2초 이내 구매시 할인
            </div>
            <div className="row">
                <div className="col-md-6">
                    <img src={itemImage} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{itemTitle}</h4>
                    <p>{itemContent}</p>
                    <p>{itemPrice}</p>
                    <YellowBtn bgColor="blue">주문하기</YellowBtn>
                    <YellowBtn bgColor="yellow">주문하기</YellowBtn>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail;