function ItemDetail(props) {
    let item = props.item;
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