import React, { useContext, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { server } from "../Server";
import { Header } from "../components/Header";
import Var from "../components/Var";
import { AuthContextProvider } from "../utlits/AuthContext";
import { Rating } from "@mui/material";
import Review from "../components/Review";
import RelatedProducts from "../components/RelatedProducts";

const ProductDetails = () => {
  const location = useLocation();
  const { product } = location.state;

  const userContext = useContext(AuthContextProvider)

  const [rev, setRev] = useState(2)
  const [comment, setComment] = useState("")

  const sendReview = () => {
    fetch(`${server}products/${product.id}/ratings/${localStorage.getItem('user_id')}/${rev}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: comment
      })
    })
      .then((e) => e.json())
      .then((e) => {
        alert('تم اضافة تعليقك شكرا لك, ملحوظة: يجب اعادة تحميل الصفحة الرئيسية لرؤية تقييمك')
        setComment('')
        setRev(0)
      }
      )
  }

  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <br />
      {/* product */}
      <div className="text-center shadow container mt-5">
        <Rating name="read-only" value={product?.average_rating} readOnly />
      </div>
      <div className="card text-center shadow container mt-4">
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
                <Var userContext={userContext} key={e.id} e={e} />
              )
              )}
            </div>
          </div>
        </div>
      </div>
      {/* product */}
      <hr className="mt-5" />

      {/* reviews */}
      <div className="w-100 text-end container mb-3">
        <strong className="text-bg-dark p-2 rounded-5 text-end">المراجعات</strong>
        <strong className="text-end me-3">{product?.ratings?.length}</strong>
      </div>
      {product?.ratings?.map((e) =>
        <div key={e.id}>
          <Review product={e} />
        </div>
      )}
      {/* reviews */}

      {/* add review */}
      <div className="container justify-content-end d-flex flex-column text-end mb-5 border border-primary border-2 p-3 rounded-3">
        <div className="w-100 text-end mb-3 mt-3">
          <strong className="text-bg-secondary p-2 rounded-5 text-end">اضف تعليقك عن المنتج</strong>
        </div>
        <Rating
          name="simple-controlled"
          style={{ marginLeft: "auto", marginTop: "10px" }}
          value={rev}
          onChange={(event, newValue) => {
            setRev(newValue);
          }}
        />
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="m-auto w-100 mt-2 text-end" placeholder='أكتب خبرتك مع المنتج (اختياري)'></textarea>
        <button onClick={sendReview} className="ms-auto mt-2 btn btn-primary">ارسال</button>
      </div>
      {/* add review */}

      {/* related products */}
      <RelatedProducts product={product} />
      {/* related products */}
    </>
  );
};

export default ProductDetails;
