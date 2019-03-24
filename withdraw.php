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
	  <script>page = 3;</script>
      <div id="items" class="box pad">
        <span id="notify"></span>
        <div class="head">
          <div class="row row--no-gutter">
            <div class="col col--12-of-12 col_tradelink">
				  <form action="#">
					<label for="trade-url"><i class="fa fa-info-circle"></i>&emsp;<span id="tradelink-text">До вывода пожалуйста вставьте свою ссылку на </span> <a href="https://steamcommunity.com/id/id/tradeoffers/privacy#trade_offer_access_url" target="_blank" style="text-decoration:underline;color:inherit">трейд</a>:</label>
					<input type="text" placeholder="Ссылка на обмен..." id="trade-url">
					<input id="buttonsave" type="submit" value="Save tradelink" onclick="savelink(); return false;">
					<input type="submit" value="Withdraw" onclick="withdrawItems(); return false;">
				</form>
			</div>
            <div class="col   col--6-of-12 balance_wrap">
              <!--p>Bank: <span id="items-amount">100</span> items</p-->
               Ваш баланс: <span id="pts-amount" class="coins-amout"><img src="css/img/preloader.gif" style="position:relative;top:5px;"></span>pts&emsp;<i class="fa fa-arrow-circle-right"></i>&emsp;
               <!--p>Bank: <span id="items-amount">100</span> items</p-->
              Выбрано: <span id="pts-amount" class="choosed-amount">0</span>pts 
            </div>
            <div class="col col--6-of-12 search_wrap">
              <form action="#">
                <label for="search"><i class="fa fa-search"></i>&emsp;Искать среди предметов:</label>
                <input type="text" class="search rounded" placeholder="Например: AWP | Dragon Lore" id="search">
              </form>
             
            </div>
          </div>
		  <div class="row row_filters row--no-gutter"><?// //withdraw filters main.js :295?>
			<div class="col col--3-of-12 filter_col">
				<button id="btn-all" class="btn_filter btn_filter_active" group="all" onclick="loadAllItems(); return false;">Все</button>
			</div>
			<div class="col col--3-of-12  filter_col">
				<button id="btn-high" class="btn_filter" group="hide" onclick="loadHighItems(); return false;">Дорогие</button>
			</div>
			<div class="col col--3-of-12  filter_col">
				<button id="btn-medium" class="btn_filter" group="megium" onclick="loadMediumItems(); return false;">Средние</button>
			</div>
			<div class="col col--3-of-12  filter_col">
				<button id="btn-low" class="btn_filter" group="light" onclick="loadLowItems(); return false;">Дешевые</button>
			</div>
			
 
		  </div>
        </div>
        <div class="body">
          <div class="row row--no-gutter">
            <div class="col col--12-of-12" id="inventory">
                <span id="noitems"></span>
                <script>loadAllItems();</script>
                <br><br><br><center><h4>Загрузка предметов <img src="css/img/preloader.gif" style="position:relative;top:5px;"></h4></center><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
          </div>
        </div>
      </div>
      </div>
      <script src="/js/jquery.countTo.js"></script>