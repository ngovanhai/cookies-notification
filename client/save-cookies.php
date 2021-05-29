<?php
ini_set('display_errors', TRUE);
error_reporting(E_ALL);
header('Access-Control-Allow-Origin: *');
date_default_timezone_set('UTC');
header('Content-Type: application/json');

require '../help.php';

if (isset($_POST["action"])) {
    $action = $_POST["action"];
    if ($action == "SaveCookies") {
        if (!isset($_POST['shop'])) return false;
        $shop = $_POST['shop'];
        $cookiesShop = isset($_POST['cookies']) ? $_POST['cookies'] : "";
        $cookiesShop = explode(";", $cookiesShop);
        foreach ($cookiesShop as $cookie) {
            $cookie = explode("=", $cookie);
            $cookie_name = isset($cookie[0]) ? $cookie[0] : "";
            $checkExist = get_coooki_by_name($cookie_name, $shop, $cookies_notification_list_cookies);
            if ($cookie_name != "" && $checkExist == false) {
                db_insert($cookies_notification_list_cookies, [
                    "shop" =>  $shop,
                    "cookie_name" => $cookie_name,
                    "is_scanned" => 1
                ]);
            }
        }
        echo json_encode(true);
    }
}
function get_coooki_by_name($cookie_name, $shop, $cookies_notification_list_cookies)
{
    $result = db_fetch_row("
        SELECT * 
        FROM $cookies_notification_list_cookies
        WHERE cookie_name = '$cookie_name' AND shop = '$shop'
    ");
    if ($result == NULL) return false;
    return count($result) > 0;
}
