<?php
ini_set('display_errors', TRUE);
error_reporting(E_ALL);
require 'vendor/autoload.php';

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
    $installed = checkInstalled($shop, $appId);
    if ($installed["installed"]) {
        $date_installed = $installed["installed_date"];
        $dbw->query("
         INSERT INTO tbl_usersettings 
         SET access_token = '$access_token',
         store_name = '$shop', app_id = $appId, installed_date = '$date_installed', confirmation_url = ''
     ");

        $date1 = new DateTime($installed["installed_date"]);
        $date2 = new DateTime("now");
        $interval = date_diff($date1, $date2);
        $diff = (int) $interval->format('%R%a');
        $trialTime = $trialTime - $diff;
        if ($trialTime < 0) {
            $trialTime = 0;
        }
    } else {
        $dbw->query("
             INSERT INTO tbl_usersettings 
             SET access_token = '$access_token',
             store_name = '$shop', app_id = $appId, installed_date = NOW(), confirmation_url = ''
         ");
        $dbw->query("
             INSERT INTO shop_installed 
             SET shop = '$shop', app_id = $appId, date_installed = NOW()
         ");
    }
    $shopify = shopifyInit($dbr, $shop, $appId);
    //insert shop setting for app
    if (checkShopSettings($shop) == false) {
        $dbw->query("insert into cookies_notification_settings(shop,permission) values('$shop',1)");
        addDefaultData($shop);
        // addDefaultCookies($shop);
    }
    // createShopSettingsFile($shop);

    //charge fee
    $charge = array(
        "recurring_application_charge" => array(
            "name" => $chargeTitle,
            "price" => $price,
            "return_url" => "$rootLink/charge.php?shop=$shop",
            "test" => $testMode,
            "trial_days" => $trialTime
        )
    );
    if ($chargeType == "one-time") {
        $recu = $shopify("POST",  APIVERSION . "application_charges.json", $charge);
        if (is_array($recu) && isset($recu["confirmation_url"])) {
            $confirmation_url = $recu["confirmation_url"];
        } else {
            $confirmation_url = "";
        }
    } else {
        $recu = $shopify("POST",  APIVERSION . "recurring_application_charges.json", $charge);
        if (is_array($recu) && isset($recu["confirmation_url"])) {
            $confirmation_url = $recu["confirmation_url"];
        } else {
            $confirmation_url = "";
        }
    }
    $dbw->query("update tbl_usersettings set confirmation_url = '$confirmation_url' where store_name = '$shop' and app_id = $appId");

    //Gui email cho customer khi cai dat
    require 'email/install_email.php';
    //add js to shop
    $check = true;
    $putjs1 = $shopify('GET',  APIVERSION . 'script_tags.json');
    if ($putjs1) {
        foreach ($putjs1 as $value) {
            if ($value["src"] == $rootLink . 'cookies-notification.js') {
                $check = false;
                break;
            }
        }
    }
    if ($check) {
        $putjs = $shopify('POST',  APIVERSION . 'script_tags.json', array('script_tag' => array('event' => 'onload', 'src' => $rootLink . '/cookies-notification.js?v=' . time())));
    }

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



    //hook when user remove app
    $webhook = $shopify(
        'POST',
        APIVERSION . 'webhooks.json',
        array(
            'webhook' =>
            array(
                'topic' => 'app/uninstalled',
                'address' => $rootLink . '/uninstall.php',
                'format' => 'json'
            )
        )
    );

    if ($chargeType == "free") {
        $dbw->query("update tbl_usersettings set status = 'active' where store_name = '$shop' and app_id = $appId");
        header('Location: https://' . $shop . '/admin/apps/eu-cookies-notification');
    } else {
        header('Location: ' . $confirmation_url);
    }
}

function checkInstalled($shop, $appId)
{
    $query = db_fetch_row("select * from shop_installed where shop = '$shop' and app_id = $appId");
    if (!empty($query) > 0) {
        $date_instaled = $query["date_installed"];
        $result = array(
            "installed_date" => $date_instaled,
            "installed" => true
        );
        return $result;
    } else {
        $result = array(
            "installed" => false
        );
        return $result;
    }
}

function checkShopSettings($shop)
{
    $query = db_fetch_row("SELECT * FROM cookies_notification_settings WHERE shop = '$shop'");
    if (!empty($query)) {
        return true;
    } else {
        return false;
    }
}
