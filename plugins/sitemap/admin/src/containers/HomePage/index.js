/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import { InputText, Textarea, Button, Label } from "@buffetjs/core";
import {
  request
} from "strapi-helper-plugin";
import LocationSearchInput from "../../components/LocationSearchInput";
import "./style.css"

const HomePage = () => {
  const initialState = {
    title: "",
    path: "",
    address: "",
    description: ""
  }
  const [place, setPlace] = useState(initialState);
  const [list, setList] = useState(null);
  const [coord, setCoord] = useState(null);

  const deletePlace = async id => {
    try {
      const response = await request("/sitemap/deletePlace", {
        method: "POST",
        body: {
          place
        }
      });
      strapi.notification.info(`Place ${id} deleted`);
      getSiteMap()
    } catch (e) {
      console.error(e);
      strapi.notification.info(`${e}`);
    }
  };

  const getSiteMap = async () => {
    try {
      const response = await request("/sitemaps");
      setList(response);
    } catch (e) {
      console.error(e);
    }
  };

  const submitPlace = async () => {
    try {
      const response = await request("/sitemap/submitPlace", {
        method: "POST",
        body: {
          place
        }
      });
      strapi.notification.info(`New place saved`);
      getSiteMap();
      setPlace(initialState);
    } catch (e) {
      console.error(e);
      strapi.notification.info(`${e}`);
    }
  };

  const List = list && list.map(({ id, title, path, address, description }) => {
    return <tr key={id}>
      <td>{id}</td><td>{title}</td><td>{path}</td><td>{address}</td><td><Button label={"Delete"}
        onClick={() => {
          deletePlace(id);
        }} /></td>
    </tr>
  });

  useEffect(() => {
    getSiteMap();
  }, [])

  return (
    <div className="sitemap">
      <h1>Plan du site - Villes</h1>
      <div className="info">
        <p>Ajouter des villes dans le plan du site</p>
        <br />
        <p>Example:</p>
        <p><span>{"Title: "}</span>Paris (Affiché à l'utilisateur)</p>
        <p><span>{"Path: "}</span>"paris" ou "paris-france" (Doit être unique, sert a créer l'url)</p>
        <p><span>{"Address: "}</span>Paris, France</p>
      </div>
      <div className="places">
        <Label htmlFor="title-sitemap" style={{ marginTop: "10px" }}>Title</Label>
        <InputText
          id={`title-sitemap`}
          name={"title-sitemap"}
          type={"text"}
          value={place.title}
          onChange={({ target: { value } }) => {
            setPlace({ ...place, title: value });
          }}
        />
        <Label htmlFor="path-sitemap" style={{ marginTop: "10px" }}>Path</Label>
        <InputText
          id={`path-sitemap`}
          name={"path-sitemap"}
          type={"text"}
          value={place.path}
          onChange={({ target: { value } }) => {
            setPlace({ ...place, path: value.toLowerCase() });
          }}
        />
        <Label htmlFor="address" style={{ marginTop: "10px" }}>{`Address [${coord ? `${coord.lat},${coord.lng}` : "Cannot find coordinates"}]`}</Label>
        {<LocationSearchInput
          address={place.address}
          setAddress={addr => {
            setPlace({ ...place, address: addr });
          }}
          coord={coord}
          setCoord={setCoord}
        />}
        <Button style={{ marginTop: "10px" }} label={"Save"}
          onClick={() => {
            submitPlace();
          }} />
      </div>
      <div className="list">
        <h2>Liste des liens créer</h2>
        <table className="blueTable">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Path</th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {List}
          </tbody>
        </table>
      </div>
    </div >
  );
};

export default memo(HomePage);
