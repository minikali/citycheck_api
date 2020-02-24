import React, { useState, useEffect } from "react";
import { Select, Textarea, InputText, Button, Label } from "@buffetjs/core";
import { request } from "strapi-helper-plugin";
import LocationSearchInput from "../LocationSearchInput";

const Project = props => {
  const [show, setShow] = useState(true);
  const [coord, setCoord] = useState(null);
  const [state, setState] = useState({
    id: props.id,
    title: props.title,
    phase: props.currentPhase,
    address: props.address,
    description: props.description,
    justify: props.justify
  });

  const validateProject = async () => {
    try {
      const response = await request("/validate-project/validateProject", {
        method: "POST",
        body: {
          ...state,
          ...coord
        }
      });

      strapi.notification.info(`Project ${props.id}:${state.title} validated`);
      setShow(false);
    } catch (error) {
      strapi.notification.error(`${error}`);
    }
  };

  const deleteProject = async () => {
    try {
      await request("/validate-project/deleteProject", {
        method: "POST",
        body: {
          id: props.id
        }
      });

      strapi.notification.info(`Project ${props.id} deleted`);
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
      <Label htmlFor="address" style={{ marginTop: "10px" }}>{`Address [${coord ? `${coord.lat},${coord.lng}` : "Cannot find coordinates"}]`}</Label>
      {<LocationSearchInput
        address={state.address}
        setAddress={addr => {
          console.log(addr);
          setState({ ...state, address: addr });
        }}
        setCoord={setCoord}
        id={state.id}
      />}
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
      <Label htmlFor="justify" style={{ marginTop: "10px" }}>Justify</Label>
      <Textarea
        id={`justify-${props.id}`}
        name={"justify"}
        placeholder={"No justify"}
        type={"text"}
        value={state.justify}
        onChange={({ target: { value } }) => {
          setState({ ...state, justify: value });
        }}
      />
      <div className="row">
        <div className={"col-8"}>
          <Button
            style={{ margin: "12px auto 0px auto" }}
            label={"Validate"}
            onClick={() => {
              validateProject();
            }}
            disabled={!coord ? true : false}
          />
          <Button
            style={{ margin: "12px auto 0px 10px" }}
            label={"Delete"}
            onClick={() => {
              deleteProject();
            }}
          />
        </div>
      </div>

    </div>
  );
};

export default Project;