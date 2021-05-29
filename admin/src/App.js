import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./App.css";
import React, { useState, useEffect } from "react";
import store from "./store";
import { AppProvider, Frame, Icon } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/dist/styles.css";
import config from "./config/config";
import { Navbar, Nav } from "react-bootstrap";
import { Provider } from "react-redux";
import { SettingsMajor, ListMajor } from "@shopify/polaris-icons";
import Settings from "./components/settings/Settings";
import ManageUsers from "./components/ManageUsers";
import ManageCookies from "./components/ManageCookies";
import ManageCategories from "./components/ManageCategories";
function App() {
  const [statusCookie, setStatusCookie] = useState("activeMenu");
  const [statusCategories, setStatusCategories] = useState("");
  const [statusUsers, setStatusUsers] = useState("");
  const [statusSetting, setStatusSetting] = useState("");
  return (
    <Provider store={store}>
      <AppProvider i18n={enTranslations}>
        <Frame>
          <Router>
            <header>
              <Navbar bg="light" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Link
                      onClick={() => {
                        setStatusCookie("activeMenu");
                        setStatusCategories("");
                        setStatusUsers("");
                        setStatusSetting("");
                      }}
                      className={"Polaris-Button  linkHeader " + statusCookie}
                      to={config.pathName + "/"}
                    >
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          marginRight: "5px",
                        }}
                      >
                        <Icon source={ListMajor} />
                      </div>
                      Manage Cookies
                    </Link>
                    <Link
                      onClick={() => {
                        setStatusCookie("");
                        setStatusCategories("activeMenu");
                        setStatusUsers("");
                        setStatusSetting("");
                      }}
                      className={
                        "Polaris-Button  linkHeader " + statusCategories
                      }
                      to={config.pathName + "/manageCategories"}
                    >
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          marginRight: "5px",
                        }}
                      >
                        <Icon source={ListMajor} />
                      </div>
                      Manage categories
                    </Link>
                    <Link
                      onClick={() => {
                        setStatusCookie("");
                        setStatusCategories("");
                        setStatusUsers("activeMenu");
                        setStatusSetting("");
                      }}
                      className={"Polaris-Button  linkHeader " + statusUsers}
                      to={config.pathName + "/manageUsers"}
                    >
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          marginRight: "5px",
                        }}
                      >
                        <Icon source={ListMajor} />
                      </div>
                      Manage Users
                    </Link>
                    <Link
                      onClick={() => {
                        setStatusCookie("");
                        setStatusCategories("");
                        setStatusUsers("");
                        setStatusSetting("activeMenu");
                      }}
                      className={"Polaris-Button  linkHeader " + statusSetting}
                      to={config.pathName + "/settings"}
                    >
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          marginRight: "5px",
                        }}
                      >
                        <Icon source={SettingsMajor} />
                      </div>
                      Settings
                    </Link>
                    {/* <Link
                      className="Polaris-Button  linkEndHeader"
                      to={config.pathName + "/instructions"}
                    >
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          marginRight: "5px",
                        }}
                      >
                        <Icon source={HintMajor} />
                      </div>
                      Instructions
                    </Link> */}
                  </Nav>
                  {/* <Form inline> */}
                  {/* <div
                      style={{
                        textAlign: "end",
                        lineHeight: "46px",
                        display: "inline-block",
                      }}
                    >
                      <a
                        href=""
                        style={{
                          marginRight: "50px",
                          fontSize: "17px",
                          fontWeight: "bold",
                        }}
                        // target="_blank"
                      >
                        Document here!
                      </a>
                    </div> */}
                  {/* </Form> */}
                </Navbar.Collapse>
              </Navbar>
            </header>
            <div id="reviews-box">
              {/* <Route
                exact
                path="/"
                render={() => {
                  return <Redirect to={config.pathName + "/settings"} />;
                }}
              /> */}

              <Route
                path={config.pathName + "/settings"}
                component={Settings}
              />
              <Route
                path={config.pathName + "/"}
                exact
                component={ManageCookies}
              />
              <Route
                path={config.pathName + "/manageCategories"}
                exact
                component={ManageCategories}
              />
              <Route
                path={config.pathName + "/manageUsers"}
                exact
                component={ManageUsers}
              />
            </div>
          </Router>
        </Frame>
      </AppProvider>
    </Provider>
  );
}

export default App;
