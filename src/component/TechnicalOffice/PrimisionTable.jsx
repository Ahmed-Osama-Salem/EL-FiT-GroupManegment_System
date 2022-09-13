import React, { useState } from "react";

function PrimisionTable(props) {
  const [timeNow] = useState(props.formItem.timeNow);
  const [dateNow] = useState(props.formItem.dateNow);
  const [allSupplies] = useState(props.formItem.supplyInputs);

  let totalStore; //for multiply amount and topics
  // let subtractStore; //for subtract amount and topics from paid

  const getTotal = (amount, topic) => {
    totalStore = amount * topic;
    return totalStore;
  };

  // const getSubtract = (totalStore, pay) => {
  //   subtractStore = totalStore - pay;
  //   return subtractStore;
  // };

  return (
    <tr key={props.formItem._id}>
      <td>{props.num + 1}</td>
      <td>{dateNow}</td>
      <td>{timeNow}</td>
      {allSupplies.map((allSup, i) => {
        return (
          <tr key={i} className="organize-supplies">
            <td style={{ paddingLeft: "8px" }}>{allSup.supplyName}</td>
            <td style={{ paddingLeft: "0" }}>{allSup.band}</td>
            <td style={{ paddingLeft: "8px" }}>{allSup.unit}</td>
            <td style={{ paddingLeft: "35px" }}>{allSup.amount}</td>
            <td style={{ paddingLeft: "20px" }}>{allSup.topic}</td>
            <td style={{ paddingLeft: "30px" }}>
              {getTotal(allSup.amount, allSup.topic)}
            </td>
          </tr>
        );
      })}
      <td>{props.formItem.formData.total}</td>
      <td>{props.formItem.formData.supplyDate}</td>
      <td>{props.formItem.formData.paid}</td>
      <td>{props.formItem.formData.subPaid}</td>
      <td>{props.formItem.formData.notes}</td>
      <td>{props.formItem.formData.sign}</td>
      <div className="flex-btn">
        <button
          type="button"
          className="btn3"
          onClick={() => props.primOnRemove(props.num, props.formItem._id)}
        >
          حذف الخلية
        </button>
        <button
          type="button"
          className="btn4"
          onClick={() => props.updateOnePayCell(props.num, props.formItem._id)}
        >
          تعديل الخلية
        </button>
      </div>
    </tr>
  );
}

export default PrimisionTable;
