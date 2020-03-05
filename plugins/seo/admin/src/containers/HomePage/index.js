/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { InputText, Textarea, Button, Label } from "@buffetjs/core";
import {
  request
} from "strapi-helper-plugin";
import "./style.css"

const HomePage = () => {
  const [seo, setSeo] = useState([
    {
      id: null,
      label: "general",
      title: "",
      description: ""
    },
    {
      id: null,
      label: "aboutus",
      title: "",
      description: ""
    },
    {
      id: null,
      label: "suggest",
      title: "",
      description: ""
    },
    {
      id: null,
      label: "contact",
      title: "",
      description: ""
    }
  ]);

  const saveSeo = async () => {
    try {
      const response = await request("/seo/saveSeo", {
        method: "POST",
        body: {
          seo
        }
      });
      strapi.notification.info(`Seo settings saved`);
    } catch (e) {
      console.error(e);
      strapi.notification.info(`${e}`);
    }
  };

  const getSeo = async () => {
    try {
      const response = await request("/seos");
      const Seo = seo.map(page => {
        const item = response.filter(element => element.label === page.label);
        return item.length === 0 ? page : {
          id: item[0].id,
          title: item[0].title ? item[0].title : "",
          label: item[0].label,
          description: item[0].description ? item[0].description : ""
        };
      });
      setSeo(Seo);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getSeo();
  }, []);

  return (
    <div className={"seo-home"}>
      <h1>Search Engine Optimisation</h1>
      <div className="info">
        <p>Pour une meilleure optimisation SEO, il est conseillé de mettre un titre et une description sur chaque page. Ne pas hésiter à utiliser les mêmes mots ou des synonymes dans les différentes descriptions.</p>
        <p>Le <span>titre</span> sera affiché dans l'onglet du navigateur.</p>
        <p>La <span>description</span> est affichée sur la page des moteurs de recherche.</p>
        <br />
        <p><span className="underline">Exemple:</span> Si un utilisateur tape sur google "citycheck suggerer un lieu", google proposera un lien directement vers cette page avec la description correspondante.</p>
      </div>
      <section className="general">
        <h2>General/Accueil</h2>
        <p>Modifier le titre et la description de la page d'acceuil (et du site en general)</p>
        <Label htmlFor="title-general" style={{ marginTop: "10px" }}>Title</Label>
        <InputText
          id={`title-general`}
          name={"title-general"}
          placeholder={"ex:Page d'acceuil"}
          type={"text"}
          value={seo.filter(element => element.label === "general")[0].title}
          onChange={({ target: { value } }) => {
            setSeo(seo.map(element => element.label === "general" ? { ...element, title: value } : element));
          }}
        />
        <Label htmlFor="description-general" style={{ marginTop: "10px" }}>Description</Label>
        <Textarea
          id={`description-general`}
          name={"description-general"}
          placeholder={"ex:Vous faire profiter pleinement de vos excursions. © 2019-2020 Citycheck.fr La plateforme qui dresse l'état des lieux touristiques, historiques, patrimoniaux, culturels..."}
          type={"text"}
          value={seo.filter(element => element.label === "general")[0].description}
          onChange={({ target: { value } }) => {
            setSeo(seo.map(element => element.label === "general" ? { ...element, description: value } : element));
          }}
        />
      </section>
      <section className="aboutus">
        <h2>Qui sommes-nous</h2>
        <p>Modifier le titre et la description de la page Qui sommes-nous</p>
        <Label htmlFor="title-aboutus" style={{ marginTop: "10px" }}>Title</Label>
        <InputText
          id={`title-aboutus`}
          name={"title-aboutus"}
          placeholder={"ex:Qui sommes-nous ?"}
          type={"text"}
          value={seo.filter(element => element.label === "aboutus")[0].title}
          onChange={({ target: { value } }) => {
            setSeo(seo.map(element => element.label === "aboutus" ? { ...element, title: value } : element));
          }}
        />
        <Label htmlFor="description-aboutus" style={{ marginTop: "10px" }}>Description</Label>
        <Textarea
          id={`description-aboutus`}
          name={"description-aboutus"}
          placeholder={"ex:Vous faire profiter pleinement de vos excursions. © 2019-2020 Citycheck.fr La plateforme qui dresse l'état des lieux touristiques, historiques, patrimoniaux, culturels..."}
          type={"text"}
          value={seo.filter(element => element.label === "aboutus")[0].description}
          onChange={({ target: { value } }) => {
            setSeo(seo.map(element => element.label === "aboutus" ? { ...element, description: value } : element));
          }}
        />
      </section>
      <section className="suggest">
        <h2>Suggérer un lieu</h2>
        <p>Modifier le titre et la description de la page Suggérer un lieu</p>
        <Label htmlFor="title-suggest" style={{ marginTop: "10px" }}>Title</Label>
        <InputText
          id={`title-suggest`}
          name={"title-suggest"}
          placeholder={"ex:Suggérer un lieu"}
          type={"text"}
          value={seo.filter(element => element.label === "suggest")[0].title}
          onChange={({ target: { value } }) => {
            setSeo(seo.map(element => element.label === "suggest" ? { ...element, title: value } : element));
          }}
        />
        <Label htmlFor="description-suggest" style={{ marginTop: "10px" }}>Description</Label>
        <Textarea
          id={`description-suggest`}
          name={"description-suggest"}
          placeholder={"ex:Suggérer un lieu incontournable..."}
          type={"text"}
          value={seo.filter(element => element.label === "suggest")[0].description}
          onChange={({ target: { value } }) => {
            setSeo(seo.map(element => element.label === "suggest" ? { ...element, description: value } : element));
          }}
        />
      </section>
      <section className="contact">
        <h2>Contact</h2>
        <p>Modifier le titre et la description de la page Contact</p>
        <Label htmlFor="title-contact" style={{ marginTop: "10px" }}>Title</Label>
        <InputText
          id={`title-contact`}
          name={"title-contact"}
          placeholder={"ex:Contactez-nous"}
          type={"text"}
          value={seo.filter(element => element.label === "contact")[0].title}
          onChange={({ target: { value } }) => {
            setSeo(seo.map(element => element.label === "contact" ? { ...element, title: value } : element));
          }}
        />
        <Label htmlFor="description-contact" style={{ marginTop: "10px" }}>Description</Label>
        <Textarea
          id={`description-contact`}
          name={"description-contact"}
          placeholder={"ex:Un problème ? Une Suggestion ? Contactez-nous !"}
          type={"text"}
          value={seo.filter(element => element.label === "contact")[0].description}
          onChange={({ target: { value } }) => {
            setSeo(seo.map(element => element.label === "contact" ? { ...element, description: value } : element));
          }}
        />
      </section>
      <Button label={"Save"}
        onClick={() => {
          saveSeo();
        }} />
    </div>
  );
};

export default memo(HomePage);
