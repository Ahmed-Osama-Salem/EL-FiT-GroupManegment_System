import React, { useState } from "react";
import Footer from "./Footer";
import Inputs from "./Inputs";
import users from "../users";
import { useNavigate } from "react-router-dom";
import Preload from "./preloade-comp/Preload";

function Signup(props) {
  const [text, setText] = useState({
    fName: "",
    pass: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  // const [fit, ahmed, shafy, esmail, negdy] = users;

  //track username from array of object.
  const inputText = (e) => {
    const newValue = e.target.value;
    const newName = e.target.name;
    setErrorMessage("");
    setText({ ...text, [newName]: newValue });
  };

  //handle submit button and vaildaition
  function handleSubmitButton(e) {
    e.preventDefault();
    props.setIsLoad(true);
    for (let i = 0; i < users.length; i++) {
      if (text.fName === users[i].userName && text.pass === users[i].password) {
        localStorage.setItem("token", JSON.stringify(users[i]));
        props.saveUserData();
        props.loaderEffect();
        navigate("Homepage");
      } else {
        setErrorMessage("wrong username or password");
      }
    }
  }

  return props.isLoad ? (
    <Preload />
  ) : (
    <section>
      <div className="header">
        <div className="head-sign">
          <div>
            <div className="img-box">
              <img
                src="images/elfitlogoone.png"
                alt="fit-logo"
                className="fit-logo-round"
              />
              <img
                src="images/logotwo.png"
                alt="fit-logo"
                className="fit-logo-main"
              />
            </div>
            <div className="header-text">
              <h1>الفيــت جــروب</h1>
              <p>للمقــاولات العــامة و التدريبــات الهندسيــة</p>
            </div>
          </div>
          <div>
            <form className="form" onSubmit={handleSubmitButton}>
              <Inputs
                type="text"
                placeholder="Username"
                name="fName"
                autoCompelete="off"
                onType={inputText}
                value={text.fName}
                requierd="on"
                label="اسم المستخدم"
              />
              <Inputs
                type="password"
                placeholder="Password"
                name="pass"
                autoCompelete="off"
                onType={inputText}
                value={text.pass}
                requierd="on"
                label="الرقم السرى"
              />

              <button type="submit">تسجيل الدخول</button>
              {errorMessage && <div className="error-mes">{errorMessage}</div>}
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </section>
  );
}

export default Signup;
