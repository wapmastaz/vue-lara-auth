<?php

use Illuminate\Support\Facades\Session;

if (!function_exists('do_money')) {
    /**
     * do_money
     *
     * @return string
     */
    function do_money($amount)
    {
        return '$' . number_format($amount, 2);
    }
}

function getTrx($length = 12)
{
    $characters = 'ABCDEFGHJKMNOPQRSTUVWXYZ123456789';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

function send_php_mail($receiver_email, $receiver_name, $sender_email, $subject, $message)
{
    $headers = "From: <$sender_email> \r\n";
    $headers .= "Reply-To: $receiver_name <$receiver_email> \r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=utf-8\r\n";
    @mail($receiver_email, $subject, $message, $headers);
}

function getRates($currency, $digital, $usd)
{
    $getrate = "https://api.alternative.me/v2/ticker/?convert=" . $currency;

    if (file_get_contents($getrate)) {

        $price = file_get_contents($getrate);

    } else {

        // exit("No internet connection");

        return false;

    }

    $result = json_decode($price, true);

    // BTC in USD
    $result = $result['data'][$digital]['quotes'][$currency]['price'];

    return round($usd / $result, 6);
}

function get_image($image, $clean = '')
{
    return file_exists($image) && is_file($image) ? asset($image) . $clean : asset('assets/images/default.png');
}

function shortDescription($string, $length = 120)
{
    return Illuminate\Support\Str::limit($string, $length);
}