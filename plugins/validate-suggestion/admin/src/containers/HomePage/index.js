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

  const getSuggestions = async () => {
    try {
      const response = await request("/project-suggestions?_limit=-1&valid=false");
      console.log(response);
      setSuggestions(response);
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  useEffect(() => {
    getSuggestions();
  }, []);

  const Suggestions = suggestions? suggestions.map(item => {
    const {id, phase, justify_fr, justify_en, french_project, english_project, created_at, userinfo, valid } = item;

    return (
      <Suggestion
        key={id}
        id={id}
        phase={phase}
        justify_fr={justify_fr}
        justify_en={justify_en}
        french_project={french_project}
        english_project={english_project}
        created_at={created_at}
        userinfo={userinfo}
        valid={valid}
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
