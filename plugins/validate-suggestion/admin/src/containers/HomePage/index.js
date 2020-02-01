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

  const getNotValidatedSuggestions = async () => {
    const response = await request("/projects");

    const projectWithSuggestions = response
    .filter(({ userSuggest }) => userSuggest && userSuggest.length > 0)
    .filter(({ userSuggest }) => {
      const suggestionCount = userSuggest
      .filter(suggestion => !suggestion.valid || suggestion.valid === false);
      return suggestionCount.length > 0
    });
    setProjects(projectWithSuggestions);
  }

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
    getNotValidatedSuggestions();
    getPhasesName();
  }, []);

  const Projects = projects && phases && projects.map(project => {
    console.log(project);
    return (
      <Project project={project} phases={phases}/>
    );
  });

  return (
    <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
      <PluginHeader
        title={"Validate Suggestions"}
        description={"Validate suggestions from users"}
      />
      <div className="row">
        <div className={"col-12"}>
          {Projects}
        </div>
      </div>
    </div>
  );
};

export default memo(HomePage);
