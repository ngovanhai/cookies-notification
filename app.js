let omgcookies_shopName = Shopify.shop;
// let omgcookies_storeSettings;
let omgcookies_nameSetNotificationCookie = "cookiesNotification";
let omgage_pageName = __st && __st.p ? __st.p : null;
let omgage_pageId = __st && __st.p == "page" ? __st.rid : null;
let userTrackingConsent = "";
let userCanBeTracked = "";
const customerIdCookie = meta.page.customerId;
let version_cookie = Math.trunc(Math.random() * 1000000);
function omgcookies_getJsonFile() {
  var d = new Date(),
    v = d.getTime();
  if (typeof Shopify.designMode === "undefined") {
    window.Shopify.loadFeatures(
      [
        {
          name: "consent-tracking-api",
          version: "0.1",
        },
      ],
      function (error) {
        if (error) {
          throw error;
        }

        userCanBeTracked = window.Shopify.customerPrivacy.userCanBeTracked();
        userTrackingConsent =
          window.Shopify.customerPrivacy.getTrackingConsent();
      }
    );
    $.ajax({
      url: `${rootlinkCookiesNotification}/cookies-notification.php`,
      type: "GET",
      data: {
        shop: omgcookies_shopName,
        action: "getShopSettings",
      },
      dataType: "json",
    }).done((data) => {
      omgcookies_storeSettings = data.settings;
      omgcookies_storeCategory = data.category;
      omgcookies_storeCookies = data.cookies;
      var show_page =
        omgcookies_storeSettings.show_page != null &&
        omgcookies_storeSettings.show_page != ""
          ? JSON.parse(omgcookies_storeSettings.show_page)
          : [];
      if (
        omgcookies_storeSettings &&
        omgcookies_storeSettings.app_enable == 1
      ) {
        if (omgcookies_storeSettings.show_homepage == 1) {
          if (omgage_pageName == "home") {
            $("body").append("<div class='otCookiesNotification'></div>");
          }
        } else {
          $("body").append("<div class='otCookiesNotification'></div>");
        }

        if (omgcookies_storeSettings.popup_layout == 1) {
          //append file nen cookies-notification.css va file cookies-notification-preferences.css
          $("head").append(`
                            <style>
                            .otCookiesNotification #cookies-wrapper{position:fixed;left:0;right:0;padding:1em 1.8em;width:100%;overflow:hidden;box-sizing:border-box;font-family:Helvetica,Calibri,Arial,sans-serif;font-size:16px;text-align:center;line-height:1.5em;z-index:9999;border-radius:5px}.otCookiesNotification #cookies-message{margin-bottom:15px}.otCookiesNotification #cookies-submit>a{cursor:pointer;touch-action:manipulation;display:inline-block;padding:.4em .8em;font-size:.9em;font-weight:700;border-width:2px;border-style:solid;text-align:center;white-space:nowrap;min-width:140px;margin-top:5px}.otCookiesNotification #cookies-dismiss>a{cursor:pointer;touch-action:manipulation;display:inline-block;padding:.4em .8em;font-size:.9em;font-weight:700;border-width:2px;border-style:solid;text-align:center;white-space:nowrap;min-width:140px;margin-top:5px}.otCookiesNotification #cookies-prefrences>a{cursor:pointer;touch-action:manipulation;display:inline-block;padding:.4em .8em;font-size:.9em;font-weight:700;border-width:2px;border-style:solid;text-align:center;white-space:nowrap;min-width:140px;margin-top:5px}.otCookiesNotification #cookies-more-info{text-decoration:underline;cursor:pointer;opacity:.8}.otCookiesNotification #cookies-title{font-weight:700;margin-bottom:10px}.otCookiesNotification #cookies-popup{z-index:99999999999999999;display:none;border-radius:30px;width:auto;max-width:700px;left:50%;top:50%;position:fixed;transform:translate(-50%,-50%);animation-name:example;animation-duration:1.25s;min-width:35%;min-height:35%;box-shadow:rgb(0 0 0 / 35%) 0 5px 15px;padding:40px}@keyframes example{from{left:50%;top:0%;transform:translate(-50%,-50%)}to{left:50%;top:50%;transform:translate(-50%,-50%)}}.otCookiesNotification .title_cookies{font-weight:700}.otCookiesNotification #cookies-body{max-height:400px;overflow-y:scroll}.otCookiesNotification #cookies-action{display:flex;justify-content:flex-end;padding-top:20px}.otCookiesNotification .cookies-icon:hover{cursor:pointer}.otCookiesNotification .cookies-showmore{display:none}.otCookiesNotification #cookies-body::-webkit-scrollbar{display:none}.otCookiesNotification button{outline:none}@media only screen and (min-width:768px){.otCookiesNotification #cookies-wrapper{text-align:left;display:flex}.otCookiesNotification #cookies-popup-bottom{display:block}.otCookiesNotification #cookies-body{max-height:400px;overflow-y:scroll}.otCookiesNotification #cookies-message{-ms-flex:1;flex:1;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-line-pack:justify;align-content:space-between;margin-bottom:0}.otCookiesNotification #cookies-submit{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-line-pack:justify;align-content:space-between}.otCookiesNotification #cookies-submit>a{-ms-flex:1;flex:1;margin-top:0;display:block}.otCookiesNotification #cookies-dismiss{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-line-pack:justify;align-content:space-between;padding-right:5px}.otCookiesNotification #cookies-dismiss>a{-ms-flex:1;flex:1;display:block;margin-top:0}.otCookiesNotification #cookies-prefrences{display:flex;align-items:center}.otCookiesNotification #cookies-prefrences>a{margin-right:0;margin-top:0;margin-right:5px}.otCookiesNotification #logo-cookie{margin-right:0}}@media screen and (max-width:600px){.otCookiesNotification #cookies-popup{width:95%}.otCookiesNotification #cookies-action{display:flex}.otCookiesNotification .cookies-btn-select{width:50%}.otCookiesNotification .cookies-btn-select>button{min-width:100px}.otCookiesNotification .cookies-btn-all>button{min-width:150px}.otCookiesNotification #cookies-title{padding:0}}@media only screen and (max-width:321px){.otCookiesNotification .cookies-btn-select>button{min-width:120px}.otCookiesNotification .cookies-btn-select>button{font-size:12px}}
                            .otCookiesNotification #cookies-title{font-weight:700;margin-bottom:10px}.otCookiesNotification #cookies-popup{z-index:999;display:none;border-radius:30px;width:auto;max-width:700px;left:50%;top:50%;position:fixed;transform:translate(-50%,-50%);animation-name:example;animation-duration:1.25s;min-width:35%;min-height:35%;box-shadow:rgb(0 0 0 / 35%) 0 5px 15px;padding:40px}@keyframes example{from{left:50%;top:0%;transform:translate(-50%,-50%)}to{left:50%;top:50%;transform:translate(-50%,-50%)}}.otCookiesNotification .title_cookies{font-weight:700}.otCookiesNotification #cookies-body{max-height:400px;overflow-y:scroll}.otCookiesNotification #cookies-action{display:flex;justify-content:flex-end;padding-top:20px}.otCookiesNotification .cookies-icon:hover{cursor:pointer}.otCookiesNotification .fa-chevron-up{display:none}.otCookiesNotification .cookies-showmore{display:none}.otCookiesNotification #cookies-body::-webkit-scrollbar{display:none}button{outline:none}@media only screen and (min-width:768px){.otCookiesNotification #cookies-body{max-height:400px;overflow-y:scroll}.otCookiesNotification #logo-cookie{margin-right:0}}@media screen and (max-width:600px){.otCookiesNotification #cookies-popup{width:95%}.otCookiesNotification #cookies-action{display:flex}.otCookiesNotification .cookies-btn-select{width:50%}.otCookiesNotification .cookies-btn-select>button{min-width:100px}.otCookiesNotification .cookies-btn-all>button{min-width:150px}.otCookiesNotification #cookies-title{padding:0}}@media only screen and (max-width:321px){.otCookiesNotification .cookies-btn-select>button{min-width:120px}.otCookiesNotification .cookies-btn-select>button{font-size:12px}}.otCookiesNotification .cookies-btn{margin-right:10px;padding:.3rem .5rem;border-radius:5px;border:1px solid rgb(238 238 239);border-top-color:rgb(238 238 239);border-bottom-color:rgb(238 238 239)}.otCookiesNotification .cookies-btn:hover{opacity:.8}.otCookiesNotification .wapperChecked{display:inline-block;position:relative;margin:3px 0 3px 14px;line-height:16px;width:100%}.otCookiesNotification input[type="checkbox"].inputCheck{opacity:0;position:absolute;top:0;left:0;z-index:2;cursor:pointer}.otCookiesNotification input[type="checkbox"].inputCheck+label{background-repeat:no-repeat;height:auto;min-height:14px;width:auto;display:inline-block;padding:1px 0 0 17px;position:relative;top:0;left:0;z-index:1;cursor:pointer;margin-top:0;margin-bottom:0;background-position:left 1px;vertical-align:top;line-height:16px;font-size:inherit;color:inherit}.otCookiesNotification .navSelect:hover{background-color:#efefef}.otCookiesNotification .navSelect{border-radius:4px 0 0 4px;border-bottom:1px solid #ccc;border-left:1px solid #ccc;border-right:1px solid #ccc;border-top:1px solid #ccc}.otCookiesNotification div#cookies-description-header{padding:0 0 20px 0}.otCookiesNotification .cookies-description{margin:15px}.otCookiesNotification table.cookies-table{width:100%;border-collapse:collapse;margin-bottom:20px;overflow-x:auto}.otCookiesNotification .cookies-table th,.otCookiesNotification .cookies-table td{padding:5px;border:1px solid #dee2e6}.otCookiesNotification .cookies-table th{vertical-align:bottom}.otCookiesNotification table.cookies-table .thTable{background-color:#f6f6f9}.otCookiesNotification .notCookieInTable{border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin:10px 15px;padding:5px 0;color:#b9b9b9}.otCookiesNotification #opacityBackground{height:100%;width:100%;background:#0000008f;position:fixed;top:0;opacity:.7;left:0;z-index:9}.otCookiesNotification .divShow{display:inline-block;width:90%;cursor:pointer}.otCookiesNotification .close{position:absolute;right:25px;top:25px;width:25px;height:25px;opacity:.3;cursor:pointer}.otCookiesNotification .close:hover{opacity:1}.otCookiesNotification .close:before,.otCookiesNotification .close:after{position:absolute;left:15px;content:" ";height:25px;width:2px;background-color:#333}.otCookiesNotification .close:before{transform:rotate(45deg)}.otCookiesNotification .close:after{transform:rotate(-45deg)}.otCookiesNotification #logo-cookie{height:27px;margin-right:20px}
                            </style>
                            `);
        } else {
          //append file nen cookies-notification-corner.css va file cookies-notification-preferences.css
          $("head").append(`
                            <style>
                            .otCookiesNotification #cookies-wrapper{position:relative;position:fixed;padding:1em 1.8em;overflow:hidden;box-sizing:border-box;font-family:Helvetica,Calibri,Arial,sans-serif;font-size:14px;z-index:9999;text-align:center;border-radius:5px}.otCookiesNotification #cookies-message{margin-bottom:20px}.otCookiesNotification #cookies-submit{width:25%}.otCookiesNotification #cookies-submit a{cursor:pointer;touch-action:manipulation;display:block;padding:.4em .8em;font-size:1em;font-weight:700;border-width:1px;border-style:solid;text-align:center;min-width:80px;min-height:30px}.otCookiesNotification #cookies-dismiss{padding-right:5px}.otCookiesNotification #cookies-dismiss a{cursor:pointer;touch-action:manipulation;display:block;padding:.4em .8em;font-size:1em;font-weight:700;border-width:1px;border-style:solid;text-align:center;min-height:30px}.otCookiesNotification #cookies-privacy{position:absolute;left:0;width:45%;float:left;cursor:pointer;touch-action:manipulation;display:inline-block;padding:.4em .8em;font-size:1em;font-weight:700;border-width:1px;border-style:solid;border-color:transparent;text-align:center}.otCookiesNotification .title_cookies{font-weight:700}.otCookiesNotification #cookies-prefrences>a{cursor:pointer;touch-action:manipulation;display:block;padding:.4em .8em;font-size:1em;font-weight:700;border-width:1px;border-style:solid;text-align:center;min-height:30px;margin-right:5px}.otCookiesNotification #cookies-more-info{text-decoration:underline;cursor:pointer;opacity:.8}.otCookiesNotification .list_cookies{margin-left:20px;margin-top:-10px;padding-bottom:10px}.otCookiesNotification #cookies-popup{z-index:99999999999999999;display:none;border-radius:50px;width:auto;max-width:700px;left:50%;top:50%;position:fixed;transform:translate(-50%,-50%);animation-name:example;animation-duration:1.25s}.otCookiesNotification .cookies-btn-select:hover button{box-shadow:rgba(0,0,0,.25) 0 .0625em .0625em,rgba(0,0,0,.25) 0 .125em .5em,rgba(255,255,255,.1) 0 0 0 1px inset}.otCookiesNotification .cookies-btn-all:hover button{box-shadow:rgba(0,0,0,.25) 0 .0625em .0625em,rgba(0,0,0,.25) 0 .125em .5em,rgba(255,255,255,.1) 0 0 0 1px inset}@keyframes example{from{left:50%;top:0%;transform:translate(-50%,-50%)}to{left:50%;top:50%;transform:translate(-50%,-50%)}}.otCookiesNotification .list_cookies{margin-left:20px}.otCookiesNotification #cookies-action{display:flex;justify-content:flex-end;padding-top:20px}.otCookiesNotification .cookies-close{position:absolute;top:15px;right:30px}.otCookiesNotification .cookies-close:hover{cursor:pointer}.otCookiesNotification .cookies-btn-select{width:50%}.otCookiesNotification .cookies-icon:hover{cursor:pointer}.otCookiesNotification .cookies-showmore{display:none}.otCookiesNotification .cookies-btn-select>button{border-radius:50px;float:right;width:15rem;padding:.4em .8em;font-size:.9em;font-weight:700;border-width:2px;border-style:solid;text-align:center;white-space:nowrap;min-width:140px;height:2.2rem;margin-left:15px;margin-right:5px}.otCookiesNotification .cookies-btn-all{width:50%}.otCookiesNotification div#cookies-popup-bottom{display:flex;float:right}.otCookiesNotification .cookies-btn-all>button{border-radius:50px;width:15rem;padding:.4em .8em;font-size:.9em;font-weight:700;border-width:2px;border-style:solid;text-align:center;white-space:nowrap;min-width:140px;height:2.2rem;margin-left:5px;margin-right:15px}.otCookiesNotification button{outline:none}.otCookiesNotification #wrap-btn{display:-webkit-inline-box}@media only screen and (max-width:568px){.otCookiesNotification #cookies-wrapper{max-width:100%;left:0px!important}.otCookiesNotification #cookies-popup{z-index:99999999999999999;display:none;border-radius:50px;width:auto;max-width:700px;left:50%;top:50%;position:fixed;transform:translate(-50%,-50%);animation-name:example;animation-duration:1.25s}.otCookiesNotification .cookies-btn-select>button{width:0}.otCookiesNotification .cookies-btn-all>button{width:0}.otCookiesNotification #cookies-privacy{margin-left:23%}.otCookiesNotification #cookies-popup-bottom{display:block!important}.otCookiesNotification #cookies-submit>a{display:block}.otCookiesNotification #cookies-dismiss>a{display:block}.otCookiesNotification #cookies-message{-ms-flex:1;flex:1;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-line-pack:justify;align-content:space-between}.otCookiesNotification #cookies-submit{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-line-pack:justify;align-content:space-between}.otCookiesNotification #cookies-submit>a{-ms-flex:1;flex:1}.otCookiesNotification #cookies-dismiss{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-line-pack:justify;align-content:space-between;padding-right:5px}.otCookiesNotification #cookies-dismiss>a{-ms-flex:1;flex:1}}@media screen and (max-width:768px){.otCookiesNotification.otCookiesNotification #cookies-wrapper{right:0!important}.otCookiesNotification #logo-cookie{margin-right:0}.otCookiesNotification .cookies-btn-all>button{margin-left:0}.otCookiesNotification #cookies-prefrences>a{margin-right:0}.otCookiesNotification #cookies-message{margin-bottom:0}.otCookiesNotification #cookies-privacy{position:relative;display:flex;justify-content:center}.otCookiesNotification #cookies-popup{width:95%}.otCookiesNotification #cookies-action{display:flex;padding-top:15px}.otCookiesNotification .cookies-btn-select{width:50%}.otCookiesNotification .cookies-btn-all{width:50%}.otCookiesNotification .cookies-btn-select>button{min-width:150px}.otCookiesNotification .cookies-btn-all>button{min-width:150px}.otCookiesNotification .cookies-close{position:absolute;top:30px;right:25px}.otCookiesNotification #cookies-submit{margin-left:5px}.otCookiesNotification #cookies-popup-bottom{float:initial!important}.otCookiesNotification #cookies-privacy .cookies-btn-select:hover button{box-shadow:rgba(0,0,0,.25) 0 .0625em .0625em,rgba(0,0,0,.25) 0 .125em .5em,rgba(255,255,255,.1) 0 0 0 1px inset}.otCookiesNotification .cookies-btn-all:hover button{box-shadow:rgba(0,0,0,.25) 0 .0625em .0625em,rgba(0,0,0,.25) 0 .125em .5em,rgba(255,255,255,.1) 0 0 0 1px inset}.otCookiesNotification #cookies-wrapper{border-radius:0}}@media screen and (min-width:768px){.otCookiesNotification #cookies-wrapper{width:600px}}@media only screen and (max-width:321px){.otCookiesNotification .cookies-btn-select>button{min-width:120px!important}.otCookiesNotification .cookies-btn-all>button{min-width:120px!important}}
                            .otCookiesNotification #cookies-title{font-weight:700;margin-bottom:10px}.otCookiesNotification #cookies-popup{z-index:999;display:none;border-radius:30px;width:auto;max-width:700px;left:50%;top:50%;position:fixed;transform:translate(-50%,-50%);animation-name:example;animation-duration:1.25s;min-width:35%;min-height:35%;box-shadow:rgb(0 0 0 / 35%) 0 5px 15px;padding:40px}@keyframes example{from{left:50%;top:0%;transform:translate(-50%,-50%)}to{left:50%;top:50%;transform:translate(-50%,-50%)}}.otCookiesNotification .title_cookies{font-weight:700}.otCookiesNotification #cookies-body{max-height:400px;overflow-y:scroll}.otCookiesNotification #cookies-action{display:flex;justify-content:flex-end;padding-top:20px}.otCookiesNotification .cookies-icon:hover{cursor:pointer}.otCookiesNotification .fa-chevron-up{display:none}.otCookiesNotification .cookies-showmore{display:none}.otCookiesNotification #cookies-body::-webkit-scrollbar{display:none}button{outline:none}@media only screen and (min-width:768px){.otCookiesNotification #cookies-body{max-height:400px;overflow-y:scroll}.otCookiesNotification #logo-cookie{margin-right:0}}@media screen and (max-width:600px){.otCookiesNotification #cookies-popup{width:95%}.otCookiesNotification #cookies-action{display:flex}.otCookiesNotification .cookies-btn-select{width:50%}.otCookiesNotification .cookies-btn-select>button{min-width:100px}.otCookiesNotification .cookies-btn-all>button{min-width:150px}.otCookiesNotification #cookies-title{padding:0}}@media only screen and (max-width:321px){.otCookiesNotification .cookies-btn-select>button{min-width:120px}.otCookiesNotification .cookies-btn-select>button{font-size:12px}}.otCookiesNotification .cookies-btn{margin-right:10px;padding:.3rem .5rem;border-radius:5px;border:1px solid rgb(238 238 239);border-top-color:rgb(238 238 239);border-bottom-color:rgb(238 238 239)}.otCookiesNotification .cookies-btn:hover{opacity:.8}.otCookiesNotification .wapperChecked{display:inline-block;position:relative;margin:3px 0 3px 14px;line-height:16px;width:100%}.otCookiesNotification input[type="checkbox"].inputCheck{opacity:0;position:absolute;top:0;left:0;z-index:2;cursor:pointer}.otCookiesNotification input[type="checkbox"].inputCheck+label{background-repeat:no-repeat;height:auto;min-height:14px;width:auto;display:inline-block;padding:1px 0 0 17px;position:relative;top:0;left:0;z-index:1;cursor:pointer;margin-top:0;margin-bottom:0;background-position:left 1px;vertical-align:top;line-height:16px;font-size:inherit;color:inherit}.otCookiesNotification .navSelect:hover{background-color:#efefef}.otCookiesNotification .navSelect{border-radius:4px 0 0 4px;border-bottom:1px solid #ccc;border-left:1px solid #ccc;border-right:1px solid #ccc;border-top:1px solid #ccc}.otCookiesNotification div#cookies-description-header{padding:0 0 20px 0}.otCookiesNotification .cookies-description{margin:15px}.otCookiesNotification table.cookies-table{width:100%;border-collapse:collapse;margin-bottom:20px;overflow-x:auto}.otCookiesNotification .cookies-table th,.otCookiesNotification .cookies-table td{padding:5px;border:1px solid #dee2e6}.otCookiesNotification .cookies-table th{vertical-align:bottom}.otCookiesNotification table.cookies-table .thTable{background-color:#f6f6f9}.otCookiesNotification .notCookieInTable{border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin:10px 15px;padding:5px 0;color:#b9b9b9}.otCookiesNotification #opacityBackground{height:100%;width:100%;background:#0000008f;position:fixed;top:0;opacity:.7;left:0;z-index:9}.otCookiesNotification .divShow{display:inline-block;width:90%;cursor:pointer}.otCookiesNotification .close{position:absolute;right:25px;top:25px;width:25px;height:25px;opacity:.3;cursor:pointer}.otCookiesNotification .close:hover{opacity:1}.otCookiesNotification .close:before,.otCookiesNotification .close:after{position:absolute;left:15px;content:" ";height:25px;width:2px;background-color:#333}.otCookiesNotification .close:before{transform:rotate(45deg)}.otCookiesNotification .close:after{transform:rotate(-45deg)}.otCookiesNotification #logo-cookie{height:27px;margin-right:20px}
                            </style>
                        `);
        }

        var getCookiesNotification = omgcookies_getCookie(
          omgcookies_nameSetNotificationCookie
        );
        if (getCookiesNotification == null || getCookiesNotification == "") {
          omgcookies_getShopLocation(omgcookies_getCookiesNotification);
        }
      } else {
        console.log("hello");
      }
    });
  } else {
    console.log(
      "The EU GDPR Cookies Notification App doesn't support in the Design Mode"
    );
  }
}

function omgcookies_getShopLocation(callback) {
  if (omgcookies_storeSettings.show_all == 1) {
    if (typeof callback == "function") {
      callback();
    }
  } else {
    var eu_countries =
      omgcookies_storeSettings.eu_countries != null &&
      omgcookies_storeSettings.eu_countries != ""
        ? JSON.parse(omgcookies_storeSettings.eu_countries)
        : [];
    $.get(
      rootlinkCookiesNotification + "/cookies-notification.php",
      {
        action: "getShopLocation",
        shop: omgcookies_shopName,
        all_eu: omgcookies_storeSettings.show_all_eu,
        eu_countries: eu_countries,
      },
      function (result) {
        if (result == 1 && typeof callback == "function") {
          callback();
        }
      }
    );
  }
}
function omgcookies_getCookiesNotification() {
  $(".otCookiesNotification").append(createPopup());
  for (category in omgcookies_storeCategory) {
    $("#cookies-body").append(
      createCaregory(
        omgcookies_storeCategory[category],
        omgcookies_storeCookies
      )
    );
  }
  var privacy =
    omgcookies_storeSettings.privacy_link != ""
      ? `<a target="_blank" id="cookies-more-info" href="${omgcookies_storeSettings.privacy_link}">${omgcookies_storeSettings.info_text}</a>`
      : omgcookies_storeSettings.info_text;

  let div_preference = "";
  let logo = "";
  if (omgcookies_storeSettings.show_prefrences == 1) {
    div_preference = `<div id='cookies-prefrences'><a class='ot-cookie' onclick='omgcookies_cookiesPopup()'>${omgcookies_storeSettings.prefrences_text}</a></div>`;
  }
  if (omgcookies_storeSettings.show_icon == 1) {
    logo = `<img id="logo-cookie" src='${rootlinkCookiesNotification}/admin/public/images/iconCookie.png'></img>`;
  }
  if (omgcookies_storeSettings.popup_layout == 1) {
    var layoutCss = "";
    if (omgcookies_storeSettings.fullwidth_position == 1) {
      layoutCss += `.otCookiesNotification #cookies-wrapper{top:0;background:${omgcookies_storeSettings.popup_bgcolor};color:${omgcookies_storeSettings.popup_textcolor}; font-size:${omgcookies_storeSettings.text_size}px;}`;
    } else if (omgcookies_storeSettings.fullwidth_position == 2) {
      layoutCss += `.otCookiesNotification #cookies-wrapper{bottom:0;background:${omgcookies_storeSettings.popup_bgcolor};color:${omgcookies_storeSettings.popup_textcolor}; font-size:${omgcookies_storeSettings.text_size}px;}`;
    }

    if (omgcookies_storeSettings.show_dismiss == 1) {
      $("body").append(`
                <style>
                    ${layoutCss}
                    #cookies-message > p {color:${omgcookies_storeSettings.popup_textcolor};}
                    #cookies-more-info{color:${omgcookies_storeSettings.more_textcolor};}
                    #cookies-submit > a{color:${omgcookies_storeSettings.submit_textcolor};background:${omgcookies_storeSettings.submit_bgcolor};border-color:${omgcookies_storeSettings.submit_textcolor};}
                    #cookies-dismiss > a{color:${omgcookies_storeSettings.dismiss_textcolor};background:${omgcookies_storeSettings.dismiss_bgcolor};border-color:${omgcookies_storeSettings.dismiss_textcolor};}
                    #cookies-prefrences > a{color:${omgcookies_storeSettings.prefrences_textcolor};background:${omgcookies_storeSettings.prefrences_bgcolor};border-color:${omgcookies_storeSettings.prefrences_textcolor};}
                    ${omgcookies_storeSettings.custom_css}
                </style>`);
      $(".otCookiesNotification").append(`
                <div id='cookies-wrapper'>
                    ${logo}
                    <div id='cookies-message'>${omgcookies_storeSettings.message}&nbsp;${privacy}</div>                         
                    <div id='cookies-dismiss'><a class='ot-cookie' onclick='omgcookies_cookiesDismiss()'>${omgcookies_storeSettings.dismiss_text}</a></div>
                    ${div_preference}
                    <div id='cookies-submit'><a class='ot-cookie' onclick='clickAll()'>${omgcookies_storeSettings.submit_text}</a></div>
                </div>
            `);
      $(".otCookiesNotification").append(createPopup());
    } else {
      $("body").append(`
                    <style>
                        ${layoutCss}
                        #cookies-message > p {color:${omgcookies_storeSettings.popup_textcolor};}
                        #cookies-more-info{color:${omgcookies_storeSettings.more_textcolor};}
                        #cookies-submit > a{color:${omgcookies_storeSettings.submit_textcolor};background:${omgcookies_storeSettings.submit_bgcolor};border-color:${omgcookies_storeSettings.submit_textcolor};}
                        #cookies-prefrences > a{color:${omgcookies_storeSettings.prefrences_textcolor};background:${omgcookies_storeSettings.prefrences_bgcolor};border-color:${omgcookies_storeSettings.prefrences_textcolor};}
                        ${omgcookies_storeSettings.custom_css}
                    </style>`);
      $(".otCookiesNotification").append(`
                    <div id='cookies-wrapper'>
                    ${logo}
                        <div id='cookies-message'>${omgcookies_storeSettings.message}&nbsp;${privacy}</div>                         
                        ${div_preference}
                        <div id='cookies-submit'><a class='ot-cookie' onclick='clickAll()'>${omgcookies_storeSettings.submit_text}</a></div>
                    </div>
                `);
    }
  } else {
    switch (Number(omgcookies_storeSettings.corner_position)) {
      case 2:
        var layoutCss = `.otCookiesNotification #cookies-wrapper{bottom:0em;left:0em;background:${omgcookies_storeSettings.popup_bgcolor};color:${omgcookies_storeSettings.popup_textcolor}; font-size:${omgcookies_storeSettings.text_size}px;}`;
        break;
      case 3:
        var layoutCss = `.otCookiesNotification #cookies-wrapper{top:1em;right:0em;background:${omgcookies_storeSettings.popup_bgcolor};color:${omgcookies_storeSettings.popup_textcolor}; font-size:${omgcookies_storeSettings.text_size}px;}`;
        break;
      case 4:
        var layoutCss = `.otCookiesNotification #cookies-wrapper{bottom:0em;right:0em;background:${omgcookies_storeSettings.popup_bgcolor};color:${omgcookies_storeSettings.popup_textcolor}; font-size:${omgcookies_storeSettings.text_size}px;}`;
        break;
      default:
        var layoutCss = `.otCookiesNotification #cookies-wrapper{top:1em;left:0em;background:${omgcookies_storeSettings.popup_bgcolor};color:${omgcookies_storeSettings.popup_textcolor}; font-size:${omgcookies_storeSettings.text_size}px;}`;
        break;
    }
    if (omgcookies_storeSettings.show_dismiss == 1) {
      $("body").append(`
            <style>
                ${layoutCss}
                #cookies-message {color:${omgcookies_storeSettings.popup_textcolor};}
                #cookies-more-info{color:${omgcookies_storeSettings.more_textcolor};}
                #cookies-submit > a{color:${omgcookies_storeSettings.submit_textcolor};background:${omgcookies_storeSettings.submit_bgcolor};border-color:${omgcookies_storeSettings.submit_textcolor};}
                #cookies-dismiss > a{color:${omgcookies_storeSettings.dismiss_textcolor};background:${omgcookies_storeSettings.dismiss_bgcolor};border-color:${omgcookies_storeSettings.dismiss_textcolor};}
                #cookies-prefrences > a{color:${omgcookies_storeSettings.prefrences_textcolor};background:${omgcookies_storeSettings.prefrences_bgcolor};border-color:${omgcookies_storeSettings.prefrences_textcolor};}
                #cookies-privacy > p {color:${omgcookies_storeSettings.more_textcolor};}
                ${omgcookies_storeSettings.custom_css}
            </style>`);
      $(".otCookiesNotification").append(`
            <div id='cookies-wrapper'>
            ${logo}
                <div id='cookies-message'>${omgcookies_storeSettings.message}</div>
                <div id='cookies-popup-bottom'>
                <div id='cookies-privacy'>${privacy}</div>  
                <div id="wrap-btn"> 
                <div id='cookies-dismiss'><a class='ot-cookie' onclick='omgcookies_cookiesDismiss()'>${omgcookies_storeSettings.dismiss_text}</a></div>        
                ${div_preference}
                <div id='cookies-submit'><a class='ot-cookie' onclick='clickAll()'>${omgcookies_storeSettings.submit_text}</a></div>
                </div> 
                </div>  
            </div>
        `);
    } else {
      $("body").append(`
            <style>
                ${layoutCss}
                #cookies-message > p {color:${omgcookies_storeSettings.popup_textcolor};}
                #cookies-more-info{color:${omgcookies_storeSettings.more_textcolor};}
                #cookies-submit > a{color:${omgcookies_storeSettings.submit_textcolor};background:${omgcookies_storeSettings.submit_bgcolor};border-color:${omgcookies_storeSettings.submit_textcolor};}
                #cookies-privacy{color:${omgcookies_storeSettings.more_textcolor};}
                #cookies-privacy:hover{border-color:${omgcookies_storeSettings.submit_textcolor};}
                #cookies-prefrences > a{color:${omgcookies_storeSettings.prefrences_textcolor};background:${omgcookies_storeSettings.prefrences_bgcolor};border-color:${omgcookies_storeSettings.prefrences_textcolor};}
                ${omgcookies_storeSettings.custom_css}
            </style>`);
      $(".otCookiesNotification").append(`
            <div id='cookies-wrapper'>
            ${logo}
                <div id='cookies-message'> <p>${omgcookies_storeSettings.message}</p></div>
                <div id='cookies-privacy'>${privacy}</div>
                <div id='cookies-popup-bottom'>
                <div id="wrap-btn">        
                ${div_preference}      
                <div id='cookies-submit'><a class='ot-cookie' onclick='clickAll()'>${omgcookies_storeSettings.submit_text}</a></div>
                </div>   
                </div>
            </div>
        `);
    }
  }
  $(".otCookiesNotification #cookies-wrapper").fadeIn(300);
}

function createPopup() {
  $("head").append(`
    <style>
        #cookies-popup{
        background:${omgcookies_storeSettings.bgcolor_popup};
      }
      #cookies-action{
        border-top: 1px solid ${omgcookies_storeSettings.color_text_popup};
      }
      .btn-select{
        border-color:${omgcookies_storeSettings.accept_selected_text_color};
        color:${omgcookies_storeSettings.accept_selected_text_color};
        background:${omgcookies_storeSettings.accept_selected_bgcolor};
    }
    .btn-all{
      border-color:${omgcookies_storeSettings.accept_all_text_color};
      color:${omgcookies_storeSettings.accept_all_text_color};
      background:${omgcookies_storeSettings.accept_all_bgcolor};
    }
    </style>`);
  html = `<div style="display:none;" id="opacityBackground"></div><div id="cookies-popup">
      <div id='cookies-title' style="font-size:${
        parseInt(omgcookies_storeSettings.text_size) + 5
      }px; color:${omgcookies_storeSettings.title_color_popup}">${
    omgcookies_storeSettings.title_popup
  }  <span  class="close" onClick="cookiesClose()"></span></div>
      
      <div id='cookies-body'>
      <div id='cookies-description-header' style="font-size:${
        omgcookies_storeSettings.text_size
      }px;">${omgcookies_storeSettings.mess_popup}</div>
      </div>
      <div id='cookies-action'>
      <button class="cookies-btn btn-select"  onClick="clickSelected()" style="font-size:${
        omgcookies_storeSettings.text_size
      }px;">${omgcookies_storeSettings.accept_selected_text}</button>
      <button class='cookies-btn  btn-all' onClick="clickAll()" style="font-size:${
        omgcookies_storeSettings.text_size
      }px;">${omgcookies_storeSettings.accept_all_text}</button>
      </div>
    </div>`;
  return html;
}
function createCaregory(category, cookies) {
  if (category.category_status == "1") {
    count = cookies.filter(
      (x) => x.category_id === category.id && x.cookie_status == "1"
    ).length;
    label = ` <div class="divShow" onClick="showMore(${
      category.id
    })"><label  class="title_category" style="cursor:pointer;font-size:${
      omgcookies_storeSettings.text_size
    }px;" >${category.category_name}  ${count == 0 ? "" : "(" + count + ")"}
        </label></div>
      `;

    text =
      category.is_necessary == 1
        ? `<div class = "navSelect"><div class = "wapperChecked"><input type="checkbox" checked class="inputCheck" name="cookies" id=${
            category.id
          } value=${
            category.category_name
          }  /><img class="imageCheck" src=${rootlinkCookiesNotification}/admin/public/images/alwaychecked.png></img>${label}</div></div>${this.renderCookies(
            category,
            cookies
          )}`
        : `<div class = "navSelect"><div class = "wapperChecked"><input onClick = "toggleChecked(event,${
            category.id
          })" type="checkbox" class="inputCheck" name="cookies" id=${
            category.id
          } value=${category.category_name} /><img 
          class="imageNotCheck" id="imageNotCheck-${
            category.id
          }" src=${rootlinkCookiesNotification}/admin/public/images/notchecked.png></img>
          <img style="display: none" class="imageCheck" id="imageCheck-${
            category.id
          }"
  src=${rootlinkCookiesNotification}/admin/public/images/checked.png
  ></img>${label}</div></div>${this.renderCookies(category, cookies)}`;
    return text;
  } else {
    return "";
  }
}

function toggleChecked(e, id) {
  let eleNotCheck = document.getElementById("imageNotCheck-" + id);
  let eleCheck = document.getElementById("imageCheck-" + id);
  if (e.target.checked === true) {
    eleNotCheck.style.display = "none";
    eleCheck.style.display = "inline";
  } else {
    eleNotCheck.style.display = "inline";
    eleCheck.style.display = "none";
  }
}
function renderCookies(category, cookies) {
  const a = cookies.filter((item) => item.category_id === category.id);
  description = `<p class="cookies-description" style="font-size:${omgcookies_storeSettings.text_size}px;">${category.category_description}</p>`;
  let checkCookies = 0;
  let rowCookie = "";
  for (i in a) {
    if (a[i].cookie_status == "1") {
      checkCookies++;

      rowCookie += `<tr>
    <td>${a[i].cookie_name}</td>
    <td>${a[i].cookie_description}</td>
  </tr>`;
    }
  }
  if (checkCookies > 0) {
    tableCookies = `<table class = "cookies-table" style="font-size:${omgcookies_storeSettings.text_size}px;">
    <tr class ="thTable">
        <th>Name</th>
        <th>Description</th>
    </tr>
    ${rowCookie}
  </table>`;
    if (omgcookies_storeSettings.show_cookies == 1 && a.length > 0) {
      return `<div style="display:none" id="content-${category.id}">${
        description + tableCookies
      }</div>`;
    } else {
      return `<p  id="content-${category.id}" class="notCookieInTable" style="font-size:${omgcookies_storeSettings.text_size}px;display:none">We do not use cookies of this type.</p>`;
    }
  } else {
    return `<p  id="content-${category.id}" class="notCookieInTable" style="font-size:${omgcookies_storeSettings.text_size}px;display:none">We do not use cookies of this type.</p>`;
  }
}
function omgcookies_cookiesSubmit() {
  var getCookiesNotification = omgcookies_getCookie("cookiesNotification");
  if (getCookiesNotification == null || getCookiesNotification == "") {
    getCookiesNotification = [];
  } else {
    getCookiesNotification = JSON.parse(getCookiesNotification);
  }
  var data = {
    savedAt: new Date(),
  };
  getCookiesNotification.push(data);
  omgcookies_setCookie("cookiesNotification", getCookiesNotification);
  window.Shopify.customerPrivacy.setTrackingConsent(
    true,
    omgcookies_cookiesHide
  );
  $(".otCookiesNotification #cookies-wrapper").fadeOut(300);
  let categoryCookies = document.getElementsByName("cookies");
  let arrayCookiesAccept = [];
  for (categoryCookie in categoryCookies) {
    if (typeof categoryCookies[categoryCookie].value !== "undefined") {
      arrayCookiesAccept.push({ name: categoryCookies[categoryCookie].value });
    }
  }
}
async function omgcookies_cookiesDismiss() {
  const check = await chekcClose();
  if (+check === 1) {
    omgcookies_cookiesSubmit();
  } else {
    window.Shopify.customerPrivacy.setTrackingConsent(
      false,
      omgcookies_cookiesHide
    );
    $(".otCookiesNotification #cookies-wrapper").fadeOut(300);
  }
}
function omgcookies_cookiesPopup() {
  document.querySelector("#cookies-popup").style.display = "block";
  document.querySelector("#cookies-wrapper").style.display = "none";
  document.querySelector("#opacityBackground").style.display = "block";
}
function cookiesClose() {
  let width = window.screen.width;
  if (width > 768) {
    if (omgcookies_storeSettings.popup_layout == 1) {
      document.querySelector("#cookies-wrapper").style.display = "flex";
    } else {
      document.querySelector("#cookies-wrapper").style.display = "block";
    }
  } else {
    document.querySelector("#cookies-wrapper").style.display = "block";
  }
  $("#cookies-popup").fadeOut(300);
  document.querySelector("#opacityBackground").style.display = "none";
}
function showMore(id) {
  if (document.querySelector("#content-" + id).style.display == "block") {
    document.querySelector("#content-" + id).style.display = "none";
  } else if (document.querySelector("#content-" + id).style.display == "none") {
    document.querySelector("#content-" + id).style.display = "block";
  }
}

async function clickSelected() {
  let categoryCookies = document.getElementsByName("cookies");
  let arrayCookiesAccept = [];
  for (categoryCookie in categoryCookies) {
    if (
      typeof categoryCookies[categoryCookie].value !== "undefined" &&
      categoryCookies[categoryCookie].checked === true
    ) {
      arrayCookiesAccept.push({ name: categoryCookies[categoryCookie].value });
    }
  }
  let width = window.screen.width;
  if (width > 768) {
    if (omgcookies_storeSettings)
      if (omgcookies_storeSettings.popup_layout == 1) {
        document.querySelector("#cookies-wrapper").style.display = "flex";
      } else {
        document.querySelector("#cookies-wrapper").style.display = "block";
      }
  } else {
    document.querySelector("#cookies-wrapper").style.display = "block";
  }
  document.querySelector("#opacityBackground").style.display = "none";
  document.querySelector(`#cookies-popup`).style.display = "none";
  $("#cookies-popup").fadeOut(300);
  omgcookies_cookiesSubmit();
  pushInformationCookies(JSON.stringify(arrayCookiesAccept));
}
async function clickAll() {
  let categoryCookies = document.getElementsByName("cookies");
  let eleNotCheck = document.getElementsByClassName("imageNotCheck");
  let eleCheck = document.getElementsByClassName("imageCheck");

  for (i = 0; i < eleNotCheck.length; i++) {
    if (eleNotCheck[i]) {
      eleNotCheck[i].style.display = "none";
    }
  }

  for (j = 0; j < eleCheck.length; j++) {
    if (eleCheck[j]) {
      eleCheck[j].style.display = "inline";
    }
  }

  let arrayCookiesAccept = [];
  for (categoryCookie in categoryCookies) {
    if (typeof categoryCookies[categoryCookie].value !== "undefined") {
      arrayCookiesAccept.push({ name: categoryCookies[categoryCookie].value });
    }
  }

  setTimeout(() => {
    let width = window.screen.width;
    if (width > 768) {
      if (omgcookies_storeSettings)
        if (omgcookies_storeSettings.popup_layout == 1) {
          document.querySelector("#cookies-wrapper").style.display = "flex";
        } else {
          document.querySelector("#cookies-wrapper").style.display = "block";
        }
    } else {
      document.querySelector("#cookies-wrapper").style.display = "block";
    }
    document.querySelector("#opacityBackground").style.display = "none";
    document.querySelector(`#cookies-popup`).style.display = "none";
    $("#cookies-popup").fadeOut(300);
    omgcookies_cookiesSubmit();
  }, 500);
  pushInformationCookies(JSON.stringify(arrayCookiesAccept));
}
$(".cookies-btn-all").click(function () {
  $("input[type=checkbox]").prop("checked", $(this).prop("checked"));
});
function omgcookies_cookiesHide() {
  $(".otCookiesNotification #cookies-wrapper").fadeOut(300);
}
function omgcookies_getCookie(key) {
  var keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
  return keyValue ? keyValue[2] : null;
}
function omgcookies_setCookie(key, value) {
  if (typeof value !== "string") {
    value = JSON.stringify(value);
  }
  var exMinutes = Number(omgcookies_storeSettings.cache_time) * 24 * 60;
  var exdate = new Date();
  exdate.setMinutes(exdate.getMinutes() + exMinutes);
  document.cookie =
    key + "=" + value + "; expires=" + exdate.toUTCString() + "; path=/";
}
function chekcClose() {
  return new Promise((resolve) => {
    $.ajax({
      url: `${rootlinkCookiesNotification}/cookies-notification.php`,
      type: "GET",
      data: {
        shop: omg_cookies_notification_shopName,
        action: "checkCloseDismis",
      },
      dataType: "json",
    }).done((result) => {
      resolve(result);
    });
  });
}
function pushInformationCookies(categorySelected) {
  return new Promise((resolve) => {
    $.ajax({
      url: `${rootlinkCookiesNotification}/cookies-notification.php`,
      type: "GET",
      data: {
        shop: omg_cookies_notification_shopName,
        action: "postCookiesSelected",
        customerIdCookie: customerIdCookie,
        category: categorySelected,
      },
      dataType: "json",
    }).done((result) => {
      resolve(result);
    });
  });
}
