<?php
header('Content-Type: application/json');
$website = 'New Wave Devs';
$email = 'requests@newwavedevs.com';

$_POST = filter_var_array($_POST, array(
    "name" => FILTER_SANITIZE_ENCODED,
    "email" => FILTER_SANITIZE_ENCODED,
    "details" => FILTER_SANITIZE_ENCODED,
    "calcrate" => FILTER_SANITIZE_ENCODED
));

if ($_POST['name'] and $_POST['email']) {


    if ($_POST['name'] != "") {
        $formName = "\nName: " . urldecode($_POST['name']);
    }
    if ($_POST['email'] != "") {
        $formEmail = "\nE-mail: " . urldecode($_POST['email']);
    }
    if ($_POST['calcrate'] != "") {
        $rate = "\nRate: " . urldecode($_POST['calcrate']);
    }

    if ($_POST['details'] != "") {
        $formDetails = "\nDetails: " . urldecode($_POST['details']);
    }
    if(mail($email, "New request: " . $website, " " . htmlentities($formName) . " " . htmlentities($formEmail) . " " . htmlentities($formDetails) . "  " . htmlentities($rate) . "
            ", "from: no-reply@newwavedevs.com")){
                $response = array(
                    'resultCode'=>1
                );
            }else{
                $response = array(
                    'resultCode'=>2
                );
            }
}else{
    $response = array(
        'resultCode'=>0
    );
}

echo json_encode($response);
