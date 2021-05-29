<?php
require 'help.php';
require 'vendor/autoload.php';

use sandeepshetty\shopify_api;

session_start();

if (isset($_GET['charge_id'])) {
    $charge_id = $_GET['charge_id'];
    $shop = $_GET['shop'];
    $shopify = shopifyInit($dbr, $shop, $appId);
    $theCharge = $shopify("GET", APIVERSION . "recurring_application_charges/$charge_id.json");

    if ($theCharge['status'] == 'accepted' || $theCharge['status'] == 'active') {
        activeClient($appId, $shop, $dbw, $shopify, $charge_id, $apiKey);
    } else {
        deactiveClient($rootLink, $shop);
    }
}

function shopifyInit($dbr, $shop, $appId)
{
    $select_settings = $dbr->query("SELECT * FROM tbl_appsettings WHERE id = $appId");
    $app_settings = $select_settings->fetch_object();
    $shop_data = $dbr->query("select * from tbl_usersettings where store_name = '" . $shop . "' and app_id = $appId");
    $shop_data = $shop_data->fetch_object();
    $shopify = shopify_api\client(
        $shop,
        $shop_data->access_token,
        $app_settings->api_key,
        $app_settings->shared_secret
    );
    return $shopify;
}

function activeClient($appId, $shop, $dbw, $shopify, $charge_id, $apiKey)
{
    $recu = $shopify("POST",  APIVERSION . "recurring_application_charges/$charge_id/activate.json");
    $dbw->query("update tbl_usersettings set status = 'active' where app_id = $appId and store_name = '$shop'");
    //header('Location: '.$rootLink.'/admin.php');
    header('Location: https://' . $shop . '/admin/apps/eu-cookies-notification');
    //header('Location: https://'.$shop.'/admin/apps/our-team-by-omega');
}

function deactiveClient($rootLink, $shop)
{
    //$dbw->query("update tbl_usersettings set status = 'disable' where app_id = $appId and store_name = '$shop'");
    //header('Location: '.$rootLink.'/chargeRequire.php?shop='.$shop);
    header('Location: ' . $rootLink . '/declineCharge.php?shop=' . $shop);
}
