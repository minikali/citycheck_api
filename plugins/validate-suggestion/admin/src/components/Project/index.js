import React, { useState, useEffect } from "react";
import { Button, Label } from "@buffetjs/core";
import { request } from "strapi-helper-plugin";
import Suggestion from "../Suggestion";

const Project = ({ project, phases }) => {
  const [suggestions, setSuggestion] = useState(project.userSuggest);
  // const { id, title, address, phase, description, justify } = project;

  const validateSuggestion = async data => {
    try {
      const response = await request("/validate-suggestion/validateSuggestion", {
        method: "POST",
        body: {
          projectId: project.id,
          suggestion: data,
          suggestionList: project.userSuggest
        }
      });

      const suggestion = suggestions.filter(suggest => suggest.id === data.id);
      const username = suggestion[0].userinfo.username;
      strapi.notification.info(`Suggestion ${data.id} by ${username} validated`);
      setSuggestion(...suggestions.filter(suggest => suggest.id !== data.id));
      return true;
    } catch (error) {
      strapi.notification.error(`${error}`);
      return false;
    }
  };

  const deleteSuggestion = async suggestionId => {
    try {
      const response = await request("/validate-suggestion/deleteSuggestion", {
        method: "POST",
        body: {
          project: project,
          suggestionId: suggestionId
        }
      });
      const suggestion = suggestions.filter(suggest => suggest.id === suggestionId);
      const username = suggestion[0].userinfo.username;
      strapi.notification.info(`Suggestion ${suggestionId} by ${username} deleted`);
      console.log(suggestions.filter(suggest => suggest.id !== suggestionId));
      setSuggestion(suggestions.filter(suggest => suggest.id !== suggestionId), () => {
        console.log(suggestions);
      });
      return true;
    } catch (error) {
      strapi.notification.error(`${error}`);
      return false;
    }
  };


  const Suggestions = project.userSuggest && project.userSuggest
  .filter(suggestion => !suggestion.valid || suggestion.valid === false)
  .map(suggestion => {
    return <Suggestion
      suggestion={suggestion}
      phases={phases}
      projectId={project.id}
      validateSuggestion={validateSuggestion}
      deleteSuggestion={deleteSuggestion} />
  });

  return (
    (Suggestions && Suggestions.length > 0 && 
    suggestions && suggestions.length > 0) ? <div className="row">
      <div className={"col-6"}>
        {Suggestions}
      </div>
      <div className={"col-6"}>
        <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
          <h2>{`Project id ${project.id}`}</h2>
          <Label htmlFor="title" style={{ marginTop: "10px" }}>Title</Label>
          <p>{project.title}</p>
          <Label htmlFor="phase" style={{ marginTop: "10px" }}>Phase</Label>
          <p>{phases.filter(phase => phase.value === project.phase).label}</p>
          <Label htmlFor="address" style={{ marginTop: "10px" }}>Address</Label>
          <p>{project.address}</p>
          <Label htmlFor="description" style={{ marginTop: "10px" }}>Description</Label>
          <p>{project.description}</p>
          <Label htmlFor="justify" style={{ marginTop: "10px" }}>Justify</Label>
          <p>{project.justify}</p>
        </div>
      </div>
    </div> 
    :
    <div>No suggestions to validate</div>
  );
};

export default Project;