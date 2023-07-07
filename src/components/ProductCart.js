import React from "react";
import { Card, Carousel } from "react-bootstrap";
import { server } from "../Server";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContextProvider } from "../utlits/AuthContext";

const ProductCart = ({ product }) => {
  const navigate = useNavigate();


  const userContext = useContext(AuthContextProvider)

  // const addToCart = () => {
  //   const res = fetch(`${server}cart/user/${localStorage.getItem('user_id')}/product/${product?.id}/var/${product?.Var[0]?.id}/`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       "quantity": 1
  //     })
  //   })
  //   res.then(() => alert('تمت الاضافة الي السلة بنجاح'))
  // }

  // console.log(product);

  return (
    <Card id="product_cart_home">
      {/* <img onClick={addToCart} id="shopping_cart" style={{ width: "35px", position: "absolute", zIndex: "1", top: "-15px", backgroundColor: "#f5b8b8", padding: "2px", borderRadius: "100px" }} alt="shopping cart" src="/images/shopping-cart.png" /> */}
      {/* {product?.Var[0]?.befor_discount !== 0 ? <img style={{ width: "100px", position: "absolute", zIndex: "1", top: "-27px", right:"0px" }} alt="offer" src="/images/offer.png" />:null} */}
      {product?.Var?.map((e) => e?.befor_discount !== 0 ? <img style={{ width: "100px", position: "absolute", zIndex: "1", top: "-27px", right:"0px" }} alt="offer" src="/images/offer.png" />:null)}
      <Carousel>
        {product?.images?.map((image) => (
          <Carousel.Item key={image.id}>
            <img
              className="d-block w-100"
              src={server + image.image}
              alt={`Slide ${image.id}`}
              onClick={() =>
                navigate(`/product/${product.name}`, {
                  state: { product: product },
                })
              }
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <Card.Body>
        <Card.Title className="text-center">{product.name} {product?.Var?.length > 1 && <strong className="text-black-50" style={{fontSize:"12px"}}>(يوجد أنواع منه)</strong>}</Card.Title>
        <Card.Text className="text-center">
          {product?.description?.length > 100
            ? product.description.slice(0, 100) + "..."
            : product.description}
        </Card.Text>

        <hr />
        <div className="d-flex w-100 justify-content-between">
          <div>
            {userContext?.user?.is_staff ? <Card.Text className="text-end m-auto" style={{ fontSize: "20px", fontWeight: "bolder" }}>{product?.Var[0]?.consumer_commission} <span style={{ fontSize: "13px", color: "gray" }}>EGP</span> <span style={{ fontSize: "13px", color: "gray" }}>العمولة</span> </Card.Text> : null}
            {product?.Var[0]?.stock <= 5 ? <Card.Text className="text-end m-auto" style={{ fontSize: "20px", fontWeight: "bolder" }}>{product?.Var[0]?.stock} <span style={{ fontSize: "13px", color: "gray" }}>المتبقي</span> </Card.Text> : null}
          </div>
          <div>
            <div className="d-flex">
            {product?.Var[0]?.befor_discount === 0 ? null : <Card.Text className="text-end m-auto" style={{ fontSize: "15px", fontWeight: "bolder" }}><span id="before_discount">{product?.Var[0]?.befor_discount}</span> <span style={{ fontSize: "12px", color: "gray" }}> بدلا من </span></Card.Text>}
            <Card.Text className="text-end m-auto" style={{ fontSize: "20px", fontWeight: "bolder" }}>{product?.Var[0]?.sell_price} <span style={{ fontSize: "13px", color: "gray" }}>EGP</span></Card.Text>
            </div>
            <Card.Text style={{ fontSize: "13px", color: "#ff5774" }} className="fw-bold text-end m-auto">{product?.category}</Card.Text>
          </div>
        </div>

      </Card.Body>
    </Card>
  );
};

export default ProductCart;
