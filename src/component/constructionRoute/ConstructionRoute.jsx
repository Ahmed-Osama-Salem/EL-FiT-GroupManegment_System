import React from "react";
import { useNavigate } from "react-router-dom";

function ConstructionRoute() {
  const navToPaySheet = useNavigate();
  const navToConstructionSheet = useNavigate();
  const backToHome = useNavigate();

  const RouteToPaySheet = () => {
    navToPaySheet("/pay-sheet");
  };
  return (
    <section className="sheets-sec">
      <div className="slide-sec">
        <img src="./images/fit-logo.png" alt="logo" />
        <button
          className="btn2"
          type="button"
          onClick={() => backToHome("/projects")}
        >
          الرجــوع
        </button>
      </div>
      <div className="sheet3">
        <img src="./images/sheet3.png" alt="pic" />
        <h2>الموقف التنفيذى الهندسى</h2>
        <button
          className="btn2"
          type="button"
          onClick={() => navToConstructionSheet("/projects")}
        >
          اضغط هنا
        </button>
      </div>
      <div className="sheet1">
        <img src="./images/sheet1.png" alt="pic" />
        <h2>أذونات صرف</h2>
        <button className="btn2" type="button" onClick={RouteToPaySheet}>
          اضغط هنا
        </button>
      </div>
    </section>
  );
}

export default ConstructionRoute;
