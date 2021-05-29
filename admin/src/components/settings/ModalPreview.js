import config from "../../config/config";
import React, { useCallback, useState } from "react";
import { Modal, Button } from "@shopify/polaris";
import { ViewMinor } from "@shopify/polaris-icons";

const ModalPreview = ({
  colorBackgroundPopup,
  colorText,
  messageText,
  colorTextLink,
  linkText,
  moreInfoLinkText,
  colorTextAndBorderDismiss,
  colorDismissBackground,
  colorTextAndBorderPreferences,
  colorPreferencesBackground,
  preferencesButtonText,
  dismissButtonText,
  submitButtonText,
  colorTextAndBorderSubmit,
  colorSubmitBackground,
  selectedPopupLayout,
  valueRadioCorner,
  //preferences
  titleTextPreferences,
  messageTextPreferences,
  allowAllCookiesText,
  allowSectionText,
  colorTitlePreferences,
  colorAllowSectionBackground,
  colorAllowSectionText,
  colorAllowAllCookiesText,
  colorAllowAllCookiesBackground,
  colorBackgroundPreferences,
  selectedPopupPositionFull,
}) => {
  const [active, setActive] = useState(false);
  const [statusShowPreferences, setStatusShowPreferences] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);
  const handleShowPreferences = useCallback(
    () => setStatusShowPreferences(true),
    []
  );
  const handleHidePreferences = useCallback(
    () => setStatusShowPreferences(false),
    []
  );
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
  const activator = (
    <Button icon={ViewMinor} onClick={handleChange}>
      Preview
    </Button>
  );

  return (
    <Modal
      large
      activator={activator}
      open={active}
      onClose={handleChange}
      title="Preview"
      secondaryActions={[
        {
          content: "Close",
          onAction: handleChange,
        },
      ]}
    >
      <Modal.Section>
        <img
          width="100%"
          src={config.rootLink + "/admin/public/images/preview.png"}
          alt="image preview"
        ></img>
        <div className="modalPreviewBox">
          {selectedPopupLayout === "full" &&
            selectedPopupPositionFull === "top" && (
              <div style={{ margin: "20px 0" }}>
                <div
                  className="bannerBox"
                  style={{
                    backgroundColor: colorBackgroundPopup,
                    padding: "20px",
                    display: "flex",
                    fontSize: "12px",
                    justifyContent: "space-between",
                    borderRadius: "5px",
                    width: "100%",
                  }}
                >
                  <div>
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
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                      onClick={handleShowPreferences}
                      className="marginRight-5  buttonPopUp"
                      style={{
                        color: colorTextAndBorderPreferences,
                        backgroundColor: colorPreferencesBackground,
                        border: "2px solid " + colorTextAndBorderPreferences,
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
          {selectedPopupLayout == "full" &&
            selectedPopupPositionFull == "bottom" && (
              <div style={{ margin: "20px 0" }}>
                <div
                  className="bannerBox"
                  style={{
                    backgroundColor: colorBackgroundPopup,
                    padding: "20px",
                    display: "flex",
                    fontSize: "12px",
                    justifyContent: "space-between",
                    borderRadius: "5px",
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                  }}
                >
                  <div>
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
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                      onClick={handleShowPreferences}
                      className="marginRight-5  buttonPopUp"
                      style={{
                        color: colorTextAndBorderPreferences,
                        backgroundColor: colorPreferencesBackground,
                        border: "2px solid " + colorTextAndBorderPreferences,
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
          {/* Bottom Left */}
          {selectedPopupLayout == "corner" && valueRadioCorner == "bottomLeft" && (
            <div
              className="bannerBox"
              style={{
                backgroundColor: colorBackgroundPopup,
                padding: "20px",
                fontSize: "12px",
                borderRadius: "5px",
                width: "40%",
                position: "absolute",
                bottom: 0,
                left: 0,
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
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                    onClick={handleShowPreferences}
                    className="marginRight-5  buttonPopUp"
                    style={{
                      color: colorTextAndBorderPreferences,
                      backgroundColor: colorPreferencesBackground,
                      border: "2px solid " + colorTextAndBorderPreferences,
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
          {/* //TopLeft */}
          {selectedPopupLayout == "corner" && valueRadioCorner == "topLeft" && (
            <div
              className="bannerBox"
              style={{
                backgroundColor: colorBackgroundPopup,
                padding: "20px",
                fontSize: "12px",
                borderRadius: "5px",
                width: "40%",
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
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                    onClick={handleShowPreferences}
                    className="marginRight-5  buttonPopUp"
                    style={{
                      color: colorTextAndBorderPreferences,
                      backgroundColor: colorPreferencesBackground,
                      border: "2px solid " + colorTextAndBorderPreferences,
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
          {/* Top right */}
          {selectedPopupLayout == "corner" && valueRadioCorner == "topRight" && (
            <div
              className="bannerBox"
              style={{
                backgroundColor: colorBackgroundPopup,
                padding: "20px",
                fontSize: "12px",
                borderRadius: "5px",
                width: "40%",
                position: "absolute",
                top: 0,
                right: 0,
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
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                    onClick={handleShowPreferences}
                    className="marginRight-5  buttonPopUp"
                    style={{
                      color: colorTextAndBorderPreferences,
                      backgroundColor: colorPreferencesBackground,
                      border: "2px solid " + colorTextAndBorderPreferences,
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
          {/* Top bottom */}
          {selectedPopupLayout == "corner" &&
            valueRadioCorner == "bottomRight" && (
              <div
                className="bannerBox"
                style={{
                  backgroundColor: colorBackgroundPopup,
                  padding: "20px",
                  fontSize: "12px",
                  borderRadius: "5px",
                  width: "40%",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
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
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                      onClick={handleShowPreferences}
                      className="marginRight-5  buttonPopUp"
                      style={{
                        color: colorTextAndBorderPreferences,
                        backgroundColor: colorPreferencesBackground,
                        border: "2px solid " + colorTextAndBorderPreferences,
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

          {/* //dsd */}
          {/* <div className="modalPreviewBox" style={{ height: "68vh" }}>
        </div> */}
          {statusShowPreferences && (
            <div
              style={{
                width: "50%",
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
                    src={config.rootLink + "/admin/public/images/close.png"}
                    onClick={handleHidePreferences}
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
                                Necessary cookies help make a website usable by
                                enabling basic functions like page navigation
                                and access to secure areas of the website. The
                                website cannot function properly without these
                                cookies.
                              </p>
                              <table
                                class="table"
                                style={{
                                  marginTop: "10px",
                                }}
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
                                      __cfduid [x2]
                                    </td>
                                    <td className="borderTable">
                                      Used by the content network, Cloudflare,
                                      to identify trusted web traffic.
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="borderTable">_accutics</td>
                                    <td className="borderTable">
                                      Contains data on user navigation,
                                      interaction and time spent on the website
                                      and its sub-pages. This data is used to
                                      optimise the relevance of advertisements
                                      and for statistical purposes.
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="borderTable">
                                      CookieConsent
                                    </td>
                                    <td className="borderTable">
                                      Stores the user's cookie consent state for
                                      the current domain
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
                            handleToggleCheckedPreferences(e.target.checked)
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
                                Preference cookies enable a website to remember
                                information that changes the way the website
                                behaves or looks, like your preferred language
                                or the region that you are in.
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
                            handleToggleCheckedStatistics(e.target.checked)
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
                              understand how visitors interact with websites by
                              collecting and reporting information anonymously.
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
                                  <td className="borderTable">_dc_gtm_UA-#</td>
                                  <td className="borderTable">
                                    Used by Google Tag Manager to control the
                                    loading of a Google Analytics script tag.
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
                              across websites. The intention is to display ads
                              that are relevant and engaging for the individual
                              user and thereby more valuable for publishers and
                              third-party advertisers.
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
                                  <td className="borderTable">device_id</td>
                                  <td className="borderTable">
                                    Registers a unique ID that identifies a
                                    returning user's device. The ID is used for
                                    targeted ads.
                                  </td>
                                </tr>
                                <tr>
                                  <td className="borderTable">_fbp</td>
                                  <td className="borderTable">
                                    Used by Facebook to deliver a series of
                                    advertisement products such as real time
                                    bidding from third party advertisers.
                                  </td>
                                </tr>
                                <tr>
                                  <td className="borderTable">ckid</td>
                                  <td className="borderTable">
                                    Used to track visitors on multiple websites,
                                    in order to present relevant advertisement
                                    based on the visitor's preferences.
                                  </td>
                                </tr>
                                <tr>
                                  <td className="borderTable">IDE</td>
                                  <td className="borderTable">
                                    Used by Google DoubleClick to register and
                                    report the website user's actions after
                                    viewing or clicking one of the advertiser's
                                    ads with the purpose of measuring the
                                    efficacy of an ad and to present targeted
                                    ads to the user.
                                  </td>
                                </tr>
                                <tr>
                                  <td className="borderTable">test_cookie</td>
                                  <td className="borderTable">
                                    Used to check if the user's browser supports
                                    cookies.
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
                    {/* <button
                            className="buttonCookies"
                            style={{
                              backgroundColor: colorNecessaryBackground,
                              color: colorNecessary,
                            }}
                          >
                            {useNecessaryText}
                          </button> */}
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
          )}
        </div>
      </Modal.Section>
    </Modal>
  );
};

export default ModalPreview;
