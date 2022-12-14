import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StoreTable from "./StoreTable";
import Axios from "axios";
import moment from "moment";
import { projectData } from "../../../projectsData/projects";

function StoreSheet() {
  const backToTechnicalRoute = useNavigate();

  const currentDate = new Date();

  let dateNow = currentDate.toLocaleDateString();
  let timeNow = currentDate.toLocaleTimeString();
  const [isAdd, setIsAdd] = useState(true);
  const [tmp, setTmp] = useState();
  const [backEndId, setBackEndId] = useState();
  let dateRef = useRef();
  let noteRef = useRef();
  let signitureRef = useRef();

  // states for search and filter
  const [search, setSearch] = useState("");

  const [searchDate, setSearchDate] = useState("");
  const [searchDateTo, setSearchDateTo] = useState("");

  const [formText, setFormText] = useState({
    storeDate: "",
    notes: "",
    sign: "",
  });
  // const [formArray, setFormArray] = useState([]);
  const [storeInputs, setStoreInputs] = useState([
    {
      totalNum: Number(),
      storeItem: "",
    },
  ]);

  const [mongoStoreData, setMongoStoreData] = useState([]);

  const generateStoreInputs = (e, index) => {
    let newstore = e.target.value;
    let storeName = e.target.name;
    const storeList = [...storeInputs];
    storeList[index][storeName] = newstore; //important
    setStoreInputs(storeList);
  };

  const generateStoreField = () => {
    setStoreInputs([
      ...storeInputs,
      {
        totalNum: Number(),
        storeItem: "",
      },
    ]);
  };

  const removeOneStore = (id) => {
    setStoreInputs(
      storeInputs.filter((supp, i) => {
        return id !== i;
      })
    );
  };

  const handelFormText = (e) => {
    const newForm = e.target.value;
    const formName = e.target.name;
    setFormText({ ...formText, [formName]: newForm });
  };

  const handelFormTableSubmit = (e) => {
    e.preventDefault();
    if (isAdd) {
      setFormText(formText);
      setStoreInputs(storeInputs);
      postStoreDataToMongo();
      getStoreDataFromMongo();
      setMongoStoreData(mongoStoreData);
    } else {
      // console.log("update");
      mongoStoreData[tmp].formText.storeDate = dateRef.current.value;
      mongoStoreData[tmp].formText.notes = noteRef.current.value;
      mongoStoreData[tmp].formText.sign = signitureRef.current.value;
      putStoreToMongo(
        backEndId,
        dateRef.current.value,
        noteRef.current.value,
        signitureRef.current.value
      );
      setIsAdd(true);
    }
  };
  // console.log(mongoStoreData);
  //working on database with axios post data to mongo
  //handel axios to post data and connect with mongodb backend server

  function postStoreDataToMongo() {
    Axios.post("https://elfit-group-system.herokuapp.com/insertStore", {
      timeNow: timeNow,
      dateNow: dateNow,
      formText: formText,
      storeInputs: storeInputs,
    });
  }

  //handel axios to get data and connect with mongodb to render data
  //now we get all data that posted to data base as api
  // by useEffect
  function getStoreDataFromMongo() {
    Axios.get("https://elfit-group-system.herokuapp.com/readStore").then(
      (response) => {
        // console.log(response);
        setMongoStoreData(response.data);
      }
    );
  }

  useEffect(() => {
    getStoreDataFromMongo();
  }, []);

  // remove one cell

  const storeOnRemove = (id, mongoId) => {
    setMongoStoreData(
      mongoStoreData.filter((s, i) => {
        return id !== i;
      })
    );
    Axios.delete(
      `https://elfit-group-system.herokuapp.com/deleteStore/${mongoId}`
    );
  };

  //update one cell in store sheet
  const updateOnCellStore = (id, mongoId) => {
    // console.log(id);
    dateRef.current.value = mongoStoreData[id].formText.storeDate;
    noteRef.current.value = mongoStoreData[id].formText.notes;
    signitureRef.current.value = mongoStoreData[id].formText.sign;
    setTmp(id);
    setBackEndId(mongoId);
    setIsAdd(false);
  };

  const putStoreToMongo = (mongoId, newDate, newNote, newStoreSign) => {
    Axios.put(
      `https://elfit-group-system.herokuapp.com/updateStore/${mongoId}`,
      {
        newDate: newDate,
        newNote: newNote,
        newStoreSign: newStoreSign,
      }
    );
  };

  return (
    <section className="store-sec">
      <div className="store-wide">
        <h2>?????????? ?????????????? ?? ??????????</h2>
        <h4> ( {projectData[0].name} ) </h4>
        <button
          type="button"
          className="btn4"
          onClick={() => backToTechnicalRoute("/project-Store")}
        >
          ????????????????
        </button>
        <form className="all-form" onSubmit={handelFormTableSubmit}>
          <button type="button" className="btn2" onClick={generateStoreField}>
            ?????????? ??????
          </button>
          {storeInputs.map((store, i) => {
            return (
              <div key={i} className="package-sec">
                <h3> {i + 1}/ ???????? </h3>
                <label>??????????</label>
                <input
                  type="number"
                  name="totalNum"
                  onChange={(e) => generateStoreInputs(e, i)}
                  value={store.totalNum}
                />
                <label>???????????? / ??????????</label>
                <input
                  type="text"
                  name="storeItem"
                  onChange={(e) => generateStoreInputs(e, i)}
                  value={store.storeItem}
                />
                <div className="package-2">
                  <button
                    type="button"
                    className="btn3"
                    onClick={() => removeOneStore(i)}
                  >
                    ????????????
                  </button>
                </div>
              </div>
            );
          })}

          <div className="form-inputs">
            <label>?????????? ?????????? / ??????????????????</label>
            <input
              type="date"
              name="storeDate"
              onChange={handelFormText}
              ref={dateRef}
            />
            <label>??????????????????</label>
            <input
              type="text"
              name="notes"
              onChange={handelFormText}
              ref={noteRef}
            />
            <label>??????????????</label>
            <input
              type="text"
              name="sign"
              onChange={handelFormText}
              ref={signitureRef}
            />
          </div>
          <button type="submit" className="btn2">
            {isAdd ? "?????????? ????????" : "?????????? ????????"}
          </button>
        </form>
        <div className="search-input">
          <div className="search-field">
            <label>??????????</label>
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="?????????? ???????? ????????????"
              value={search}
            />
          </div>
          <div className="search-date">
            <label>?????????????? ????</label>
            <input
              type="date"
              onChange={(e) => {
                setSearchDate(e.target.value);
              }}
              placeholder=" ?????????????? ????"
              value={searchDate}
            />
            <label>?????????????? ??????</label>
            <input
              type="date"
              onChange={(e) => {
                setSearchDateTo(e.target.value);
              }}
              placeholder=" ?????????????? ??????"
              value={searchDateTo}
            />
          </div>
        </div>
      </div>
      <div className="print-dev">
        <img src="./images/fit-logo1.png" />
        <h2 style={{ textAlign: "center" }}>?????????? ????????</h2>
        <div className="print-info">
          <h3>: ??????????????</h3>
          <h3>: ??????????????</h3>
          <h3>: ?????? ??????????????</h3>
        </div>
      </div>
      <div className="table-pay">
        <table className="styled-table">
          <thead>
            <tr>
              <th>??????????</th>
              <th>??????????????</th>
              <th>??????????</th>
              <tr className="table-supply-store">
                <th>??????????</th>
                <th>???????????? / ??????????</th>
              </tr>
              <th>?????????? ??????????</th>
              <th>??????????????????</th>
              <th>??????????????????</th>
              <th className="print">??????????????????</th>
            </tr>
          </thead>
          <tbody>
            {mongoStoreData
              .filter((val, i) => {
                if (search === "") {
                  return val;
                } else if (val.storeInputs[0].storeItem.includes(search)) {
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
              .map((mongoStore, i) => {
                return (
                  <StoreTable
                    key={mongoStore._id}
                    num={i}
                    mongoStore={mongoStore}
                    storeInputs={storeInputs}
                    storeOnRemove={() => storeOnRemove(i, mongoStore._id)}
                    updateOnCellStore={() =>
                      updateOnCellStore(i, mongoStore._id)
                    }
                  />
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="foot-print">
        <h3>: ??????????????-??????????????</h3>
        <h3>: ??????????</h3>
      </div>
    </section>
  );
}

export default StoreSheet;
