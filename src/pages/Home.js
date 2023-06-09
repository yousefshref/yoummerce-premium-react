import React, { useContext } from "react";
import { Header } from "../components/Header";
import ProductCart from "../components/ProductCart";
import { Col, Row } from "react-bootstrap";
import { ProductContextProvider } from "../utlits/ProductContext";

const Home = () => {
  const product = useContext(ProductContextProvider)
  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Row className="container-fluid me-auto ms-auto">
      {product.products.map((product) => (
        <Col key={product.id} sm={6} md={4} lg={3} className="mb-5">
          <ProductCart product={product} />
        </Col>
      ))}
    </Row>
    </div>
  );
};

export default Home;
