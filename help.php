<?php
require 'vendor/autoload.php';

use sandeepshetty\shopify_api;

require 'conn-shopify.php';

function show_array($data)
{
    if (is_array($data)) {
        echo "<pre>";
        print_r($data);
        echo "</pre>";
    }
}
function db_query_r($query_string)
{
    global $dbr;
    $result = mysqli_query($dbr, $query_string);
    if (!$result) {
        echo ('Query Error' . $query_string);
    }
    return $result;
}
function db_query_w($query_string)
{
    global $dbw;
    $result = mysqli_query($dbw, $query_string);
    if (!$result) {
        echo ('Query Error' . $query_string);
    }
    return $result;
}
function redirect($data)
{
    header("Location: $data");
}

function getCurl($url)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1');
    $response = curl_exec($ch);
    if ($response === false) {
        $api_response = curl_error($ch);
    } else {
        $api_response = $response;
    }
    curl_close($ch);
    return $api_response;
}

function valaditon_get($data)
{
    if ($data) {
        return $data;
    } else {
        $data = "";
        return $data;
    }
}

function result_fetch_object($data)
{
    $result = $data->fetch_object();
    return $result;
}

function fetchDbObject($sql)
{
    global $dbr;
    global $shop;
    $query = $dbr->query($sql);
    $object = array();
    if ($query && mysqli_num_rows($query) > 0) {
        while ($row = $query->fetch_assoc()) {
            $object = $row;
        }
    }
    return $object;
}

function db_insert($table, $data)
{
    global $dbw;
    $fields = "(" . implode(", ", array_keys($data)) . ")";
    $values = "";

    foreach ($data as $field => $value) {
        if ($value === NULL) {
            $values .= "NULL, ";
            // } elseif (is_numeric($value)) {
            //     $values .= $value . ", ";
        } elseif ($value == 'true' || $value == 'false') {
            $values .= $value . ", ";
        } else {
            $values .= "'" . addslashes($value) . "', ";
        }
    }
    $values = substr($values, 0, -2);
    db_query_w("
            INSERT INTO $table $fields
            VALUES($values)
        ");
    return mysqli_insert_id($dbw);
}

function db_update($table, $data, $where)
{
    global $dbw;
    $sql = "";
    foreach ($data as $field => $value) {
        if ($value === NULL) {
            $sql .= "$field=NULL, ";
        } elseif (is_numeric($value)) {
            $sql .= "$field=" . addslashes($value) . ", ";
        } elseif ($value == 'true' || $value == 'false') {
            $sql .= "$field=" . addslashes($value) . ", ";
        } else
            $sql .= "$field='" . addslashes($value) . "', ";
    }
    $sql = substr($sql, 0, -2);
    db_query_w("
        UPDATE `$table`
        SET $sql
        WHERE $where
    ");
    return mysqli_affected_rows($dbw);
}

function db_duplicate($table, $data, $content_duplicate)
{
    global $dbw;
    $fields = "(" . implode(", ", array_keys($data)) . ")";
    $values = "(";
    foreach ($data as $field => $value) {
        if ($value === NULL)
            $values .= "NULL, ";
        elseif ($value === TRUE || $value === FALSE)
            $values .= "$value, ";
        else
            $values .= "'" . addslashes($value) . "',";
    }
    $values = rtrim($values, ',');
    $values .= ")";
    $query = "INSERT INTO $table  $fields  VALUES $values ON DUPLICATE KEY UPDATE $content_duplicate";
    db_query_w($query);
    return  mysqli_insert_id($dbw);
}

function db_delete($table, $where)
{
    global $dbw;
    $query_string = "DELETE FROM " . $table . " WHERE $where";
    db_query_w($query_string);
    return mysqli_affected_rows($dbw);
}

function db_fetch_array($query_string)
{
    global $dbr;
    $result = array();
    $mysqli_result = db_query_r($query_string);
    if (!is_bool($mysqli_result)) {
        while ($row = mysqli_fetch_assoc($mysqli_result)) {
            $result[] = $row;
        }
        mysqli_free_result($mysqli_result);
    }
    return $result;
}

function db_fetch_row($query_string)
{
    global $dbr;
    $result = array();
    $mysqli_result = db_query_r($query_string);
    $result = mysqli_fetch_assoc($mysqli_result);
    mysqli_free_result($mysqli_result);
    return $result;
}

function checkExistArray($array1, $array2)
{
    if (is_array($array1) && is_array($array2)) {
        $check = array();
        foreach ($array1 as $v1) {
            array_push($check, $v1);
        }
        foreach ($array2 as $v2) {
            if (in_array($v2, $check)) {
                return $result = 1;
                break;
            } else {
                $result = 0;
            }
        }
    } else {
        return 0;
    }
    return $result;
}

// đo tốc độ thực thi
function getmicrotime()
{
    list($usec, $sec) = explode(" ", microtime());
    return ((float) $usec + (float) $sec);
}

function cvf_convert_object_to_array($data)
{
    if (is_object($data)) {
        $data = get_object_vars($data);
    }
    if (is_array($data)) {
        return array_map(__FUNCTION__, $data);
    } else {
        return $data;
    }
}

function creatSlug($string, $plusString)
{
    $search = array(
        '#(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)#',
        '#(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)#',
        '#(ì|í|ị|ỉ|ĩ)#',
        '#(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)#',
        '#(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)#',
        '#(ỳ|ý|ỵ|ỷ|ỹ)#',
        '#(đ)#',
        '#(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)#',
        '#(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)#',
        '#(Ì|Í|Ị|Ỉ|Ĩ)#',
        '#(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)#',
        '#(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)#',
        '#(Ỳ|Ý|Ỵ|Ỷ|Ỹ)#',
        '#(Đ)#',
        "/[^a-zA-Z0-9\-\_]/",
    );
    $replace = array(
        'a',
        'e',
        'i',
        'o',
        'u',
        'y',
        'd',
        'A',
        'E',
        'I',
        'O',
        'U',
        'Y',
        'D',
        '-',
    );
    $string = preg_replace($search, $replace, $string);
    $string = preg_replace('/(-)+/', '-', $string);
    $string = strtolower($string);
    return $string . $plusString;
}

// SHOPIFY
function deleteWebhook($shopify, $id)
{
    $result = $shopify("DELETE", "/admin/webhooks/" . $id . ".json");
    return $result;
}
function createWebhook($shopify, $link)
{
    $webhook = array(
        "webhook" => array(
            "topic" => "products/create",
            "address" => $link,
            "format" => "json"
        )
    );
    $result = $shopify("POST", APIVERSION . "webhooks.json", $webhook);
    return $result;
}
function editWebhook($shopify, $link, $id)
{
    $webhook = array(
        "webhook" => array(
            "id"    => $id,
            "topic" => "products/create",
            "address" => $link,
            "format" => "json"
        )
    );
    $result = $shopify("PUT", APIVERSION . "webhooks.json", $webhook);
    return $result;
}
function getListWebhook($shopify)
{
    $result = $shopify("GET", APIVERSION .  "webhooks.json");
    return $result;
}
function cleanString($text)
{
    $map = array(
        array("|", ""),
        array("-", ""),
        array(")", ""),
        array("(", ""),
        array(" ", ""),
        array("&", ""),
        array("'", ""),
        array('"', ""),
        array("/", ""),
        array("[", ""),
        array("]", ""),
        array("\\", ""),
    );
    if (is_array($map)) {
        foreach ($map as $pair)
            $text = str_replace($pair[0], $pair[1], $text);
    }
    return $text;
}
function getnextday($num, $date)
{
    return date("Y-m-d H:i:s", strtotime("+" . $num . " day", strtotime($date)));
}
function getbackday($num, $date)
{
    return date("Y-m-d H:i:s", strtotime("-" . $num . " day", strtotime($date)));
}

function returnBooleanData($data)
{
    if ($data == 'true') return 1;
    if ($data == 'on') return 1;
    else return 0;
}

function shopifyInit($dbr, $shop, $appId)
{
    $select_settings = $dbr->query("SELECT * FROM tbl_appsettings WHERE id = $appId");
    $app_settings = $select_settings->fetch_object();
    $shop_data = $dbr->query("select * from tbl_usersettings where store_name = '" . $shop . "' and app_id = $appId");
    $shop_data = $shop_data->fetch_object();
    if (!isset($shop_data->access_token)) {
        die("Please check the store: " . $shop . " seems to be incorrect access_token.");
    }
    $shopify = shopify_api\client(
        $shop,
        $shop_data->access_token,
        $app_settings->api_key,
        $app_settings->shared_secret
    );
    return $shopify;
}

// function deleteDataCache($dir)
// {
//     if (is_dir($dir)) {
//         $structure = glob(rtrim($dir, "/") . '/*');
//         if (is_array($structure)) {
//             foreach ($structure as $file) {
//                 if (is_dir($file)) recursiveRemove($file);
//                 else if (is_file($file)) @unlink($file);
//             }
//         }
//         rmdir($dir);
//     }
// }
function pr($data)
{
    if (is_array($data)) {
        echo "<pre>";
        print_r($data);
        echo "</pre>";
    } else {
        var_dump($data);
    }
}
// function createShopSettingsFile($shop)
// {
//     if (!is_dir(CACHE_PATH . $shop)) {
//         mkdir(CACHE_PATH . $shop, 0755, true);
//     }
//     $key_path = CACHE_PATH . $shop . "/data.json";
//     $settings = db_fetch_row("SELECT * FROM cookies_notification_settings WHERE shop = '$shop'");
//     $category = db_fetch_array("SELECT * FROM cookies_notification_category WHERE shop = '$shop'");
//     $cookies =  db_fetch_array("SELECT * FROM cookies_notification_list_cookies WHERE shop = '$shop'");
//     $data = [
//         "settings" => $settings,
//         "cookies" => $cookies,
//         "category" => $category,
//     ];
//     $result = file_put_contents($key_path, json_encode($data));
//     return $result;
// }


function saveScriptTagId($shop, $shopify, $table)
{
    $scriptTags = $shopify("GET", APIVERSION . "script_tags.json");
    $scriptTag = $scriptTags[0];
    $scriptTagId = $scriptTag["id"];
    $settings = fetchDbObject("SELECT * FROM $table WHERE shop = '$shop'");
    $settings["script_tagid"] = $scriptTagId;
    $query = db_update($table, $settings, "shop = '$shop'");
    return $scriptTagId;
}


function updateScriptTag($shop, $shopify, $table, $clientJsUrl)
{
    $date = new DateTime();
    $newVersion = $date->format('ymdHis');
    $settings = fetchDbObject("SELECT * FROM $table WHERE shop = '$shop'");
    $scriptTagId = $settings["script_tagid"];
    $updatedScriptTag = $shopify("PUT", APIVERSION . "script_tags/$scriptTagId.json", [
        "script_tag" => [
            "id" => $scriptTagId,
            "src" => $clientJsUrl . "?v=" . $newVersion
        ]
    ]);
    return $updatedScriptTag;
}


function getDataById($shopify, $id, $topic, $filter = null)
{
    $data = $shopify("GET", APIVERSION . "//$topic/$id.json?" . $filter);
    return $data;
}

function IpToInfo($userIp)
{
    $table_ipv4_to_location = "ip2location_db11";
    $table_ipv6_to_location = "ip2location_db11_ipv6";

    // Connect to database
    $dbr = ConnectToIpDb();

    $info = array();
    if (isIpV6($userIp)) {
        $ipno = Dot2LongIPv6($userIp);
        $query = $dbr->query("SELECT * FROM $table_ipv6_to_location WHERE ip_to >= $ipno ORDER BY ip_to LIMIT 1");
    } else {
        $query = $dbr->query("SELECT * from $table_ipv4_to_location WHERE inet_aton('$userIp') <= ip_to LIMIT 1");
    }
    if ($query) {
        while ($row = $query->fetch_assoc()) {
            $info = $row;
        }
    }
    return $info;
}

// DB bên dev
/*function ConnectToIpDb () {
	$db = new Mysqli("localhost", "ha", "MESFt1bTDDqTLw4D", "ip2location");
	if($db->connect_errno){
	  die('Connect Error: ' . $db->connect_errno);
	}	
    return $db;
}*/

// DB bên live
function ConnectToIpDb()
{
    $dbr = new Mysqli("p:localhost", "shopify", "h1yw5ovS78iYaGRX", "ip2location");
    if ($dbr->connect_errno) {
        die('Connect Error: ' . $dbr->connect_errno);
    }
    return $dbr;
}

function isIpV6($ip)
{
    if (strpos($ip, ':')) {
        return true;
    }
    return false;
}

// Function to convert IP address to IP number (IPv6)
function Dot2LongIPv6($IPaddr)
{
    $int = inet_pton($IPaddr);
    $bits = 15;
    $ipv6long = 0;
    while ($bits >= 0) {
        $bin = sprintf("%08b", (ord($int[$bits])));
        if ($ipv6long) {
            $ipv6long = $bin . $ipv6long;
        } else {
            $ipv6long = $bin;
        }
        $bits--;
    }
    $ipv6long = gmp_strval(gmp_init($ipv6long, 2), 10);
    return $ipv6long;
}

function addScriptToTheme($shopify, $file)
{
    $id = $file["theme_id"];
    $value = $file["value"];
    $newText = '{% include "ot-cookies" %}';
    $pos = strpos($value,  $newText);
    if ($pos === false) {
        $themeLiquid = explode("</head>", $value);
        $newTheme = $themeLiquid[0] . $newText . '</head>' . $themeLiquid[1];
        $a = base64_encode($newTheme);
        try {
            $res  = $shopify("PUT", APIVERSION . "themes/" . $id . "/assets.json", array('asset' => array('key' => "layout/theme.liquid", 'attachment' => $a)));
            echo "Success!";
        } catch (Exception $e) {
            echo $e;
        }
    } else {
        echo "File exists!";
    }
}

function addDefaultData($shop)
{
    $data_default_categories = [
        [
            "shop" => "$shop", "category_status" => "1",
            "category_name" => "Necessary",
            "category_description" => "This website is using cookies to analyze our traffic, personalize content and/or ads, to provide video content. We also share information about your use of our site with our analytics and advertising partners who may combine it with other information that you’ve provided to them or that they’ve collected from your use of their services.",
            "is_necessary" => "1"
        ],
        [
            "shop" => "$shop", "category_status" => "1",
            "category_name" => "Preferences",
            "category_description" => "Preference cookies enable a website to remember information that changes the way the website behaves or looks, like your preferred language or the region that you are in.",
        ],
        [
            "shop" => "$shop", "category_status" => "1",
            "category_name" => "Marketing",
            "category_description" => "Marketing cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third-party advertisers.",
        ],
        [
            "shop" => "$shop", "category_status" => "1",
            "category_name" => "Statistics",
            "category_description" => "Statistic cookies help website owners to understand how visitors interact with websites by collecting and reporting information anonymously.",
        ],

    ];

    foreach ($data_default_categories as $data_default_category) {
        $id_insert = db_insert("cookies_notification_category", $data_default_category);
        $is_create_data_default = $data_default_category["category_name"] == "Necessary" || $data_default_category["category_name"] == "Statistics";
        if ($is_create_data_default) {
            addDefaultCookiesByCategoryID($shop, $data_default_category["category_name"], $id_insert);
        }
    }
};

function addDefaultCookiesByCategoryID($shop, $typeCategory, $categoryID)
{
    $id_query = $typeCategory == "Statistics" ? 1 : 0;
    $cookiesDefault = db_fetch_array("SELECT * FROM cookies_notification_default_cookies WHERE cookie_category_id = $id_query");

    foreach ($cookiesDefault as $cookieDefault) {
        $cookie_name = $cookieDefault["cookie_name"];
        $cookie_description = $cookieDefault["cookie_description"];
        $dataInsert = [
            "shop" => "$shop",
            "cookie_name" => "$cookie_name",
            "cookie_description" => "$cookie_description",
            "cookie_description" => "$cookie_description",
            "is_scanned" => "1",
            "category_name" => $typeCategory,
            "category_id" => $categoryID,
            "cookie_status" => "1"
        ];
        db_insert("cookies_notification_list_cookies", $dataInsert);
    }
}
