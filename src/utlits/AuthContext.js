import React, { createContext, useState } from "react";
import { server } from "../Server";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";

const AuthContext = ({ children }) => {
  // consts
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([])


  const register = (event) => {
    event.preventDefault()
    fetch(`${server}register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((e) => e.json())
      .then((e) => {
        if (e.username == 'A user with that username already exists.') {
          alert('اسم المستخدم موجود بالفعل, يرجي تغيير الاسم')
        }
        else {
          const user = jwtDecode(e.access);
          localStorage.setItem("user_id", user.user_id);
          localStorage.setItem("access", e.access);
          localStorage.setItem("refresh", e.refresh);
          alert("تم تسجيل الدخول بنجاح");
          navigate("/");
        }
      });
  };

  const login = (event) => {
    event.preventDefault()
    fetch(`${server}login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((e) => e.json())
      .then((e) => {
        const user = jwtDecode(e?.access);
        localStorage.setItem("user_id", user?.user_id);
        localStorage.setItem("access", e?.access);
        localStorage.setItem("refresh", e?.refresh);
        alert("تم تسجيل الدخول بنجاح");
        navigate("/");
      })
      .catch((e) => {
        alert("حدث شئ خطأ ما, تحقق من معلوماتك");
        console.log(e);
      });
  };

  const logout = async () => {
    alert('تم تسجيل الخروج بنجاح')
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (localStorage.getItem('user_id')) {
      const getUser = () => {
        fetch(`${server}users/${localStorage.getItem("user_id")}/`)
          .then((e) => e.json())
          .then((e) => setUser(e))
      }

      getUser()
    }
  }, [user, username, email, password, localStorage.getItem('user_id')])

  const values = {
    register,
    login,
    logout,
    setUsername,
    setEmail,
    setPassword,
    user
  };
  return (
    <AuthContextProvider.Provider value={values}>
      {children}
    </AuthContextProvider.Provider>
  );
};

export default AuthContext;
export const AuthContextProvider = createContext();
