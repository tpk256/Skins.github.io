<?php

@include_once('set.php');
$loggedin = false;


require('steamauth/steamauth.php');

if(isset($_SESSION["steamid"])) {
    $loggedin = true;
    include_once('steamauth/userInfo.php');
    if(!fetchinfo('id', 'users', 'steamid', $_SESSION["steamid"])){
        $clst = generateCLST();
        mysql_query("INSERT users (`name`,`img`,`steamid`, `ref_code`) VALUES ('".$steamprofile['personaname']."', '".$steamprofile['avatarfull']."', '".$_SESSION["steamid"]."', '".$clst."')");
    } else {
        mysql_query("UPDATE users SET name='".$steamprofile['personaname']."', img='".$steamprofile['avatarfull']."' WHERE steamid='".$_SESSION["steamid"]."'");
	}

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
		<div class="shinfo shdraw">
			<a href="withdraw.php"><span>Вывод PTS : накопленные PTS можно вывести в магазине</span></a>
	    </div>
    </header>
    <div class="container">
	  <script>page = 1;</script>
      <div id="roulette-info" class="box npad">
        <div id="progress-bar"><div style="width: 100%;" class="bar"></div>
        <p class="remaining">Ожидание ставок...</p>
        </div>
		<!--<br>-->
        <div id="cases">
          <div id="pointer"></div>
        </div>
      </div>
      <div id="last-games" class="box pad">
        <div id="game-holder">
        </div>
      </div>
      <div id="balance" class="box pad">
        <span id="notify"><div class="attention-warning"><b class="text-attention">Подключение...</b></div></span>
        <div class="row">
          <div class="col col--6-of-12">
            <p class="balance">Баланс: <span id="pts-amount" class="coins-amout"><img src="css/img/preloader.gif" style="position:relative;top:2px;"></span> pts</p>
            <form>
              <input id="betamount" type="text" placeholder="Введите сумму..." value="0">
              <button type="button" class="balance-button" onclick="clearr();">Очистить</button>
              <button type="button" class="balance-button" onclick="plus1();">+1</button>           
              <button type="button" class="balance-button" onclick="plus10();">+10</button>
              <button type="button" class="balance-button" onclick="plus100();">+100</button>
              <button type="button" class="balance-button" onclick="plus1000();">+1000</button>
              <button type="button" class="balance-button" onclick="dev2();">1/2</button>
              <button type="button" class="balance-button" onclick="x2();">x2</button>
              <button type="button" class="balance-button" onclick="max();">Max</button>
            </form>
          </div>
		  <div class="col col--6-of-12">
            <p class="balance">Статистика:  </p>
				<table id="tbl_statistics">
					<tr>
						<td><i class="fa fa-star-o"></i>&emsp;Всего игр</td>
						<td><span id="games"><img src="css/img/preloader.gif" style="position:relative;top:5px;"></span></td>
					</tr>
					<tr>
						<td><i class="fa fa-user"></i>&emsp;Игроков на сайте</td>
						<td><span id="online"><img src="css/img/preloader.gif" style="position:relative;top:5px;"></span></td>
					</tr>
					<tr>
						<td><i class="fa fa-usd"></i>&emsp;Всего выплачено</td>
						<td><span id="totalwithdrawals"><img src="css/img/preloader.gif" style="position:relative;top:5px;"></span>$</td>
					</tr>
					<!--tr>
						<td><i class="fa fa-usd"></i>&emsp;Biggest win</td>
						<td>$???</td>
					</tr-->
					<!--tr>
						<td><i class="fa fa-trophy"></i>&emsp;Lucky player</td>
						<td>[nic] <span style="color:#999;">Won [count] in a row!</span></td>
					</tr-->
				</table>
         
          </div>
        </div>
      </div>
      <div id="bets" class="box npad">
        <div class="row row--no-gutter">
          <div class="col col--4-of-12">
            <div class="head">
              <div class="all"><span id="red-all"><img src="css/img/preloader.gif" style="position:relative;top:-5px;"></span><span class="credits-text">pts</span></div>
              <button onclick='bet("red");' id="red-button" type="button">1-7</button>
            </div>
            <div class="bet">
              <p id="your-red-bet" class="betp">Ваша ставка: <span id="your-bet-red">0</span></p>
            </div>
            <div class="people" id="red">
            </div>
          </div>
          <div class="col col--4-of-12">
            <div class="head">
              <div class="all"><span id="green-all"><img src="css/img/preloader.gif" style="position:relative;top:-5px;"></span><span class="credits-text">pts</span></div>
              <button onclick='bet("green");' id="green-button" type="button">0</button>
            </div>
            <div class="bet">
              <p id="your-green-bet" class="betp">Ваша ставка: <span id="your-bet-green">0</span></p>
            </div>
            <div class="people" id="green">
            </div>
          </div>
          <div class="col col--4-of-12">
            <div class="head">
              <div class="all"><span id="black-all"><img src="css/img/preloader.gif" style="position:relative;top:-5px;"></span><span class="credits-text">pts</span></div>
              <button onclick='bet("black");' id="black-button" type="button">8-14</button>
            </div>
            <div class="bet">
              <p id="your-black-bet" class="betp">Ваша ставка: <span id="your-bet-black">0</span></p>
            </div>
            <div class="people" id="black">
            </div>
          </div>
        </div>
      </div>
	  <div>
		<div id="social" class="box pad">
			<div class="row social_row  ">
				<div class="col  col--centered  col--push-3-of-12 col--6-of-12">
					<h2>Подписывайся на нас в соц. сетях</h2>
					 <div class="line"> </div>
					<div class="social_link_wrap">
					 
						<a href="/" class="social_link col--4-of-12"><figure class="circle"><i class="fa fa-steam"></i></figure></a>
				 					 
						<a target="_blank" href="http://vk.com/csgoarrow_ru"  class="social_link col--4-of-12"><figure class="circle"><i class="fa fa-vk"></i></figure></a>
						 
					</div>
				</div>
			
			
			</div>
		</div>
	  </div>
      <script src="/js/jquery.countTo.js"></script>