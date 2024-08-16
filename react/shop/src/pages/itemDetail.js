import {useParams} from "react-router-dom";

function ItemDetail(props) {
    let {itemId} = useParams();

    // === 사용 시 타입까지 같은지 비교하기 때문에 원하는 결과를 얻지 못할 수 있음
    let item = props.items.find(data => data.id == itemId);

    let itemTitle = item.title;
    let itemContent = item.content;
    let itemImage = item.image;
    let itemPrice = item.price;

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={itemImage} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{itemTitle}</h4>
                    <p>{itemContent}</p>
                    <p>{itemPrice}</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail;