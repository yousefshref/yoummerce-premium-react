import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AuthContextProvider } from "../utlits/AuthContext";
import { ProductContextProvider } from "../utlits/ProductContext";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

export const Header = () => {
  const auth = useContext(AuthContextProvider);
  const product = useContext(ProductContextProvider);

  const navigate = useNavigate()

  return (
    <Navbar className="shadow fixed-top" bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#/" >
          <img style={{ width: "100px", height: "70px" }} src="/images/logo.png" alt="yoummerce logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-0 me-auto gap-5"
            style={{ maxHeight: "200px" }}
            navbarScroll
          >
            <strong className="m-auto text-black-50 text-end" style={{ cursor: "pointer" }} onClick={() => navigate('/')}>المنتجات</strong>
            <strong className="m-auto text-black-50" style={{ cursor: "pointer" }} onClick={() => navigate('/cart')}><span className="text-danger">{product?.cart?.cart_items?.length}</span> حقيبتك</strong>
            <strong className="m-auto text-black-50" style={{ cursor: "pointer" }} onClick={() => navigate('/orders')}>مشترياتك</strong>
          </Nav>
          <Form>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => product.setSearch(e.target.value)}
            />
          </Form>
          <Dropdown>
            <Dropdown.Toggle variant="white" id="dropdown-basic">
              welcome <strong className="text-primary">{auth?.user?.username}</strong>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item className="text-danger" style={{ cursor: "pointer" }} onClick={() => auth.logout()}>log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* <strong className="ms-2 text-danger" style={{ cursor: "pointer" }} onClick={() => auth.logout()}>log out</strong> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
