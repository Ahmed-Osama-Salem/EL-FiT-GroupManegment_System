import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import ConsTable from "./ConsTable";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { projectData } from "../projectsData/projects";

function Construction(props) {
  const [allText, setAllText] = useState({
    dateNow: "",
    rkmElw7da: "",
    elbnd: "",
    topics: "",
    contractType: "",
    techNumber: Number(),
    mosadNumber: Number(),
    from: "",
    to: "",
    noteAdd: "",
    kmiatMon: "",
    tnfizState: "",
    angaz: Number(),
    notes: "",
    twqi3: "",
  });

  // const [items, setItems] = useState([]);
  const [text, setText] = useState([{ text1: "", text2: "" }]);
  const [textMosad, setTextMosad] = useState([{ mosadName: "", mosadJob: "" }]);
  const [mongoData, setMongoData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchTech, setSearchTech] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchDateTo, setSearchDateTo] = useState("");

  const currentDate = new Date();

  // let id = currentDate.toLocaleDateString();
  let time = currentDate.toLocaleTimeString();
  let signNameRef = useRef();
  const tableRef = useRef();
  const dateNowRef = useRef();
  const rkmElw7daRef = useRef();
  const elbndRef = useRef();
  const techNumberRef = useRef();
  const mosadNumberRef = useRef();
  const noteAddRef = useRef();
  const kmiatMonRef = useRef();
  const tnfizStateRef = useRef();
  const angazRef = useRef();
  const notesRef = useRef();
  const [tmp, setTmp] = useState();
  const [servId, setServId] = useState();
  const [isUpdate, setIsUpdate] = useState(true);

  //handel input values of form
  function handelConsInputs(e) {
    const newInput = e.target.value;
    const inputName = e.target.name;
    setAllText({ ...allText, [inputName]: newInput });
  }

  // handel mapping of items in form
  function handelConsForm(e) {
    e.preventDefault();
    if (isUpdate) {
      setAllText(allText);
      setText(text);
      subtractTimes();
      subtractMin();
      postToMongo();
      getDataFromMongo();
    } else {
      mongoData[tmp].allText.twqi3 = signNameRef.current.value;
      mongoData[tmp].allText.dateNow = dateNowRef.current.value;
      mongoData[tmp].allText.rkmElw7da = rkmElw7daRef.current.value;
      mongoData[tmp].allText.elbnd = elbndRef.current.value;
      mongoData[tmp].allText.techNumber = techNumberRef.current.value;
      mongoData[tmp].allText.mosadNumber = mosadNumberRef.current.value;
      mongoData[tmp].allText.noteAdd = noteAddRef.current.value;
      mongoData[tmp].allText.kmiatMon = kmiatMonRef.current.value;
      mongoData[tmp].allText.tnfizState = tnfizStateRef.current.value;
      mongoData[tmp].allText.angaz = angazRef.current.value;
      mongoData[tmp].allText.notes = notesRef.current.value;
      putConstrToMongo(
        servId,
        signNameRef.current.value,
        dateNowRef.current.value,
        rkmElw7daRef.current.value,
        elbndRef.current.value,
        techNumberRef.current.value,
        mosadNumberRef.current.value,
        noteAddRef.current.value,
        kmiatMonRef.current.value,
        tnfizStateRef.current.value,
        angazRef.current.value,
        notesRef.current.value
      );
      setIsUpdate(true);
    }
  }

  //handel axios to get data and connect with mongodb to render data
  //now we get all data that posted to data base as api
  // by useEffect
  function getDataFromMongo() {
    Axios.get("https://elfit-group-system.herokuapp.com/read").then(
      (response) => {
        setMongoData(response.data);
      }
    );
  }

  useEffect(() => {
    getDataFromMongo();
  }, []);

  //handel axios to post data and connect with mongodb backend server

  function postToMongo() {
    Axios.post("https://elfit-group-system.herokuapp.com/insert", {
      time: time,
      allText: allText,
      text: text,
      textMosad: textMosad,
    });
  }

  //handel time inputs to return 12 hours render
  function handelTime(from) {
    let time = from
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [from];

    if (time.length > 1) {
      time = time.slice(1, -1);
      time[5] = +time[0] < 12 ? " am" : " pm";
      time[0] = +time[0] % 12 || 12;
    }
    return time.join("");
  }
  //subtract two hours
  function subtractTimes(s, t) {
    let startTime = s?.split("");
    let endTime = t?.split("");
    startTime?.splice(2, 3);
    let join = startTime?.join("");
    let arrOfNum = Number(join);
    endTime?.splice(2, 3);
    let join2 = endTime?.join("");
    let arrOfNum2 = Number(join2);
    return arrOfNum2 - arrOfNum;
  }
  //subtract two min add ? optinal to avoid errors
  function subtractMin(s, t) {
    let startMin = s?.split("");
    let endMin = t?.split("");
    startMin?.splice(0, 3);
    let joinMin = startMin?.join("");
    let arrNum = Number(joinMin);
    endMin?.splice(0, 3);
    let joinMin2 = endMin?.join("");
    let arrNum2 = Number(joinMin2);
    return Math.abs(arrNum - arrNum2);
  }
  //add tech and remove and stats.

  function textGenerate(e, index) {
    let newText = e.target.value;
    let nameText = e.target.name;
    const list = [...text];
    list[index][nameText] = newText; //important
    setText(list);
  }

  //add one tech item
  function generateInputsField() {
    setText([...text, { text1: "", text2: "" }]); //important
  }
  //remove one tech item
  function removeOneItemTech(id) {
    setText(
      text.filter((techText, index) => {
        return index !== id;
      })
    );
  }

  //add and remove mosad with states.

  const mosadGenerate = (e, index) => {
    let newMosad = e.target.value;
    let namemosad = e.target.name;
    const mosadList = [...textMosad];
    mosadList[index][namemosad] = newMosad; //important
    setTextMosad(mosadList);
  };

  //add one mosad item
  function generateMosadField() {
    setTextMosad([...textMosad, { mosadName: "", mosadJob: "" }]); //important
  }

  //remove one mosad item
  function removeOneItemMosad(id) {
    setTextMosad(
      textMosad.filter((mosad, index) => {
        return index !== id;
      })
    );
  }

  //delete on cells of table

  const removeCell = (id, mongoId) => {
    setMongoData(
      mongoData.filter((item, index) => {
        return index !== id;
      })
    );
    Axios.delete(`https://elfit-group-system.herokuapp.com/delete/${mongoId}`);
  };

  //update on cell of table

  const updateCell = (id, mongoId) => {
    signNameRef.current.value = mongoData[id].allText.twqi3;
    dateNowRef.current.value = mongoData[id].allText.dateNow;
    rkmElw7daRef.current.value = mongoData[id].allText.rkmElw7da;
    elbndRef.current.value = mongoData[id].allText.elbnd;
    techNumberRef.current.value = mongoData[id].allText.techNumber;
    mosadNumberRef.current.value = mongoData[id].allText.mosadNumber;
    noteAddRef.current.value = mongoData[id].allText.noteAdd;
    kmiatMonRef.current.value = mongoData[id].allText.kmiatMon;
    tnfizStateRef.current.value = mongoData[id].allText.tnfizState;
    angazRef.current.value = mongoData[id].allText.angaz;
    notesRef.current.value = mongoData[id].allText.notes;
    setTmp(id);
    setServId(mongoId);
    setIsUpdate(false);
  };

  const putConstrToMongo = (
    mongoId,
    newConstrDate,
    dateNow,
    rkmElw7da,
    elbnd,
    techNumber,
    mosadNumber,
    noteAdd,
    kmiatMon,
    tnfizState,
    angaz,
    notes
  ) => {
    Axios.put(`https://elfit-group-system.herokuapp.com/update/${mongoId}`, {
      newConstrDate: newConstrDate,
      dateNow: dateNow,
      rkmElw7da: rkmElw7da,
      elbnd: elbnd,
      techNumber: techNumber,
      mosadNumber: mosadNumber,
      noteAdd: noteAdd,
      kmiatMon: kmiatMon,
      tnfizState: tnfizState,
      angaz: angaz,
      notes: notes,
    });
  };

  //show data of one cell when click on show btn
  const cellNav = useNavigate();
  const storeArray = [];
  function showCellOnClick(id) {
    for (let i = 0; i < mongoData.length; i++) {
      if (i === id) {
        storeArray.push(mongoData[i]);
        localStorage.setItem("constCells", JSON.stringify(storeArray));
        props.saveCellData();
        cellNav("/cellShow");
      }
    }
  }

  //search bar handeling

  const handelSearchBar = (e) => {
    setSearch(e.target.value);
  };

  const backconstPage = useNavigate();

  return (
    <section className="crud-sec">
      <div className="crud-wide">
        <div className="crud-head">
          <h2>المــوقف التنفيــذى الهنــدسى</h2>
          <h3>( {projectData[0].name} )</h3>
        </div>
        <button
          type="button"
          className="btn2"
          onClick={() => backconstPage("/projects")}
        >
          رجــوع
        </button>
        <form className="crud-form" onSubmit={handelConsForm}>
          <label>تاريخ </label>
          <input type="text" name="dateNow" onChange={handelConsInputs} />
          <label>الوحــدة</label>
          <input
            type="text"
            name="rkmElw7da"
            onChange={handelConsInputs}
            ref={rkmElw7daRef}
          />
          <label>البنــد</label>
          <input
            type="text"
            name="elbnd"
            onChange={handelConsInputs}
            ref={elbndRef}
          />
          <div className="select-inputs">
            <label htmlFor="topics">نـوع المصنـعيـات</label>
            <select id="topics" name="topics" onChange={handelConsInputs}>
              <optgroup label="البنود">
                <option value="نجاره">نجاره</option>
                <option value="حدادة">حدادة</option>
                <option value="فرمجة">فرمجة</option>
                <option value="مبانى">مبانى</option>
                <option value="بياض">بياض</option>
                <option value="كهرباء">كهرباء</option>
                <option value="نجارة عمارة">نجاره عمارة</option>
              </optgroup>
            </select>
            <label htmlFor="contractType">نـوع المقـاولة</label>
            <select
              id="contractType"
              name="contractType"
              onChange={handelConsInputs}
            >
              <optgroup label="المقاولة">
                <option value="يوميات">يوميات</option>
                <option value="متر">متر </option>
                <option value="مقطوعية">مقطوعية</option>
              </optgroup>
            </select>
          </div>
          <div className="employee-sec">
            <label>عـدد الفنـيـن</label>
            <input
              type="number"
              name="techNumber"
              onChange={handelConsInputs}
              ref={techNumberRef}
            />
            <button
              type="button"
              className="btn2"
              onClick={generateInputsField}
            >
              اضافة الفنين
            </button>
            {text.map((t, i) => {
              //important
              return (
                <div key={i} id={i} className="employee">
                  <label> {i + 1} اسـم الفـنـى</label>
                  <input
                    type="text"
                    name="text1"
                    onChange={(e) => textGenerate(e, i)}
                    value={t.text1}
                  />
                  <label>الاعمــال {i + 1}</label>
                  <input
                    type="text"
                    name="text2"
                    onChange={(e) => textGenerate(e, i)}
                    value={t.text2}
                  />
                  <button className="btn2" onClick={() => removeOneItemTech(i)}>
                    ازالة عنصر
                  </button>
                </div>
              );
            })}

            <div className="employee-sec">
              <label> عدد المســاعدين</label>
              <input
                type="number"
                name="mosadNumber"
                onChange={handelConsInputs}
                ref={mosadNumberRef}
              />
              <button
                type="button"
                className="btn2"
                onClick={generateMosadField}
              >
                اضافة مساعدين
              </button>
              {textMosad.map((m, i) => {
                //important
                return (
                  <div key={i} id={i} className="employee">
                    <label> {i + 1} اسـم المساعد</label>
                    <input
                      type="text"
                      name="mosadName"
                      onChange={(e) => mosadGenerate(e, i)}
                      value={m.mosadName}
                    />
                    <label>الاعمــال {i + 1}</label>
                    <input
                      type="text"
                      name="mosadJob"
                      onChange={(e) => mosadGenerate(e, i)}
                      value={m.mosadJob}
                    />
                    <button
                      className="btn2"
                      onClick={() => removeOneItemMosad(i)}
                    >
                      ازالة عنصر
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <h3>مدة العمل</h3>
          <div className="time-sec">
            <label>من</label>
            <input
              type="time"
              name="from"
              value={allText.from}
              onChange={handelConsInputs}
            />
            <label>الى</label>
            <input
              type="time"
              name="to"
              value={allText.to}
              onChange={handelConsInputs}
            />
          </div>
          <small>
            {subtractTimes(allText.from, allText.to) +
              ":" +
              subtractMin(allText.from, allText.to)}
            الساعات الفعلية
          </small>

          <div>
            <label>مذكرة الخصم / الاضافة</label>
            <input
              type="text"
              name="noteAdd"
              onChange={handelConsInputs}
              ref={noteAddRef}
            />
            <label>كميات المون</label>
            <input
              type="text"
              name="kmiatMon"
              onChange={handelConsInputs}
              ref={kmiatMonRef}
            />
            <label> الموقف التنفيذى</label>
            <input
              type="text"
              name="tnfizState"
              onChange={handelConsInputs}
              ref={tnfizStateRef}
            />
            <label>نسبة الانجاز</label>
            <input
              type="text"
              name="angaz"
              onChange={handelConsInputs}
              ref={angazRef}
            />
          </div>
          <div className="note-sec">
            <label>ملاحظات</label>
            <textarea
              rows="5"
              cols="50"
              onChange={handelConsInputs}
              name="notes"
              ref={notesRef}
            ></textarea>
            <br />
          </div>
          <h3>التـوقيــعـات</h3>
          <input
            type="text"
            name="twqi3"
            onChange={handelConsInputs}
            ref={signNameRef}
          />
          <div className="btn-sec">
            <button type="submit" className="btn2">
              {isUpdate ? "أضافة" : "تعديل توقيع"}
            </button>
          </div>
        </form>
        <div className="search-input">
          <div className="search-field">
            <label>البحث</label>
            <input
              type="text"
              onChange={handelSearchBar}
              placeholder="البحث باسم الوحدة"
              value={search}
            />
            <input
              type="text"
              onChange={(e) => {
                setSearchTech(e.target.value);
              }}
              placeholder="البحث بنوع المصنعية"
              value={searchTech}
            />
          </div>
          <div className="search-date">
            <label>التاريخ من</label>
            <input
              type="date"
              onChange={(e) => {
                setSearchDate(e.target.value);
              }}
              placeholder=" التاريخ من"
              value={searchDate}
            />
            <label>التاريخ الي</label>
            <input
              type="date"
              onChange={(e) => {
                setSearchDateTo(e.target.value);
              }}
              placeholder=" التاريخ الى"
              value={searchDateTo}
            />
          </div>
        </div>
      </div>
      <div className="print-dev-con">
        <img src="./images/fit-logo1.png" />
        <h2 style={{ textAlign: "center" }}>الفيت جروب</h2>
        <div className="print-info-con">
          <h3>: المشروع</h3>
          <h3>: التاريخ</h3>
          <h3>: رقم الاسبوع</h3>
        </div>
      </div>
      <div className="excel-btn">
        <DownloadTableExcel
          filename="الموقف التنفيذى درة كرز"
          sheet="الموقف التنفيذى درة كرز"
          currentTableRef={tableRef.current}
        >
          <button className="btn4">export to excel</button>
        </DownloadTableExcel>
      </div>
      <table className="styled-table" ref={tableRef}>
        <thead>
          <tr className="style-tabal-head">
            <th>الرقم المسلسل</th>
            <th>التاريخ</th>
            <th>الوقت</th>
            <th>الوحــدة</th>
            <th>البنــد</th>
            <th>نـوع المصنـعيـات</th>
            <th>نـوع المقاولة</th>
            <th>عـدد الفنين</th>
            <div className="table-section">
              <th>اسـم الفنى</th>
              <th>الاعمال</th>
            </div>
            <th>عدد المســاعدين</th>
            <div className="table-section">
              <th>اسم المساعد</th>
              <th>الاعمال</th>
            </div>
            <th>من</th>
            <th>الى</th>
            <th>عدد الساعات</th>
            <th>مذكرة الخصم / الاضافة</th>
            <th>كميات المون</th>
            <th>الموقف التنفيذى</th>
            <th>نسبة الانجاز</th>
            <th>ملاحظات</th>
            <th>التوقيعات</th>
            <th className="print">تعديلات</th>
          </tr>
        </thead>
        <tbody>
          {mongoData
            .filter((val) => {
              if (search === "" && searchTech === "") {
                return val;
              } else if (
                val.allText.rkmElw7da.includes(search) &&
                val.allText.topics.includes(searchTech)
              ) {
                return val;
              }
            })
            .filter((dataFilter) => {
              if (searchDate === "" || searchDateTo === "") {
                return dataFilter;
              } else if (
                moment(dataFilter.allText.dateNow).isBetween(
                  searchDate,
                  searchDateTo
                )
              ) {
                return dataFilter;
              }
            })
            .map((singleItem, index) => {
              return (
                <ConsTable
                  key={singleItem._id}
                  num={index}
                  id={time}
                  // date={id}
                  item={singleItem}
                  handelTime={handelTime}
                  subtractTimes={subtractTimes}
                  subtractMin={subtractMin}
                  techItem={text}
                  mosadItem={textMosad}
                  onRemove={() => removeCell(index, singleItem._id)}
                  onUpdate={() => updateCell(index, singleItem._id)}
                  onShowCell={() => showCellOnClick(index)}
                />
              );
            })}
        </tbody>
      </table>
      <div className="foot-print-con">
        <h3>: المراجع-المهندس</h3>
        <h3>: الختم</h3>
      </div>
    </section>
  );
}

export default Construction;
