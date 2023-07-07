import React, { useContext } from "react";
import { Header } from "../components/Header";
import ProductCart from "../components/ProductCart";
import { Col, Row } from "react-bootstrap";
import { ProductContextProvider } from "../utlits/ProductContext";
import { Rating } from "@mui/material";

const Home = () => {
  const product = useContext(ProductContextProvider)

  const handleCategoryChange = (event) => {
    product?.setCategory(event.target.value)
  }

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Row className="container-fluid me-auto ms-auto mt-3">
        {/* Filter */}
        <Col sm={12} className="mb-5 border border-3 p-2 d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">
          <div className="mb-3 mb-sm-0">
            <select className="form-select" onChange={handleCategoryChange} value={product?.category}>
              <option value={''}>
                {'اختر التصنيف'}
              </option>
              {product?.categories?.map((category) => (
                <option key={category.id} value={category.category}>
                  {category.category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group d-flex flex-column flex-sm-row align-items-center">
            <div className="input-group mb-3 mb-sm-0">
              <input onChange={(e) => product?.setMaxPrice(e.target.value)} type="number" className="form-control" placeholder="الحد الاقصي" id="max-price" />
              <span className="input-group-text">-</span>
              <input onChange={(e) => product?.setMinPrice(e.target.value)} type="number" className="form-control" placeholder="الحد الادني" id="min-price" />
            </div>
          </div>
        </Col>
        {/* Filter */}
        {product.products.map((product) => (
          <Col key={product.id} sm={6} md={3} lg={3} className="mb-5">
            <Rating className="w-100 justify-content-center" name="read-only" value={product?.average_rating} readOnly />
            <ProductCart product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
