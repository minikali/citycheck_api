import React from "react";
import "./style.css";

const Project = props => {
  const { id, title, created_at, description, phase, address, userinfo, justify, phases } = props;
  return (
    <div className={"container-fluid project"} style={{ padding: "18px 30px" }}>
      <h2>{`Project id ${id}`}</h2>
      <p><span>{`Title: `}</span>{title}</p>
      <p><span>{`Phase: `}</span>{phases.filter(p => p.value === phase)[0].label}</p>
      <p><span>{`Address: `}</span>{address}</p>
      <p><span>{`Description: `}</span>{description}</p>
      <p><span>{`Justify: `}</span>{justify}</p>
      <p><span>{`Created by: `}</span>{!userinfo ? "admin" : userinfo.username}</p>
      <p><span>{`Created at: `}</span>{new Date(created_at).toLocaleDateString("fr-FR")}</p>
    </div>
  );
};

export default Project;