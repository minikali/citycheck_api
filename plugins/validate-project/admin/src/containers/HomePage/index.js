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
  const [frenchProjects, setFrenchProjects] = useState(null);
  const [englishProjects, setEnglishProjects] = useState(null);
  const [frenchProjectList, setFrenchProjectList] = useState([]);
  const [englishProjectList, setEnglishProjectList] = useState([]);
  const [phases, setPhases] = useState(null);
  const [delay, setDelay] = useState(JSON.parse(localStorage.getItem("google_api_delay")) || "500");
  const [countValid, setCountValid] = useState(0);

  useEffect(() => {
    localStorage.setItem("google_api_delay", delay);
  }, [delay])


  const validate = () => {
    setCountValid(countValid + 1);
  }


  useInterval(() => {
    if (frenchProjects && frenchProjects.length > 0 && phases && phases.length > 0) {
      const project = frenchProjects[0];
      const projectComponent = <Project
        id={project.id}
        key={project.id}
        title={project.title}
        address={project.address}
        currentPhase={project.phase ? project.phase : 1}
        phasesOption={phases}
        description={project.description}
        justify={project.justify}
        validate={validate}
        lang="fr"
      />;
      // eq. pop()
      setFrenchProjects(frenchProjects.filter(item => item.id !== project.id));
      // eq. push()
      setFrenchProjectList([...frenchProjectList, projectComponent]);
    }
    if (englishProjects && englishProjects.length > 0 && phases && phases.length > 0) {
      const project = englishProjects[0];
      console.log(phases);
      const projectComponent = <Project
        id={project.id}
        key={project.id}
        title={project.title}
        address={project.address}
        currentPhase={project.phase ? project.phase : 1}
        phasesOption={phases}
        description={project.description}
        justify={project.justify}
        validate={validate}
        lang="en"
      />;
      // eq. pop()
      setEnglishProjects(englishProjects.filter(item => item.id !== project.id));
      // eq. push()
      setEnglishProjectList([...englishProjectList, projectComponent]);
    }
  }, parseInt(delay, 10));

  const getNotValidatedFrenchProjects = async () => {
    const response = await request("/french-projects?_limit=-1&valid=false");

    const projects = response.filter(project => project.valid !== true);
    setFrenchProjects(projects);
  };

  const getNotValidatedEnglishProjects = async () => {
    const response = await request("/english-projects?_limit=-1&valid=false");

    const projects = response.filter(project => project.valid !== true);
    setEnglishProjects(projects);
  };

  const getPhasesName = async () => {
    const response = await request("/phases");
    console.log(response);
    setPhases(
      response.map(phase => {
        return {
          label: phase.label,
          value: phase.value
        }
      }));
  }

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
      <div className="row">
        <div className={"col-12"}>
          {frenchProjectList &&
            <>
              <h1>FRENCH PROJECTS</h1>
              <h2>Number of french projects : {`${frenchProjectList.length}(${countValid})`}</h2>
              <div className="project-list">
                {frenchProjectList}
              </div>
            </>}
          {!frenchProjectList || frenchProjectList.length === 0 && <h3>No french project to validate</h3>}
          {englishProjectList &&
            <>
              <h1 style={{ marginTop: "20px" }}>ENGLISH PROJECTS</h1>
              <h2>Number of english projects : {`${englishProjectList.length}(${countValid})`}</h2>
              <div className="project-list">
                {englishProjectList}
              </div>
            </>}
          {!englishProjectList || englishProjectList.length === 0 && <h3>No english project to validate</h3>}
        </div>
      </div>
    </div>
  );
};

export default memo(HomePage);
