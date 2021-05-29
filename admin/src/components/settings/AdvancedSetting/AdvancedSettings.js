import React, { useCallback, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  Card,
  TextStyle,
  ButtonGroup,
  Subheading,
  Button,
  TextField,
  SettingToggle,
  Scrollable,
  Tag,
} from "@shopify/polaris";
import {
  getSettings,
  removeTag,
  addTag,
  saveSettingsAdvanced,
  reloadSettings,
} from "../../../actions/settings.js";
const AdvancedSettings = ({
  addTag,
  removeTag,
  getSettings,
  saveSettingsAdvanced,
  reloadSettings,
  settings: { dataSettings, arrShowCountry },
}) => {
  // DESIGN TEXT
  useEffect(() => {
    getSettings();
  }, [getSettings]);
  const [statusButtonSave, setStatusButtonSave] = useState(false);

  const wrapperRef = useRef(null);
  const [display, setDisplay] = useState(false);
  // const [arrayCountryInDB, setArrayCountryDB] = useState(
  //   dataSettings.eu_countries
  // );
  const [search, setSearch] = useState("");
  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [active, setActive] = useState(dataSettings.app_enable);
  const country = dataSettings.country;

  const handleToggle = useCallback(() => {
    setStatusButtonSave(true);
    setActive((active) => !active);
  }, []);

  const contentStatus = active ? "Disable" : "Enable";
  const textStatus = active ? "enabled" : "disabled";
  const [activeAllCountries, setActiveAllCountries] = useState(
    dataSettings.show_all
  );
  const handleToggleAllCountries = useCallback((e) => {
    setStatusButtonSave(true);
    setActiveAllCountries(e);
  }, []);

  const [onlyHomePage, setOnlyHomePage] = useState(dataSettings.show_homepage);
  const handleToggleOnlyHomePage = useCallback((e) => {
    setStatusButtonSave(true);
    setOnlyHomePage(e);
  }, []);

  const [showIcon, setShowIcon] = useState(dataSettings.show_icon);
  const handleToggleShowIcon = useCallback((e) => {
    setStatusButtonSave(true);
    setShowIcon(e);
  }, []);

  const [showDismiss, setShowDismiss] = useState(dataSettings.show_dismiss);
  const handleToggleShowDismiss = useCallback((e) => {
    setStatusButtonSave(true);
    setShowDismiss(e);
  }, []);

  const [showPreferences, setShowPreferences] = useState(
    dataSettings.show_prefrences
  );
  const handleToggleShowPreferences = useCallback((e) => {
    setStatusButtonSave(true);
    setShowPreferences(e);
  }, []);

  const [activeEUCountries, setActiveEUCountries] = useState(
    dataSettings.show_all_eu
  );
  const handleToggleEUCountries = useCallback((e) => {
    setStatusButtonSave(true);
    setActiveEUCountries(e);
  }, []);

  const [customCss, setCustomCss] = useState(dataSettings.custom_css);
  const handleChangeCustomCss = useCallback((newValue) => {
    setStatusButtonSave(true);
    setCustomCss(newValue);
  }, []);

  const [lifeTime, setLifetime] = useState(dataSettings.cache_time);
  const handleChangeLifeTime = useCallback((newValue) => {
    setStatusButtonSave(true);
    setLifetime(newValue);
  }, []);
  const formdata = {
    app_enable: `${active}`,
    show_homepage: `${onlyHomePage}`,
    show_dismiss: `${showDismiss}`,
    show_prefrences: `${showPreferences}`,
    show_all: `${activeAllCountries}`,
    show_all_eu: `${activeEUCountries}`,
    eu_countries: JSON.stringify(arrShowCountry),
    cache_time: lifeTime,
    custom_css: customCss,
    show_icon: showIcon,
  };
  const cancelSave = useCallback(() => {
    setStatusButtonSave(false);
    setActive(dataSettings.app_enable);
    setOnlyHomePage(dataSettings.show_homepage);
    setShowDismiss(dataSettings.show_dismiss);
    setShowPreferences(dataSettings.show_prefrences);
    setActiveAllCountries(dataSettings.show_all);
    setActiveEUCountries(dataSettings.show_all_eu);
    setSearch("");
    setLifetime(dataSettings.cache_time);
    setCustomCss(dataSettings.custom_css);
    setShowIcon(dataSettings.show_icon);
  });
  const handleSaveSettings = useCallback(async (formdata) => {
    reloadSettings();
    setStatusButtonSave(false);
    await saveSettingsAdvanced(formdata);
    getSettings();
  });
  return (
    <div>
      {statusButtonSave && (
        <div
          className="animate__animated animate__fadeIn"
          style={{
            width: "100vw",
            height: "46px",
            position: "-webkit-sticky",
            // position: "sticky",
            position: "fixed",
            top: 0,
            right: 0,
            backgroundColor: "black",
            zIndex: "1000",
            display: "flex",
          }}
        >
          <div className="textSaveChange">
            <TextStyle>Unsaved changes</TextStyle>
          </div>
          <div className="divGroupChange">
            <ButtonGroup>
              <Button onClick={cancelSave}>Cancel</Button>
              <Button onClick={() => handleSaveSettings(formdata)} primary>
                Save
              </Button>
            </ButtonGroup>
          </div>
        </div>
      )}
      <div id="display-reviews" className="boxAdvanced">
        <SettingToggle
          action={{
            content: contentStatus,
            onAction: handleToggle,
          }}
          enabled={active}
        >
          This setting is <TextStyle variation="strong">{textStatus}</TextStyle>
          .
        </SettingToggle>
        <Card>
          <div style={{ padding: "20px" }}>
            <div style={{ padding: "0 0 20px 0" }}>
              <Subheading>Advanced</Subheading>
              <div className="toggle-button marginTop-30">
                <TextStyle>Show logo</TextStyle>
                <input
                  className="toggle toggle-ios"
                  id="showIcon"
                  type="checkbox"
                  checked={showIcon}
                  onChange={(e) => handleToggleShowIcon(e.target.checked)}
                />
                <label className="toggle-btn" htmlFor="showIcon"></label>
              </div>
              <div className="toggle-button marginTop-15">
                <TextStyle>Show only home page</TextStyle>
                <input
                  className="toggle toggle-ios"
                  id="onlyHome"
                  type="checkbox"
                  checked={onlyHomePage}
                  onChange={(e) => handleToggleOnlyHomePage(e.target.checked)}
                />
                <label className="toggle-btn" htmlFor="onlyHome"></label>
              </div>
              <div className="toggle-button marginTop-15">
                <TextStyle>Show dismiss button</TextStyle>
                <input
                  className="toggle toggle-ios"
                  id="showDismiss"
                  type="checkbox"
                  checked={showDismiss}
                  onChange={(e) => handleToggleShowDismiss(e.target.checked)}
                />
                <label className="toggle-btn" htmlFor="showDismiss"></label>
              </div>
              <div className="toggle-button marginTop-15">
                <TextStyle>Show preferences button</TextStyle>
                <input
                  className="toggle toggle-ios"
                  id="showPreferences"
                  type="checkbox"
                  checked={showPreferences}
                  onChange={(e) =>
                    handleToggleShowPreferences(e.target.checked)
                  }
                />
                <label className="toggle-btn" htmlFor="showPreferences"></label>
              </div>
              <div className="toggle-button marginTop-15">
                <TextStyle>Enable popup for all countries</TextStyle>
                <input
                  className="toggle toggle-ios"
                  id="allCountries"
                  type="checkbox"
                  checked={activeAllCountries}
                  onChange={(e) => handleToggleAllCountries(e.target.checked)}
                />
                <label className="toggle-btn" htmlFor="allCountries"></label>
              </div>
              {activeAllCountries == false && (
                <div className="toggle-button marginTop-15">
                  <TextStyle>Enable popup just for all EU countries</TextStyle>
                  <input
                    className="toggle toggle-ios"
                    id="eUCountries"
                    type="checkbox"
                    checked={activeEUCountries}
                    onChange={(e) => handleToggleEUCountries(e.target.checked)}
                  />
                  <label className="toggle-btn" htmlFor="eUCountries"></label>
                </div>
              )}
              {activeEUCountries == false && activeAllCountries == false && (
                <div ref={wrapperRef} className="div-autocomplete marginTop-15">
                  <p id="title-autocomplete">Choose country enable</p>
                  <input
                    className="form-control mr-sm-2 input-autocomplete"
                    type="search"
                    aria-label="Search"
                    onClick={() => setDisplay(true)}
                    id="auto"
                    placeholder="Search country"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                    }}
                  ></input>
                  {display && (
                    <div className="autoContainer">
                      <Scrollable
                        shadow
                        style={{ maxHeight: "50vh", overflow: "auto" }}
                      >
                        {country
                          .filter(
                            ({ title }) =>
                              title
                                .toLowerCase()
                                .indexOf(search.toLowerCase()) > -1
                          )
                          .map((v, i) => {
                            return (
                              <div
                                key={i}
                                onClick={() => {
                                  setStatusButtonSave(true);
                                  setDisplay(false);
                                  addTag(v, arrShowCountry);
                                }}
                                className="optionsAutoComplete"
                                key={i}
                                tabIndex="0"
                              >
                                <span>{v.title}</span>
                              </div>
                            );
                          })}
                      </Scrollable>
                    </div>
                  )}
                  <div style={{ marginTop: "5px" }}>
                    <Scrollable
                      shadow
                      style={{ maxHeight: "100px", overflow: "auto" }}
                    >
                      {arrShowCountry.length !== 0 &&
                        arrShowCountry.map((e, i) => (
                          <div
                            key={i}
                            style={{
                              marginRight: "10px",
                              marginBottom: "10px",
                              display: "inline-block",
                            }}
                          >
                            <Tag
                              onRemove={() => {
                                setStatusButtonSave(true);
                                removeTag(e, arrShowCountry);
                              }}
                            >
                              {e.title}
                            </Tag>
                          </div>
                        ))}
                    </Scrollable>
                  </div>
                </div>
              )}

              <div className="marginTop-15">
                <TextField
                  label="Browser cookies lifetime (days)"
                  value={lifeTime}
                  type="number"
                  min="1"
                  onChange={handleChangeLifeTime}
                />
              </div>
              <div className="marginTop-15">
                <TextField
                  label="Custom CSS"
                  value={customCss}
                  onChange={handleChangeCustomCss}
                  multiline={4}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

export default connect(mapStateToProps, {
  getSettings,
  removeTag,
  addTag,
  saveSettingsAdvanced,
  reloadSettings,
})(AdvancedSettings);
