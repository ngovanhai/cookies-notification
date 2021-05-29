<?php

require 'vendor/autoload.php';
ini_set('display_errors', TRUE);

use sandeepshetty\shopify_api;

require 'help.php';

$select_settings = $dbr->query("SELECT * FROM tbl_appsettings WHERE id = $appId");
$app_settings = $select_settings->fetch_object();
if (!empty($_GET['shop']) && !empty($_GET['code'])) {

    $shop = $_GET['shop']; //shop name
    //get permanent access token
    $access_token = shopify_api\oauth_access_token(
        $_GET['shop'],
        $app_settings->api_key,
        $app_settings->shared_secret,
        $_GET['code']
    );

    db_update("cookies_notification_settings", ["permission" => "1"], "shop='$shop'");
    db_update("tbl_usersettings", ["access_token" => "$access_token"], "store_name='$shop'");
    addDefaultData($shop);
    $shopify = shopifyInit($dbr, $shop, $appId);
    $theme = $shopify("GET", APIVERSION . "themes.json", array("role" => "main"));
    $themeID = $theme[0]['id'];
    $data = array(
        "asset" => array(
            "key" => "snippets/ot-cookies.liquid",
            "src" => "$rootLink/client/ot-cookies.liquid"
        )
    );
    $snippet = $shopify("PUT",  APIVERSION . "themes/" . $theme[0]["id"] . "/assets.json", $data);
    $themeFile = $shopify("GET", APIVERSION . "themes/$themeID/assets.json?asset[key]=layout/theme.liquid&v=" . time());
    addScriptToTheme($shopify, $themeFile);

    header('Location: https://' . $shop . '/admin/apps/eu-cookies-notification');
}
