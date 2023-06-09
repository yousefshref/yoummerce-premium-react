import React, { useContext } from "react";
import { Carousel, Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { server } from "../Server";
import { Header } from "../components/Header";
import { ProductsRelated } from "../components/ProductsRelated";
import Var from "../components/Var";
import { AuthContextProvider } from "../utlits/AuthContext";

const ProductDetails = () => {
  const location = useLocation();
  const { product } = location.state;

  const userContext = useContext(AuthContextProvider)
  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <div className="card text-center shadow container mt-5">
        <div className="row no-gutters">
          <div className="col-md-4">
            <Carousel className="h-100 justify-content-center d-flex flex-column">
              {product?.images?.map((image) => (
                <Carousel.Item key={image.id}>
                  <img
                    className="d-block w-100"
                    src={server + image.image}
                    alt={`Slide ${image.id}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{product?.name}</h5>
              <p className="card-text">{product?.description}</p>
              <hr />
              {product?.Var?.map((e) => (
                <Var userContext={userContext} key={e.id} e={e}/>
              )
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-5" />
      <Row className="container-fluid me-auto ms-auto">
        {product?.related_products?.map((relproduct) => (
          <Col key={relproduct.id} sm={6} md={4} lg={3}>
            <ProductsRelated product={relproduct} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ProductDetails;
