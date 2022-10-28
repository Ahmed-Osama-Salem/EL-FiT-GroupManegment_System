import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CellRoute({ cellData, setCellData }) {
  const [text] = useState(cellData[0].text);
  const [mosad] = useState(cellData[0].textMosad);

  const goBackSheet = useNavigate();

  const backNav = () => {
    setCellData(null);
    localStorage.removeItem("constCells");
    goBackSheet("/constructionSheet");
  };

  return (
    <section className="cell-sec">
      <div>
        <h2>عرض الخلية رقم </h2>
      </div>
      {cellData.map((data, i) => {
        return (
          <div key={i}>
            <div className="flex-cell-entery">
              <p>
                :الرقم المسلسل <span>{data.i}</span>
              </p>
              <p>
                التاريخ : <span>{data.id}</span>
              </p>
              <p>
                الوقت : <span>{data.time}</span>
              </p>
            </div>
            <div className="flex-cell-second">
              <p>
                البند : <span>{data.allText.elbnd}</span>
              </p>
              <p>
                الوحدة :<span>{data.allText.rkmElw7da}</span>
              </p>
              <p>
                نوع المصنعيه :<span>{data.allText.topics}</span>
              </p>
              <p>
                نوع المقاولة :<span>{data.allText.contractType}</span>
              </p>
            </div>
            <div className="flex-table-show">
              <div>
                <table>
                  <thead>
                    <th>عدد الفنين {data.allText.techNumber}</th>
                    <th>الاعمال</th>
                  </thead>
                  {text.map((t, i) => {
                    return (
                      <tr key={i}>
                        <td>{t.text1}</td>
                        <td>{t.text2}</td>
                      </tr>
                    );
                  })}
                </table>
              </div>
              <div>
                <table>
                  <thead>
                    <th>عدد المساعدين {data.allText.mosadNumber}</th>
                    <th>الاعمــال</th>
                  </thead>
                  {mosad.map((m, i) => {
                    return (
                      <tr key={i}>
                        <td>{m.mosadName}</td>
                        <td>{m.mosadJob}</td>
                      </tr>
                    );
                  })}
                </table>
              </div>
              <div>
                <h3>مدة العمل</h3>
                <p> من :{data.allText.from}</p>
                <p> الى :{data.allText.to}</p>
              </div>
            </div>
            <div className="flex-cell-end">
              <p>
                مذكرة خصم / اضافة :<span>{data.allText.noteAdd}</span>
              </p>
              <p>
                كميات المون :<span>{data.allText.kmiatMon}</span>
              </p>
              <p>
                الموقف التنفيذى :<span>{data.allText.tnfizState}</span>
              </p>
            </div>
            <div className="flex-cell-end">
              <p>
                نسبة الانجاز : % <span>{data.allText.angaz}</span>
              </p>
              <p>
                الملاحظات :<span>{data.allText.notes}</span>
              </p>
              <p>
                التوقيعات :<span>{data.allText.twqi3}</span>
              </p>
            </div>
          </div>
        );
      })}

      <button type="button" className="btn3" onClick={backNav}>
        الرجــوع
      </button>
    </section>
  );
}

export default CellRoute;
