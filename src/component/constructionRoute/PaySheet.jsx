import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PayTable from "./PayTable";
import Axios from "axios";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PaySheet() {
  const [allPayText, setAllPayText] = useState({
    elwahdaName: "",
    jobs: "",
    contractorName: "",
    reciverName: "",
    band: "",
    unit: "",
    kmia: "",
    payDate: "",
    note: "",
    signiture: "",
  });

  const [payItems, setPayItems] = useState([]);

  const currentDate = new Date();

  let dateNow = currentDate.toLocaleDateString();
  let timeNow = currentDate.toLocaleTimeString();

  //states for update and id
  const [isEdit, setIsEdit] = useState(true);
  const [tmp, setTmp] = useState();
  const [serverId, setServerID] = useState();
  let refReset = useRef();
  let inputField = useRef();
  let reciverRef = useRef();
  let notesRef = useRef();
  let signRef = useRef();

  // states for search and filter
  const [search, setSearch] = useState("");
  const [searchTech, setSearchTech] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchDateTo, setSearchDateTo] = useState("");

  //notify
  const notifyAdd = () =>
    toast.success(
      "تم اضافة خلية جديدة , من فضلك اعد تحميل الصفحة لاضافة البيانات الى الجدول"
    );

  const notifyUpdate = () => toast.warn("تم تفعيل وضع التعديل");
  const notifyDelete = (id) => toast.error(id + 1 + " تم حذف الخلية");

  //get text inputs of pay sheet
  function handelPayInputs(e) {
    let PayValue = e.target.value;
    let payName = e.target.name;
    setAllPayText({ ...allPayText, [payName]: PayValue });
  }

  function handelSubmitOfPaySheet(e) {
    e.preventDefault();
    if (isEdit) {
      postPayDataToMongo();
      setAllPayText(allPayText);
      getPayDataFromMongo();
      notifyAdd();
    } else {
      console.log("update");
      payItems[tmp].allPayText.payDate = inputField.current.value;
      payItems[tmp].allPayText.reciverName = reciverRef.current.value;
      payItems[tmp].allPayText.note = notesRef.current.value;
      payItems[tmp].allPayText.signiture = signRef.current.value;
      putPayToMongo(
        serverId,
        inputField.current.value,
        reciverRef.current.value,
        notesRef.current.value,
        signRef.current.value
      );
      setIsEdit(true);
    }

    refReset.current.reset();
  }

  //handel back button
  const backToConstructionRoute = useNavigate();

  //working on database with axios post data to mongo
  //handel axios to post data and connect with mongodb backend server

  function postPayDataToMongo() {
    Axios.post("https://elfit-group-system.herokuapp.com/insertPay", {
      timeNow: timeNow,
      dateNow: dateNow,
      allPayText: allPayText,
    });
  }

  //handel axios to get data and connect with mongodb to render data
  //now we get all data that posted to data base as api
  // by useEffect
  function getPayDataFromMongo() {
    Axios.get("https://elfit-group-system.herokuapp.com/readPay").then(
      (response) => {
        // console.log(response);
        setPayItems(response.data);
      }
    );
  }

  useEffect(() => {
    getPayDataFromMongo();
  }, []);

  // remove one cell

  const payOnRemove = (id, mongoId) => {
    setPayItems(
      payItems.filter((p, i) => {
        return id !== i;
      })
    );
    Axios.delete(
      `https://elfit-group-system.herokuapp.com/deletePay/${mongoId}`
    );
    notifyDelete(id);
  };

  // remove one cell
  const updateOneCellPay = (id, mongoId) => {
    // console.log(id);
    inputField.current.value = payItems[id].allPayText.payDate;
    reciverRef.current.value = payItems[id].allPayText.reciverName;
    notesRef.current.value = payItems[id].allPayText.note;
    signRef.current.value = payItems[id].allPayText.signiture;
    setTmp(id);
    setServerID(mongoId);
    notifyUpdate();
    setIsEdit(false);
  };

  const putPayToMongo = (
    mongoId,
    newPayDate,
    newPayReciver,
    newPayNote,
    newPaySign
  ) => {
    Axios.put(`https://elfit-group-system.herokuapp.com/updatePay/${mongoId}`, {
      newPayDate: newPayDate,
      newPayReciver: newPayReciver,
      newPayNote: newPayNote,
      newPaySign: newPaySign,
    });
  };

  return (
    <section className="crud-sec">
      <div className="crud-wide-pay">
        <h2>أذونــــات الصــرف</h2>
        <button
          type="button"
          className="btn2"
          onClick={() => backToConstructionRoute("/sheets")}
        >
          الرجــوع
        </button>
        <form
          className="crud-form"
          onSubmit={handelSubmitOfPaySheet}
          ref={refReset}
        >
          <label>الوحدة / رقم العمارة</label>
          <input
            type="text"
            name="elwahdaName"
            onChange={handelPayInputs}
            value={allPayText.elwahdaName}
          ></input>
          <label>الاعمال / البنود</label>
          <input type="text" name="jobs" onChange={handelPayInputs}></input>
          <label>المقاول</label>
          <input
            type="text"
            placeholder="المقاول"
            name="contractorName"
            onChange={handelPayInputs}
          ></input>

          <label>البند</label>
          <input type="text" name="band" onChange={handelPayInputs}></input>
          <label>الوحدة</label>
          <input type="text" name="unit" onChange={handelPayInputs}></input>
          <label>الكمية</label>
          <input type="text" name="kmia" onChange={handelPayInputs}></input>
          <label>تاريخ الصرف</label>
          <input
            type="date"
            name="payDate"
            onChange={handelPayInputs}
            ref={inputField}
          ></input>
          <input
            type="text"
            placeholder="المستلم"
            name="reciverName"
            onChange={handelPayInputs}
            ref={reciverRef}
          ></input>
          <label>الملاحظات</label>
          <input
            type="text"
            name="note"
            onChange={handelPayInputs}
            ref={notesRef}
          ></input>
          <label>توقيعات</label>
          <input
            type="text"
            name="signiture"
            onChange={handelPayInputs}
            ref={signRef}
          ></input>

          <div className="btn-sec">
            <button type="submit" className="btn2">
              {isEdit ? "اضافة خلية" : "تعديل خلية"}
            </button>
          </div>
        </form>
        <div className="search-input">
          <div className="search-field">
            <label>البحث</label>
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="البحث باسم الوحدة"
              value={search}
            />
            <input
              type="text"
              onChange={(e) => {
                setSearchTech(e.target.value);
              }}
              placeholder="البحث  باسم المقاول"
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
        <ToastContainer />
      </div>
      <div className="print-dev">
        <img src="./images/fit-logo1.png" />
        <h2 style={{ textAlign: "center" }}>الفيت جروب</h2>
        <div className="print-info">
          <h3>: المشروع</h3>
          <h3>: التاريخ</h3>
          <h3>: رقم الاسبوع</h3>
        </div>
      </div>
      <div className="table-pay">
        <table className="styled-table-pay">
          <thead>
            <tr>
              <th>الرقم </th>
              <th>التاريخ </th>
              <th>الوقت </th>
              <th>الوحدة/العمارة </th>
              <th>الاعمال</th>
              <th>المقاول </th>
              <th>البند </th>
              <th>الوحدة </th>
              <th>الكمية </th>
              <th>تاريخ الصرف </th>
              <th>المستلم </th>
              <th>الملاحظات </th>
              <th>التوقيعات </th>
              <th className="print">التعديلات </th>
            </tr>
          </thead>
          <tbody>
            {payItems
              .filter((val) => {
                if (search === "" && searchTech === "") {
                  return val;
                } else if (
                  val.allPayText.elwahdaName.includes(search) &&
                  val.allPayText.contractorName.includes(searchTech)
                ) {
                  return val;
                }
              })
              .filter((dataFilter) => {
                if (searchDate === "" || searchDateTo === "") {
                  return dataFilter;
                } else if (
                  moment(dataFilter.dateNow).isBetween(searchDate, searchDateTo)
                ) {
                  return dataFilter;
                }
              })
              .map((pay, index) => {
                return (
                  <PayTable
                    key={pay._id}
                    num={index}
                    date={dateNow}
                    time={timeNow}
                    tableItems={pay}
                    payOnRemove={() => payOnRemove(index, pay._id)}
                    updateOneCellPay={() => updateOneCellPay(index, pay._id)}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="foot-print">
        <h3>: المراجع-المهندس</h3>
        <h3>: الختم</h3>
      </div>
    </section>
  );
}

export default PaySheet;
