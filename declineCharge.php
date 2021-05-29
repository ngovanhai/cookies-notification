<?php
require 'help.php';

require 'vendor/autoload.php';

use sandeepshetty\shopify_api;

if (isset($_GET["shop"])) {
    $shop = $_GET["shop"];
    $shopify = shopifyInit($dbr, $shop, $appId);

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
        $recu = $shopify("POST", APIVERSION . "application_charges.json", $charge);
        $confirmation_url = $recu["confirmation_url"];
    } else {
        $recu = $shopify("POST", APIVERSION . "recurring_application_charges.json", $charge);
        $confirmation_url = $recu["confirmation_url"];
    }

?>

    <head>
        <script type="text/javascript" src="//code.jquery.com/jquery-2.1.4.min.js"></script>
        <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
        <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
        <title>Decline charge page</title>
    </head>
    <div class="container" style="padding:30px 0;margin-top: 50px;border: 5px solid #EC342E;max-width:600px;text-align:center;">
        <img src="https://cdn.shopify.com/s/files/applications/1fea2c06cad29a7a2ff47ed9c5b1b5cc.png" style="max-width: 150px;">
        <p>You declined the charge in Shopify. Please try again and approve the charge to use this app. You get 14 days free trial,you will not be charged during the free trial</p>
        <a class="btn btn-primary" href="<?php echo $confirmation_url; ?>">Go back to charge try again</a>
        <br />
        <br />
        <p>If you don't want to use this app, please go to store's admin > Apps and uninstall this in "Installed apps" table</p>
    </div>
    <?php include 'facebook-chat.html'; ?>
<?php
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
