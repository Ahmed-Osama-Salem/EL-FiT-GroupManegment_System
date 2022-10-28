import React, { useState } from "react";

function StoreTable(props) {
  const [time] = useState(props.mongoStore.timeNow);
  const [date] = useState(props.mongoStore.dateNow);
  const [storeInputs] = useState(props.mongoStore.storeInputs);

  return (
    <tr key={props.mongoStore._id}>
      <td>{props.num + 1}</td>
      <td>{date}</td>
      <td>{time}</td>
      {storeInputs.map((s, i) => {
        return (
          <tr key={i} className="store-grid">
            <td style={{ paddingLeft: "30px" }}>{s.totalNum}</td>
            <td style={{ paddingLeft: "30px" }}>{s.storeItem}</td>
          </tr>
        );
      })}
      <td>{props.mongoStore.formText.storeDate}</td>
      <td>{props.mongoStore.formText.notes}</td>
      <td>{props.mongoStore.formText.sign}</td>
      <div className="flex-btn">
        <button
          type="button"
          className="btn3"
          onClick={() => props.storeOnRemove(props.num, props.mongoStore._id)}
        >
          حذف الخلية
        </button>
        <button
          type="button"
          className="btn4"
          onClick={() =>
            props.updateOnCellStore(props.num, props.mongoStore._id)
          }
        >
          تعديل الخلية
        </button>
      </div>
    </tr>
  );
}

export default StoreTable;
