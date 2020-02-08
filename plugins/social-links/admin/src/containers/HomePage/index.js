/*
 *
 * HomePage
 *
 */

import React, { memo, useState } from 'react';
import {
  PluginHeader,
  request
} from "strapi-helper-plugin";
import { InputText, Label, Button } from "@buffetjs/core";
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import { useEffect } from 'react';

const HomePage = () => {
  const initialSocial = [
    {
      id: null,
      label: "facebook",
      url: "facebook.com"
    },
    {
      id: null,
      label: "google",
      url: "google.com"
    },
    {
      id: null,
      label: "instagram",
      url: "instagram.com"
    }
  ];
  const [social, setSocial] = useState(initialSocial);
  const submitSocial = async () => {
    try {
      await request("/social-links/submitSocial", {
        method: "POST",
        body: social
      });
      strapi.notification.info(`Label of phases updated`);
    } catch (error) {
      strapi.notification.error(`${error}`);
    }
  };

  const getSocial = async () => {
    const response = await request("/socials");
    const Social = social.map(social => {
      const item = response.filter(item => item.label === social.label);
      if (item.length === 0)
        return social;
      return { ...social, id: item[0].id, url: item[0].url }
    })
    setSocial(Social);
  };

  useEffect(() => {
    getSocial();
  }, []);

  return (
    <div style={{ margin: "20px"}}>
      <PluginHeader
          title={"Edit social share link from the footer"}
          description={"Facebook, google, instagram"}
        />
        <div className="row">
          <p>The full url is needed: https://www.example.com</p>
        <div className={"col-6"}>
          <Label htmlFor="Phase 1" style={{ marginTop: "10px" }}>Facebook</Label>
          <InputText
            id={`Facebook`}
            name={"Facebook"}
            placeholder={"Facebook url"}
            type={"text"}
            value={social.filter(item => item.label === "facebook")[0].url}
            onChange={({ target: { value } }) => {
              setSocial(social.map(item => {
                if (item.label === "facebook") return { ...item, url: value };
                return item;
              }))
            }}
          />
          <Label htmlFor="Phase 2" style={{ marginTop: "10px" }}>Google</Label>
          <InputText
            id={`Google`}
            name={"Google"}
            placeholder={"Google url"}
            type={"text"}
            value={social.filter(item => item.label === "google")[0].url}
            onChange={({ target: { value } }) => {
              setSocial(social.map(item => {
                if (item.label === "google") return { ...item, url: value };
                return item;
              }))
            }}
          />
          <Label htmlFor="Phase 3" style={{ marginTop: "10px" }}>Instagram</Label>
          <InputText
            id={`Instagram`}
            name={"Instagram"}
            placeholder={"Instagram url"}
            type={"text"}
            value={social.filter(item => item.label === "instagram")[0].url}
            onChange={({ target: { value } }) => {
              setSocial(social.map(item => {
                if (item.label === "instagram") return { ...item, url: value };
                return item;
              }))
            }}
          />
          <Button
            style={{ margin: "12px auto 0px auto" }}
            label={"Submit"}
            onClick={() => {
              submitSocial();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(HomePage);
