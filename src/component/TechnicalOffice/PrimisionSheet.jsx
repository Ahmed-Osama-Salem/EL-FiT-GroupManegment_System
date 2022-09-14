import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrimisionTable from "./PrimisionTable";
import Axios from "axios";
import moment from "moment";

function PrimisionSheet() {
  const backToTechRoute = useNavigate();

  const currentDate = new Date();

  let dateNow = currentDate.toLocaleDateString();
  let timeNow = currentDate.toLocaleTimeString();
  let formRef = useRef();
  let inputRef = useRef();
  let paidRef = useRef();
  let paidSubRef = useRef();
  let noteRef = useRef();
  let signRef = useRef();
  let totalRef = useRef();

  const [isAdd, setIsAdd] = useState(true);
  const [tmp, setTmp] = useState();
  const [backId, setBackID] = useState();

  // states for search and filter
  const [search, setSearch] = useState("");
  const [searchTech, setSearchTech] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchDateTo, setSearchDateTo] = useState("");

  const [formData, setFormData] = useState({
    total: Number(),
    notes: "",
    sign: "",
    supplyDate: "",
    paid: Number(),
    subPaid: Number(),
  });

  // const [formItems, setFormItems] = useState([]);
  const [mongoPrimData, setMongoPrimData] = useState([]);
  const [supplyInputs, SetSupplyInputs] = useState([
    {
      supplyName: "",
      band: "",
      unit: "",
      amount: Number(),
      topic: Number(),
      total: Number(),
    },
  ]);

  const handelAddCell = (e) => {
    e.preventDefault();
    if (isAdd) {
      setFormData(formData);
      SetSupplyInputs(supplyInputs);

      postPrimDataToMongo();
      getPrimDataFromMongo();

      setMongoPrimData(mongoPrimData);
    } else {
      console.log("update");
      console.log(mongoPrimData[tmp].formData.supplyDate);
      console.log(inputRef.current.value);

      console.log(
        (mongoPrimData[tmp].formData.supplyDate = inputRef.current.value)
      );
      mongoPrimData[tmp].formData.supplyDate = inputRef.current.value;
      mongoPrimData[tmp].formData.paid = paidRef.current.value;
      mongoPrimData[tmp].formData.subPaid = paidSubRef.current.value;
      mongoPrimData[tmp].formData.notes = noteRef.current.value;
      mongoPrimData[tmp].formData.sign = signRef.current.value;
      mongoPrimData[tmp].formData.total = totalRef.current.value;
      putToMongo(
        backId,
        inputRef.current.value,
        paidRef.current.value,
        paidSubRef.current.value,
        noteRef.current.value,
        signRef.current.value,
        totalRef.current.value
      );
      setIsAdd(true);
    }

    formRef.current.reset();
  };

  const supplyGenerate = (e, index) => {
    let newSupply = e.target.value;
    let supplyName = e.target.name;
    const supplyList = [...supplyInputs];
    supplyList[index][supplyName] = newSupply; //important
    SetSupplyInputs(supplyList);
  };

  const generateSupplyField = () => {
    SetSupplyInputs([
      ...supplyInputs,
      {
        supplyName: "",
        band: "",
        unit: "",
        amount: Number(),
        topic: Number(),
      },
    ]);
  };

  const removeOneSupply = (id) => {
    SetSupplyInputs(
      supplyInputs.filter((supp, i) => {
        return id !== i;
      })
    );
  };

  const handelFormData = (e) => {
    let newData = e.target.value;
    let dataName = e.target.name;
    setFormData({ ...formData, [dataName]: newData });
  };

  //function for calculations
  let arr = [];

  for (let i = 0; i < supplyInputs.length; i++) {
    arr.push(supplyInputs[i].total);
    console.log(supplyInputs[i].total);
    console.log(arr);
  }
  let sum = 0;

  for (const value of arr) {
    sum += value;
  }

  //update one cell
  const updateOnePayCell = (id, mongoId) => {
    inputRef.current.value = mongoPrimData[id].formData.supplyDate;
    paidSubRef.current.value = mongoPrimData[id].formData.subPaid;
    paidRef.current.value = mongoPrimData[id].formData.paid;
    noteRef.current.value = mongoPrimData[id].formData.notes;
    signRef.current.value = mongoPrimData[id].formData.sign;
    totalRef.current.value = mongoPrimData[id].formData.total;
    setTmp(id);
    setBackID(mongoId);
    setIsAdd(false);
  };

  const putToMongo = (
    mongoId,
    newData,
    newPaid,
    newSubPaid,
    newNote,
    newSign,
    newTotal
  ) => {
    Axios.put(
      `https://elfit-group-system.herokuapp.com/updatePrim/${mongoId}`,
      {
        newData: newData,
        newPaid: newPaid,
        newSubPaid: newSubPaid,
        newNote: newNote,
        newSign: newSign,
        newTotal: newTotal,
      }
    );
    // console.log(newData);
  };

  // console.log(backId);
  //working on database with axios post data to mongo
  //handel axios to post data and connect with mongodb backend server

  function postPrimDataToMongo() {
    Axios.post("https://elfit-group-system.herokuapp.com/insertPrim", {
      timeNow: timeNow,
      dateNow: dateNow,
      formData: formData,
      supplyInputs: supplyInputs,
    });
  }

  //handel axios to get data and connect with mongodb to render data
  //now we get all data that posted to data base as api
  // by useEffect
  function getPrimDataFromMongo() {
    Axios.get("https://elfit-group-system.herokuapp.com/readPrim").then(
      (response) => {
        console.log(response);
        setMongoPrimData(response.data);
      }
    );
  }

  useEffect(() => {
    getPrimDataFromMongo();
  }, []);

  // remove one cell

  const primOnRemove = (id, mongoId) => {
    setMongoPrimData(
      mongoPrimData.filter((p, i) => {
        return id !== i;
      })
    );
    Axios.delete(
      `https://elfit-group-system.herokuapp.com/deletePrim/${mongoId}`
    );
  };

  return (
    <section className="crud-sec-prim">
      <div className="crud-wide-prim">
        <div>
          <h2>اذونــات التــوريــد</h2>
          <button
            type="button"
            className="btn4"
            onClick={() => backToTechRoute("/Technical-office")}
          >
            الرجــوع
          </button>
          <form onSubmit={handelAddCell} ref={formRef}>
            <div className="add-mordin">
              <button
                type="button"
                className="btn2"
                onClick={generateSupplyField}
              >
                اضافة موردين
              </button>
              {supplyInputs.map((supply, i) => {
                let num = i;
                return (
                  <div key={num} id={i} className="mord-sec">
                    <h3>المورد رقم {i + 1}</h3>
                    <div className="mord1">
                      <label>اسم المورد</label>
                      <input
                        type="text"
                        name="supplyName"
                        onChange={(e) => supplyGenerate(e, i)}
                        value={supply.supplyName}
                      />
                      <label> البنـد</label>
                      <input
                        type="text"
                        name="band"
                        onChange={(e) => supplyGenerate(e, i)}
                        value={supply.band}
                      />
                      <label> الوحـدة</label>
                      <input
                        type="text"
                        name="unit"
                        onChange={(e) => supplyGenerate(e, i)}
                        value={supply.unit}
                      />
                    </div>
                    <div className="mord2">
                      <label> الكمية</label>
                      <input
                        type="number"
                        name="amount"
                        onChange={(e) => supplyGenerate(e, i)}
                        value={supply.amount}
                      />
                      <label> الفئة</label>
                      <input
                        type="number"
                        name="topic"
                        onChange={(e) => supplyGenerate(e, i)}
                        value={supply.topic}
                      />
                    </div>
                    <div>
                      <p>
                        {(supply.total = supply.amount * supply.topic)}/
                        الاجمالي
                      </p>
                    </div>
                    <div className="mord3"></div>
                    <button
                      type="button"
                      className="btn2"
                      onClick={() => removeOneSupply(i)}
                    >
                      حـــذف
                    </button>
                  </div>
                );
              })}
              <p>
                <span>{sum}</span> : اجمالى التوريد
              </p>
            </div>
            <div className="form-submit">
              <div>
                <label>اجمالى التوريد</label>
                <input
                  type="number"
                  name="total"
                  onChange={handelFormData}
                  ref={totalRef}
                />

                <label>الملاحظات</label>
                <input
                  type="text"
                  name="notes"
                  onChange={handelFormData}
                  ref={noteRef}
                />
                <label>التوقيعات</label>
                <input
                  type="text"
                  name="sign"
                  onChange={handelFormData}
                  ref={signRef}
                />
              </div>
              <div>
                <label> تاريخ الصرف</label>
                <input
                  type="date"
                  name="supplyDate"
                  onChange={handelFormData}
                  value={formData.supplyDate}
                  ref={inputRef}
                />
                <label> المصروف</label>
                <input
                  type="number"
                  name="paid"
                  onChange={handelFormData}
                  value={formData.paid}
                  ref={paidRef}
                />
                <label> المتبقى</label>
                <input
                  type="number"
                  name="subPaid"
                  onChange={handelFormData}
                  value={formData.subPaid}
                  ref={paidSubRef}
                />
              </div>
            </div>
            <button type="submit" className="btn2">
              {isAdd ? "اضافة خلية" : "تعديل خلية"}
            </button>
          </form>
        </div>
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
              placeholder="البحث  باسم المورد"
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
        <div className="table-pay">
          <table className="styled-table-pay">
            <thead>
              <tr>
                <th>الرقم</th>
                <th>التاريخ</th>
                <th>الوقت</th>
                <tr className="table-supply">
                  <th>اسم المورد</th>
                  <th>البند</th>
                  <th>الوحدة</th>
                  <th>الكمية</th>
                  <th>الفئة</th>
                  <th>الاجمالي</th>
                </tr>
                <th>اجمالى التوريد</th>
                <th>تاريخ الصرف</th>
                <th>المصروف</th>
                <th>المتبقى</th>
                <th>الملاحظات</th>
                <th>التوقيعات</th>
                <th>التعديلات</th>
              </tr>
            </thead>
            <tbody>
              {mongoPrimData
                .filter((val, i) => {
                  if (search === "" && searchTech === "") {
                    return val;
                  } else if (
                    val.supplyInputs[0].supplyName.includes(search) &&
                    val.supplyInputs[0].band.includes(searchTech)
                  ) {
                    return val;
                  }
                })
                .filter((dataFilter) => {
                  if (searchDate === "" || searchDateTo === "") {
                    return dataFilter;
                  } else if (
                    moment(dataFilter.dateNow).isBetween(
                      searchDate,
                      searchDateTo
                    )
                  ) {
                    return dataFilter;
                  }
                })
                .map((form, i) => {
                  return (
                    <PrimisionTable
                      key={form._id}
                      num={i}
                      date={dateNow}
                      time={timeNow}
                      formItem={form}
                      supplyInputs={supplyInputs}
                      updateOnePayCell={() => updateOnePayCell(i, form._id)}
                      primOnRemove={() => primOnRemove(i, form._id)}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default PrimisionSheet;
