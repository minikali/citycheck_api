import React, { useState, useEffect } from "react";
import { Select, Textarea, InputText, Button, Label } from "@buffetjs/core";
import { request } from "strapi-helper-plugin";


const Project = props => {
  const [show, setShow] = useState(true);
  const [state, setState] = useState({
    id: props.id,
    title: props.title,
    phase: props.currentPhase,
    address: props.address,
    description: props.description
  });

  const validateProject = async () => {
    try {
      await request("/validate-project/validateProject", {
        method: "POST",
        body: state
      });

      strapi.notification.info(`Project ${props.id}:${state.title} validated`);
      setShow(false);
    } catch (error) {
      strapi.notification.error(`${error}`);
    }
  };

  return (
    show && <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
      <h2>{`Project id ${state.id}`}</h2>
      <Label htmlFor="title" style={{ marginTop: "10px" }}>Title</Label>
      <InputText
        id={`title-${props.id}`}
        name={"title"}
        placeholder={"No title"}
        type={"text"}
        value={state.title}
        onChange={({ target: { value } }) => {
          setState({ ...state, title: value });
        }}
      />
      <Label htmlFor="phase" style={{ marginTop: "10px" }}>Phase</Label>
      <Select
        name="phase"
        options={props.phasesOption}
        value={state.phase}
        onChange={({ target: { value } }) => {
          setState({ ...state, phase: parseInt(value, 10) });
        }}
      />
      <Label htmlFor="address" style={{ marginTop: "10px" }}>Address</Label>
      <InputText
        id={`address-${props.id}`}
        name={"address"}
        placeholder={"No address"}
        type={"text"}
        value={state.address}
        onChange={({ target: { value } }) => {
          setState({ ...state, address: value });
        }}
      />
      <Label htmlFor="description" style={{ marginTop: "10px" }}>Description</Label>
      <Textarea
        id={`description-${props.id}`}
        name={"description"}
        placeholder={"No description"}
        type={"text"}
        value={state.description}
        onChange={({ target: { value } }) => {
          setState({ ...state, description: value });
        }}
      />
      <Button
        style={{ margin: "12px auto 0px auto" }}
        label={"Validate"}
        onClick={() => {
          validateProject();
        }}
      />
    </div>
  );
};

export default Project;