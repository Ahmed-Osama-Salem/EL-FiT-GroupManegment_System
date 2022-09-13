import React from "react";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import Preload from "./preloade-comp/Preload";

function Home(props) {
  const navSheets = useNavigate();
  const navToTechRoute = useNavigate();
  const navToConstSheets = () => {
    navSheets("/sheets");
  };

  return props.isLoad ? (
    <Preload />
  ) : (
    <section className="home-sec">
      <div className="home-head">
        <button className="btn2" type="button" onClick={props.logout}>
          تسجيل الخروج
        </button>
        <div className="avatar-sec">
          <h2 className="hello-avatar">مرحبا {props.userData.arbicName}</h2>
          <img
            className="home-avatar"
            src={props.userData.avatar}
            alt="avatar"
          />
          <Link className="profile " to="/profile">
            profile
          </Link>
        </div>
      </div>

      <div className="home-contact">
        <div>
          <img src="images/money.png" alt="ادارة " />
          <h2>إدارة المكتب الفنى</h2>
          <button
            className="btn2"
            type="button"
            onClick={() => navToTechRoute("/Technical-office")}
          >
            اضغط هنا
          </button>
        </div>
        <div>
          <img src="images/contract.png" alt="ادارة " />
          <h2>إدارة التنفيذ</h2>
          <button className="btn2" type="button" onClick={navToConstSheets}>
            اضغط هنا
          </button>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Home;
