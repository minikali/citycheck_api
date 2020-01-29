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

const initialPhase = {
  phase1: {
    id: null,
    label: "Phase 1",
    value: 1
  },
  phase2: {
    id: null,
    label: "Phase 2",
    value: 2
  },
  phase3: {
    id: null,
    label: "Phase 3",
    value: 3
  }
};

const HomePage = () => {
  const [phases, setPhases] = useState(initialPhase);

  const getPhases = async () => {
    const response = await request("/phases");

    if (!response) return;
    const phase1 = response.filter(phase => phase.phaseNumber === 1);
    const phase2 = response.filter(phase => phase.phaseNumber === 2);
    const phase3 = response.filter(phase => phase.phaseNumber === 3);
    setPhases({
      ...phases,
      phase1: {
        ...phases.phase1,
        id: phase1 && phase1[0] ? phase1[0].id : null,
        label: phase1 && phase1[0] ? phase1[0].phaseName : "Phase 1"
      },
      phase2: {
        ...phases.phase2,
        id: phase2 && phase2[0] ? phase2[0].id : null,
        label: phase2 && phase2[0] ? phase2[0].phaseName : "Phase 2"
    },
      phase3: {
        ...phases.phase3,
        id: phase3 && phase3[0] ? phase3[0].id : null,
        label: phase3 && phase3[0] ? phase3[0].phaseName : "Phase 3"
    }
    });
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
            value={phases.phase1.label}
            onChange={({ target: { value } }) => {
              setPhases({ ...phases, phase1: { ...phases.phase1, label: value } });
            }}
          />
          <Label htmlFor="Phase 2" style={{ marginTop: "10px" }}>Phase 2</Label>
          <InputText
            id={`phase-2`}
            name={"phase-2"}
            placeholder={"phase 2"}
            type={"text"}
            value={phases.phase2.label}
            onChange={({ target: { value } }) => {
              setPhases({ ...phases, phase2: { ...phases.phase2, label: value } });
            }}
          />
          <Label htmlFor="Phase 3" style={{ marginTop: "10px" }}>Phase 3</Label>
          <InputText
            id={`phase-3`}
            name={"phase-3"}
            placeholder={"phase 3"}
            type={"text"}
            value={phases.phase3.label}
            onChange={({ target: { value } }) => {
              setPhases({ ...phases, phase3: { ...phases.phase3, label: value } });
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
