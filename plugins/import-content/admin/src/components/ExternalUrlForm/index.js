import React, { useState } from "react";  
import PropTypes from "prop-types";  
import Row from "../Row";  
import { Label, InputText } from "@buffetjs/core";  
import { LoadingIndicator } from "strapi-helper-plugin";

const initialState = {
  url: ""
};

const ExternalUrlForm = ({onRequestAnalysis, loadingAnalysis}) => {  
  const [state, setState] = useState(initialState);

  const preAnalyzeImportFile = async url => {
    setState({ ...state, url }, () => {
      onRequestAnalysis({ source: "url", options: { url } });
    });
  };
  return (
    <Row>
        <Label message={"Import URL"} htmlFor={"urlInput"} />
        <InputText
          name={"urlInput"}
          placeholder={"https://www.nasa.gov/rss/dyn/educationnews.rss"}
          type={"url"}
          value={state.url}
          onChange={({ target: { value } }) => {
            preAnalyzeImportFile(value);
          }}
        />
        <Row>{loadingAnalysis && <LoadingIndicator />} </Row>
      </Row>
  );
}
ExternalUrlForm.propTypes = {  
  onRequestAnalysis: PropTypes.func.isRequired,
  loadingAnalysis: PropTypes.bool.isRequired
};

export default ExternalUrlForm;  