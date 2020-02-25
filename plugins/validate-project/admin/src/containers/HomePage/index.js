/*
 *
 * HomePage
 *
 */

import React, { memo, useEffect, useState, useRef } from 'react';
import {
  PluginHeader,
  request
} from "strapi-helper-plugin";
import Project from '../../components/Project';
import { Select, Textarea, InputText, Button, Label } from "@buffetjs/core";
import useScript from "../../../../../manage-phases/admin/src/hook/useScript";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const HomePage = () => {
  const [itemPerPage, setItemPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [projects, setProjects] = useState(null);
  const [phases, setPhases] = useState(null);
  const [projectList, setProjectList] = useState(null);

  // const removeFromList = id => {
  //   setProjects(projects.filter(project => project.id !== id));
  // }

  // const Projects = projects && phases &&
  //   projects
  //     .slice((page - 1) * itemPerPage, page * itemPerPage)
  //     .map(project => {
  //       const { id, title, address, phase, description, justify } = project;
  //       return (
  //         <Project
  //           key={id}
  //           id={id}
  //           title={title}
  //           address={address}
  //           currentPhase={phase ? phase : 1}
  //           phasesOption={phases}
  //           description={description}
  //           justify={justify}
  //           removeFromList={removeFromList}
  //         />
  //       );
  //     });

  // console.log(Projects);

  useInterval(() => {
      console.log("hello")
      if (projects && phases) {
      console.log("world")
      const project = projects[0];
      setProjects(projects.filter(item => item != project));
      const projectComponent = <Project
        key={project.id}
        id={project.id}
        title={project.title}
        address={project.address}
        currentPhase={project.phase ? project.phase : 1}
        phasesOption={project.phases}
        description={project.description}
        justify={project.justify}
      />;
      setProjectList({ ...projectList, projectComponent }, () => {
        console.log(projectList);
      });
    }
  }, 250);

  // useEffect(() => {
  //     const interval = setInterval(() => {
  //     if (projects && phases) {
  //       console.log("world")
  //       const project = projects[0];
  //       setProjects(projects.filter(item => item != project));
  //       const projectComponent = <Project
  //         key={project.id}
  //         id={project.id}
  //         title={project.title}
  //         address={project.address}
  //         currentPhase={project.phase ? project.phase : 1}
  //         phasesOption={project.phases}
  //         description={project.description}
  //         justify={project.justify}
  //       />;
  //       setProjectList({ ...projectList, projectComponent }, () => {
  //         console.log(projectList);
  //       });
  //     }
  //   }, 250);
  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   if (projects && phases)
  //     setProjectList(projects
  //       .slice((page - 1) * itemPerPage, page * itemPerPage)
  //       .map(project => {
  //         const { id, title, address, phase, description, justify } = project;
  //         return (
  //           <Project
  //             key={id}
  //             id={id}
  //             title={title}
  //             address={address}
  //             currentPhase={phase ? phase : 1}
  //             phasesOption={phases}
  //             description={description}
  //             justify={justify}
  //           />
  //         );
  //       })
  //     )
  // }, [page, projects, phases]);

  // useEffect(() => {
  //   console.log(projectList);
  // }, [projectList]);

  // useEffect(() => {
  //   if (projects) {
  //     setProjects(projects.filter(project => project.valid !== true));
  //     setMaxPage(projects.length / itemPerPage);
  //   }
  // }, [projects])

  const getNotValidatedProjects = async () => {
    const response = await request("/projects?_limit=-1&valid=false");

    const projects = response.filter(project => project.valid !== true);
    setProjects(projects);
    setMaxPage(Math.ceil(projects.length / itemPerPage));
  };

  const getPhasesName = async () => {
    const response = await request("/phases");

    setPhases(
      response.map(phase => {
        return {
          label: phase.phaseName,
          value: phase.phaseNumber
        }
      }));
  }

  useEffect(() => {
    getNotValidatedProjects();
    getPhasesName();
  }, []);

  return (
    <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
      <PluginHeader
        title={"Validate Projects"}
        description={"Validate projects from users and imports"}
      />
      <div className="row">
        <div className={"col-8"}>
          {/* {!Projects && <h3>No project to validate</h3>} */}
          {projectList &&
            <div className="project-list">
              {projectList}
              <div className="pagination">
                <Button
                  style={{ margin: "12px auto 0px auto" }}
                  label={"Prev."}
                  onClick={() => setPage(page > 1 ? page - 1 : page)}
                  disabled={page === 1 ? true : false}
                />
                <form>
                  <InputText
                    style={{ margin: "12px auto 0px auto" }}
                    id={`pagination`}
                    name={"pagination"}
                    placeholder={"1"}
                    type={"number"}
                    value={page.toString()}
                    onChange={({ target: { value } }) => {
                      if (value > 0 && value < maxPage)
                        setPage(value);
                    }} />
                </form>
                <Button
                  style={{ margin: "12px auto 0px auto" }}
                  label={"Next"}
                  onClick={() => setPage(page < maxPage ? page + 1 : page)}
                  disabled={page === maxPage ? true : false}
                />
              </div>
            </div>
          }
        </div>
        <div className={"col-8"}>

        </div>
      </div>
    </div>
  );
};

export default memo(HomePage);
