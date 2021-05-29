// Shop Name
if (typeof omgcookies_checkJS == "undefined") {
  var omgcookies_checkJS = 1;
  var omg_cookies_notification_shopName = Shopify.shop;
  var rootlinkCookiesNotification =
    "https://apps.omegatheme.com/cookies-notification";
  if (typeof $ == "undefined") {
    javascript: (function (e, s) {
      e.src = s;
      e.onload = function () {
        $ = jQuery.noConflict();
        omgcookies_init();
      };
      document.head.appendChild(e);
    })(
      document.createElement("script"),
      "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"
    );
  } else {
    omgcookies_init();
  }

  async function omgcookies_init() {
    window.cookies_v = await omgcookies_checkInstallApp();
    if (window.cookies_v != null) {
      omgcookies_loadFile();
    }
  }

  // -----------------Fetch Settings-------------------
  function omgcookies_checkInstallApp() {
    return new Promise((resolve) => {
      $.ajax({
        url: `${rootlinkCookiesNotification}/cookies-notification.php`,
        type: "GET",
        data: {
          shop: omg_cookies_notification_shopName,
          action: "checkInstallApp",
        },
        dataType: "json",
      }).done((result) => {
        if (result.install && !result.expired) {
          resolve(result.ver);
        } else {
          resolve(null);
        }
      });
    });
  }
  // ----------------End Fetch Settings-----------------

  // -------------------------- Load file -------------------------
  function omgcookies_loadFile() {
    var d = new Date();
    var ver = d.getTime();
    omgcookies_cachedScript(
      `${rootlinkCookiesNotification}/app.js?v=${ver}`
    ).done(function (script, textStatus) {
      omgcookies_getJsonFile();
    });
  }

  // ------------------------ End load file -----------------------

  function omgcookies_cachedScript(url, options) {
    options = $.extend(options || {}, {
      dataType: "script",
      cache: true,
      url: url,
    });
    return $.ajax(options);
  }
}
