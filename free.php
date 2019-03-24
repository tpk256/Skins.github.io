<?php
$loggedin = false;

require('steamauth/steamauth.php');

if(isset($_SESSION["steamid"])) {
    $loggedin = true;
    include_once('steamauth/userInfo.php');
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Loading...</title>
    <script src="/js/jquery-1.10.2.js"></script>
    <script src="/js/jquery-ui-1.10.4.custom.min.js"></script>
    <script src="https://cdn.socket.io/socket.io-1.3.7.js"></script>
    <script src="/js/main18.js"></script>
    <link rel="stylesheet" href="/css/styles1.css">
	<link rel="stylesheet" href="/css/styles_additional.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
	<script src="/js/scroller.js"></script>
  </head>
  <body>
  	<header>
		<nav>
			<ul id="dropdown-menu">
				<? @include_once('header.php'); ?>              
				<?
					if($loggedin){
						//echo '<li><img style="width:55px;height:55px;border-radius:10000px;" src="'.$steamprofile['avatarfull'].'"><div class="nickname"><b>'.$steamprofile['personaname'].'</b></div> </li><li><div class="li"><a href="steamauth/logout.php" style="text-decoration:none;color:inherit;">Logout</a></div></li>';
						echo '<input id="steamid" type="hidden" value="'.$_SESSION["steamid"].'">';
						echo '<a style="float: right; margin-right: 50px; height: 100%; margin-top: 25px; height: 15px; width: 15px;" class="user" href="steamauth/logout.php"><img src="/css/img/logout.png"/></a>
						<div class="user">
						<a href="https://steamcommunity.com/id/id/tradeoffers/privacy#trade_offer_access_url" target="_blank" class="user-image" style="padding-top:0px;padding-bottom:0px; line-height: 55px;"> <img class="rounded" style="border-radius: 50px;" src="'.$steamprofile['avatarfull'].'"><b class="user-name">'.$steamprofile['personaname'].'</b></a>
						</div>';
					} else {
						steamlogin();
							echo '<li id="log-in"><a href="?login" style="line-height: 25px;"><i class="fa fa-steam"></i>&emsp;Войти через Steam</a></li>';                   
					}
				?>
			</ul>
			<div class="handle">
				<p>☰</p>
			</div>
       </nav>
    </header>
    <div class="container">
	  <script>page = 4;</script>
      <div id="items" class="box pad">
      <span id="notify"></span>
        <div class="head">
          <div class="row row--no-gutter">
            <form>
            <?  
                $gotcsgo = true;
                $get_content = file_get_contents("http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=5103B71EFD151239467B72D9B8C9CAF5&steamid=".$_SESSION["steamid"]."&format=json");
                $parsedInv = json_decode($get_content);
                foreach($parsedInv->response->games as $k => $v){
                    if($v->appid == 730) $gotcsgo = true;
                }
                if($gotcsgo){
                    echo '<label for="trade-url">Если у вас есть промокод, то введите его что-бы получить бесплатные pts </label>
                <input type="text" placeholder="X1X2X3" id="code">
                <input type="submit" value="Enter" onclick="entercode(); return false;">';
                } else {
                    echo '<h1>У вас на аккаунте нет CSGO, либо ваш профиль закрыт.';
                }
                
                ?>
            </form>
          </div>
        </div>
      </div>
      <script src="/js/jquery.countTo.js"></script>