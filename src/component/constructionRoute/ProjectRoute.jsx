import react from "react";
import { useNavigate } from "react-router-dom";

function ProjectRoute() {
  const navToSheet = useNavigate();
  const backToConstRoute = useNavigate();
  return (
    <section className="projects-sec">
      <h1>قائمة المشاريع</h1>
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
            <h2>درة الكرز - شلبى للمقاولات</h2>
          </div>
          <div className="project-two">
            <img
              src="https://ipropertyeg.com/wp-content/uploads/2022/01/dorra-compound-750x470.jpg"
              alt="dora"
            />
            <h2>تطوير عواصم المحافظات و المدن الكبرى</h2>
          </div>
        </div>
        <button className="btn2" onClick={() => backToConstRoute("/sheets")}>
          رجــوع
        </button>
      </div>
    </section>
  );
}

export default ProjectRoute;
