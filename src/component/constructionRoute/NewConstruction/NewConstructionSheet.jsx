import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import NewConstructionTable from "./NewConstructionTable";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function NewConstructionSheet() {
  const [allText, setAllText] = useState({
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

  let id = currentDate.toLocaleDateString();
  let time = currentDate.toLocaleTimeString();

  let signNameRef = useRef();
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
      putConstrToMongo(servId, signNameRef.current.value);
      setIsUpdate(true);
    }
  }

  //handel axios to get data and connect with mongodb to render data
  //now we get all data that posted to data base as api
  // by useEffect
  function getDataFromMongo() {
    Axios.get("https://elfit-group-system.herokuapp.com/readNewPro").then(
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
    Axios.post("https://elfit-group-system.herokuapp.com/insertNewPro", {
      time: time,
      id: id,
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
    Axios.delete(
      `https://elfit-group-system.herokuapp.com/deleteNewPro/${mongoId}`
    );
  };

  //update on cell of table

  const updateCell = (id, mongoId) => {
    signNameRef.current.value = mongoData[id].allText.twqi3;
    setTmp(id);
    setServId(mongoId);
    setIsUpdate(false);
  };

  const putConstrToMongo = (mongoId, newConstrDate) => {
    Axios.put(
      `https://elfit-group-system.herokuapp.com/updateNewPro/${mongoId}`,
      {
        newConstrDate: newConstrDate,
      }
    );
  };

  //show data of one cell when click on show btn
  //   const cellNav = useNavigate();
  //   const storeArray = [];
  //   function showCellOnClick(id) {
  //     for (let i = 0; i < mongoData.length; i++) {
  //       if (i === id) {
  //         storeArray.push(mongoData[i]);
  //         localStorage.setItem("constCells", JSON.stringify(storeArray));
  //         props.saveCellData();
  //         cellNav("/cellShow");
  //       }
  //     }
  //   }

  //search bar handeling

  const handelSearchBar = (e) => {
    setSearch(e.target.value);
  };

  const backconstPage = useNavigate();

  return (
    <section className="crud-sec">
      <div className="crud-wide">
        <div className="crud-head">
          <h2>???????????????? ???????????????????? ??????????????????</h2>
          <h3>( ?????????????? ?????????? ?????????? ?????????????????? ?? ?????????? ????????????)</h3>
        </div>
        <button
          type="button"
          className="btn2"
          onClick={() => backconstPage("/projects")}
        >
          ????????????
        </button>
        <form className="crud-form" onSubmit={handelConsForm}>
          <label>????????????????</label>
          <input type="text" name="rkmElw7da" onChange={handelConsInputs} />
          <label>??????????????</label>
          <input type="text" name="elbnd" onChange={handelConsInputs} />
          <div className="select-inputs">
            <label htmlFor="topics">???????? ??????????????????????</label>
            <select id="topics" name="topics" onChange={handelConsInputs}>
              <optgroup label="????????????">
                <option value="??????????">??????????</option>
                <option value="??????????">??????????</option>
                <option value="??????????">??????????</option>
                <option value="??????????">??????????</option>
                <option value="????????">????????</option>
                <option value="????????????">????????????</option>
                <option value="?????????? ??????????">?????????? ??????????</option>
              </optgroup>
            </select>
            <label htmlFor="contractType">???????? ??????????????????</label>
            <select
              id="contractType"
              name="contractType"
              onChange={handelConsInputs}
            >
              <optgroup label="????????????????">
                <option value="????????????">????????????</option>
                <option value="??????">?????? </option>
                <option value="??????????????">??????????????</option>
              </optgroup>
            </select>
          </div>
          <div className="employee-sec">
            <label>???????? ????????????????</label>
            <input
              type="number"
              name="techNumber"
              onChange={handelConsInputs}
            />
            <button
              type="button"
              className="btn2"
              onClick={generateInputsField}
            >
              ?????????? ????????????
            </button>
            {text.map((t, i) => {
              //important
              return (
                <div key={i} id={i} className="employee">
                  <label> {i + 1} ???????? ??????????????</label>
                  <input
                    type="text"
                    name="text1"
                    onChange={(e) => textGenerate(e, i)}
                    value={t.text1}
                  />
                  <label>?????????????????? {i + 1}</label>
                  <input
                    type="text"
                    name="text2"
                    onChange={(e) => textGenerate(e, i)}
                    value={t.text2}
                  />
                  <button className="btn2" onClick={() => removeOneItemTech(i)}>
                    ?????????? ????????
                  </button>
                </div>
              );
            })}

            <div className="employee-sec">
              <label> ?????? ??????????????????????</label>
              <input
                type="number"
                name="mosadNumber"
                onChange={handelConsInputs}
              />
              <button
                type="button"
                className="btn2"
                onClick={generateMosadField}
              >
                ?????????? ??????????????
              </button>
              {textMosad.map((m, i) => {
                //important
                return (
                  <div key={i} id={i} className="employee">
                    <label> {i + 1} ???????? ??????????????</label>
                    <input
                      type="text"
                      name="mosadName"
                      onChange={(e) => mosadGenerate(e, i)}
                      value={m.mosadName}
                    />
                    <label>?????????????????? {i + 1}</label>
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
                      ?????????? ????????
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <h3>?????? ??????????</h3>
          <div className="time-sec">
            <label>????</label>
            <input
              type="time"
              name="from"
              value={allText.from}
              onChange={handelConsInputs}
            />
            <label>??????</label>
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
            ?????????????? ??????????????
          </small>

          <div>
            <label>?????????? ?????????? / ??????????????</label>
            <input type="text" name="noteAdd" onChange={handelConsInputs} />
            <label>?????????? ??????????</label>
            <input type="text" name="kmiatMon" onChange={handelConsInputs} />
            <label> ???????????? ????????????????</label>
            <input type="text" name="tnfizState" onChange={handelConsInputs} />
            <label>???????? ??????????????</label>
            <input type="text" name="angaz" onChange={handelConsInputs} />
          </div>
          <div className="note-sec">
            <label>??????????????</label>
            <textarea
              rows="5"
              cols="50"
              onChange={handelConsInputs}
              name="notes"
            ></textarea>
            <br />
          </div>
          <h3>??????????????????????????</h3>
          <input
            type="text"
            name="twqi3"
            onChange={handelConsInputs}
            ref={signNameRef}
          />
          <div className="btn-sec">
            <button type="submit" className="btn2">
              {isUpdate ? "??????????" : "?????????? ??????????"}
            </button>
          </div>
        </form>
        <div className="search-input">
          <div className="search-field">
            <label>??????????</label>
            <input
              type="text"
              onChange={handelSearchBar}
              placeholder="?????????? ???????? ????????????"
              value={search}
            />
            <input
              type="text"
              onChange={(e) => {
                setSearchTech(e.target.value);
              }}
              placeholder="?????????? ???????? ????????????????"
              value={searchTech}
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
      <table className="styled-table">
        <thead>
          <tr className="style-tabal-head">
            <th>?????????? ??????????????</th>
            <th>??????????????</th>
            <th>??????????</th>
            <th>????????????????</th>
            <th>??????????????</th>
            <th>???????? ??????????????????????</th>
            <th>???????? ????????????????</th>
            <th>???????? ????????????</th>
            <div className="table-section">
              <th>???????? ??????????</th>
              <th>??????????????</th>
            </div>
            <th>?????? ??????????????????????</th>
            <div className="table-section">
              <th>?????? ??????????????</th>
              <th>??????????????</th>
            </div>
            <th>????</th>
            <th>??????</th>
            <th>?????? ??????????????</th>
            <th>?????????? ?????????? / ??????????????</th>
            <th>?????????? ??????????</th>
            <th>???????????? ????????????????</th>
            <th>???????? ??????????????</th>
            <th>??????????????</th>
            <th>??????????????????</th>
            <th className="print">??????????????</th>
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
                moment(dataFilter.id).isBetween(searchDate, searchDateTo)
              ) {
                return dataFilter;
              }
            })
            .map((singleItem, index) => {
              return (
                <NewConstructionTable
                  key={singleItem._id}
                  num={index}
                  id={time}
                  date={id}
                  item={singleItem}
                  handelTime={handelTime}
                  subtractTimes={subtractTimes}
                  subtractMin={subtractMin}
                  techItem={text}
                  mosadItem={textMosad}
                  onRemove={() => removeCell(index, singleItem._id)}
                  onUpdate={() => updateCell(index, singleItem._id)}
                  //   onShowCell={() => showCellOnClick(index)}
                />
              );
            })}
        </tbody>
      </table>
      <div className="foot-print">
        <h3>: ??????????????-??????????????</h3>
        <h3>: ??????????</h3>
      </div>
    </section>
  );
}

export default NewConstructionSheet;
