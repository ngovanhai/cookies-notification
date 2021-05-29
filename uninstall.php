<?php

require 'help.php';
session_start();

unset($_SESSION['shop']);
$webhookContent = "";

$webhook = fopen('php://input', 'rb');
while (!feof($webhook)) {
    $webhookContent .= fread($webhook, 4096);
}

fclose($webhook);
$webhookContent = json_decode($webhookContent);
if (isset($webhookContent->myshopify_domain)) {
    $shop = $webhookContent->myshopify_domain;
    $dbw->query("DELETE FROM tbl_usersettings WHERE store_name = '$shop' AND app_id = $appId");
    // deleteDataCache(CACHE_PATH . $shop);
    // $dbw->query("DELETE FROM cookies_notification_settings WHERE shop = '$shop'");
    // Gui email cho customer khi uninstalled
    require 'email/uninstall_email.php';
} else if (isset($webhookContent->domain)) {
    $shop = $webhookContent->domain;
    $dbw->query("DELETE FROM tbl_usersettings WHERE store_name = '$shop' AND app_id = $appId");
    // deleteDataCache(CACHE_PATH . $shop);
    // $dbw->query("DELETE FROM cookies_notification_settings WHERE shop = '$shop'");
    // Gui email cho customer khi uninstalled
    require 'email/uninstall_email.php';
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
