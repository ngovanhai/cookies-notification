<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type,Accept,Authorization, X-Requested-With');
ini_set('display_errors', TRUE);
error_reporting(E_ALL);
require 'vendor/autoload.php';

use sandeepshetty\shopify_api;

require 'help.php';
if (isset($_GET["action"])) {
    $action = $_GET["action"];
    $shop = $_GET["shop"];
    $shopify = shopifyInit($dbr, $shop, $appId);
    if ($action == "getListCookies") {
        $limit = 20;
        $offset = isset($_GET["offset"]) ? $limit * $_GET["offset"]  : 0;
        $tabFilter = isset($_GET["tabFilter"]) ? $_GET["tabFilter"] : 0;
        $queryValue = isset($_GET["queryValue"]) ? $_GET["queryValue"] : "";
        $categoryFilter = isset($_GET["categoryFilter"]) ? $_GET["categoryFilter"] : "";
        $query_search = "(lower(cookie_name) like '%$queryValue%' OR lower(cookie_description) like '%$queryValue%') ORDER BY id DESC";
        $query_limit = "LIMIT $limit offset $offset";
        $query_table = "SELECT * FROM cookies_notification_list_cookies WHERE shop='$shop'";
        $cookies = array();
        $count = 0;
        if ($tabFilter == 0) { 
            $cookies = array();
            $count = 0;
            if (is_array($categoryFilter)) {
                foreach ($categoryFilter as $id_category) {
                    $cookies = array_merge($cookies, db_fetch_array("$query_table AND category_id = $id_category AND $query_search $query_limit"));
                    $count = array_merge($cookies, db_fetch_array("$query_table AND category_id = $id_category AND $query_search"));
                }
            } else {
                $cookies = db_fetch_array("$query_table AND $query_search $query_limit");
                $count = db_fetch_array("$query_table AND $query_search");
            }
        }
        if ($tabFilter == 1) {
            $cookies = array();
            $count = 0;
            $cookies = db_fetch_array("$query_table AND category_id IS NULL AND $query_search $query_limit");
            $count = db_fetch_array("$query_table AND category_id IS NULL AND $query_search");
        }
        if ($tabFilter == 2) {
            $cookies = array();
            $count = 0;
            if (is_array($categoryFilter)) {
                foreach ($categoryFilter as $id_category) {
                    $cookies = array_merge($cookies, db_fetch_array("$query_table  AND category_id = $id_category  AND cookie_status = 1 AND $query_search $query_limit"));
                    $count = array_merge($cookies, db_fetch_array("$query_table  AND category_id = $id_category  AND cookie_status = 1 AND $query_search"));
                }
            } else {
                $cookies = db_fetch_array("$query_table AND cookie_status = 1 AND $query_search $query_limit");
                $count = db_fetch_array("$query_table AND cookie_status = 1 AND $query_search");
            }
        }
        if ($tabFilter == 3) {
            $cookies = array();
            $count = 0;
            if (is_array($categoryFilter)) {
                foreach ($categoryFilter as $id_category) {
                    $cookies = array_merge($cookies, db_fetch_array("$query_table  AND category_id = $id_category  AND cookie_status = 0 AND $query_search $query_limit"));
                    $count = array_merge($cookies, db_fetch_array("$query_table  AND category_id = $id_category  AND cookie_status = 0 AND $query_search"));
                }
            } else {
                $cookies = db_fetch_array("$query_table AND cookie_status = 0 AND $query_search $query_limit");
                $count = db_fetch_array("$query_table AND cookie_status = 0 AND $query_search");
            }
        }
        if ($tabFilter == 4) {
            $cookies = array();
            $count = 0;
            if (is_array($categoryFilter)) {
                foreach ($categoryFilter as $id_category) {
                    $cookies = array_merge($cookies, db_fetch_array("$query_table  AND category_id = $id_category AND is_scanned = 1 AND $query_search $query_limit"));
                    $count = array_merge($cookies, db_fetch_array("$query_table  AND category_id = $id_category AND is_scanned = 1 AND $query_search"));
                }
            } else {

                $cookies = db_fetch_array("$query_table AND is_scanned = 1 AND $query_search $query_limit");
                $count = db_fetch_array("$query_table AND is_scanned = 1 AND $query_search");
            }
        }
        $response = [
            "listCookies" => $cookies,
            "count" => count($count)
        ];
        echo json_encode($response);
    }

    if ($action == "getOptionsCategories") {
        $options_categories = db_fetch_array("SELECT * FROM cookies_notification_category WHERE shop='$shop'");
        $result = array();
        foreach ($options_categories as $options_category) {
            $array = [(object)[
                "label" => $options_category["category_name"],
                "value" => $options_category["id"],
            ]];
            $result = array_merge($result, $array);
        }
        echo json_encode($result);
    }
    if ($action == "installCodeToTheme") {
        $theme = $shopify("GET", APIVERSION . "themes.json", array("role" => "main"))[0];
        $themeName = $theme['name'];
        $themeID = $theme['id'];
        $checkFile  = $shopify("GET", APIVERSION . "themes/" . $themeID . "/assets.json?asset[key]=snippets/ot-cookies.liquid");
        if (!isset($checkFile['public_url'])) {
            $data = array(
                "asset" => array(
                    "key" => "snippets/ot-cookies.liquid",
                    "src" => "$rootLink/client/ot-cookies.liquid"
                )
            );
            $snippet = $shopify("PUT", APIVERSION . "themes/" . $theme["id"] . "/assets.json", $data);
        }
        $themeFile = $shopify("GET", APIVERSION . "themes/$themeID/assets.json?asset[key]=layout/theme.liquid&v=" . time());
        addScriptToTheme($shopify, $themeFile);
    }
    if ($action == "getSettings") {
        $settings = db_fetch_array("SELECT * FROM cookies_notification_settings WHERE shop='$shop'");
        $settings[0]["fullwidth_position"] = convertLayoutFullWith($settings[0]["fullwidth_position"]);
        $settings[0]["popup_layout"] = convertLayoutPosition($settings[0]["popup_layout"]);
        $settings[0]["corner_position"] = convertLayoutCorner($settings[0]["corner_position"]);
        $settings[0]["app_enable"] = convertStatusNumberToBoolean($settings[0]["app_enable"]);
        $settings[0]["show_homepage"] = convertStatusNumberToBoolean($settings[0]["show_homepage"]);
        $settings[0]["show_dismiss"] = convertStatusNumberToBoolean($settings[0]["show_dismiss"]);
        $settings[0]["show_prefrences"] = convertStatusNumberToBoolean($settings[0]["show_prefrences"]);
        $settings[0]["show_all"] = convertStatusNumberToBoolean($settings[0]["show_all"]);
        $settings[0]["show_all_eu"] = convertStatusNumberToBoolean($settings[0]["show_all_eu"]);
        $settings[0]["show_all_eu"] = convertStatusNumberToBoolean($settings[0]["show_all_eu"]);
        $settings[0]["show_icon"] = convertStatusNumberToBoolean($settings[0]["show_icon"]);
        $all_eu_countries = file_get_contents(APP_PATH . "/all_eu_countries.json");
        $settings[0]["country"] = json_decode($all_eu_countries);
        if ($settings[0]["eu_countries"] == "") {
            $settings[0]["eu_countries"] = array();
        } else {
            $settings[0]["eu_countries"] = json_decode($settings[0]["eu_countries"]);
        };
        echo json_encode($settings[0]);
    }

    if ($action == "getOptionsCategoriesInUsers") {
        $options_categories = db_fetch_array("SELECT * FROM cookies_notification_category WHERE shop='$shop'");
        $result = array();
        foreach ($options_categories as $options_category) {
            $array = [(object)[
                "label" => $options_category["category_name"],
                "value" => $options_category["category_name"],
            ]];
            $result = array_merge($result, $array);
        }
        echo json_encode($result);
    }
    if ($action == "getListUsers") {
        $textSearch  = isset($_GET['textSearch']) ? $_GET['textSearch'] : "";
        $limit = 20;
        $page = isset($_GET['offset']) ? $_GET['offset'] : 0;
        $page = $page  * $limit;
        $checkedGiventConsent = isset($_GET['checkedGiventConsent']) ? $_GET['checkedGiventConsent'] : "";
        $sort = (isset($_GET['sort']) && is_array($_GET['sort'])) ? $_GET['sort'][0] : "";
        $select = "SELECT * FROM `cookies_notification_users_accept`";
        $shop =  $_GET['shop'];
        $where = " WHERE shop='$shop'";
        if ($checkedGiventConsent !== "") {
            foreach ($checkedGiventConsent as $giventConsent) {
                $where .= " AND givent_consent LIKE '%$giventConsent%'";
            }
        }
        if ($textSearch !== "") {
            $where .= " AND email LIKE '%$textSearch%'";
        }
        if ($sort !== "") {
            if ($sort == "sortMailAZ") {
                $where .= " ORDER BY email ASC";
            }
            if ($sort == "sortMailZA") {
                $where .= " ORDER BY email DESC ";
            }
            if ($sort == "sortDateAZ") {
                $where .= " ORDER BY date_created ASC ";
            }
            if ($sort == "sortDateZA") {
                $where .= " ORDER BY date_created DESC ";
            }
        }
        $count = db_fetch_array($select . $where);
        $where .= " LIMIT $limit OFFSET $page";
        $sql = $select . $where;
        $res = db_fetch_array($sql);
        echo json_encode([
            "total" => count($count),
            "data" => $res
        ]);
    }
    if ($action == "getAllUsersExport") {
        $shop =  $_GET['shop'];
        $allUsers = db_fetch_array("SELECT * FROM cookies_notification_users_accept WHERE shop = '$shop'");
        echo json_encode($allUsers);
    }
    if ($action == "getCookiesSan") {
        $shop =  $_GET['shop'];
        $cookiesScan = db_fetch_array("SELECT * FROM cookies_notification_list_cookies WHERE shop = '$shop' AND is_scanned = '1'");
        echo json_encode($cookiesScan);
    }

    if ($action == "getListCategories") {
        $limit = 20;
        $offset = isset($_GET["offset"]) ? $limit * $_GET["offset"]  : 0;
        $tabFilter = isset($_GET["tabFilter"]) ? $_GET["tabFilter"] : 0;
        $queryValue = isset($_GET["queryValue"]) ? $_GET["queryValue"] : "";
        $query_search = "(lower(category_name) like '%$queryValue%' OR lower(category_description) like '%$queryValue%') ORDER BY id DESC";
        $query_limit =  "LIMIT $limit offset $offset";
        $query_table = "SELECT * FROM cookies_notification_category WHERE shop='$shop'";
        $categories = array();
        $count = 0;
        if ($tabFilter == 0) {
            $categories = array();
            $count = 0;
            $categories = db_fetch_array("$query_table AND $query_search $query_limit");
            $count = db_fetch_array("$query_table AND $query_search");
        }
        if ($tabFilter == 1) {
            $categories = array();
            $count = 0;
            $categories = db_fetch_array("$query_table AND category_status = 1 AND $query_search $query_limit");
            $count = db_fetch_array("$query_table  AND category_status = 1 AND $query_search");
        }
        if ($tabFilter == 2) {
            $categories = array();
            $count = 0;
            $categories = db_fetch_array("$query_table  AND category_status = 0 AND $query_search $query_limit");
            $count = db_fetch_array("$query_table  AND category_status = 0 AND $query_search");
        }
        if ($tabFilter == 3) {
            $categories = array();
            $count = 0;
            $categories = db_fetch_array("$query_table  AND is_necessary = 1 AND $query_search $query_limit");
            $count = db_fetch_array("$query_table  AND is_necessary = 1 AND $query_search");
        }
        $response = [
            "listCategories" => $categories,
            "count" => count($count),
        ];
        echo json_encode($response);
    }
}


$_POST = json_decode(file_get_contents("php://input"), true);
if (isset($_POST["action"])) {
    $action = $_POST["action"];
    $shop = $_POST["shop"];
    if ($action == "addCookie") {
        $id_category = (isset($_POST["idCategory"]) && is_array($_POST["idCategory"])) ? $_POST["idCategory"][0] : NULL;
        $name_category = isset($_POST["nameCategory"]) ? $_POST["nameCategory"] : NULL;
        $title = $_POST["title"];
        $description = $_POST["description"];
        $status = convertPublishToNumber($_POST["status"]);
        $data = [
            "shop" => $shop,
            "cookie_name" => $title,
            "cookie_description" => $description,
            "category_id" => $id_category,
            "cookie_status" => $status,
            "category_name" => $name_category
        ];
        db_insert("cookies_notification_list_cookies", $data);
    }
    if ($action == "addCategory") {
        $title = $_POST["title"];
        $description = $_POST["description"];
        $status = convertPublishToNumber($_POST["status"]);
        $data = [
            "shop" => $shop,
            "category_name" => $title,
            "category_description" => $description,
            "category_status" => $status,
        ];
        db_insert("cookies_notification_category", $data);
    }
    if ($action == "editCookie") {
        $id_category = (isset($_POST["idCategory"]) && is_array($_POST["idCategory"])) ? $_POST["idCategory"][0] : NULL;
        $name_category = isset($_POST["nameCategory"]) ? $_POST["nameCategory"] : NULL;
        if ($name_category == '') {
            $id_category = NULL;
        }
        $id_cookie = $_POST["idCookie"];
        $title = $_POST["title"];
        $description = $_POST["description"];
        $status = convertPublishToNumber($_POST["status"]);
        $data = [
            "cookie_name" => $title,
            "cookie_description" => $description,
            "category_id" => $id_category,
            "cookie_status" => $status,
            "category_name" => $name_category
        ];
        db_update("cookies_notification_list_cookies", $data, "shop='$shop' and id = $id_cookie");
    }
    if ($action == "editCategory") {
        $idCategoryEdit = $_POST["idCategoryEdit"];
        $title = $_POST["title"];
        $description = $_POST["description"];
        $status = convertPublishToNumber($_POST["status"]);
        $data = [
            "category_name" => $title,
            "category_description" => $description,
            "category_status" => $status,
        ];
        db_update("cookies_notification_category", $data, "shop='$shop' and id = $idCategoryEdit");
        db_update("cookies_notification_list_cookies", ["category_name" => $title], "shop='$shop' and category_id = $idCategoryEdit");
    }
    if ($action == "deleteCookie") {
        $id = isset($_POST["idCookie"]) ? $_POST["idCookie"] : null;
        if ($id !== null) {
            db_delete("cookies_notification_list_cookies", "shop='$shop' and id = $id");
        }
    }
    if ($action == "deleteCategory") {
        $id = isset($_POST["idCategory"]) ? $_POST["idCategory"] : null;
        if ($id !== null) {
            db_delete("cookies_notification_category", "shop='$shop' and id = $id");
            db_update("cookies_notification_list_cookies", ["category_name" => "", "category_id" => NULL], "shop='$shop' and category_id = $id");
        }
    }
    if ($action == "deleteOneUser") {
        $id = isset($_POST["idUser"]) ? $_POST["idUser"] : null;
        if ($id !== null) {
            db_delete("cookies_notification_users_accept", "shop='$shop' and id = $id");
        }
    }
    if ($action == "deleteAllUsers") {
        db_delete("cookies_notification_users_accept", "shop='$shop'");
    }
    if ($action == "saveSettingsPopUp") {
        $dataSave = $_POST["dataSave"];
        $data = [
            "popup_textcolor" => $dataSave["popup_textcolor"],
            "popup_bgcolor" => $dataSave["popup_bgcolor"],
            "submit_textcolor" => $dataSave["submit_textcolor"],
            "submit_bgcolor" => $dataSave["submit_bgcolor"],
            "dismiss_textcolor" => $dataSave["dismiss_textcolor"],
            "dismiss_bgcolor" => $dataSave["dismiss_bgcolor"],
            "prefrences_textcolor" => $dataSave["prefrences_textcolor"],
            "prefrences_bgcolor" => $dataSave["prefrences_bgcolor"],
            "more_textcolor" => $dataSave["more_textcolor"],
            "info_text" => $dataSave["info_text"],
            "privacy_link" => $dataSave["privacy_link"],
            "submit_text" => $dataSave["submit_text"],
            "dismiss_text" => $dataSave["dismiss_text"],
            "prefrences_text" => $dataSave["prefrences_text"],
            "text_size" => $dataSave["text_size"],
            "message" => $dataSave["message"],
            "popup_layout" => convertLayoutPositionToNumber($dataSave["popup_layout"]),
            "fullwidth_position" => convertLayoutFullWithToNumber($dataSave["fullwidth_position"]),
            "corner_position" => convertLayoutCornerToNumber($dataSave["corner_position"]),
        ];
        db_update("cookies_notification_settings", $data, "shop='$shop'");
    }
    if ($action == "saveSettingsPreferences") {
        $dataSave = $_POST["dataSave"];
        $data = [
            "title_color_popup" => $dataSave["title_color_popup"],
            "bgcolor_popup" => $dataSave["bgcolor_popup"],
            "accept_selected_text_color" => $dataSave["accept_selected_text_color"],
            "accept_selected_bgcolor" => $dataSave["accept_selected_bgcolor"],
            "accept_all_text_color" => $dataSave["accept_all_text_color"],
            "accept_all_bgcolor" => $dataSave["accept_all_bgcolor"],
            "accept_selected_text" => $dataSave["accept_selected_text"],
            "accept_all_text" => $dataSave["accept_all_text"],
            "title_popup" => $dataSave["title_popup"],
            "mess_popup" => $dataSave["mess_popup"],
        ];
        db_update("cookies_notification_settings", $data, "shop='$shop'");
    }
    if ($action == "saveSettingsAdvanced") {
        $dataSave = $_POST["dataSave"];
        $data = [
            "app_enable" =>  convertStatusBooleanToNumber($dataSave["app_enable"]),
            "show_homepage" => convertStatusBooleanToNumber($dataSave["show_homepage"]),
            "show_dismiss" => convertStatusBooleanToNumber($dataSave["show_dismiss"]),
            "show_prefrences" => convertStatusBooleanToNumber($dataSave["show_prefrences"]),
            "show_all" => convertStatusBooleanToNumber($dataSave["show_all"]),
            "show_all_eu" => convertStatusBooleanToNumber($dataSave["show_all_eu"]),
            "show_icon" => convertStatusBooleanToNumber($dataSave["show_icon"]),
            "eu_countries" => $dataSave["eu_countries"],
            "cache_time" => $dataSave["cache_time"],
            "custom_css" => $dataSave["custom_css"],
        ];
        db_update("cookies_notification_settings", $data, "shop='$shop'");
    }
}


function convertPublishToNumber($data)
{
    if ($data == "publishStatus") {
        return 1;
    } else {
        return 0;
    }
}
function convertStatusNumberToBoolean($data)
{
    if ($data == "0") {
        return false;
    } else {
        return true;
    }
}
function convertStatusBooleanToNumber($data)
{
    if ($data == "true") {
        return 1;
    } else {
        return 0;
    }
}


function convertLayoutPosition($data)
{
    if ($data == "1") {
        return "full";
    } else {
        return "corner";
    }
}

function convertLayoutFullWith($data)
{
    if ($data == "1") {
        return "top";
    } else {
        return "bottom";
    }
}

function convertLayoutCorner($data)
{
    switch ($data) {
        case "1": {
                return "topLeft";
                break;
            }
        case "2": {
                return "bottomLeft";
                break;
            }
        case "3": {
                return "topRight";
                break;
            }
        case "4": {
                return "bottomRight";
                break;
            }
    }
}


function convertLayoutPositionToNumber($data)
{
    if ($data == "full") {
        return 1;
    } else {
        return 2;
    }
}

function convertLayoutFullWithToNumber($data)
{
    if ($data == "top") {
        return 1;
    } else {
        return 2;
    }
}

function convertLayoutCornerToNumber($data)
{
    switch ($data) {
        case "topLeft": {
                return 1;
                break;
            }
        case "bottomLeft": {
                return 2;
                break;
            }
        case "topRight": {
                return 3;
                break;
            }
        case "bottomRight": {
                return 4;
                break;
            }
    }
}
