import { useNavigate } from "react-router-dom";
import React from "react";
import { Card, Carousel } from "react-bootstrap";
import { server } from "../Server";

export const ProductsRelated = ({ product }) => {
  const navigate = useNavigate();
  // const userContext = useContext(AuthContextProvider)
  return (
    <Card id="products_cart_home" className="mb-5">
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
      </Card.Body>
    </Card>
  );
};
