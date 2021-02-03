/*
 *
 * HomePage
 *
 */

import React, { memo, useEffect, useState, useRef } from "react";
import { PluginHeader, request } from "strapi-helper-plugin";
import Project from "../../components/Project";

const HomePage = () => {
  const [frenchProjects, setFrenchProjects] = useState(null);
  const [englishProjects, setEnglishProjects] = useState(null);
  const [phases, setPhases] = useState([]);
  const [countValid, setCountValid] = useState(0);

  const validate = () => {
    setCountValid(countValid + 1);
  };

  const getNotValidatedFrenchProjects = async () => {
    const response = await request("/french-projects?_limit=-1&valid=false");

    const projects = response.filter((project) => project.valid !== true);
    setFrenchProjects(projects);
  };

  const getNotValidatedEnglishProjects = async () => {
    const response = await request("/english-projects?_limit=-1&valid=false");

    const projects = response.filter((project) => project.valid !== true);
    setEnglishProjects(projects);
  };

  const getPhasesName = async () => {
    const response = await request("/phases");
    setPhases(
      response.map((phase) => {
        return {
          label: phase.label,
          value: phase.value,
        };
      })
    );
  };

  useEffect(() => {
    getNotValidatedFrenchProjects();
    getNotValidatedEnglishProjects();
    getPhasesName();
  }, []);

  return (
    <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
      <PluginHeader
        title={"Validate Projects"}
        description={"Validate projects from users and imports"}
      />
      <div className="row">
        <div className={"col-12"}>
          {frenchProjects && (
            <>
              <h1>FRENCH PROJECTS</h1>
              <h2>
                Number of french projects :{" "}
                {`${frenchProjects.length}(${countValid})`}
              </h2>
              <div className="project-list">
                {frenchProjects.map((project) => {
                  return (
                    <Project
                      id={project.id}
                      key={project.id}
                      title={project.title}
                      address={project.address}
                      lat={project.lat}
                      lng={project.lng}
                      currentPhase={project.phase ? project.phase : 1}
                      phasesOption={phases}
                      description={project.description}
                      justify={project.justify}
                      validate={validate}
                      lang="fr"
                    />
                  );
                })}
              </div>
            </>
          )}
          {!frenchProjects ||
            (frenchProjects.length === 0 && (
              <h3>No french project to validate</h3>
            ))}
          {englishProjects && (
            <>
              <h1 style={{ marginTop: "20px" }}>ENGLISH PROJECTS</h1>
              <h2>
                Number of english projects :{" "}
                {`${englishProjects.length}(${countValid})`}
              </h2>
              <div className="project-list">
                {englishProjects.map((project) => {
                  return (
                    <Project
                      id={project.id}
                      key={project.id}
                      title={project.title}
                      address={project.address}
                      lat={project.lat}
                      lng={project.lng}
                      currentPhase={project.phase ? project.phase : 1}
                      phasesOption={phases}
                      description={project.description}
                      justify={project.justify}
                      validate={validate}
                      lang="en"
                    />
                  );
                })}
              </div>
            </>
          )}
          {!englishProjects ||
            (englishProjects.length === 0 && (
              <h3>No english project to validate</h3>
            ))}
        </div>
      </div>
    </div>
  );
};

export default memo(HomePage);
