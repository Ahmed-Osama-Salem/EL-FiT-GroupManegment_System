import React from "react";
import { useNavigate } from "react-router-dom";
import { projectData } from "../../projectsData/projects";

function ProjectRoute() {
  const navToSheet = useNavigate();
  const backToConstRoute = useNavigate();
  const navToNewSheet = useNavigate();
  return (
    <section className="projects-sec">
      <h1>قائــمة المشــاريــع</h1>
      <p>الموقف التنفيذى الهندسى</p>
      <div className="project-wide">
        <div className="flex-projects">
          <div
            className="project-one"
            onClick={() => navToSheet("/constructionSheet")}
          >
            <img
              src="https://ipropertyeg.com/wp-content/uploads/2022/01/dorra-compound-750x470.jpg"
              alt="dora"
            />
            <h2> ( {projectData[0].name} ) </h2>
          </div>
          <div
            className="project-two"
            onClick={() => navToNewSheet("/projectTwo")}
          >
            <img
              src="https://ipropertyeg.com/wp-content/uploads/2022/01/dorra-compound-750x470.jpg"
              alt="dora"
            />
            <h2> ( {projectData[1].name} ) </h2>
          </div>
          <div
            className="project-one"
            onClick={() => alert("under development!!")}
          >
            <img
              src="https://ipropertyeg.com/wp-content/uploads/2022/01/dorra-compound-750x470.jpg"
              alt="dora"
            />
            <h2>مشروع جديد</h2>
          </div>
        </div>
        <div className="btn-center">
          <button className="btn2" onClick={() => backToConstRoute("/sheets")}>
            رجــوع
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProjectRoute;
