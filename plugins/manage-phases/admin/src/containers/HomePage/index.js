/*
 *
 * HomePage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { InputText, Label, Button } from "@buffetjs/core";
import {
  PluginHeader,
  request
} from "strapi-helper-plugin";

const initialPhase = [
  {
    id: null,
    label: "Nom de la phase 1",
    value: 1
  },
  {
    id: null,
    label: "Nom de la phase 2",
    value: 2
  },
  {
    id: null,
    label: "Nom de la phase 3",
    value: 3
  }
];

const HomePage = () => {
  const [phases, setPhases] = useState(initialPhase);

  const getPhases = async () => {
    const response = await request("/phases");

    // Check if contains all 3 phases
    setPhases(phases.map(phase => {
      const ph = response.filter(element => element.value === phase.value).shift();
      return ph || phase;
    }));
  };

  const submitPhases = async () => {
    try {
      await request("/manage-phases/submitPhases", {
        method: "POST",
        body: phases
      });
      strapi.notification.info(`Label of phases updated`);
    } catch (error) {
      strapi.notification.error(`${error}`);
    }
  };

  useEffect(() => {
    getPhases();
  }, []);
  
  return (
    <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
      <PluginHeader
        title={"Manage phases names"}
        description={"Change the name of the phases"}
      />
      <div className="row">
        <div className={"col-6"}>
          <Label htmlFor="Phase 1" style={{ marginTop: "10px" }}>Phase 1</Label>
          <InputText
            id={`phase-1`}
            name={"phase-1"}
            placeholder={"phase 1"}
            type={"text"}
            value={phases.filter(phase => phase.value === 1).shift().label}
            onChange={({ target: { value } }) => {
              setPhases(phases.map(phase => (phase.value === 1 ? { ...phase, label: value } : phase)));
            }}
          />
          <Label htmlFor="Phase 2" style={{ marginTop: "10px" }}>Phase 2</Label>
          <InputText
            id={`phase-2`}
            name={"phase-2"}
            placeholder={"phase 2"}
            type={"text"}
            value={phases.filter(({ value }) => value === 2).shift().label}
            onChange={({ target: { value } }) => {
              setPhases(phases.map(phase => phase.value === 2 ? { ...phase, label: value } : phase));
            }}
          />
          <Label htmlFor="Phase 3" style={{ marginTop: "10px" }}>Phase 3</Label>
          <InputText
            id={`phase-3`}
            name={"phase-3"}
            placeholder={"phase 3"}
            type={"text"}
            value={phases.filter(({ value }) => value === 3).shift().label}
            onChange={({ target: { value } }) => {
              setPhases(phases.map(phase => phase.value === 3 ? { ...phase, label: value } : phase));
            }}
          />
          <Button
            style={{ margin: "12px auto 0px auto" }}
            label={"Submit"}
            onClick={() => {
              submitPhases();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(HomePage);
