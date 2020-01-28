import React, { memo, useState, useEffect } from "react";
import { request } from "strapi-helper-plugin";
import PropTypes from "prop-types";
import pluginId from "../../pluginId";
import UploadFileForm from "../../components/UploadFileForm";
import {
  HeaderNav,
  LoadingIndicator,
  PluginHeader
} from "strapi-helper-plugin";
import Row from "../../components/Row";
import Block from "../../components/Block";
import { Select, Label } from "@buffetjs/core";
import { get, has, isEmpty, pickBy, set } from "lodash";
import ExternalUrlForm from "../../components/ExternalUrlForm";
import RawInputForm from "../../components/RawInputForm";

const getUrl = to =>
  to ? `/plugins/${pluginId}/${to}` : `/plugins/${pluginId}`;

const initialState = {
  loading: true,
  modelOptions: [],
  models: [],
  importSource: "upload",
  analyzing: false,
  analysis: null,
  selectedContentType: ""
}

const HomePage = () => {
  const [state, setState] = useState(initialState);
  const [analysisConf, setAnalysisConf] = useState();
  const importSources = [
    { label: "External URL ", value: "url" },
    { label: "Upload file", value: "upload" },
    { label: "Raw text", value: "raw" }
  ];

  const selectImportDest = selectedContentType => {
    setState({ ...state, selectedContentType });
  };

  const selectImportSource = importSource => {
    setState({ ...state, importSource });
  };

  const onRequestAnalysis = async analysisConfig => {
    // setAnalysisConf(analysisConfig);
    setState({ analyzing: true }, () => {
      console.log("onRequestAnalysis");
      // try {
      //   const response = await request("/import-content/preAnalyzeImportFile", {
      //     method: "POST",
      //     body: analysisConfig
      //   });
      //   console.log(response);
      //   setState({ ...state, analysis: response, analyzing: false }, () => {
      //     strapi.notification.success(`Analyzed Successfully`);
      //   });
      // } catch (e) {
      //   console.log(e);
      //   setState({ ...state, analyzing: false }, () => {
      //     strapi.notification.error(`Analyze Failed, try again`);
      //     strapi.notification.error(`${e}`);
      //   });
      // }
      console.log("hello");
      request("/import-content/preAnalyzeImportFile", {
        method: "POST",
        body: analysisConfig
      }).then(response => {
        console.log(response);
        setState({ ...state, analysis: response, analyzing: false }, () => {
          strapi.notification.success(`Analyzed Successfully`);
        });
      }).catch(e => {
        console.log(e);
        setState({ ...state, analyzing: false }, () => {
          strapi.notification.error(`Analyze Failed, try again`);
          strapi.notification.error(`${e}`);
        });
      });
    });
  };

  const getModels = async () => {
    setState({ ...state, loading: true });
    try {
      const response = await request("/content-type-builder/content-types", {
        method: "GET"
      });

      // Remove non-user content types from models
      const models = get(response, ["data"], []).filter(
        obj => !has(obj, "plugin")
      );
      const modelOptions = models.map(model => {
        return {
          label: get(model, ["schema", "name"], ""), // (name is used for display_name)
          value: model.uid // (uid is used for table creations)
        };
      });

      setState({ ...state, loading: false });

      return { models, modelOptions };
    } catch (e) {
      setState({ ...state, loading: false }, () => {
        strapi.notification.error(`${e}`);
      });
    }
    return [];
  };

  useEffect(() => {
    getModels().then(res => {
      const { models, modelOptions } = res;
      setState({
        ...state,
        models,
        modelOptions,
        selectedContentType: modelOptions ? modelOptions[0].value : ""
      });
    });
  }, []);

  return <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
    <PluginHeader
      title={"Import Content"}
      description={"Import CSV and RSS-Feed into your Content Types"}
    />
    <HeaderNav
      links={[
        {
          name: "Import Data",
          to: getUrl("")
        },
        {
          name: "Import History",
          to: getUrl("history")
        }
      ]}
      style={{ marginTop: "4.4rem" }}
    />
    <div className="row">
      <Block
        title="General"
        description="Configure the Import Source &amp; Destination"
        style={{ marginBottom: 12 }}
      >
        <Row className={"row"}>
          <div className={"col-4"}>
            <Label htmlFor="importSource">Import Source</Label>
            <Select
              name="importSource"
              options={importSources}
              value={state.importSource}
              onChange={({ target: { value } }) =>
                selectImportSource(value)
              }
            />
          </div>
          <div className={"col-4"}>
            <Label htmlFor="importDest">Import Destination</Label>
            <Select
              value={state.selectedContentType}
              name="importDest"
              options={state.modelOptions}
              onChange={({ target: { value } }) =>
                selectImportDest(value)
              }
            />
          </div>
        </Row>
        <Row>
          {state.importSource === "upload" && (
            <UploadFileForm
              onRequestAnalysis={onRequestAnalysis}
              loadingAnalysis={state.analyzing}
            />
          )}
          {/* {state.importSource === "url" && (
            <ExternalUrlForm
              onRequestAnalysis={onRequestAnalysis}
              loadingAnalysis={state.analyzing}
            />
          )} */}
          {state.importSource === "raw" && (
            <RawInputForm
              onRequestAnalysis={onRequestAnalysis}
              loadingAnalysis={state.analyzing}
            />
          )}
        </Row>
      </Block>
    </div>
  </div>;
};
export default memo(HomePage); 