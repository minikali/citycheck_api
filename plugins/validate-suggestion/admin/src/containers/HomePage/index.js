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
      setSuggestions(response);
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const validateSuggestion = async data => {
    try {
      const response = await request("/validate-suggestion/validateSuggestion", {
        method: "POST",
        body: {
          suggestion: {
            ...data
          }
        }
      });
      if (!response) throw new Error(`Error during suggestion[${data.id}] validation`)
      strapi.notification.info(`Suggestion ${data.id} by ${data.user.name} validated`);
      getSuggestions();
    } catch (e) { 
      console.error(e);
      strapi.notification.error(`${e}`);
    }
  };

  const deleteSuggestion = async id => {
    try {
      const res = await request("/validate-suggestion/deleteSuggestion", {
        method: "POST",
        body: { id }
      });
      getSuggestions();
      strapi.notification.info(`Suggestion ${res.id} by ${res.user.name} deleted`);
    } catch (error) {
      strapi.notification.error(`${error}`);
      return false;
    }
  };

  useEffect(() => {
    getSuggestions();
  }, []);

  const Suggestions = suggestions ? suggestions.map(item => {
    const {id, phase, justify_fr, justify_en, french_project, english_project, created_at, user, valid } = item;

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
        user={user}
        valid={valid}
        validateSuggestion={data => validateSuggestion(data)}
        deleteSuggestion={data => deleteSuggestion(data)}
      />
    );
  }) : null;

  return (
    <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
      <PluginHeader
        title={"Validate Suggestions"}
        description={"Validate suggestions from users"}
      />
      <div className="row">
        <div className={"col-12"}>
          {!Suggestions && <p>Loading...</p>}
          {Suggestions && Suggestions.length === 0 && <p>No suggestions to validate</p>}
          {Suggestions && Suggestions.length > 0 && Suggestions}
        </div>
      </div>
    </div>
  );
};

export default memo(HomePage);
