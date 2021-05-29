import React, { useCallback, useState, useEffect } from "react";
import { connect } from "react-redux";
import ModalPreview from "../ModalPreview";
import {
  getSettings,
  saveSettingsPreferences,
  reloadSettings,
} from "../../../actions/settings.js";
import config from "../../../config/config";
import {
  Card,
  TextStyle,
  ButtonGroup,
  Subheading,
  Button,
  Layout,
  TextField,
} from "@shopify/polaris";
const Preferences = ({
  getSettings,
  reloadSettings,
  saveSettingsPreferences,
  settings: { dataSettings },
}) => {
  // DESIGN TEXT
  useEffect(() => {
    getSettings();
  }, [getSettings]);
  const [statusButtonSave, setStatusButtonSave] = useState(false);
  const [titleTextPreferences, setTitleTextPreferences] = useState(
    dataSettings.title_popup
  );
  const handleChangeTitleTextPreferences = useCallback((newValue) => {
    setStatusButtonSave(true);
    setTitleTextPreferences(newValue);
  }, []);
  const [statusCheckedPreferences, setStatusCheckedPreferences] = useState(
    false
  );
  const handleToggleCheckedPreferences = useCallback((newValue) => {
    setStatusCheckedPreferences(newValue);
  }, []);

  const [statusCheckedStatistics, setStatusCheckedStatistics] = useState(false);
  const handleToggleCheckedStatistics = useCallback((newValue) => {
    setStatusCheckedStatistics(newValue);
  }, []);

  const [statusCheckedMarketing, setStatusCheckedMarketing] = useState(false);
  const handleToggleCheckedMarketing = useCallback((newValue) => {
    setStatusCheckedMarketing(newValue);
  }, []);

  const [messageTextPreferences, setMessageTextPreferences] = useState(
    dataSettings.mess_popup
  );
  const handleChangeMessageTextPreferences = useCallback((newValue) => {
    setStatusButtonSave(true);
    setMessageTextPreferences(newValue);
  }, []);

  // const [useNecessaryText, setUseNecessaryText] = useState(
  //   "Use necessary cookies only"
  // );
  // const handleChangeUseNecessaryText = useCallback(
  //   (newValue) => setUseNecessaryText(newValue),
  //   []
  // );

  const [allowSectionText, setAllowSectionText] = useState(
    dataSettings.accept_selected_text
  );
  const handleChangeAllowSectionText = useCallback((newValue) => {
    setStatusButtonSave(true);
    setAllowSectionText(newValue);
  }, []);

  const [allowAllCookiesText, setAllowAllCookiesText] = useState(
    dataSettings.accept_all_text
  );
  const handleChangeAllowAllCookiesText = useCallback((newValue) => {
    setStatusButtonSave(true);
    setAllowAllCookiesText(newValue);
  }, []);

  //COLOR:
  const [colorTitlePreferences, setColorTitlePreferences] = useState(
    dataSettings.title_color_popup
  );
  // const [colorMessage, setColorMessage] = useState("#2a2a2a");

  const [colorBackgroundPreferences, setColorBackgroundPreferences] = useState(
    dataSettings.bgcolor_popup
  );

  // const [colorNecessary, setColorNecessary] = useState("#ffffff");
  // const [colorNecessaryBackground, setColorNecessaryBackground] = useState(
  //   "#333333"
  // );

  const [colorAllowSectionText, setColorAllowSectionText] = useState(
    dataSettings.accept_selected_text_color
  );
  const [
    colorAllowSectionBackground,
    setColorAllowSectionBackground,
  ] = useState(dataSettings.accept_selected_bgcolor);

  const [colorAllowAllCookiesText, setColorAllowAllCookiesText] = useState(
    dataSettings.accept_all_text_color
  );
  const [
    colorAllowAllCookiesBackground,
    setColorAllowAllCookiesBackground,
  ] = useState(dataSettings.accept_all_bgcolor);

  //DISPLAY SETTING
  const [colorText] = useState(dataSettings.popup_textcolor);
  const [colorBackgroundPopup] = useState(dataSettings.popup_bgcolor);
  const [colorTextAndBorderSubmit] = useState(dataSettings.submit_textcolor);

  const [colorTextAndBorderDismiss] = useState(dataSettings.dismiss_textcolor);
  const [colorTextAndBorderPreferences] = useState(
    dataSettings.prefrences_textcolor
  );
  const [colorDismissBackground] = useState(dataSettings.dismiss_bgcolor);
  const [colorSubmitBackground] = useState(dataSettings.submit_bgcolor);
  const [colorPreferencesBackground] = useState(
    dataSettings.prefrences_bgcolor
  );

  const [colorTextLink] = useState(dataSettings.more_textcolor);
  const [moreInfoLinkText] = useState(dataSettings.info_text);
  const [selectedPopupLayout] = useState(dataSettings.popup_layout);

  const [selectedPopupPositionFull] = useState(dataSettings.fullwidth_position);

  const [valueRadioCorner] = useState(dataSettings.corner_position);

  const [linkText] = useState(dataSettings.privacy_link);

  const [submitButtonText] = useState(dataSettings.submit_text);

  const [dismissButtonText] = useState(dataSettings.dismiss_text);

  const [preferencesButtonText] = useState(dataSettings.prefrences_text);
  const [messageText] = useState(dataSettings.message);

  const formdata = {
    title_color_popup: colorTitlePreferences,
    bgcolor_popup: colorBackgroundPreferences,
    accept_selected_text_color: colorAllowSectionText,
    accept_selected_bgcolor: colorAllowSectionBackground,
    accept_all_text_color: colorAllowAllCookiesText,
    accept_all_bgcolor: colorAllowAllCookiesBackground,
    accept_selected_text: allowSectionText,
    accept_all_text: allowAllCookiesText,
    title_popup: titleTextPreferences,
    mess_popup: messageTextPreferences,
  };
  const cancelSave = useCallback(() => {
    setStatusButtonSave(false);
    setColorTitlePreferences(dataSettings.title_color_popup);
    setColorBackgroundPreferences(dataSettings.bgcolor_popup);
    setColorAllowSectionText(dataSettings.accept_selected_text_color);
    setColorAllowSectionBackground(dataSettings.accept_selected_bgcolor);
    setColorAllowAllCookiesText(dataSettings.accept_all_text_color);
    setColorAllowAllCookiesBackground(dataSettings.accept_all_bgcolor);
    setAllowSectionText(dataSettings.accept_selected_text);
    setAllowAllCookiesText(dataSettings.accept_all_text);
    setTitleTextPreferences(dataSettings.title_popup);
    setMessageTextPreferences(dataSettings.mess_popup);
  });
  const handleSaveSettings = useCallback(async (formdata) => {
    reloadSettings();
    setStatusButtonSave(false);
    await saveSettingsPreferences(formdata);
    getSettings();
  }, []);
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
      <div id="display-reviews" className="session-setting">
        <Layout>
          <Layout.Section oneHalf>
            <Card>
              <div style={{ padding: "20px" }}>
                <div style={{ padding: "0 0 20px 0" }}>
                  <Subheading>Design color</Subheading>
                  <div className="groupChangeColor marginTop-30">
                    <div className="rowColor">
                      <TextField
                        label="Title text"
                        value={colorTitlePreferences}
                        onChange={(e) => {
                          setColorTitlePreferences(e);
                          setStatusButtonSave(true);
                        }}
                      />
                      <input
                        type="color"
                        value={colorTitlePreferences}
                        onChange={(e) => {
                          setColorTitlePreferences(e.target.value);
                          setStatusButtonSave(true);
                        }}
                        style={{
                          height: "44px",
                          border: "none",
                          width: "44px",
                          padding: "0px",
                          marginLeft: "5px",
                          marginTop: "24px",
                        }}
                      />
                    </div>
                    <div className="rowColor">
                      <TextField
                        label="Popup background"
                        value={colorBackgroundPreferences}
                        onChange={(e) => {
                          setColorBackgroundPreferences(e);
                          setStatusButtonSave(true);
                        }}
                      />
                      <input
                        type="color"
                        value={colorBackgroundPreferences}
                        onChange={(e) => {
                          setColorBackgroundPreferences(e.target.value);
                          setStatusButtonSave(true);
                        }}
                        style={{
                          height: "44px",
                          border: "none",
                          width: "44px",
                          padding: "0px",
                          marginLeft: "5px",
                          marginTop: "24px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="groupChangeColor">
                    <div className="rowColor">
                      <TextField
                        label="Allow selection text"
                        value={colorAllowSectionText}
                        onChange={(e) => {
                          setColorAllowSectionText(e);
                          setStatusButtonSave(true);
                        }}
                      />
                      <input
                        type="color"
                        value={colorAllowSectionText}
                        onChange={(e) => {
                          setColorAllowSectionText(e.target.value);
                          setStatusButtonSave(true);
                        }}
                        style={{
                          height: "44px",
                          border: "none",
                          width: "44px",
                          padding: "0px",
                          marginLeft: "5px",
                          marginTop: "24px",
                        }}
                      />
                    </div>
                    <div className="rowColor">
                      <TextField
                        label="Allow selection background"
                        value={colorAllowSectionBackground}
                        onChange={(e) => {
                          setColorAllowSectionBackground(e);
                          setStatusButtonSave(true);
                        }}
                      />
                      <input
                        type="color"
                        value={colorAllowSectionBackground}
                        onChange={(e) => {
                          setColorAllowSectionBackground(e.target.value);
                          setStatusButtonSave(true);
                        }}
                        style={{
                          height: "44px",
                          border: "none",
                          width: "44px",
                          padding: "0px",
                          marginLeft: "5px",
                          marginTop: "24px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="groupChangeColor">
                    <div className="rowColor">
                      <TextField
                        label="Allow all cookies text"
                        value={colorAllowAllCookiesText}
                        onChange={(e) => {
                          setColorAllowAllCookiesText(e);
                          setStatusButtonSave(true);
                        }}
                      />
                      <input
                        type="color"
                        value={colorAllowAllCookiesText}
                        onChange={(e) => {
                          setColorAllowAllCookiesText(e.target.value);
                          setStatusButtonSave(true);
                        }}
                        style={{
                          height: "44px",
                          border: "none",
                          width: "44px",
                          padding: "0px",
                          marginLeft: "5px",
                          marginTop: "24px",
                        }}
                      />
                    </div>
                    <div className="rowColor">
                      <TextField
                        label="Allow all cookies background"
                        value={colorAllowAllCookiesBackground}
                        onChange={(e) => {
                          setColorAllowAllCookiesBackground(e);
                          setStatusButtonSave(true);
                        }}
                      />
                      <input
                        type="color"
                        value={colorAllowAllCookiesBackground}
                        onChange={(e) => {
                          setColorAllowAllCookiesBackground(e.target.value);
                          setStatusButtonSave(true);
                        }}
                        style={{
                          height: "44px",
                          border: "none",
                          width: "44px",
                          padding: "0px",
                          marginLeft: "5px",
                          marginTop: "24px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <div style={{ padding: "20px" }}>
                <div style={{ padding: "0 0 20px 0" }}>
                  <Subheading>Design text</Subheading>
                  <div className="marginTop-15">
                    <TextField
                      label="Allow selection button text"
                      value={allowSectionText}
                      onChange={handleChangeAllowSectionText}
                    />
                  </div>
                  <div className="marginTop-15">
                    <TextField
                      label="Allow all cookies button text"
                      value={allowAllCookiesText}
                      onChange={handleChangeAllowAllCookiesText}
                    />
                  </div>
                  <div className="marginTop-15">
                    <TextField
                      label="Title"
                      value={titleTextPreferences}
                      onChange={handleChangeTitleTextPreferences}
                    />
                  </div>
                  <div className="marginTop-15">
                    <TextField
                      label="Message"
                      value={messageTextPreferences}
                      multiline={4}
                      onChange={handleChangeMessageTextPreferences}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </Layout.Section>
          <Layout.Section oneHalf>
            <Card>
              <div style={{ padding: "20px" }}>
                <div className="previewBox">
                  <ModalPreview
                    colorBackgroundPopup={colorBackgroundPopup}
                    colorText={colorText}
                    messageText={messageText}
                    colorTextLink={colorTextLink}
                    linkText={linkText}
                    moreInfoLinkText={moreInfoLinkText}
                    colorTextAndBorderDismiss={colorTextAndBorderDismiss}
                    colorDismissBackground={colorDismissBackground}
                    colorTextAndBorderPreferences={
                      colorTextAndBorderPreferences
                    }
                    colorPreferencesBackground={colorPreferencesBackground}
                    preferencesButtonText={preferencesButtonText}
                    dismissButtonText={dismissButtonText}
                    submitButtonText={submitButtonText}
                    colorTextAndBorderSubmit={colorTextAndBorderSubmit}
                    colorSubmitBackground={colorSubmitBackground}
                    selectedPopupLayout={selectedPopupLayout}
                    valueRadioCorner={valueRadioCorner}
                    //preferences
                    titleTextPreferences={titleTextPreferences}
                    messageTextPreferences={messageTextPreferences}
                    allowAllCookiesText={allowAllCookiesText}
                    allowSectionText={allowSectionText}
                    colorTitlePreferences={colorTitlePreferences}
                    colorAllowSectionBackground={colorAllowSectionBackground}
                    colorAllowSectionText={colorAllowSectionText}
                    colorAllowAllCookiesText={colorAllowAllCookiesText}
                    colorAllowAllCookiesBackground={
                      colorAllowAllCookiesBackground
                    }
                    colorBackgroundPreferences={colorBackgroundPreferences}
                    selectedPopupPositionFull={selectedPopupPositionFull}
                  />
                  <div
                    style={{
                      width: "80%",
                      fontSize: "12px",
                      margin: "70px auto",
                    }}
                  >
                    <div style={{ margin: "17px 0" }}>
                      <div
                        className="boxDetail"
                        style={{
                          backgroundColor: colorBackgroundPreferences,
                        }}
                      >
                        <img
                          style={{
                            width: "20px",
                            float: "right",
                            cursor: "pointer",
                          }}
                          src={
                            config.rootLink + "/admin/public/images/close.png"
                          }
                        ></img>
                        <div>
                          <b
                            style={{
                              fontSize: "1.2em",
                              display: "block",
                              marginBottom: "10px",
                              color: colorTitlePreferences,
                            }}
                          >
                            {titleTextPreferences}
                          </b>
                        </div>
                        <div style={{ marginBottom: "20px" }}>
                          {messageTextPreferences}
                        </div>
                        <div className="navSelectFirst navSelect">
                          <div
                            className="wapperChecked"
                            title="Mandatory - can not be deselected. Necessary cookies help make a website usable by enabling basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies."
                          >
                            <input
                              type="checkbox"
                              className="inputCheck"
                              tabIndex="0"
                            ></input>
                            <img
                              className="imageCheck"
                              src={
                                config.rootLink +
                                "/admin/public/images/alwaychecked.png"
                              }
                            ></img>
                            <div
                              id="accordion"
                              data-toggle="collapse"
                              data-target="#necessaryOne"
                              aria-expanded="true"
                              aria-controls="necessaryOne"
                              style={{ width: "90%", display: "inline-block" }}
                            >
                              <label
                                style={{
                                  fontWeight: "500",
                                }}
                                htmlFor="CybotCookiebotDialogBodyLevelButtonPreferences"
                              >
                                Necessary (3)
                              </label>
                            </div>
                          </div>
                        </div>
                        <div
                          id="necessaryOne"
                          style={{ marginTop: "10px" }}
                          className="collapse"
                          aria-labelledby="headingOne"
                          data-parent="#accordion"
                        >
                          <div class="tab-content" id="myTabContent ">
                            <div style={{ display: "flex" }}>
                              <div class="tab-content" id="myTabContent ">
                                <div className="contentCookie">
                                  <div
                                    class="tab-pane fade show active"
                                    id="necessary"
                                    role="tabpanel"
                                    aria-labelledby="necessary-tab"
                                  >
                                    <p>
                                      Necessary cookies help make a website
                                      usable by enabling basic functions like
                                      page navigation and access to secure areas
                                      of the website. The website cannot
                                      function properly without these cookies.
                                    </p>
                                    <table
                                      class="table"
                                      style={{
                                        marginTop: "10px",
                                      }}
                                    >
                                      <thead>
                                        <tr id="theadCookies">
                                          <th
                                            className="borderTable"
                                            scope="col"
                                          >
                                            Name
                                          </th>
                                          <th
                                            className="borderTable"
                                            scope="col"
                                          >
                                            Description
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className="borderTable">
                                            __cfduid [x2]
                                          </td>
                                          <td className="borderTable">
                                            Used by the content network,
                                            Cloudflare, to identify trusted web
                                            traffic.
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="borderTable">
                                            _accutics
                                          </td>
                                          <td className="borderTable">
                                            Contains data on user navigation,
                                            interaction and time spent on the
                                            website and its sub-pages. This data
                                            is used to optimise the relevance of
                                            advertisements and for statistical
                                            purposes.
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="borderTable">
                                            CookieConsent
                                          </td>
                                          <td className="borderTable">
                                            Stores the user's cookie consent
                                            state for the current domain
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="navSelect">
                            <div
                              className="wapperChecked"
                              title="Preference cookies enable a website to remember information that changes the way the website behaves or looks, like your preferred language or the region that you are in."
                            >
                              <input
                                type="checkbox"
                                className="inputCheck"
                                checked={statusCheckedPreferences}
                                onChange={(e) =>
                                  handleToggleCheckedPreferences(
                                    e.target.checked
                                  )
                                }
                                tabIndex="0"
                              ></input>
                              {statusCheckedPreferences == false && (
                                <img
                                  className="imageCheck"
                                  src={
                                    config.rootLink +
                                    "/admin/public/images/notchecked.png"
                                  }
                                ></img>
                              )}
                              {statusCheckedPreferences == true && (
                                <img
                                  className="imageCheck"
                                  src={
                                    config.rootLink +
                                    "/admin/public/images/checked.png"
                                  }
                                ></img>
                              )}
                              <div
                                id="accordion"
                                data-toggle="collapse"
                                data-target="#preferencesOne"
                                aria-expanded="true"
                                aria-controls="preferencesOne"
                                style={{
                                  width: "90%",
                                  display: "inline-block",
                                }}
                              >
                                <label
                                  style={{
                                    fontWeight: "500",
                                  }}
                                  htmlFor="CybotCookiebotDialogBodyLevelButtonPreferences"
                                >
                                  Preferences (0)
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          id="preferencesOne"
                          style={{ marginTop: "10px" }}
                          className="collapse"
                          aria-labelledby="headingOne"
                          data-parent="#accordion"
                        >
                          <div className="tab-content" id="myTabContent ">
                            <div style={{ display: "flex" }}>
                              <div className="tab-content" id="myTabContent ">
                                <div className="contentCookie">
                                  <div
                                    className="tab-pane fade show active"
                                    id="necessary"
                                    role="tabpanel"
                                    aria-labelledby="necessary-tab"
                                  >
                                    <p>
                                      Preference cookies enable a website to
                                      remember information that changes the way
                                      the website behaves or looks, like your
                                      preferred language or the region that you
                                      are in.
                                    </p>
                                    <div className="notCookies">
                                      We do not use cookies of this type.
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="navSelect">
                            <div
                              className="wapperChecked"
                              title="Statistic cookies help website owners to understand how visitors interact with websites by collecting and reporting information anonymously."
                            >
                              <input
                                type="checkbox"
                                className="inputCheck"
                                checked={statusCheckedStatistics}
                                onChange={(e) =>
                                  handleToggleCheckedStatistics(
                                    e.target.checked
                                  )
                                }
                                tabIndex="0"
                              ></input>
                              {statusCheckedStatistics == false && (
                                <img
                                  className="imageCheck"
                                  src={
                                    config.rootLink +
                                    "/admin/public/images/notchecked.png"
                                  }
                                ></img>
                              )}
                              {statusCheckedStatistics == true && (
                                <img
                                  className="imageCheck"
                                  src={
                                    config.rootLink +
                                    "/admin/public/images/checked.png"
                                  }
                                ></img>
                              )}
                              <div
                                id="accordion"
                                data-toggle="collapse"
                                data-target="#staticOne"
                                aria-expanded="true"
                                aria-controls="staticOne"
                                style={{
                                  width: "90%",
                                  display: "inline-block",
                                }}
                              >
                                <label
                                  style={{
                                    fontWeight: "500",
                                  }}
                                  htmlFor="CybotCookiebotDialogBodyLevelButtonPreferences"
                                >
                                  Statistics (1)
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          id="staticOne"
                          style={{ marginTop: "10px" }}
                          className="collapse"
                          aria-labelledby="headingOne"
                          data-parent="#accordion"
                        >
                          <div className="tab-content" id="myTabContent ">
                            <div style={{ display: "flex" }}>
                              <div className="tab-content" id="myTabContent ">
                                <div className="contentCookie">
                                  <p>
                                    Statistic cookies help website owners to
                                    understand how visitors interact with
                                    websites by collecting and reporting
                                    information anonymously.
                                  </p>
                                  <table
                                    className="table"
                                    style={{ marginTop: "10px" }}
                                  >
                                    <thead>
                                      <tr id="theadCookies">
                                        <th className="borderTable" scope="col">
                                          Name
                                        </th>
                                        <th className="borderTable" scope="col">
                                          Description
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td className="borderTable">
                                          _dc_gtm_UA-#
                                        </td>
                                        <td className="borderTable">
                                          Used by Google Tag Manager to control
                                          the loading of a Google Analytics
                                          script tag.
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="navSelect">
                            <div
                              className="wapperChecked"
                              title="Marketing cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third-party advertisers."
                            >
                              <input
                                type="checkbox"
                                className="inputCheck"
                                checked={statusCheckedMarketing}
                                onChange={(e) =>
                                  handleToggleCheckedMarketing(e.target.checked)
                                }
                                tabIndex="0"
                              ></input>
                              {statusCheckedMarketing == false && (
                                <img
                                  className="imageCheck"
                                  src={
                                    config.rootLink +
                                    "/admin/public/images/notchecked.png"
                                  }
                                ></img>
                              )}
                              {statusCheckedMarketing == true && (
                                <img
                                  className="imageCheck"
                                  src={
                                    config.rootLink +
                                    "/admin/public/images/checked.png"
                                  }
                                ></img>
                              )}
                              <div
                                id="accordion"
                                data-toggle="collapse"
                                data-target="#marketingOne"
                                aria-expanded="true"
                                aria-controls="marketingOne"
                                style={{
                                  width: "90%",
                                  display: "inline-block",
                                }}
                              >
                                <label
                                  style={{
                                    fontWeight: "500",
                                  }}
                                  htmlFor="CybotCookiebotDialogBodyLevelButtonPreferences"
                                >
                                  Marketing (5)
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          id="marketingOne"
                          style={{ marginTop: "10px" }}
                          className="collapse"
                          aria-labelledby="headingOne"
                          data-parent="#accordion"
                        >
                          <div className="tab-content" id="myTabContent ">
                            <div style={{ display: "flex" }}>
                              <div className="tab-content" id="myTabContent ">
                                <div className="contentCookie">
                                  <p>
                                    Marketing cookies are used to track visitors
                                    across websites. The intention is to display
                                    ads that are relevant and engaging for the
                                    individual user and thereby more valuable
                                    for publishers and third-party advertisers.
                                  </p>
                                  <table
                                    className="table"
                                    style={{ marginTop: "10px" }}
                                  >
                                    <thead>
                                      <tr id="theadCookies">
                                        <th className="borderTable" scope="col">
                                          Name
                                        </th>
                                        <th className="borderTable" scope="col">
                                          Description
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td className="borderTable">
                                          device_id
                                        </td>
                                        <td className="borderTable">
                                          Registers a unique ID that identifies
                                          a returning user's device. The ID is
                                          used for targeted ads.
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="borderTable">_fbp</td>
                                        <td className="borderTable">
                                          Used by Facebook to deliver a series
                                          of advertisement products such as real
                                          time bidding from third party
                                          advertisers.
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="borderTable">ckid</td>
                                        <td className="borderTable">
                                          Used to track visitors on multiple
                                          websites, in order to present relevant
                                          advertisement based on the visitor's
                                          preferences.
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="borderTable">IDE</td>
                                        <td className="borderTable">
                                          Used by Google DoubleClick to register
                                          and report the website user's actions
                                          after viewing or clicking one of the
                                          advertiser's ads with the purpose of
                                          measuring the efficacy of an ad and to
                                          present targeted ads to the user.
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="borderTable">
                                          test_cookie
                                        </td>
                                        <td className="borderTable">
                                          Used to check if the user's browser
                                          supports cookies.
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="groupButtonCookies">
                          <button
                            className="buttonCookies"
                            style={{
                              backgroundColor: colorAllowSectionBackground,
                              color: colorAllowSectionText,
                              border: "1px solid " + colorAllowSectionText,
                            }}
                          >
                            {allowSectionText}
                          </button>
                          <button
                            className="buttonCookies"
                            style={{
                              backgroundColor: colorAllowAllCookiesBackground,
                              color: colorAllowAllCookiesText,
                              border: "1px solid " + colorAllowAllCookiesText,
                            }}
                          >
                            {allowAllCookiesText}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Layout.Section>
        </Layout>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

export default connect(mapStateToProps, {
  getSettings,
  saveSettingsPreferences,
  reloadSettings,
})(Preferences);
