import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { Card, Carousel } from "react-bootstrap";
import { server } from "../Server";
import { AuthContextProvider } from "../utlits/AuthContext";

export const ProductsRelated = ({ product }) => {
  const navigate = useNavigate();
  const userContext = useContext(AuthContextProvider)
  return (
    <Card id="products_cart_home">
      <Carousel>
        {product?.images?.map((image) => (
          <Carousel.Item key={image?.id}>
            <img
              className="d-block w-100"
              src={server + image?.image}
              alt={`Slide ${image?.id}`}
              // onClick={() => console.log(product)}
              onClick={() =>
                navigate(`/product/${product.name}`, {
                  state: { product: product },
                  replace: true,
                })
              }
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <Card.Body>
        <Card.Title className="text-center">{product.name}</Card.Title>
        <Card.Text className="text-center">
          {product.description.length > 100
            ? product.description.slice(0, 100) + "..."
            : product.description}
        </Card.Text>
        <hr />
        <Card.Text>Price: {product.Var[0].sell_price}</Card.Text>
        {userContext?.user?.is_staff ? <Card.Text>EGP {product.Var[0].consumer_commission} :العمولة</Card.Text> : null}
        {product?.Var[0]?.stock <= 5 ? <Card.Text>{product.Var[0].stock} :كمية المخزن</Card.Text> : null}
      </Card.Body>
    </Card>
  );
};
