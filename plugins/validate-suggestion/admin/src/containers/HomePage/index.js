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
import Suggestion from '../../components/Suggestion';

const HomePage = () => {
  const [suggestions, setSuggestions] = useState(null);
  const [phases, setPhases] = useState(null);

  const getSuggestions = async () => {
    try {
      const response = await request("/project-suggestions?_limit=-1&valid=false");
  
      setSuggestions(response);
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const getPhasesName = async () => {
    try {
      const response = await request("/phases");
      setPhases(response.map(phase => {
        return {
          label: phase.phaseName,
          value: phase.phaseNumber
        }
      }));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getSuggestions();
    getPhasesName();
  }, []);

  const Suggestions = (suggestions && phases) ? suggestions.map(item => {
    const {id, phase, justify, project, created_at, userinfo, valid } = item;
    return (
      <Suggestion
        key={id}
        id={id}
        phase={phase}
        justify={justify}
        project={project}
        created_at={created_at}
        userinfo={userinfo}
        valid={valid}
        phases={phases}
      />
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
          {Suggestions && Suggestions.length > 0 ? Suggestions : <div>No suggestion to validate</div> }
        </div>
      </div>
    </div>
  );
};

export default memo(HomePage);
