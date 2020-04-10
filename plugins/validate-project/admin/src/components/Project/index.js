import React, { useState, useEffect } from "react";
import { Select, Textarea, InputText, Button, Label } from "@buffetjs/core";
import { request } from "strapi-helper-plugin";
import LocationSearchInput from "../LocationSearchInput";

const translate = async (txt, destLang) => {
  try {
    const key = "trnsl.1.1.20200410T111243Z.09305873700877ce.821f1f457e4ac22fee5abcdfaeca67f5949e1c3f";
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("text", txt);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    const response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&lang=${destLang}`, requestOptions);
    const text = await response.text();
    if (!response.ok) throw new Error(text);
    console.log(text);
    return JSON.parse(text);
  } catch (err) {
    console.error(err);
    return null;
  };
};

const Project = props => {
  const [show, setShow] = useState(true);
  const [coord, setCoord] = useState(null);
  const [state, setState] = useState({
    id: props.id,
    title: props.title || "",
    phase: props.currentPhase,
    address: props.address || "",
    description: props.description || "",
    justify: props.justify || ""
  });
  const [t, setT] = useState({
    title: props.title || "",
    phase: props.currentPhase,
    address: props.address || "",
    description: props.description || "",
    justify: props.justify || ""
  })

  const validateProject = async () => {
    try {
      setShow(false);
      const response = await request("/validate-project/validateProject", {
        method: "POST",
        body: {
          ...state,
          ...coord,
          lang: props.lang,
          t
        }
      });
      console.log(response);
      strapi.notification.info(`Project ${props.id}:${state.title} validated`);
      props.validate();
    } catch (error) {
      strapi.notification.error(`${error}`);
    }
  };

  const deleteProject = async () => {
    try {
      await request("/validate-project/deleteProject", {
        method: "POST",
        body: {
          id: props.id,
          lang: props.lang
        }
      });

      strapi.notification.info(`Project ${props.id} deleted`);
      setShow(false);
    } catch (error) {
      strapi.notification.error(`${error}`);
    }
  };

  useEffect(() => {
    (async () => {
      const title = state.title && (await translate(state.title, props.lang === "fr" ? "en" : "fr")).text[0];
      const description = state.description && (await translate(state.description, props.lang === "fr" ? "en" : "fr")).text[0];
      const justify = state.justify && (await translate(state.justify, props.lang === "fr" ? "en" : "fr")).text[0];
      const t = {
        title: title,
        phase: state.phase,
        address: state.address,
        description: description,
        justify: justify
      }
      setT(t);
    })();
  }, []);

  const translateTitle = async () => {
    const title = (await translate(state.title, props.lang === "fr" ? "en" : "fr")).text[0];
    setT({ ...t, title });
  };

  const translateDescription = async () => {
    const description = (await translate(state.description, props.lang === "fr" ? "en" : "fr")).text[0];
    setT({ ...t, description });
  };

  const translateJustify = async () => {
    const justify = (await translate(state.justify, props.lang === "fr" ? "en" : "fr")).text[0];
    setT({ ...t, justify });
  };

  const translateAll = async () => {
    const title = (await translate(state.title, props.lang === "fr" ? "en" : "fr")).text[0];
    const description = (await translate(state.description, props.lang === "fr" ? "en" : "fr")).text[0];
    const justify = (await translate(state.justify, props.lang === "fr" ? "en" : "fr")).text[0];
    setT({ ...t, title, description, justify });
  };

  return (
    show && <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
      <div className="row">
        <div className={"col-6"}>
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
              setState({ ...state, address: addr });
            }}
            coord={coord}
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
        {/* Translation */}
        <div className={"col-6"}>
          <h2>{`Translated project by Yandex`}
            <Button
              style={{ margin: "12px auto 0px auto" }}
              label={"Translate all"}
              onClick={() => {
                translateAll();
              }}
              style={{
                height: "15px",
                fontSize: "12px",
                marginLeft: "10px"
              }}
            /></h2>
          <Label htmlFor="title" style={{ marginTop: "10px" }}>
            Title
            <Button
              style={{ margin: "12px auto 0px auto" }}
              label={"Translate"}
              onClick={() => {
                console.log(props.lang);
                translateTitle();
              }}
              style={{
                height: "15px",
                fontSize: "12px",
                marginLeft: "10px"
              }}
            />
          </Label>
          <InputText
            id={`title-t-${props.id}`}
            name={"title"}
            placeholder={"No title"}
            type={"text"}
            value={t.title}
            onChange={({ target: { value } }) => {
              setT({ ...t, title: value });
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
              disabled
            />
          <Label htmlFor="description" style={{ marginTop: "10px" }}>Address</Label>
          <InputText
            id={`address-t-${props.id}`}
            name={"address"}
            placeholder={"No description"}
            type={"text"}
            value={state.address}
            onChange={({ target: { value } }) => {
              setState({ ...state, address: value });
            }}
            disabled
          />
          <Label htmlFor="description" style={{ marginTop: "10px" }}>
            Description
            <Button
              style={{ margin: "12px auto 0px auto" }}
              label={"Translate"}
              onClick={() => {
                translateDescription();
              }}
              style={{
                height: "15px",
                fontSize: "12px",
                marginLeft: "10px"
              }}
            />
          </Label>
          <Textarea
            id={`description-t-${props.id}`}
            name={"description"}
            placeholder={"No description"}
            type={"text"}
            value={t.description}
            onChange={({ target: { value } }) => {
              setT({ ...t, description: value });
            }}
          />
          <Label htmlFor="justify" style={{ marginTop: "10px" }}>
            Justify
            <Button
              style={{ margin: "12px auto 0px auto" }}
              label={"Translate"}
              onClick={() => {
                translateJustify();
              }}
              style={{
                height: "15px",
                fontSize: "12px",
                marginLeft: "10px"
              }}
            />
          </Label>
          <Textarea
            id={`justify-t-${t.id}`}
            name={"justify"}
            placeholder={"No justify"}
            type={"text"}
            value={t.justify}
            onChange={({ target: { value } }) => {
              setT({ ...state, justify: value });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Project;