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
  const [projects, setProjects] = useState(null);
  const [phases, setPhases] = useState(null);
  const [projectList, setProjectList] = useState([]);
  const [delay, setDelay] = useState(JSON.parse(localStorage.getItem("google_api_delay")) || "500");
  const [countValid, setCountValid] = useState(0);

  useEffect(() => {
    localStorage.setItem("google_api_delay", delay);
  }, [delay])


  const validate = () => {
    setCountValid(countValid + 1);
  }
  

  useInterval(() => {
    if (projects && projects.length > 0 && phases && phases.length > 0) {
      const project = projects[0];
      const projectComponent = <Project
        id={project.id}
        key={project.id}
        title={project.title}
        address={project.address}
        currentPhase={project.phase ? project.phase : 1}
        phasesOption={project.phases}
        description={project.description}
        justify={project.justify}
        validate={validate}
      />;
      // eq. pop()
      setProjects(projects.filter(item => item.id !== project.id));
      // eq. push()
      setProjectList([...projectList, projectComponent]);
    }
  }, parseInt(delay, 10));

  const getNotValidatedProjects = async () => {
    const response = await request("/projects?_limit=-1&valid=false");

    const projects = response.filter(project => project.valid !== true);
    setProjects(projects);
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
          {projectList &&
          <>
          <h2>Number of projects : {`${projectList.length}(${countValid})`}</h2>
            <div className="project-list">
              {projectList}
            </div>
          </>}
          {!projectList || projectList.length === 0 && <h3>No project to validate</h3>}
        </div>
        <div className={"col-4"}>
        <h2>Settings</h2>
          <label htmlFor="delay" title="If you are getting too much errors, try to increment this value to call the google api slower">Google API call delay (ms)</label>
          <select
            name="delay"
            id="delay-select"
            value={delay}
            onChange={e => setDelay(e.target.value)}
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <option value="100">100 ms</option>
            <option value="200">200 ms</option>
            <option value="300">300 ms</option>
            <option value="400">400 ms</option>
            <option value="500">500 ms</option>
            <option value="600">600 ms</option>
            <option value="700">700 ms</option>
            <option value="800">800 ms</option>
            <option value="900">900 ms</option>
            <option value="1000">1000 ms</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default memo(HomePage);
