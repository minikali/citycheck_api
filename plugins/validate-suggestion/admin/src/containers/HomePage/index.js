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

// import PropTypes from 'prop-types';

const HomePage = () => {
  const [projects, setProjects] = useState(null);
  const [phases, setPhases] = useState(null);

  const getProjectWithSuggestions = async () => {
    try {
      // Returns an array of object
      const response = await request("/projects");
      // Remove projects without suggestions
      const projectWithSuggestion = response.filter(({ userSuggest }) => userSuggest.length > 0);
      return projectWithSuggestion;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const getPhasesName = async () => {
    const response = await request("/phases");
    return response.map(phase => {
      return {
        label: phase.phaseName,
        value: phase.phaseNumber
      }
    });
  };

  useEffect(() => {
    getProjectWithSuggestions().then(projectWithSuggestion => setProjects(projectWithSuggestion));
    getPhasesName().then(phases => setPhases(phases));
  }, []);

  const Projects = (projects && phases) ? projects.map(project => {
    const projectWithInvalidSuggestion = project.userSuggest.filter(suggestion => suggestion.valid === false || suggestion.valid === null);
    if (projectWithInvalidSuggestion.length === 0) return null;
    return (
      <Project project={project} phases={phases} />
    );
  }) : [];

  return (
    <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
      <PluginHeader
        title={"Validate Suggestions"}
        description={"Validate suggestions from users"}
      />
      <div className="row">
        <div className={"col-12"}>
          {Projects}
          {!Projects && <div>No suggestion to validate</div>}
        </div>
      </div>
    </div>
  );
};

export default memo(HomePage);
