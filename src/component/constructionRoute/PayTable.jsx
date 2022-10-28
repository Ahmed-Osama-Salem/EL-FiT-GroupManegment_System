import React, { useState } from "react";

function PayTable(props) {
  const [timeNow] = useState(props.tableItems.timeNow);
  // const [dateNow] = useState(props.tableItems.dateNow);
  return (
    <tr key={props.num}>
      <td>{props.num + 1}</td>
      <td style={{ padding: "0 10px" }}>
        {props.tableItems.allPayText.dateNow}
      </td>
      <td style={{ textAlign: "center" }}>{timeNow}</td>
      <td>{props.tableItems.allPayText.elwahdaName}</td>
      <td>{props.tableItems.allPayText.jobs}</td>
      <td>{props.tableItems.allPayText.contractorName}</td>
      <td>{props.tableItems.allPayText.band}</td>
      <td>{props.tableItems.allPayText.unit}</td>
      <td>{props.tableItems.allPayText.kmia}</td>
      <td>{props.tableItems.allPayText.payDate}</td>
      <td>{props.tableItems.allPayText.reciverName}</td>
      <td>{props.tableItems.allPayText.note}</td>
      <td style={{ width: "100px" }}>
        {props.tableItems.allPayText.signiture}
      </td>
      <div className="flex-btn">
        <button
          type="button"
          className="btn3"
          onClick={() => props.payOnRemove(props.num, props.tableItems._id)}
        >
          حذف الخلية
        </button>
        <button
          type="button"
          className="btn4"
          onClick={() =>
            props.updateOneCellPay(props.num, props.tableItems._id)
          }
        >
          تعديل الخلية
        </button>
      </div>
    </tr>
  );
}

export default PayTable;
