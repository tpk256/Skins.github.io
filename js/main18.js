$(document).ready(function(){
  //Navigation responsive
  steamid = $("#steamid").val();
  $CASE = $("#cases");
  snapRender();
  menuOpen();
  smallLastGames();
  hideBets();
    setInterval(function(){
        if(window.innerWidth < 1250){
            $('#cases').css('margin-left', (window.innerWidth - 1250)*0.5+'px');
        } else {
            $('#cases').css('margin-left', '0px');
        }
    },500);
  tipActivation();
  document.title = g_Sitename.toUpperCase() + ' | ' + pages[page];
  $('#sitename1').html(g_Sitename1.toUpperCase());
  $('#sitename2').html(g_Sitename2.toUpperCase());
  $('#sitename').html(g_Sitename);
  var nothing;

    $("#search").keyup(function(){
        var filter = $(this).val(), count = 0;

        $("#inventory .item").each(function(){
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).fadeOut();

            } else {
                $(this).show();
                count++;
            }
        });
        if(count == 0){
            $('#noitems').html('<br><br><br><center><h4>В инвентаре нет предметов которые соотвествуют нужным критериям.</h4></center><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>');
        } else {
            $('#noitems').html(' ');
        }
    });

});

function menuOpen(){
  $('.handle').on('click', function(){
    $('#dropdown-menu').toggleClass('showing');
  });
}

function smallLastGames(){
  var ww = $(window).width();
  if(ww < 550){
    $('.game').hide();
    $('.game:gt(4)').show();
  }
}

function hideGames(){
  $('.game').hide();
  $('.game:gt(4)').show();
}

function showGames(){
  $('.game').show();
}

$(window).resize(function(){
  if($(window).width() > 550){
    showGames();
  } else {
    hideGames();
  }
})

function hideBets(){
  var ww = $(window).width();
  if(ww < 720){
    $('.people > .player').hide()
  }
}

$(window).resize(function(){
  if($(window).width() < 720){
    $('.people > .player').hide();
  }
});

$('.item').mouseover($(this).parent().children('.name').css('margin-top','-20px'));
$('.item').mouseleave($(this).parent().children('.name').css('margin-top','20px'));

function tipActivation(){
  var ww = $(window).width();
  console.log(ww);

  if(ww < 1030){
    $('#tip').addClass('visible')
    $('.table-holder').on('scroll', function(){
      $('#tip').removeClass('visible');
    });
  };

}
function selectItem(a) {
  $("#" + a).css("background-color", "#263443"), $("#" + a).attr("onclick", "unselectItem(" + a + ");");
  sumselect += parseInt($('#'+a+'-p').html(),10);
  $('.choosed-amount').html(sumselect);
  deposit.push(a);
}

function unselectItem(a, mode) {
    if(mode == 1){
        sumselect -= parseInt($('#'+a+'-p').html(),10);
        $('.choosed-amount').html(sumselect);
        var b = deposit.indexOf(a);
        b > -1 && deposit.splice(b, 1);
        $("#" + a + '-i').fadeOut();
    } else {
        $("#" + a).css("background-color", "#304254"), $("#" + a).attr("onclick", "selectItem(" + a + ");");
        sumselect -= parseInt($('#'+a+'-p').html(),10);
        $('.choosed-amount').html(sumselect);
        var b = deposit.indexOf(a);
        b > -1 && deposit.splice(b, 1);
    }
}

var CASEW = 1125;
//physics contants
var snapX = 0;
var R = 0.999;
var S = 0.01;
var tf = 0;
var vi = 0;
var animStart = 0;
var isMoving = false;
var LOGR = Math.log(R);

function snapRender(x,wobble){
	CASEW = $("#case").width();
	if(isMoving){
		return;
	}else if(typeof x === 'undefined'){
		view(snapX);
	}else{
		var order = [1,14,2,13,3,12,4,0,11,5,10,6,9,7,8];
		var index = 0;
		for(var i=0;i<order.length;i++){
			if(x==order[i]){
				index = i;
				break;
			}
		}
		var max = 34;
		var min = -34;
		var w = Math.floor(wobble*(max-min+1)+min);

		var dist = index*75 + 36 + w;
		dist += 1250*5;
		snapX = dist;
		view(snapX);
	}
}
function spin(m, w){
	var x = m;
	//play_sound("roll");
	var order = [1,14,2,13,3,12,4,0,11,5,10,6,9,7,8];
	var index = 0;
	for(var i=0;i<order.length;i++){
		if(x==order[i]){
			index = i;
			break;
		}
	}
	var max = 34;
	var min = -34;
	//m.wobble = 0;
	var w = Math.floor(w*(max-min+1)+min);

	var dist = index*75 + 36 + w;
	dist += 1125*5;
    animStart = new Date().getTime();
    vi = getVi(dist);
    tf = getTf(vi);
    isMoving = true;

    setTimeout(function(){
    	snapRender();
        $('.remaining').html(g_Sitename.toUpperCase()+" rolled "+m+"!");
        var cellsAmount = $('.cell').length;
        if(cellsAmount < 10){
            if(m == 0) $('#game-holder').html($('#game-holder').html()+'<div class="game green cell"><span class="game-point">'+m+'</span></div>');
            if(m > 0 && m < 8) $('#game-holder').html($('#game-holder').html()+'<div class="game red cell"><span class="game-point">'+m+'</span></div>');
            if(m >= 8) $('#game-holder').html($('#game-holder').html()+'<div class="game black cell"><span class="game-point">'+m+'</span></div>');
        } else {
            $('.cell').first().remove();
            if(m == 0) $('#game-holder').html($('#game-holder').html()+'<div class="game green cell"><span class="game-point">'+m+'</span></div>');
            if(m > 0 && m < 8) $('#game-holder').html($('#game-holder').html()+'<div class="game red cell"><span class="game-point">'+m+'</span></div>');
            if(m >= 8) $('#game-holder').html($('#game-holder').html()+'<div class="game black cell"><span class="game-point">'+m+'</span></div>');
        }
        $("#red-all").html(0);
        $("#green-all").html(0);
        $("#black-all").html(0);
        $('#red').html('');
        $('#green').html('');
        $('#black').html('');
		$('#your-bet-red').html(0);
        $('#your-bet-green').html(0);
        $('#your-bet-black').html(0);
		alreadyBet = false;
		unlockbets();
		var lastcolor;
		if(m == 0) lastcolor = 'green';
		if(m > 0 && m < 8) lastcolor = 'red';
		if(m >= 8) lastcolor = 'black';
		if(lastbet == lastcolor) socket.emit('balance_request', { token : token });
    },tf);
    render();
}
function d_mod(vi,t){
    return vi*(Math.pow(R,t)-1)/LOGR;
}
function getTf(vi){
    return (Math.log(S)-Math.log(vi))/LOGR;
}
function getVi(df){
    return S-df*LOGR;
}
function v(vi,t){
    return vi*Math.pow(R,t);
}
function render(){
    var t = new Date().getTime() - animStart;
    if(t>tf)
        t = tf;
    var deg = d_mod(vi,t);
    view(deg);
    if(t<tf){
        requestAnimationFrame(render);
    }else{
    	snapX = deg;
        isMoving = false;
    }
}
function view(offset){
	offset = -((offset+1125-CASEW/2)%1125);
	$CASE.css("background-position",offset+"px 0px");
}

function countdown(seconds){
	$(".bar").finish().css("width","100%");
	$(".bar").animate({width:"0%"},{"duration":seconds*1000,"easing":"linear",
		progress:function(a,p,r){
			var c = (r/1000).toFixed(2);
			$('.remaining').html("Розыгрыш через "+c+" секунд.");
		}
	});
}

function savelink() {
    if(connected) {
        var a = $("input#trade-url").val();
        socket.emit("savetoken", {
            tradelink: a,
            token: token
        });
        $('#notify').html('<div class="attention-nice"><b class="text-attention">Ваша ссылка на обмен успешно сохранена.</b></div>');
    } else $('#notify').html('<div class="attention-bad"><b class="text-attention">Вы не подключены к серверу.</b></div>');
}

function depositItems() {
    if (connected){
        if (tradetoken && tradetoken != "notoken") {
            if (deposit.length > 0) {
                $('#notify').html('<div class="attention-warning"><b class="text-attention">Choosing bot for you...</b></div>');
                security = Math.floor(10000 * Math.random());
                socket.emit("deposit", {
                    items: deposit,
                    security: security,
                    token: token,
                    tradetoken: tradetoken
                });
                var length = deposit.length;
                for (var a = 0; a < length; a++) unselectItem(deposit[0], 1);
            } else $('#notify').html('<div class="attention-bad"><b class="text-attention">Вы выбрали 0 предметов.</b></div>');
        } else $('#notify').html('<div class="attention-bad"><b class="text-attention">Пожалуйста введите вашу ссылку на обмен.</b></div>');
    } else $('#notify').html('<div class="attention-bad"><b class="text-attention">Вы не подключены к серверу.</b></div>');
}

function withdrawItems() {
    if (connected){
        if (tradetoken && tradetoken != "notoken") {
            if (deposit.length > 0) {
                $('#notify').html('<div class="attention-warning"><b class="text-attention">Обновление предметов бота(ов)...</b></div>');
                security = Math.floor(10000 * Math.random());
                socket.emit("withdraw", {
                    items: deposit,
                    security: security,
                    token: token,
                    tradetoken: tradetoken
                });
				var length = deposit.length;
                for (var a = 0; a < length; a++) unselectItem(deposit[0], 1);
            } else $('#notify').html('<div class="attention-bad"><b class="text-attention">Вы выбрали 0 предметов.</b></div>');
        } else $('#notify').html('<div class="attention-bad"><b class="text-attention">Пожалуйста введите вашу ссылку на обмен.</b></div>');
    } else $('#notify').html('<div class="attention-bad"><b class="text-attention">Вы не подключены к серверу.</b></div>');
}

function bet(color){
	var amount = $('input#betamount').val();
	if(!amount) {$('#notify').html('<div class="attention-bad"><b class="text-attention">Пожалуйста введите сумму ставки.</b></div>');return;}
	if(color != 'black' && color != 'green' && color != 'red') {console.log('Вы не можете сделать ставку на неизвестный цвет из консоли, мой друг.');return;}
	if(!connected) {$('#notify').html('<div class="attention-bad"><b class="text-attention">Вы не подключены к серверу.</b></div>');return;}
	if(amount <= 0) {$('#notify').html('<div class="attention-bad"><b class="text-attention">Вы пытаетесь поставить 0.</b></div>');return;}
	if(amount > balance) {$('#notify').html('<div class="attention-bad"><b class="text-attention">Недостаточно pts.</b></div>');return;}
	if(alreadyBet) {$('#notify').html('<div class="attention-bad"><b class="text-attention">Вы уже сделали ставку.</b></div>');return;}
	if(betsLocked) {$('#notify').html('<div class="attention-warning"><b class="text-attention">В данный момент ставки закрыты.</b></div>');return;}
	socket.emit('bet', {color: color, amount: amount, token: token });
	alreadyBet = true;
}

function plus1(){
    field_bet = 0;
	if($('input#betamount').val()) field_bet = $('input#betamount').val()
	$('input#betamount').val(parseInt(field_bet) + 1);
}

function plus10(){
    field_bet = 0;
	if($('input#betamount').val()) field_bet = $('input#betamount').val()
	$('input#betamount').val(parseInt(field_bet) + 10);
}

function plus100(){
    field_bet = 0;
	if($('input#betamount').val()) field_bet = $('input#betamount').val()
	$('input#betamount').val(parseInt(field_bet) + 100);
}

function plus1000(){
    field_bet = 0;
	if($('input#betamount').val()) field_bet = $('input#betamount').val()
	$('input#betamount').val(parseInt(field_bet) + 1000);
}

function dev2(){
    field_bet = 0;
	if($('input#betamount').val()) field_bet = $('input#betamount').val()
	$('input#betamount').val(Math.floor(parseInt(field_bet)/2));
}

function x2(){
    field_bet = 0;
	if($('input#betamount').val()) field_bet = $('input#betamount').val()
	$('input#betamount').val(parseInt(field_bet)*2);
}

function max(){
    field_bet = balance;
	$('input#betamount').val(balance);
}

function clearr(){
    field_bet = 0;
	$('input#betamount').val(field_bet);
}

function loadInvItems(a) {
    $.ajax({
        type: "GET",
        url: "parser/parser.php?steamid=76" + a,
        success: function(a) {
             $("#inventory").html(a)
        }
    });
}

function loadAllItems() {
    $.ajax({
        type: "GET",
        url: "withdraw/parser.php",
        success: function(a) {
            $("#inventory").html(a)
        }
    });
    $('#btn-all').addClass('btn_filter_active');
    $('#btn-high').removeClass('btn_filter_active');
    $('#btn-medium').removeClass('btn_filter_active');
    $('#btn-low').removeClass('btn_filter_active');
}

function loadHighItems() {
    $.ajax({
        type: "GET",
        url: "withdraw/parserhigh.php",
        success: function(a) {
            $("#inventory").html(a)
        }
    });
    $('#btn-all').removeClass('btn_filter_active');
    $('#btn-high').addClass('btn_filter_active');
    $('#btn-medium').removeClass('btn_filter_active');
    $('#btn-low').removeClass('btn_filter_active');
}

function loadMediumItems() {
    $.ajax({
        type: "GET",
        url: "withdraw/parsermedium.php",
        success: function(a) {
            $("#inventory").html(a)
        }
    });
    $('#btn-all').removeClass('btn_filter_active');
    $('#btn-high').removeClass('btn_filter_active');
    $('#btn-medium').addClass('btn_filter_active');
    $('#btn-low').removeClass('btn_filter_active');
}

function loadLowItems() {
    $.ajax({
        type: "GET",
        url: "withdraw/parserlow.php",
        success: function(a) {
            $("#inventory").html(a)
        }
    });
    $('#btn-all').removeClass('btn_filter_active');
    $('#btn-high').removeClass('btn_filter_active');
    $('#btn-medium').removeClass('btn_filter_active');
    $('#btn-low').addClass('btn_filter_active');
}

function lockbets(){
	$('#red-button').attr('onclick','javascript:void(0)');
	$('#green-button').attr('onclick','javascript:void(0)');
	$('#black-button').attr('onclick','javascript:void(0)');
	betsLocked = true;
	if(page == 1) $('#notify').html('<div class="attention-warning"><b class="text-attention">Ставки залбокированы.</b></div>');
}

function unlockbets(){
	$('#red-button').attr('onclick','bet("red");');
	$('#green-button').attr('onclick','bet("green");');
	$('#black-button').attr('onclick','bet("black");');
	betsLocked = false;
	if(page == 1) $('#notify').html('<div class="attention-nice"><b class="text-attention">Ставки разблокированы.</b></div>');
}

function entercode(){
	var code = $('#code').val();
	socket.emit('activate_code', { token : token, code : code });
}

function collect(){
    socket.emit('collect_earnings', { token : token });
}

var pathname=window.location.href;console.log(pathname),pathname.indexOf("?login&")>=0&&window.location.replace("http://csgodouble.ru/");

var g_Host = ":7878",
	g_Sitename = '',
	g_Sitename1 = 'CSGO',
	g_Sitename2 = 'DOUBLE',
    steamid = $("#steamid").val(),
    socketid = "",
    token = "",
	pages = ['','Home','Deposit', 'Withdraw', 'Free pts', 'Referrals'],
    tradetoken = "notoken",
    balance = 0,
    currentRed = 0,
    currentGreen = 0,
    currentBlack = 0,
    sumselect = 0,
    alreadyBet = false,
    amount = 0,
    timeleft = 0,
    connected = false,
    firststate = true,
	lastbet = 'nobet',
	lastamount = 0,
	betsLocked = false,
	refcode = 'nocode',
	field_bet = 0,
	minbet = 0,
	mindeposit = 0,
	bettoreward = 0,
	refreward = 0,
	total_earnings = 0,
	page = 0,
    security = Math.floor(10000 * Math.random()),
    socket = io("http://" + g_Host, {
        forceNew: true
    }),
    deposit = [],
	errors = ['Empty', 'Бот не может загрузить интвентарь пользователя.','Не может предложить обмен.','Вы не успели принять обмен.','Ваша ставка меньше минимальной.','Не удаётся опознать вашу ссылку на обмен.','Не удаётся загрузить баланс.','You are already perfoming an action.','Не достаточно pts.','Все боты заняты.','Вещи уже находятся в стадии вывода.','Не может загрузить данные пользователя.','Недопустимые параметры.','У вас есть активный депозит.','Вы отклонили обмен.','Unexpected offer state.','Слишком много ошибок.','Пожалуйста закройте остальные CSGODOUBLE окна.','Недосточно поставили.','Вы уже сделали ставку.','Игра окончена.','Неопознаный токен. Пожалуйста закройте остальные CSGODOUBLE окна.','Ошибка базы данных.','Неправильный реферальный код.','Не удаётся загрузить данные пользователя.','У вас нет рефералов.','Вы уже ввели промокод.','Вы пытаетесь ввести собственный промокод.'];
    lockbets();
    socket.on('connect', function(data){
        console.log('Connected to server!');
        $('#notify').html('<div class="attention-nice"><b class="text-attention">Подключение к серверу!</b></div>');
        socket.emit('security', { steamid : steamid });
    });

    socket.on('token', function(data){
        unlockbets();
        socketid = data.id;
        token = data.token;
        console.log('Assigned as ' + socketid + ' with token ' + token);
        $('#notify').html('<div class="attention-nice"><b class="text-attention">Код безопасности сгенерирован!</b></div>');
        connected = true;
		if(page == 5) socket.emit('getrefs', { token : token });
    });

    socket.on('err_client', function(data){
        if(typeof steamid != 'undefined') {
			$('#notify').html('<div class="attention-bad"><b class="text-attention">'+errors[data.code]+'('+data.code+')</b></div>');
		} else {
			$('#notify').html('<div class="attention-warning"><b class="text-attention">Пожалуйста войдите.</b></div>');
		}

    });

    socket.on('success_client', function(data){
        $('#notify').html('<div class="attention-nice"><b class="text-attention">Бот отправил вам <a href="http://steamcommunity.com/tradeoffer/'+data.tradeofferid+'" target="_blank" style="color:inherit;text-decoration:underline;">обмен</a>(security code "'+data.security+'").Пожалуйста примите.</b></div>');
    });

    socket.on('successwd_client', function(data){
        $('#notify').html('<div class="attention-nice"><b class="text-attention">Бот подтвердил вывод. Ваш код безопасности "'+data.security+'".</b></div>');
    });

    socket.on('itemsreceived_client', function(data){
        $('#notify').html('<div class="attention-nice"><b class="text-attention">Ваши предметы получены! Вы получили '+data.summ+'pts!</b></div>');
    });

    socket.on('tradetoken', function(data){
        if(data.tradetoken){
            tradetoken = data.tradetoken;
            if(tradetoken && tradetoken != 'notoken'){
                $('#buttonsave').val('Обновить ссылку на обмен');
                $('#tradelink-text').html('Если вы хотите обновить вашу ссылку на');
            }
        } else {
            $('#notify').html('<div class="attention-bad"><b class="text-attention">Пожалуйста измените вашу ссылку на обмен в разделе Пополнить/Вывести</b></div>');
        }
    });

    socket.on('balance', function(data){
        balance = data.balance;
		$('#pts-amount').text(balance);
    });

    socket.on('state', function(data){
        if(firststate){
            firststate = false;
            currentRed = data.red;$("#red-all").countTo({from: 0, to: currentRed, speed : 500});
            currentGreen = data.green;$("#green-all").countTo({from: 0, to: currentGreen, speed : 500});
            currentBlack = data.black;$("#black-all").countTo({from: 0, to: currentBlack, speed : 500});
            timeleft = data.timeleft;
            $('.remaining').html('Розыгрыш через ' + timeleft + '.00 секунд.');
            if(timeleft > 0) countdown(timeleft);
            console.log('State: red ' + currentRed + ', green ' + currentGreen + ', black ' + currentBlack);
        } else {
            currentRed = data.red;$("#red-all").countTo({from: Number($("#red-all").html()), to: currentRed, speed : 500});
            currentGreen = data.green;$("#green-all").countTo({from: Number($("#green-all").html()), to: currentGreen, speed : 500});
            currentBlack = data.black;$("#black-all").countTo({from: Number($("#black-all").html()), to: currentBlack, speed : 500});
            timeleft = data.timeleft;
            $('.remaining').html('Розыгрыш через ' + timeleft + '.00 секунд.');
            if(timeleft > 0) countdown(timeleft);
            console.log('State: red ' + currentRed + ', green ' + currentGreen + ', black ' + currentBlack);
        }

    });

    socket.on('build', function(data){
        $('#'+data.bet).html('<div class="player"><div class="avatar"><img src="'+data.img+'"></div><span class="nickname">'+data.name+'</span><span class="points">+'+data.betamount+'</span></div>'+$('#'+data.bet).html());
		console.log(JSON.stringify(data));
	});

    socket.on('end', function(data){
		lockbets();
        currentRed = 0;
        currentGreen = 0;
        currentBlack = 0;
        $('.remaining').html("Розыгрыш...");
		console.log('Number ' + data.number + ', wobble ' + data.wobble);
        spin(data.number, data.wobble);
    });

    socket.on('lastbets', function(data){
        $('.remaining').html("Processing last " + data.processedBets + "/" + data.currentBets);
    });

	socket.on('lockbets', function(){
		lockbets();
	});

	socket.on('info', function(data){
		lastbet = data.lastbet;
		lastamount = data.amount;
		$('#your-bet-'+lastbet).html(lastamount);
		if(lastamount && lastamount > 0){
			$('#notify').html('<div class="attention-nice"><b class="text-attention">Вы поставили '+lastamount+' на '+lastbet+'.</b></div>');
		}
        if(data.tradetoken){
            tradetoken = data.tradetoken;
            if(tradetoken && tradetoken != 'notoken'){
                $('#buttonsave').val('Обновить ссылку на обмен');
                $('#tradelink-text').html('Если вы хотите обновить вашу ссылку на');
            }
        }
        if(data.refcode) {
			refcode = data.refcode;
			$('#refcode').html(refcode);
		}
	});

	socket.on('site_settings', function(data){
		minbet = data.minbet;
		mindeposit = data.mindeposit;
		refreward = data.refreward;
		bettoreward = data.bettoreward;
	});

	socket.on('refs', function(data){
		var globalbet = 0;
		var available = 0;
		for(var i = 0; i < data.refs.length; i++){
			var totalbet = data.refs[i].refbet + bettoreward*data.refs[i].refearnings;
			total_earnings += data.refs[i].refearnings;
			if(data.refs[i].refbet / bettoreward > 1){
				available += (data.refs[i].refbet - data.refs[i].refbet % bettoreward)/ bettoreward;
			}
			globalbet += totalbet;
			$('#table-refs').html('<tr><th class="table-column first">*************'+data.refs[i].steamid.substr(-4)+'</th><th class="table-column second">'+totalbet+'pts</th><th class="table-column third">'+data.refs[i].refearnings+'pts</th></tr>' + $('#table-refs').html());
		}
		$('#totalbet').html(globalbet+'pts');
		$('#referalss').html(data.refs.length);
		$('#earnings').html(total_earnings+'pts');
		$('#available').html(available+'pts');
	});

	socket.on('refcode', function(data){
		if(data.refcode) {
			refcode = data.refcode;
			$('#refcode').html(refcode);
		} else {
			console.log('Empty refcode.');
			return;
		}
	});

	socket.on('collect_success', function(data){
		$('#notify').html('<div class="attention-nice"><b class="text-attention">Вы накопили '+data.collected+'pts с рефералов!</b></div>');
		total_earnings += data.collected;
		$('#earnings').html(total_earnings+'pts');
        $('#available').html('0pts');
	});

	socket.on('activate_code_success', function(data){
		$('#notify').html('<div class="attention-nice"><b class="text-attention">You получили '+refreward+'pts от '+data.referer[0].steamid+'!</b></div>');
	});

    socket.on('money_back', function(data){
        balance = balance + data.value;
        $('#notify').html('<div class="attention-warning"><b class="text-attention">Ошибка при выводо. Вы получили '+data.value+'pts обратно!</b></div>');
    });

	socket.on('lastchips', function(data){
		for(var i = 0; i < data.lastchips.length; i++){
			if(data.lastchips[data.lastchips.length - 1 - i] == 0) $('#game-holder').html($('#game-holder').html()+'<div class="game green cell"><span class="game-point">'+data.lastchips[data.lastchips.length - 1 - i]+'</span></div>');
			if(data.lastchips[data.lastchips.length - 1 - i] > 0 && data.lastchips[data.lastchips.length - 1 - i] < 8) $('#game-holder').html($('#game-holder').html()+'<div class="game red cell"><span class="game-point">'+data.lastchips[data.lastchips.length - 1 - i]+'</span></div>');
			if(data.lastchips[data.lastchips.length - 1 - i] >= 8) $('#game-holder').html($('#game-holder').html()+'<div class="game black cell"><span class="game-point">'+data.lastchips[data.lastchips.length - 1 - i]+'</span></div>');
		}
	});

    socket.on('stats', function(data){
        $('#online').html(data.online);
        $('#games').html(data.games);
        $('#totalwithdrawals').html(data.totalwithdrawals/100);
    });
