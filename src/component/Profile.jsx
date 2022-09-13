import React from "react";
import { useNavigate } from "react-router-dom";

function Profile(props) {
  const backToHome = useNavigate();
  function backHome() {
    backToHome("/Homepage");
  }
  return (
    <div className="profile-card">
      <div className="user-card">
        <div className="head-user">
          <img src={props.userData.avatar} alt="pro" />
          <h2> {props.userData.arbicName}</h2>
        </div>
        <div>
          <h3>{props.userData.job} : المنصب</h3>
          <h3>الوظيفة : {props.userData.jobDis}</h3>
          <h3>{props.userData.userName} : اسم المستخدم </h3>
          <h3>{props.userData.password} : الباسورد</h3>
        </div>
      </div>
      <button className="btn2" type="button" onClick={backHome}>
        الرجوع للقائمة
      </button>
    </div>
  );
}

export default Profile;
