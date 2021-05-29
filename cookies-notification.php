<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
ini_set('display_errors', TRUE);
error_reporting(E_ALL);
require 'vendor/autoload.php';

use sandeepshetty\shopify_api;

require 'conn-shopify.php';
require 'help.php';

if (isset($_GET["action"])) {
    $action = $_GET["action"];
    $shop = $_GET["shop"];
    $version = 7; // 3
    //huy add
    if ($action == "getShopSettings") {
        $settings = db_fetch_row("select * from cookies_notification_settings where shop = '$shop'");
        $cookies = db_fetch_array("select * from cookies_notification_list_cookies where shop = '$shop'");
        $categories = db_fetch_array("select * from cookies_notification_category where shop = '$shop'");
        $response = [
            "settings" => $settings,
            "cookies" => $cookies,
            "category" => $categories
        ];
        echo json_encode($response);
    }
    //huy add
    if ($action == "checkInstallApp") {
        $expired = checkExpired($shop, $appId, $trialTime, $price);
        $shop_data = db_fetch_row("select * from tbl_usersettings where store_name = '$shop' and app_id = $appId");
        if (isset($shop_data['installed_date'])) {
            $installed = true;
        } else {
            $installed = false;
        }
        $response = array(
            "install"  => $installed,
            "expired"   => $expired,
            "ver" => $version,
        );
        echo json_encode($response);
    }

    if ($action == "getShopLocation") {
        $all_eu_countries = file_get_contents(APP_PATH . "/all_eu_countries.json");
        $all_eu_countries = json_decode($all_eu_countries, true);
        $show_all_eu = isset($_GET["all_eu"]) ? $_GET["all_eu"] : 0;
        $eu_countries = isset($_GET["eu_countries"]) ? $_GET["eu_countries"] : array();
        if ($show_all_eu == 1) {
            $location = getShopLocation($all_eu_countries);
        } else {
            $location = getShopLocation($eu_countries);
        }
        echo json_encode($location);
    }
    if ($action == "checkCloseDismis") {
        $show = db_fetch_row("select * from cookies_notification_settings where shop = '$shop'");
        echo $show['close_dismis'];
    }
    if ($action == "updateCloseDismis") {
        $dismis = $_GET['dismis'];
        db_update("cookies_notification_settings", [
            "close_dismis" => $dismis
        ], "shop = '$shop'");
    }
    if ($action == "postCookiesSelected") {
        $ip = getIp();
        $category = $_GET['category'];
        if (isset($_GET['customerIdCookie'])) {
            $id = $_GET['customerIdCookie'];
            $shopify = shopifyInit($dbr, $shop, $appId);
            $res = $shopify("GET ",  APIVERSION . "customers/" . $id . ".json");
            $email = isset($res['email']) ? $res['email'] : "Not email";
            $data = array(
                'shop' => $shop,
                'email' => $email,
                'customer_id' => $id,
                'givent_consent' => $category,
                'ip' => $ip,
            );
            db_insert("cookies_notification_users_accept", $data);
            // echo json_encode([
            //     "ip" => $ip,
            //     "email" => $email,
            //     "category" =>  $category,
            // ]);
        } else {
            $data = array(
                'shop' => $shop,
                'ip' => $ip,
                "givent_consent" =>  $category,
            );
            db_insert("cookies_notification_users_accept", $data);
            // echo json_encode([
            //     "ip" => $ip,
            // ]);
        }
    }
}
if (isset($_POST['action'])) {
    $action     = $_POST['action'];
    $shop       = $_POST["shop"];
    $data = $_POST['data'];
    if ($action == "test") {
        echo $data['name'];
    }
}
function get_if()
{
    $ip = $_SERVER['REMOTE_ADDR'];
    $userInfo = IpToInfo($ip);
    $userInfo['ip'] = $ip;
    return $userInfo["country_code"];
}

function getShopLocation($lists)
{
    $code = get_if();
    $result = 0;
    if (!empty($lists) && is_array($lists)) {
        foreach ($lists as $value) {
            if (strpos($code, $value['value']) > -1) {
                $result = 1;
                break;
            }
        }
    }
    return $result;
}
function checkExpired($shop, $appId, $trialTime, $price)
{
    if ($price == "free" || $price == 0) return false;
    $shop_data = db_fetch_row("select * from tbl_usersettings where store_name = '$shop' and app_id = $appId");
    if (isset($shop_data['installed_date'])) {
        $installedDate = $shop_data['installed_date'];
        $clientStatus = $shop_data['status'];

        $date1 = new DateTime($installedDate);
        $date2 = new DateTime("now");
        $interval = date_diff($date1, $date2);
        $diff = (int)$interval->format('%R%a');
        if ($diff > $trialTime && $clientStatus != 'active') {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}
function getIp()
{
    $ip = "";
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}
