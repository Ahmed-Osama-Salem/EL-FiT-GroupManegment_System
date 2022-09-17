import React, { useEffect, useState } from "react";
import Signup from "./Signup";
import Home from "./Home";
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Profile from "./Profile";
import Construction from "./Construction";
import ConsTable from "./ConsTable";
import CellRoute from "./CellRoute/CellRoute";
import ConstructionRoute from "./constructionRoute/ConstructionRoute";
import PaySheet from "./constructionRoute/PaySheet";
import TechRoute from "./TechnicalOffice/TechRoute";
import PrimisionSheet from "./TechnicalOffice/PrimisionSheet";
import StoreSheet from "./TechnicalOffice/storePage/StoreSheet";
import ProjectRoute from "./constructionRoute/ProjectRoute";
import NewConstructionSheet from "./constructionRoute/NewConstruction/NewConstructionSheet";
import ProjectRoutePay from "./constructionRoute/NewConstruction/ProjectsRouteTables/ProjectRoutePay";
import ProjectRoutePrim from "./TechnicalOffice/ProjectRoutePrim";
import ProjectRouteStore from "./TechnicalOffice/storePage/ProjectsRouteStore/ProjectRouteStore";

function App() {
  const [userData, setUserData] = useState(null);
  const [cellData, setCellData] = useState(null);
  const [isLoad, setIsLoad] = useState(true);

  function saveUserData() {
    const localData = JSON.parse(localStorage.getItem("token"));
    if (localData !== null) setUserData(localData);
    console.log(localData);
  }
  // for reload page after sign in
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      saveUserData();
    }
  }, []);
  //protect route component
  function ProtectedRoute(props) {
    if (localStorage.getItem("token") === null) {
      return <Navigate to="/" />;
    } else {
      return props.children;
    }
  }
  //logout function and remove localstorage
  const logout = () => {
    setUserData(null);
    localStorage.removeItem("token");
    <Navigate to="/" />;
  };

  //save cell data from construction sheet and parse it to render
  function saveCellData() {
    const localCell = JSON.parse(localStorage.getItem("constCells"));
    setCellData(localCell);
  }

  useEffect(() => {
    if (localStorage.getItem("constCells") !== null) {
      saveCellData();
    }
  }, []);

  //handel preloader
  const loaderEffect = () => {
    setTimeout(() => {
      setIsLoad(false);
    }, 3000);
  };

  useEffect(() => {
    loaderEffect();
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Signup
              saveUserData={saveUserData}
              isLoad={isLoad}
              setIsLoad={setIsLoad}
              loaderEffect={loaderEffect}
            />
          }
        />
        <Route
          path="Homepage"
          element={
            <ProtectedRoute>
              <Home userData={userData} logout={logout} isLoad={isLoad} />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile userData={userData} />
            </ProtectedRoute>
          }
        />
        <Route path="sheets" element={<ConstructionRoute />} />
        <Route path="pay-sheet" element={<PaySheet />} />
        <Route
          path="constructionSheet"
          element={<Construction saveCellData={saveCellData} />}
        />
        <Route path="constructionTable" element={<ConsTable />} />
        <Route
          path="cellShow"
          element={<CellRoute cellData={cellData} setCellData={setCellData} />}
        />

        <Route path="Technical-office" element={<TechRoute />} />
        <Route path="primision-sheet" element={<PrimisionSheet />} />
        <Route path="store-sheet" element={<StoreSheet />} />
        <Route path="projects" element={<ProjectRoute />} />
        <Route path="project-pay" element={<ProjectRoutePay />} />
        <Route path="project-prim" element={<ProjectRoutePrim />} />
        <Route path="project-Store" element={<ProjectRouteStore />} />
        <Route path="projectTwo" element={<NewConstructionSheet />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
