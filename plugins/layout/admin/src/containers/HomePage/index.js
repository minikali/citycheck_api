/*
 *
 * HomePage
 *
 */
import {
  PluginHeader,
  request
} from "strapi-helper-plugin";
import React, { memo, useState, useEffect } from 'react';
import CardImg from "../../assets/img/card.png";
import ContactImg from "../../assets/img/contact.png";
import HistoryImg from "../../assets/img/history.png";
import HomeImg from "../../assets/img/home.png";
import SuggestImg from "../../assets/img/suggest.png";
import SuggestModifImg from "../../assets/img/suggest-modif.png";
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import { Select, Textarea, InputText, Button, Label } from "@buffetjs/core";
import "./style.css";

const HomePage = () => {
  const [home, setHome] = useState([
    {
      id: null,
      component: "home",
      label: "title",
      value: "Vous faire profiter pleinement de vos projets",
      media: null
    },  
    {
      id: null,
      component: "home",
      label: "addressPlaceholder",
      value: "Entrez une address",
      media: null
    },
  ]);
  
  const [suggest, setSuggest] = useState([
    {
      id: null,
      component: "suggest",
      label: "title",
      value: "Titre",
      media: null
    },
    {
      id: null,
      component: "suggest",
      label: "address",
      value: "Adresse",
      media: null
    },
    {
      id: null,
      component: "suggest",
      label: "choosePhase",
      value: "Choisissez une phase",
      media: null
    },
    {
      id: null,
      component: "suggest",
      label: "description",
      value: "Description",
      media: null
    },
    {
      id: null,
      component: "suggest",
      label: "justify",
      value: "Justifiez brievement votre choix de phase",
      media: null
    },
    {
      id: null,
      component: "suggest",
      label: "button",
      value: "CONFIRMER",
      media: null
    }
  ]);

  const [contact, setContact] = useState([
    {
      id: null,
      component: "contact",
      label: "name",
      value: "Nom",
      media: null
    },
    {
      id: null,
      component: "contact",
      label: "email",
      value: "Email",
      media: null
    },
    {
      id: null,
      component: "contact",
      label: "message",
      value: "Message",
      media: null
    },
    {
      id: null,
      component: "contact",
      label: "button",
      value: "CONFIRMER",
      media: null
    }
  ]);

  const [card, setCard] = useState([
    {
      id: null,
      component: "card",
      label: "button",
      value: "Suggérer une modification",
      media: null
    },
    {
      id: null,
      component: "card",
      label: "history",
      value: "Voir l'historique des suggestions",
      media: null
    }
  ]);

  const [suggModif, setSuggModif] = useState([
    {
      id: null,
      component: "suggModif",
      label: "title",
      value: "Suggérer une modification",
      media: null
    },
    {
      id: null,
      component: "suggModif",
      label: "choosePhase",
      value: "Modifiez la phase si besoin",
      media: null
    },
    {
      id: null,
      component: "suggModif",
      label: "justify",
      value: "Justifiez brievement votre choix de phase",
      media: null
    },
    {
      id: null,
      component: "suggModif",
      label: "button",
      value: "SOUMETTRE",
      media: null
    }
  ]);

  const [history, setHistory] = useState([
    {
      id: null,
      component: "history",
      label: "confirmLabel",
      value: "personne(s) ont confirmé cet attribut",
      media: null
    },
    {
      id: null,
      component: "history",
      label: "historyLabel",
      value: "Liste des anciennes attributions",
      media: null
    }
  ]);

  const updateLayout = async body => {
    try {
      await request("/layout/updateLayout", {
        method: "POST",
        body: body
      });
      strapi.notification.info(`${body[0].component} layout saved`);
    } catch (error) {
      strapi.notification.error(`${error}`);
    }
  };

  const initLayout = async () => {
      const response = await request("/layouts");
      console.log("initLayout", response);
      setHome(home.map(layout => {
        const layoutFromDb = response.filter(({ component, label }) => component === layout.component && label === layout.label)
        if (layoutFromDb.length > 0) return layoutFromDb[0];
        return layout;
      }));
      setSuggest(suggest.map(layout => {
        const layoutFromDb = response.filter(({ component, label }) => component === layout.component && label === layout.label)
        if (layoutFromDb.length > 0) return layoutFromDb[0];
        return layout;
      }));
      setContact(contact.map(layout => {
        const layoutFromDb = response.filter(({ component, label }) => component === layout.component && label === layout.label)
        if (layoutFromDb.length > 0) return layoutFromDb[0];
        return layout;
      }));
      setCard(card.map(layout => {
        const layoutFromDb = response.filter(({ component, label }) => component === layout.component && label === layout.label)
        if (layoutFromDb.length > 0) return layoutFromDb[0];
        return layout;
      }));
      setSuggModif(suggModif.map(layout => {
        const layoutFromDb = response.filter(({ component, label }) => component === layout.component && label === layout.label)
        if (layoutFromDb.length > 0) return layoutFromDb[0];
        return layout;
      }));
      setHistory(history.map(layout => {
        const layoutFromDb = response.filter(({ component, label }) => component === layout.component && label === layout.label)
        if (layoutFromDb.length > 0) return layoutFromDb[0];
        return layout;
      }));
  };

  useEffect(() => {
    initLayout();
  }, []);

  return (
    <div className="layout">
      <div className="home">
        <PluginHeader
          title={"Accueil"}
          description={"Editable: Title, banner"}
        />
        <div className="page">
          <div className="wrapper">
            <img src={HomeImg} alt="Home" />
          </div>
          <form onSubmit={e => {
            e.preventDefault();
            updateLayout(home);
          }}>
            <input
              type="text"
              value={home.filter(layout => layout.label === "title")[0].value}
              onChange={e => setHome(
                home.map(
                  layout =>
                    layout.label === "title" ?
                      { ...layout, value: e.target.value } : layout
                )
              )}
            />
            <input
              type="text"
              value={home.filter(layout => layout.label === "addressPlaceholder")[0].value}
              onChange={e => setHome(
                home.map(
                  layout =>
                    layout.label === "addressPlaceholder" ?
                      { ...layout, value: e.target.value } : layout
                )
              )}
            />
            <Button
              type="submit"
              style={{ margin: "20px auto 40px 10px" }}
              label={"Save"}
            />
          </form>
        </div>
      </div>
      <div className="suggest">
        <PluginHeader
          title={"Suggérer un lieu"}
          description={"Editable: Title, Address, Description, Justify, Button"}
        />
        <div className="page">
          <div className="wrapper">
            <img src={SuggestImg} alt="Suggest" />
          </div>
          <form onSubmit={e => {
            e.preventDefault();
            updateLayout(suggest);
          }}>
            <input
              type="text"
              value={suggest.filter(layout => layout.label === "title")[0].value}
              onChange={e => setSuggest(
                suggest.map(
                  layout =>
                    layout.label === "title" ?
                      { ...layout, value: e.target.value } : layout
                )
              )}
            />
            <input
              type="text"
              value={suggest.filter(layout => layout.label === "address")[0].value}
              onChange={e => setSuggest(
                suggest.map(
                  layout =>
                    layout.label === "address" ?
                      { ...layout, value: e.target.value } : layout
                )
              )}
            />
            <input
              type="text"
              value={suggest.filter(layout => layout.label === "choosePhase")[0].value}
              onChange={e => setSuggest(
                suggest.map(
                  layout =>
                    layout.label === "choosePhase" ?
                      { ...layout, value: e.target.value } : layout
                )
              )}
            />
            <input
              type="text"
              value={suggest.filter(layout => layout.label === "description")[0].value}
              onChange={e => setSuggest(
                suggest.map(
                  layout =>
                    layout.label === "description" ?
                      { ...layout, value: e.target.value } : layout
                )
              )}
            />
            <input
              type="text"
              value={suggest.filter(layout => layout.label === "justify")[0].value}
              onChange={e => setSuggest(
                suggest.map(
                  layout =>
                    layout.label === "justify" ?
                      { ...layout, value: e.target.value } : layout
                )
              )}
            />
            <input
              type="text"
              type="text"
              value={suggest.filter(layout => layout.label === "button")[0].value}
              onChange={e => setSuggest(
                suggest.map(
                  layout =>
                    layout.label === "button" ?
                      { ...layout, value: e.target.value } : layout
                )
              )}
            />
            <Button
              type="submit"
              style={{ margin: "20px auto 40px 10px" }}
              label={"Save"}
            />
          </form>
        </div>
      </div>
      <div className="contact">
        <PluginHeader
          title={"Contact"}
          description={"Editable: Title, Email, Message, Button"}
        />
        <div className="page">
          <div className="wrapper">
            <img src={ContactImg} alt="Contact" />
          </div>
          <form onSubmit={e => {
            e.preventDefault();
            updateLayout(contact);
          }}>
            <input
              type="text"
              value={contact.filter(layout => layout.label === "name")[0].value}
              onChange={e => setContact(
                contact.map(
                  layout =>
                    layout.label === "name" ?
                      { ...layout, value: e.target.value } : layout
                )
              )}
            />
            <input
              type="text"
              value={contact.filter(layout => layout.label === "email")[0].value}
              onChange={e => setContact(
                contact.map(
                  layout =>
                    layout.label === "email" ?
                      { ...layout, value: e.target.value } : layout
                )
              )}
            />
            <input
              type="text"
              value={contact.filter(layout => layout.label === "message")[0].value}
              onChange={e => setContact(
                contact.map(
                  layout =>
                    layout.label === "message" ?
                      { ...layout, value: e.target.value } : layout
                )
              )}
            />
            <input
              type="text"
              value={contact.filter(layout => layout.label === "button")[0].value}
              onChange={e => setContact(
                contact.map(
                  layout =>
                    layout.label === "button" ?
                      { ...layout, value: e.target.value } : layout
                )
              )}
            />
            <Button
              type="submit"
              style={{ margin: "20px auto 40px 10px" }}
              label={"Save"}
            />
          </form>
        </div>
      </div>
      <div className="card">
        <PluginHeader
          title={"Carte"}
          description={"Editable: Button, See history"}
        />
        <div className="page">
          <div className="wrapper">
            <img src={CardImg} alt="Card" />
          </div>
          <form onSubmit={e => {
            e.preventDefault();
            updateLayout(card);
          }}>
            <input
              type="text"
              value={card.filter(layout => layout.label === "button")[0].value}
              onChange={e => setCard(
                card.map(
                  layout =>
                    layout.label === "button" ?
                      { ...layout, value: e.target.value } : layout
                )
              )}
            />
            <input
              type="text"
              value={card.filter(layout => layout.label === "history")[0].value}
              onChange={e => setCard(
                card.map(
                  layout =>
                    layout.label === "history" ?
                      { ...layout, value: e.target.value } : layout
                )
              )}
            />
            <Button
              type="submit"
              style={{ margin: "20px auto 40px 10px" }}
              label={"Save"}
            />
          </form>
        </div>
      </div>
      <div className="suggest-modif">
        <PluginHeader
          title={"Suggérer une modification"}
          description={"Editable: Title, Choose phase, Justify, Button"}
        />
        <div className="page">
          <div className="wrapper">
            <img src={SuggestModifImg} alt="SuggestModif" />
          </div>
          <form onSubmit={e => {
            e.preventDefault();
            updateLayout(suggModif);
          }}>
            <input
              type="text"
              value={suggModif.filter(layout => layout.label === "title")[0].value}
              onChange={e => setSuggModif(
                suggModif.map(
                  layout =>
                    layout.label === "title" ?
                      { ...layout, value: e.target.value } : layout
                )
              )}
            />
            <input
              type="text"
              value={suggModif.filter(layout => layout.label === "choosePhase")[0].value}
              onChange={e => setSuggModif(
                suggModif.map(
                  layout =>
                    layout.label === "choosePhase" ?
                      { ...layout, value: e.target.value } : layout
                )
              )}
            />
            <input
              type="text"
              value={suggModif.filter(layout => layout.label === "justify")[0].value}
              onChange={e => setSuggModif(
                suggModif.map(
                  layout =>
                    layout.label === "justify" ?
                      { ...layout, value: e.target.value } : layout
                )
              )}
            />
            <input
              type="text"
              value={suggModif.filter(layout => layout.label === "button")[0].value}
              onChange={e => setSuggModif(
                suggModif.map(
                  layout =>
                    layout.label === "button" ?
                      { ...layout, value: e.target.value } : layout
                )
              )}
            />
            <Button
              type="submit"
              style={{ margin: "20px auto 40px 10px" }}
              label={"Save"}
            />
          </form>
        </div>
      </div>
      <div className="history">
        <PluginHeader
          title={"Historique des suggestions"}
          description={"Editable: Confirmation label, History label"}
        />
        <div className="page">
          <div className="wrapper">
            <img src={HistoryImg} alt="History" />
          </div>
          <form onSubmit={e => {
            e.preventDefault();
            updateLayout(history);
          }}>
            <input
              type="text"
              value={history.filter(layout => layout.label === "confirmLabel")[0].value}
              onChange={e => setHistory(
                history.map(
                  layout =>
                    layout.label === "confirmLabel" ?
                      { ...layout, value: e.target.value } : layout
                )
              )}
            />
            <input
              type="text"
              value={history.filter(layout => layout.label === "historyLabel")[0].value}
              onChange={e => setHistory(
                history.map(
                  layout =>
                    layout.label === "historyLabel" ?
                      { ...layout, value: e.target.value } : layout
                )
              )}
            />
            <Button
              type="submit"
              style={{ margin: "20px auto 40px 10px" }}
              label={"Save"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(HomePage);
