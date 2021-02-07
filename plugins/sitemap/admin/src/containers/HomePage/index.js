/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from "react";
import { InputText, Button, Label } from "@buffetjs/core";
import { request } from "strapi-helper-plugin";
import SearchBox from "../../components/SearchBox";
import slugify from "slugify";
import "./style.css";

const HomePage = () => {
  const initialState = {
    title: "",
    path: "",
  };
  const [place, setPlace] = useState(initialState);
  const [list, setList] = useState(null);
  const [coord, setCoord] = useState(null);
  const [addr, setAddr] = useState();

  const deletePlace = async (id) => {
    try {
      const response = await request("/sitemap/deletePlace", {
        method: "POST",
        body: {
          id,
        },
      });
      strapi.notification.info(`Place ${id} deleted`);
      getSiteMap();
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
          place,
        },
      });
      strapi.notification.info(`New place saved`);
      getSiteMap();
      setPlace(initialState);
    } catch (e) {
      console.error(e);
      strapi.notification.info(`${e}`);
    }
  };

  const List =
    list &&
    list.map(({ id, title, path, address, description }) => {
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{title}</td>
          <td>{path}</td>
          <td>{address}</td>
          <td>
            <Button
              label={"Delete"}
              onClick={() => {
                deletePlace(id);
              }}
            />
          </td>
        </tr>
      );
    });

  useEffect(() => {
    getSiteMap();
  }, []);

  useEffect(() => {
    if (addr) {
      const arr = addr.label.split(", ");
      setPlace({
        title: arr[0],
        path: slugify(`${arr[0]}-${arr[arr.length - 1]}`.toLowerCase()),
        address: `${arr[0]}, ${arr[arr.length - 1]}`
      });
    } else {
      setPlace(initialState)
    }
  }, [addr]);

  return (
    <div className="sitemap">
      <h1>Plan du site - Villes</h1>
      <div className="info">
        <p>Ajouter des villes dans le plan du site</p>
        <br />
        <p>Saisir une adresse et modifier le titre si nécessaire</p>
      </div>
      <div className="places">
        <Label
          htmlFor="address"
          style={{ marginTop: "30px" }}
        >{`Address`}</Label>
        <SearchBox addr={addr} setAddr={setAddr} />
        <Label htmlFor="title-sitemap" style={{ marginTop: "10px" }}>
          Title
        </Label>
        <InputText
          id={`title-sitemap`}
          name={"title-sitemap"}
          type={"text"}
          value={place.title}
          onChange={({ target: { value } }) => {
            setPlace({ ...place, title: value });
          }}
        />
        <Label htmlFor="path-sitemap" style={{ marginTop: "10px" }}>
          Path
        </Label>
        <InputText
          id={`path-sitemap`}
          name={"path-sitemap"}
          type={"text"}
          value={place.path}
          onChange={({ target: { value } }) => {
            setPlace({ ...place, path: value.toLowerCase() });
          }}
          disabled={true}
        />

        <Button
          style={{ marginTop: "10px" }}
          label={"Save"}
          onClick={() => {
            submitPlace();
          }}
        />
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
          <tbody>{List}</tbody>
        </table>
      </div>
    </div>
  );
};

export default memo(HomePage);
