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
import { InputText, Label, Button, Toggle, Textarea } from "@buffetjs/core";
import { useEffect } from 'react';
import "./style.css";

const HomePage = () => {
  const initialSocial = [
    {
      id: null,
      label: "facebook",
      url: "https://facebook.com",
      active: true
    },
    {
      id: null,
      label: "email",
      url: "https://citycheck.fr",
      active: true
    },
    {
      id: null,
      label: "linkedin",
      url: "https://citycheck.fr",
      active: true
    },
    {
      id: null,
      label: "twitter",
      url: "https://citycheck.fr",
      active: true
    },
    {
      id: null,
      label: "instagram",
      url: "https://instagram.com",
      active: true
    }
  ];
  const [social, setSocial] = useState(initialSocial);
  const submitSocial = async () => {
    try {
      await request("/social-links/submitSocial", {
        method: "POST",
        body: social
      });
      strapi.notification.info(`Social share links saved`);
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
      return { ...social, id: item[0].id, url: item[0].url, active: !item[0].active ? false : item[0].active }
    })
    setSocial(Social);
  };

  useEffect(() => {
    getSocial();
  }, []);

  return (
    <div style={{ margin: "20px" }}>
      <PluginHeader
        title={"[Footer] Social share link"}
        description={"Turn on/off socials buttons and edit their url/text"}
      />
      <p>The full url is needed. Example: https://facebook.com/citycheck</p>
      <div className="row">
        <div className="col-8">
          <ul className="social-inputs">
            <li>
              <Label htmlFor="Facebook" style={{ marginTop: "25px" }}>Facebook (url of the facebook page)</Label>
              <Toggle
                className="toggle"
                name="active"
                value={social.filter(item => item.label === "facebook")[0].active}
                onChange={({ target: { value } }) => {
                  console.log(value);
                  setSocial(social.map(item => {
                    if (item.label === "facebook") return { ...item, active: value };
                    return item;
                  }))
                }}
              />
              <InputText
                className="inputtext"
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
            </li>
            <li>
              <Label htmlFor="email" style={{ marginTop: "25px" }}>Email (url or text to share by email)</Label>
              <Toggle
                className="toggle"
                name="active"
                value={social.filter(item => item.label === "email")[0].active}
                onChange={({ target: { value } }) => {
                  console.log(value);
                  setSocial(social.map(item => {
                    if (item.label === "email") return { ...item, active: value };
                    return item;
                  }))
                }}
              />
              <Textarea
                id={`email`}
                name={"email"}
                placeholder={"url or text"}
                type={"text"}
                value={social.filter(item => item.label === "email")[0].url}
                onChange={({ target: { value } }) => {
                  setSocial(social.map(item => {
                    if (item.label === "email") return { ...item, url: value };
                    return item;
                  }))
                }}
              />
            </li>
            <li>
              <Label htmlFor="linkedin" style={{ marginTop: "25px" }}>Linkedin (url of the linked page)</Label>
              <Toggle
                className="toggle"
                name="active"
                value={social.filter(item => item.label === "linkedin")[0].active}
                onChange={({ target: { value } }) => {
                  setSocial(social.map(item => {
                    if (item.label === "linkedin") return { ...item, active: value };
                    return item;
                  }))
                }}
              />
              <InputText
                id={`linkedin`}
                name={"linkedin"}
                placeholder={"linkedin url"}
                type={"text"}
                value={social.filter(item => item.label === "linkedin")[0].url}
                onChange={({ target: { value } }) => {
                  setSocial(social.map(item => {
                    if (item.label === "linkedin") return { ...item, url: value };
                    return item;
                  }))
                }}
              />
            </li>
            <li>
              <Label htmlFor="twitter" style={{ marginTop: "25px" }}>Linkedin (url or text to share)</Label>
              <Toggle
                className="toggle"
                name="active"
                value={social.filter(item => item.label === "twitter")[0].active}
                onChange={({ target: { value } }) => {
                  console.log(value);
                  setSocial(social.map(item => {
                    if (item.label === "twitter") return { ...item, active: value };
                    return item;
                  }))
                }}
              />
              <Textarea
                id={`twitter`}
                name={"twitter"}
                placeholder={"twitter url"}
                type={"text"}
                value={social.filter(item => item.label === "twitter")[0].url}
                onChange={({ target: { value } }) => {
                  setSocial(social.map(item => {
                    if (item.label === "twitter") return { ...item, url: value };
                    return item;
                  }))
                }}
              />
            </li>
            <li>
              <Label htmlFor="instagram" style={{ marginTop: "25px" }}>Instagram (url of the instagram page)</Label>
              <Toggle
                className="toggle"
                name="active"
                value={social.filter(item => item.label === "instagram")[0].active}
                onChange={({ target: { value } }) => {
                  console.log(value);
                  setSocial(social.map(item => {
                    if (item.label === "instagram") return { ...item, active: value };
                    return item;
                  }))
                }}
              />
              <InputText
                id={`instagram`}
                name={"instagram"}
                placeholder={"instagram url"}
                type={"text"}
                value={social.filter(item => item.label === "instagram")[0].url}
                onChange={({ target: { value } }) => {
                  setSocial(social.map(item => {
                    if (item.label === "instagram") return { ...item, url: value };
                    return item;
                  }))
                }}
              />
            </li>
          </ul>


          <Button
            style={{ margin: "12px auto 0px auto" }}
            label={"Save"}
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
