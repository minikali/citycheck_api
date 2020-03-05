import React, { useState, useEffect } from "react";
import { Textarea, Select, Button, Label } from "@buffetjs/core";
import { request } from "strapi-helper-plugin";
import Project from "../Project";

const Suggestion = props => {
  const [show, setShow] = useState(true);
  const {
    id,
    phase,
    justify,
    project,
    created_at,
    userinfo,
    phases
  } = props;
  const [state, setState] = useState({
    justify,
    phase
  });

  const validateSuggestion = async data => {
    try {
      const res = await request("/validate-suggestion/validateSuggestion", {
        method: "POST",
        body: {
          suggestion: {
            ...props,
            ...state
          }
        }
      });
      strapi.notification.info(`Suggestion ${res.id} by ${res.userinfo.username} validated`);
      setShow(false);
    } catch (e) { 
      console.error(e);
      strapi.notification.error(`${error}`);
    }
  };

  const deleteSuggestion = async id => {
    try {
      const res = await request("/validate-suggestion/deleteSuggestion", {
        method: "POST",
        body: { id }
      });
      console.log(res);
      setShow(false);
      strapi.notification.info(`Suggestion ${res.id} by ${res.userinfo.username} deleted`);
    } catch (error) {
      strapi.notification.error(`${error}`);
      return false;
    }
  };

  return (
    show &&
    <div className={"container-fluid row"} style={{ padding: "18px 30px" }}>
      <div className={`col-6`}>
        <h2>{`Suggestion ID:${id}`}</h2>
        <p>{`by ${userinfo && userinfo.username ? `${userinfo.username} [id:${userinfo.id}]` : ""} `}</p>
        <p>{`Created at ${new Date(created_at).toLocaleDateString("fr-FR")}`}</p>

        <Label htmlFor="phase" style={{ marginTop: "10px" }}>Phase</Label>
        <Select
          name="phase"
          options={phases}
          value={state.phase}
          onChange={({ target: { value } }) => {
            setState({ ...state, phase: parseInt(value, 10) });
          }}
        />

        <Label htmlFor="Justify"
          style={{ marginTop: "10px" }}>Justify</Label>
        <Textarea
          id={`justify-${id}`}
          name={"justify"}
          placeholder={"No justify"}
          type={"text"}
          value={state.justify}
          onChange={({ target: { value } }) => {
            setState({ ...state, justify: value });
          }}
        />

        <div className="row">
          <div className={"col-12"}>
            <Button
              style={{ margin: "12px auto 0px auto" }}
              label={"Validate"}
              onClick={() => {
                validateSuggestion(state);
              }}
            />
            <Button
              style={{ margin: "12px auto 0px 10px" }}
              label={"Delete"}
              onClick={() => {
                deleteSuggestion(id);
              }}
            />
          </div>
        </div>
      </div>
      <div className={`col-6`}>
        <Project
          id={project.id}
          title={project.title}
          created_at={project.created_at}
          description={project.description}
          phase={project.phase}
          address={project.address}
          userinfo={project.userinfo}
          justify={project.justify}
          phases={phases}
        />
      </div>

    </div>
  );
};

export default Suggestion;