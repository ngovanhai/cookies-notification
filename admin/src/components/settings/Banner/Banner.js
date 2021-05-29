import React, { useCallback, useState, useEffect } from "react";
import { connect } from "react-redux";
import ModalPreview from "../ModalPreview";
import config from "../../../config/config";
import {
  getSettings,
  saveSettingsPopUp,
  reloadSettings,
} from "../../../actions/settings.js";
import {
  Card,
  Select,
  TextStyle,
  RadioButton,
  ButtonGroup,
  Subheading,
  Button,
  Layout,
  TextField,
} from "@shopify/polaris";
const Banner = ({
  getSettings,
  saveSettingsPopUp,
  reloadSettings,
  settings: { dataSettings },
}) => {
  useEffect(() => {
    getSettings();
  }, [getSettings]);
  useEffect(() => {
    setColorText(dataSettings.popup_textcolor);
    setColorBackgroundPopup(dataSettings.popup_bgcolor);
    setColorTextAndBorderSubmit(dataSettings.submit_textcolor);
    setColorSubmitBackground(dataSettings.submit_bgcolor);
    setColorTextAndBorderDismiss(dataSettings.dismiss_textcolor);
    setColorDismissBackground(dataSettings.dismiss_bgcolor);
    setColorTextAndBorderPreferences(dataSettings.prefrences_textcolor);
    setColorPreferencesBackground(dataSettings.prefrences_bgcolor);
    setColorTextLink(dataSettings.more_textcolor);
    setMoreInfoLinkText(dataSettings.info_text);
    setLinkText(dataSettings.privacy_link);
    setSubmitButtonText(dataSettings.submit_text);
    setDismissButtonText(dataSettings.dismiss_text);
    setPreferencesButtonText(dataSettings.prefrences_text);
    setTextSize(dataSettings.text_size);
    setMessageText(dataSettings.message);
    setSelectedPopupLayout(dataSettings.popup_layout);
    setSelectedPopupPositionFull(dataSettings.fullwidth_position);
    setValueRadioCorner(dataSettings.corner_position);
  }, [dataSettings]);

  const [statusButtonSave, setStatusButtonSave] = useState(false);
  //selected
  const [colorText, setColorText] = useState(dataSettings.popup_textcolor);
  const [colorBackgroundPopup, setColorBackgroundPopup] = useState(
    dataSettings.popup_bgcolor
  );
  const [colorTextAndBorderSubmit, setColorTextAndBorderSubmit] = useState(
    dataSettings.submit_textcolor
  );

  const [colorTextAndBorderDismiss, setColorTextAndBorderDismiss] = useState(
    dataSettings.dismiss_textcolor
  );

  const [
    colorTextAndBorderPreferences,
    setColorTextAndBorderPreferences,
  ] = useState(dataSettings.prefrences_textcolor);
  const [colorDismissBackground, setColorDismissBackground] = useState(
    dataSettings.dismiss_bgcolor
  );
  const [colorSubmitBackground, setColorSubmitBackground] = useState(
    dataSettings.submit_bgcolor
  );
  const [colorPreferencesBackground, setColorPreferencesBackground] = useState(
    dataSettings.prefrences_bgcolor
  );

  const [colorTextLink, setColorTextLink] = useState(
    dataSettings.more_textcolor
  );

  //POSITION
  const [selectedPopupLayout, setSelectedPopupLayout] = useState(
    dataSettings.popup_layout
  );
  const handleSelectChangePopupLayout = useCallback((value) => {
    setStatusButtonSave(true);
    setSelectedPopupLayout(value);
  }, []);
  const optionsPopupLayout = [
    { label: "Full width", value: "full" },
    { label: "Corner popup", value: "corner" },
  ];

  const [selectedPopupPositionFull, setSelectedPopupPositionFull] = useState(
    dataSettings.fullwidth_position
  );
  const handleSelectChangePopupPositionFull = useCallback((value) => {
    setStatusButtonSave(true);
    setSelectedPopupPositionFull(value);
  }, []);
  const optionsPopupPositionFull = [
    { label: "Top", value: "top" },
    { label: "Bottom", value: "bottom" },
  ];

  const [valueRadioCorner, setValueRadioCorner] = useState(
    dataSettings.corner_position
  );
  const handleChangeRadioCorner = useCallback((_checked, newValue) => {
    setStatusButtonSave(true);
    setValueRadioCorner(newValue);
  }, []);

  const [moreInfoLinkText, setMoreInfoLinkText] = useState(
    dataSettings.info_text
  );
  const handleChangeMoreInfoLinkText = useCallback((newValue) => {
    setStatusButtonSave(true);
    setMoreInfoLinkText(newValue);
  }, []);

  const [linkText, setLinkText] = useState(dataSettings.privacy_link);
  const handleChangeLinkText = useCallback((newValue) => {
    setStatusButtonSave(true);
    setLinkText(newValue);
  }, []);

  const [submitButtonText, setSubmitButtonText] = useState(
    dataSettings.submit_text
  );
  const handleChangeSubmitButtonText = useCallback((newValue) => {
    setStatusButtonSave(true);
    setSubmitButtonText(newValue);
  }, []);

  const [dismissButtonText, setDismissButtonText] = useState(
    dataSettings.dismiss_text
  );
  const handleChangeDismissButtonText = useCallback((newValue) => {
    setStatusButtonSave(true);
    setDismissButtonText(newValue);
  }, []);

  const [preferencesButtonText, setPreferencesButtonText] = useState(
    dataSettings.prefrences_text
  );
  const handleChangePreferencesButtonText = useCallback((newValue) => {
    setStatusButtonSave(true);
    setPreferencesButtonText(newValue);
  }, []);

  const [textSize, setTextSize] = useState(dataSettings.text_size);
  const handleChangeTextSize = useCallback((newValue) => {
    setStatusButtonSave(true);
    setTextSize(newValue);
  }, []);

  const [messageText, setMessageText] = useState(dataSettings.message);
  const handleChangeMessageText = useCallback((newValue) => {
    setStatusButtonSave(true);
    setMessageText(newValue);
  }, []);

  const cancelSave = useCallback(() => {
    setStatusButtonSave(false);
    setColorText(dataSettings.popup_textcolor);
    setColorBackgroundPopup(dataSettings.popup_bgcolor);
    setColorTextAndBorderSubmit(dataSettings.submit_textcolor);
    setColorSubmitBackground(dataSettings.submit_bgcolor);
    setColorTextAndBorderDismiss(dataSettings.dismiss_textcolor);
    setColorDismissBackground(dataSettings.dismiss_bgcolor);
    setColorTextAndBorderPreferences(dataSettings.prefrences_textcolor);
    setColorPreferencesBackground(dataSettings.prefrences_bgcolor);
    setColorTextLink(dataSettings.more_textcolor);
    setMoreInfoLinkText(dataSettings.info_text);
    setLinkText(dataSettings.privacy_link);
    setSubmitButtonText(dataSettings.submit_text);
    setDismissButtonText(dataSettings.dismiss_text);
    setPreferencesButtonText(dataSettings.prefrences_text);
    setTextSize(dataSettings.text_size);
    setMessageText(dataSettings.message);
    setSelectedPopupLayout(dataSettings.popup_layout);
    setSelectedPopupPositionFull(dataSettings.fullwidth_position);
    setValueRadioCorner(dataSettings.corner_position);
  });

  //PREFERENCES
  const [titleTextPreferences] = useState(dataSettings.title_popup);

  const [messageTextPreferences] = useState(dataSettings.mess_popup);
  const [allowSectionText] = useState(dataSettings.accept_selected_text);
  const [allowAllCookiesText] = useState(dataSettings.accept_all_text);
  //COLOR:
  const [colorTitlePreferences] = useState(dataSettings.title_color_popup);
  const [colorBackgroundPreferences] = useState(dataSettings.bgcolor_popup);
  const [colorAllowSectionText] = useState(
    dataSettings.accept_selected_text_color
  );
  const [colorAllowSectionBackground] = useState(
    dataSettings.accept_selected_bgcolor
  );

  const [colorAllowAllCookiesText] = useState(
    dataSettings.accept_all_text_color
  );
  const [colorAllowAllCookiesBackground] = useState(
    dataSettings.accept_all_bgcolor
  );

  const formdata = {
    popup_textcolor: colorText,
    popup_bgcolor: colorBackgroundPopup,
    submit_textcolor: colorTextAndBorderSubmit,
    submit_bgcolor: colorSubmitBackground,
    dismiss_textcolor: colorTextAndBorderDismiss,
    dismiss_bgcolor: colorDismissBackground,
    prefrences_textcolor: colorTextAndBorderPreferences,
    prefrences_bgcolor: colorPreferencesBackground,
    more_textcolor: colorTextLink,
    info_text: moreInfoLinkText,
    privacy_link: linkText,
    submit_text: submitButtonText,
    dismiss_text: dismissButtonText,
    prefrences_text: preferencesButtonText,
    text_size: textSize,
    message: messageText,
    popup_layout: selectedPopupLayout,
    fullwidth_position: selectedPopupPositionFull,
    corner_position: valueRadioCorner,
  };
  const handleSaveSettings = useCallback(async (formdata) => {
    reloadSettings();
    setStatusButtonSave(false);
    await saveSettingsPopUp(formdata);
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
                        label="Popup text"
                        value={colorText}
                        onChange={(e) => {
                          setColorText(e);
                          setStatusButtonSave(true);
                        }}
                      />
                      <input
                        type="color"
                        value={colorText}
                        onChange={(e) => {
                          setColorText(e.target.value);
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
                        value={colorBackgroundPopup}
                        onChange={(e) => {
                          setColorBackgroundPopup(e);
                          setStatusButtonSave(true);
                        }}
                      />
                      <input
                        type="color"
                        value={colorBackgroundPopup}
                        onChange={(e) => {
                          setColorBackgroundPopup(e.target.value);
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
                        label="Submit text and border"
                        value={colorTextAndBorderSubmit}
                        onChange={(e) => {
                          setColorTextAndBorderSubmit(e);
                          setStatusButtonSave(true);
                        }}
                      />
                      <input
                        type="color"
                        value={colorTextAndBorderSubmit}
                        onChange={(e) => {
                          setColorTextAndBorderSubmit(e.target.value);
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
                        label="Submit background"
                        value={colorSubmitBackground}
                        onChange={(e) => {
                          setColorSubmitBackground(e);
                          setStatusButtonSave(true);
                        }}
                      />
                      <input
                        type="color"
                        value={colorSubmitBackground}
                        onChange={(e) => {
                          setColorSubmitBackground(e.target.value);
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
                        label="Dismiss text and border"
                        value={colorTextAndBorderDismiss}
                        onChange={(e) => {
                          setColorTextAndBorderDismiss(e);
                          setStatusButtonSave(true);
                        }}
                      />
                      <input
                        type="color"
                        value={colorTextAndBorderDismiss}
                        onChange={(e) => {
                          setColorTextAndBorderDismiss(e.target.value);
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
                        label="Dismiss background"
                        value={colorDismissBackground}
                        onChange={(e) => {
                          setColorDismissBackground(e);
                          setStatusButtonSave(true);
                        }}
                      />
                      <input
                        type="color"
                        value={colorDismissBackground}
                        onChange={(e) => {
                          setColorDismissBackground(e.target.value);
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
                        label="Preferences text and border"
                        value={colorTextAndBorderPreferences}
                        onChange={(e) => {
                          setColorTextAndBorderPreferences(e);
                          setStatusButtonSave(true);
                        }}
                      />
                      <input
                        type="color"
                        value={colorTextAndBorderPreferences}
                        onChange={(e) => {
                          setColorTextAndBorderPreferences(e.target.value);
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
                        label="Preferences background"
                        value={colorPreferencesBackground}
                        onChange={(e) => {
                          setColorPreferencesBackground(e);
                          setStatusButtonSave(true);
                        }}
                      />
                      <input
                        type="color"
                        value={colorPreferencesBackground}
                        onChange={(e) => {
                          setColorPreferencesBackground(e.target.value);
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
                        label="Text link"
                        value={colorTextLink}
                        onChange={(e) => {
                          setColorTextLink(e);
                          setStatusButtonSave(true);
                        }}
                      />
                      <input
                        type="color"
                        value={colorTextLink}
                        onChange={(e) => {
                          setColorTextLink(e.target.value);
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
                  <div className="marginTop-30">
                    <div className="rowText">
                      <div className="marginTop-15 rowColor">
                        <TextField
                          label="More information link text"
                          value={moreInfoLinkText}
                          onChange={handleChangeMoreInfoLinkText}
                        />
                      </div>
                      <div className="marginTop-15 rowColor">
                        <TextField
                          label="Link of your Privacy Policy's page"
                          value={linkText}
                          onChange={handleChangeLinkText}
                        />
                      </div>
                    </div>
                    <div className="rowText">
                      <div className="marginTop-15 rowColor">
                        <TextField
                          label="Submit button"
                          value={submitButtonText}
                          onChange={handleChangeSubmitButtonText}
                        />
                      </div>
                      <div className="marginTop-15 rowColor">
                        <TextField
                          label="Dismiss button"
                          value={dismissButtonText}
                          onChange={handleChangeDismissButtonText}
                        />
                      </div>
                    </div>
                    <div className="rowText">
                      <div className="marginTop-15 rowColor">
                        <TextField
                          label="Preferences button"
                          value={preferencesButtonText}
                          onChange={handleChangePreferencesButtonText}
                        />
                      </div>
                      <div className="marginTop-15 rowColor">
                        <TextField
                          label="Custom text size"
                          type="number"
                          value={textSize}
                          min={4}
                          max={23}
                          onChange={handleChangeTextSize}
                        />
                      </div>
                    </div>
                    <div className="marginTop-15">
                      <TextField
                        label="Message"
                        value={messageText}
                        multiline={4}
                        onChange={handleChangeMessageText}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <div style={{ padding: "20px" }}>
                <div style={{ padding: "0 0 20px 0" }}>
                  <Subheading>Position</Subheading>

                  <div className="marginTop-30">
                    <Select
                      label="Popup's layout"
                      options={optionsPopupLayout}
                      onChange={handleSelectChangePopupLayout}
                      value={selectedPopupLayout}
                    />
                  </div>
                  {selectedPopupLayout == "full" && (
                    <div className="marginTop-15">
                      <Select
                        label="Position"
                        options={optionsPopupPositionFull}
                        onChange={handleSelectChangePopupPositionFull}
                        value={selectedPopupPositionFull}
                      />
                    </div>
                  )}
                  {selectedPopupLayout == "corner" && (
                    <div className="cornerBox marginTop-20">
                      <div className="optionCorner">
                        <img
                          className="imageCorner"
                          src={
                            config.rootLink +
                            "/admin/public/images/cornerTopLeft.PNG"
                          }
                        ></img>
                        <RadioButton
                          checked={valueRadioCorner === "topLeft"}
                          id="topLeft"
                          name="positionCorner"
                          onChange={handleChangeRadioCorner}
                        />
                      </div>
                      <div className="optionCorner">
                        <img
                          className="imageCorner"
                          src={
                            config.rootLink +
                            "/admin/public/images/cornerBottomLeft.PNG"
                          }
                        ></img>
                        <RadioButton
                          id="bottomLeft"
                          name="positionCorner"
                          checked={valueRadioCorner === "bottomLeft"}
                          onChange={handleChangeRadioCorner}
                        />
                      </div>
                      <div className="optionCorner">
                        <img
                          className="imageCorner"
                          src={
                            config.rootLink +
                            "/admin/public/images/cornerTopRight.PNG"
                          }
                        ></img>
                        <RadioButton
                          id="topRight"
                          name="positionCorner"
                          checked={valueRadioCorner === "topRight"}
                          onChange={handleChangeRadioCorner}
                        />
                      </div>
                      <div className="optionCorner">
                        <img
                          className="imageCorner"
                          src={
                            config.rootLink +
                            "/admin/public/images/cornerBottomRight.PNG"
                          }
                        ></img>
                        <RadioButton
                          id="bottomRight"
                          name="positionCorner"
                          checked={valueRadioCorner === "bottomRight"}
                          onChange={handleChangeRadioCorner}
                        />
                      </div>
                    </div>
                  )}
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
                  {selectedPopupLayout == "full" ? (
                    <div style={{ margin: "70px 0" }}>
                      <div
                        className="bannerBox"
                        style={{
                          backgroundColor: colorBackgroundPopup,
                          padding: "20px",
                          display: "flex",
                          fontSize: "12px",
                          justifyContent: "space-between",
                          borderRadius: "5px",
                        }}
                      >
                        <div className="messageBanner">
                          <div style={{ color: colorText, marginRight: "5px" }}>
                            {messageText}
                          </div>
                          <a
                            style={{ color: colorTextLink }}
                            href={linkText}
                            target="_blank"
                          >
                            {moreInfoLinkText}
                          </a>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <button
                            className="marginRight-5 buttonPopUp"
                            style={{
                              color: colorTextAndBorderDismiss,
                              backgroundColor: colorDismissBackground,
                              border: "2px solid " + colorTextAndBorderDismiss,
                            }}
                          >
                            {dismissButtonText}
                          </button>
                          <button
                            className="marginRight-5  buttonPopUp"
                            style={{
                              color: colorTextAndBorderPreferences,
                              backgroundColor: colorPreferencesBackground,
                              border:
                                "2px solid " + colorTextAndBorderPreferences,
                            }}
                          >
                            {preferencesButtonText}
                          </button>
                          <button
                            className="buttonPopUp"
                            style={{
                              color: colorTextAndBorderSubmit,
                              backgroundColor: colorSubmitBackground,
                              border: "2px solid " + colorTextAndBorderSubmit,
                            }}
                          >
                            {submitButtonText}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="bannerBox"
                      style={{
                        backgroundColor: colorBackgroundPopup,
                        padding: "20px",
                        fontSize: "12px",
                        borderRadius: "5px",
                        width: "50%",
                        margin: "20px 0",
                      }}
                    >
                      <div style={{ color: colorText, marginRight: "5px" }}>
                        {messageText}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "20px",
                        }}
                      >
                        <a
                          style={{ color: colorTextLink }}
                          href={linkText}
                          target="_blank"
                        >
                          {moreInfoLinkText}
                        </a>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <button
                            className="marginRight-5 buttonPopUp"
                            style={{
                              color: colorTextAndBorderDismiss,
                              backgroundColor: colorDismissBackground,
                              border: "2px solid " + colorTextAndBorderDismiss,
                            }}
                          >
                            {dismissButtonText}
                          </button>
                          <button
                            className="marginRight-5  buttonPopUp"
                            style={{
                              color: colorTextAndBorderPreferences,
                              backgroundColor: colorPreferencesBackground,
                              border:
                                "2px solid " + colorTextAndBorderPreferences,
                            }}
                          >
                            {preferencesButtonText}
                          </button>
                          <button
                            className="buttonPopUp"
                            style={{
                              color: colorTextAndBorderSubmit,
                              backgroundColor: colorSubmitBackground,
                              border: "2px solid " + colorTextAndBorderSubmit,
                            }}
                          >
                            {submitButtonText}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
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
  saveSettingsPopUp,
  reloadSettings,
})(Banner);
