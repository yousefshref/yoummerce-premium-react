import React, { useContext, useRef, useState } from "react";
import { AuthContextProvider } from "../utlits/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';


const Login = () => {
  const auth = useContext(AuthContextProvider);
  const [login, setLogin] = useState(true);


  return login ? (
    <div className="login W-100 d-flex flex-row gap-2">
      <div className="login_left d-none d-lg-block w-50">
        <span className="d-flex flex-column justify-content-center h-100">
          <span className="d-flex justify-content-center">
            <img src="/images/logo2.png" className="img-fluid" alt="ym logo"/>
          </span>
          <p
            className="text-center mt-3"
            style={{ color: "black", fontWeight: "bold" }}
          >
            <mark style={{ backgroundColor: "white" }}>
              تحوّل عملك إلى تجربة مثالية, ابدأ بتحسين أداء أعمالك اليوم
            </mark>
          </p>
        </span>
      </div>
      <div className="login_right m-auto mb-auto mt-auto text-center w-75 w-md-50 justify-content-center d-flex flex-column mb-5">
        <div className="login_right_top mb-5 mt-5">
          <h4 style={{ color: "#333333" }}>أهلا بك مجددا</h4>
          <h1>
            <span style={{ color: "#dc3545" }}>YOU</span>MMERCE
          </h1>
          <small style={{ fontWeight: "bold", color: "#6A6A6A" }}>
            مرحبًا بك! سجّل دخولك الآن واستمتع بتجربة تسوق فريدة ومميزة.
          </small>
        </div>
        <div className="login_right_mid mt-5 mb-5">
          <form onSubmit={auth.login}>
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                placeholder="اسم المستخدم"
                onChange={(e) => auth.setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="password"
                placeholder="كلمة المرور"
                onChange={(e) => auth.setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-danger w-100 mb-3">سجل الدخول</button>
          </form>
          <div className="signup_redirect">
            <strong>
              ليس لديك حساب ؟{" "}
              <strong
                className="text-primary"
                onClick={() => setLogin(false)}
                style={{ cursor: "pointer" }}
              >
                انشئ حساب الأن
              </strong>
            </strong>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="login W-100 d-flex flex-row gap-2">
      <div className="login_left d-none d-lg-block w-50">
        <span className="d-flex flex-column justify-content-center h-100">
          <span className="d-flex justify-content-center">
            <img src="/images/logo2.png" className="img-fluid" alt="ym logo"/>
          </span>
          <p
            className="text-center mt-3"
            style={{ color: "black", fontWeight: "bold" }}
          >
            <mark style={{ backgroundColor: "white" }}>
              تحوّل عملك إلى تجربة مثالية, ابدأ بتحسين أداء أعمالك اليوم
            </mark>
          </p>
        </span>
      </div>
      <div className="login_right m-auto mb-auto mt-auto text-center w-75 w-md-50 justify-content-center d-flex flex-column mb-5">
        <div className="login_right_top mb-5 mt-5">
          <h4 style={{ color: "#333333" }}>مرحبا بك في</h4>
          <h1>
            <span style={{ color: "#dc3545" }}>YOU</span>MMERCE
          </h1>
          <small style={{ fontWeight: "bold", color: "#6A6A6A" }}>
            مرحبًا بك! سجّل دخولك الآن واستمتع بتجربة تسوق فريدة ومميزة.
          </small>
        </div>
        <div className="login_right_mid mt-5 mb-5">
          <form onSubmit={auth.register}>
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                placeholder="اسم المستخدم"
                onChange={(e) => auth.setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="email"
                placeholder="الايميل"
                onChange={(e) => auth.setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="password"
                placeholder="كلمة المرور"
                onChange={(e) => auth.setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-danger w-100 mb-3">سجل الدخول</button>
          </form>
          <div className="signup_redirect">
            <strong>
              هل لديك حساب بالفعل ؟{" "}
              <strong
                className="text-primary"
                onClick={() => setLogin(true)}
                style={{ cursor: "pointer" }}
              >
                قم بتسجيل الدخول
              </strong>
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
