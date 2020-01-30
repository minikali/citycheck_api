/*
 *
 * HomePage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import {
  PluginHeader,
  request
} from "strapi-helper-plugin";
import Project from '../../components/Project';
import useScript from "../../../../../manage-phases/admin/src/hook/useScript";

const HomePage = () => {
  const [projects, setProjects] = useState(null);
  const [phases, setPhases] = useState(null);
  const [isGooglePlacesAutoLoaded] = useScript(
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyAr2ugrwLtCWxdkM1qLJbgbCPzQqr9oC14&libraries=places"
  );
  const getNotValidatedProjects = async () => {
    const response = await request("/projects");

    setProjects(response.filter(project => project.valid !== true));
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

  const Projects = projects && phases && projects.map(project => {
    const { id, title, address, phase, description } = project;
    return (
      <Project
        id={id}
        title={title}
        address={address}
        currentPhase={phase ? phase : 1}
        phasesOption={phases}
        description={description}
        isGooglePlacesAutoLoaded={isGooglePlacesAutoLoaded}
      />
    );
  });

  return (
    <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
      <PluginHeader
        title={"Validate Projects"}
        description={"Validate projects from users and imports"}
      />
      <div className="row">
        <div className={"col-8"}>
          {Projects && Projects.length > 0 ? Projects : <h3>No project to validate</h3>}
        </div>
      </div>

    </div>
  );
};

export default memo(HomePage);
