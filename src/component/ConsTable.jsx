import React, { useState } from "react";

function ConsTable(props) {
  const [timeNow] = useState(props.item.time);
  const [dateNow] = useState(props.item.id);
  const [techData] = useState(props.item.text);
  const [mosadData] = useState(props.item.textMosad);

  return (
    <tr key={props.num} className="active-row">
      <td>{props.num + 1}</td>
      <td>{dateNow}</td>
      <td>{timeNow}</td>
      <td>{props.item.allText.rkmElw7da}</td>
      <td>{props.item.allText.elbnd}</td>
      <td>{props.item.allText.topics}</td>
      <td>{props.item.allText.contractType}</td>
      <td>{props.item.allText.techNumber}</td>
      {techData.map((t, i) => {
        return (
          <ul key={i} className="tech-list">
            <td>{t.text1}</td>
            <td>{t.text2}</td>
          </ul>
        );
      })}
      <td>{props.item.allText.mosadNumber}</td>
      {mosadData.map((m, i) => {
        return (
          <ul key={i} className="tech-list">
            <td>{m.mosadName}</td>
            <td>{m.mosadJob}</td>
          </ul>
        );
      })}

      <td>{props.handelTime(props.item.allText.from)}</td>
      <td>{props.handelTime(props.item.allText.to)}</td>
      <td>
        {props.subtractTimes(props.item.allText.from, props.item.allText.to) +
          ":" +
          props.subtractMin(props.item.allText.from, props.item.allText.to)}
      </td>
      <td>{props.item.allText.noteAdd}</td>
      <td>{props.item.allText.kmiatMon}</td>
      <td>{props.item.allText.tnfizState}</td>
      <td>{props.item.allText.angaz} %</td>
      <td>{props.item.allText.notes}</td>
      <td>{props.item.allText.twqi3}</td>
      <div className="flex-btn">
        <button
          type="button"
          className="btn3"
          onClick={() => props.onRemove(props.num, props.item._id)}
        >
          حذف الخلية
        </button>
        <button
          type="button"
          className="btn3"
          onClick={() => props.onUpdate(props.item._id)}
        >
          تعديل الخلية
        </button>
        <button
          type="button"
          className="btn3"
          onClick={() => props.onShowCell(props.num)}
        >
          عرض
        </button>
      </div>
    </tr>
  );
}

export default ConsTable;
