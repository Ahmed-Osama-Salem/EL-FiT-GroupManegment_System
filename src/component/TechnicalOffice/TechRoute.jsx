import React from "react";
import { useNavigate } from "react-router-dom";

function TechRoute() {
  const backToHomePage = useNavigate();
  const navToPrimSheet = useNavigate();
  const navToStoreSheet = useNavigate();
  return (
    <section className="technical-page">
      <div className="slide-sec">
        <img src="./images/fit-logo.png" alt="logo" />
        <button
          className="btn2"
          type="button"
          onClick={() => backToHomePage("/Homepage")}
        >
          الرجــوع
        </button>
      </div>
      <div className="store">
        <img src="./images/storeImg.png" alt="store" />
        <h2>إدارة المخازن</h2>
        <button
          className="btn2"
          type="button"
          onClick={() => navToStoreSheet("/project-Store")}
        >
          اضغط هنا
        </button>
      </div>
      <div className="primision">
        <img src="./images/primision.png" alt="store" />
        <h2>أذونات التوريد</h2>
        <button
          className="btn2"
          type="button"
          onClick={() => navToPrimSheet("/project-prim")}
        >
          اضغط هنا
        </button>
      </div>
    </section>
  );
}

export default TechRoute;
