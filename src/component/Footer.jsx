import React, { useState } from "react";

function Footer() {
  const currentDate = new Date();
  let year = currentDate.getFullYear();
  let date = currentDate.toLocaleDateString();
  let time = currentDate.toLocaleTimeString();

  const [currentTime, setCurrentTime] = useState(time);

  function getFullTime() {
    let newTime = new Date().toLocaleTimeString();
    setCurrentTime(newTime);
  }

  setInterval(getFullTime, 1000);

  return (
    <div className="footer">
      <h3>Date: {date}</h3>
      <h3>CopyRight@{year}</h3>
      <h3>Time: {currentTime}</h3>
    </div>
  );
}

export default Footer;
