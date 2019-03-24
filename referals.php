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
	  <script>page = 5;</script>
      <div id="referals" class="box pad">
        <span id="notify"></span>
        <div class="row">
          <div class="col col--12-of-12">
            <div class="table-holder">
              <table id="your-stats">
                <tbody>
				  <tr>
                    <th class="table-column first">Ваш реферальный код: </th>
                    <th class="table-column second"><span id="refcode">???</span></th>
                  </tr>
                  <tr>
                    <th class="table-column first">Рефералов: </th>
                    <th class="table-column second"><span id="referalss">???</span></th>
                  </tr>
                  <tr>
                    <th class="table-column first">Общая ставка: </th>
                    <th class="table-column second"><span id="totalbet">???</span></th>
                  </tr>
                  <tr>
                    <th class="table-column first">Общий доход: </th>
                    <th class="table-column second"><span id="earnings">???</span></th>
                  </tr>
                  <tr>
                    <th class="table-column first">Доступно монет:</th>
                    <th class="table-column second"><span id="available">???</span></th>
                  </tr>
                </tbody>
              </table>
            </div>
            <input id="collect-button" type="submit" value="Получить монеты" onclick="collect();">
            <div class="table-holder">
              <table id="other-stats">
                <thead>
                  <tr>
                    <th class="table-column first">Игрок</th>
                    <th class="table-column second">Общая ставка</th>
                    <th class="table-column third">Реферальный бонус</th>
                  </tr>
                </thead>
                <tbody id="table-refs">
					
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="tip">
      <p>Листайте что-бы загрузить еще</p>
    </div>
    <script src="/js/jquery.countTo.js"></script>