import React, { useCallback, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { Layout, TextStyle, Tabs } from "@shopify/polaris";
import config from "../../config/config";
import Banner from "./Banner/Banner";
import Alert from "../contents/Alert";
import Loading from "../contents/Spinner";
import AdvancedSettings from "../settings/AdvancedSetting/AdvancedSettings";
import Preferences from "./Preferences/Preferences";
import { getSettings } from "../../actions/settings";
import { useHistory } from "react-router-dom";
const Settings = ({ getSettings, settings: { loadingSettings } }) => {
  useEffect(() => {
    getSettings();
  }, [getSettings]);
  const history = useHistory();
  const [selected, setSelected] = useState(0);
  const handleTabChange = useCallback((selectedTabIndex) => {
    setSelected(selectedTabIndex);
    if (selectedTabIndex == 0) {
      history.push(config.pathName + "/settings");
    }
    if (selectedTabIndex == 1) {
      history.push(config.pathName + "/settings/customize-text");
    }
    if (selectedTabIndex == 2) {
      history.push(config.pathName + "/settings/advanced-settings");
    }
  }, []);

  const tabs = [
    {
      id: "display-reviews",
      content: "Layout Banner",
    },
    {
      id: "customize-text",
      content: "Layout Preferences",
    },
    {
      id: "advanced-settings",
      content: "Advanced settings",
    },
  ];
  return (
    <div>
      <Alert />
      {loadingSettings && <Loading />}
      <div
        style={{ marginBottom: "40px", width: "50%", margin: "0 auto 40px" }}
      >
        <Tabs
          tabs={tabs}
          selected={selected}
          onSelect={handleTabChange}
          fitted
        ></Tabs>
      </div>
      <Layout>
        <Layout.Section>
          <Route
            path={config.pathName + "/settings"}
            component={Banner}
            exact
          />
          <Route
            path={config.pathName + "/settings/customize-text"}
            component={Preferences}
          />
          <Route
            path={config.pathName + "/settings/advanced-settings"}
            component={AdvancedSettings}
          />
        </Layout.Section>
      </Layout>
      <div
        style={{
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextStyle variation="subdued">
          Copyright © 2010 - 2021 Omegatheme.com. All Rights Reserved
        </TextStyle>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

export default connect(mapStateToProps, { getSettings })(Settings);
