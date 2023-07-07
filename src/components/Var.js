import React, { useState } from 'react'
import { server } from '../Server';
import { Card } from 'react-bootstrap';

const Var = ({ e, userContext }) => {
    const [quantity, setQuantity] = useState(0);
    const add_to_cart = async () => {
        await fetch(`${server}cart/user/${localStorage.getItem('user_id')}/product/${e.product}/var/${e.id}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                quantity: quantity
            })
        })
            .then((e) => {
                if (e.status === 200) {
                    alert('تم اضافة المنتج بنجاح')
                    setQuantity(0)
                }
            })
    }
    return (
        <div className="d-flex border shadow-sm mt-3 p-2 flex-column flex-sm-row">
            <ul className="list-group list-group-flush w-100 border mb-3 mb-sm-0">
                <li className="list-group-item">
                    <span className="text-danger fw-bold">النوع: </span>
                    {e?.Var_name}
                </li>
                <li className="list-group-item d-flex justify-content-center">
                    {e?.befor_discount === 0 ? null : (
                        <Card.Text
                            className="text-end m-auto me-0 ms-0"
                            style={{ fontSize: "15px", fontWeight: "bolder" }}
                        >
                            <span id="before_discount">{e?.befor_discount}</span>{" "}
                            <span style={{ fontSize: "12px", color: "gray" }}> بدلا من </span>
                        </Card.Text>
                    )}
                    <Card.Text style={{ fontSize: "20px", fontWeight: "bolder" }}>
                        {e?.sell_price} <span style={{ fontSize: "13px", color: "gray" }}>EGP</span>{" "}
                        <span className="text-danger fs-6">:السعر</span>
                    </Card.Text>
                </li>
                {userContext?.user?.is_staff ? (
                    <li className="list-group-item">
                        <span className="text-danger fw-bold">عمولة المسوق: </span>
                        {e?.consumer_commission}
                    </li>
                ) : null}
                {e?.stock <= 5 ? (
                    <li className="list-group-item">
                        <span className="text-danger fw-bold">المتبقي: </span>
                        {e?.stock}
                    </li>
                ) : null}
            </ul>
            <div className="border p-2 d-flex flex-column justify-content-center">
                <input
                    placeholder="ادخل الكمية التي تحتاجها"
                    className="m-auto mb-1"
                    onChange={(r) => setQuantity(r.target.value)}
                    value={quantity}
                />
                <button onClick={() => add_to_cart()} className="btn btn-primary m-auto mt-1">
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default Var