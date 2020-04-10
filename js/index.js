$(function(){	
	$(window).scroll(function() {		
    if($(window).scrollTop() >= 100){
			$('.actGotop').fadeIn(300); 
		}else{    
			$('.actGotop').fadeOut(300);     
		}  
	});
	$('.actGotop').click(function(){
		$('html,body').animate({ scrollTop: '0px' }, 300);
	});	
	$('.one').click(function () {
		window.location.href = '../bs/html/scenic.html#one';
	})
	$('.two').click(function () {
		window.location.href = '../bs/html/scenic.html#two';
	})
	$('.three').click(function () {
		window.location.href = '../bs/html/scenic.html#three';
	})
	$('.four').click(function () {
		window.location.href = '../bs/html/scenic.html#four';
	})
	$('.five').click(function () {
		window.location.href = '../bs/html/scenic.html#five';
	})
	$('.six').click(function () {
		window.location.href = '../bs/html/scenic.html#six';
	});

	$.ajax({
		url: 'http://182.92.173.180:8080/api/apidata/get_test_nums?nums=1',
		type: 'get',
		dataType: 'json',
		success: function (res) {
			console.log(res);
			if (res.status == 1) {
				var str = ''; 
				str += `
				<li class="li-1"><b><i id="productNumber_1" data-sum="">${res.data[0].per_jdrs}</i><sup>+</sup></b>
					<p>景区每日接待人次</p>
				</li>
				<li class="li-2"><b><i id="productNumber_2" data-sum="">${parseInt(res.data[0].day_ts/100)}</i><em>天</em></b>
					<p>景区安全运行</p>
				</li>
				<li class="li-3"><b><i id="productNumber_3" data-sum="">${res.data[0].dkjds}</i><sup>+</sup></b>
					<p>打卡景点数</p>
				</li>
				<li class="li-4"><b><i id="productNumber_4" data-sum="">${res.data[0].qdz}</i><em>万</em></b>
					<p>游客期待值</p>
				</li>
				<li class="li-5"><b><i id="productNumber_5" data-sum="">${res.data[0].sell_num}</i><sup>+</sup></b>
					<p>历史门票售出</p>
				</li>
				`;
				$('.q')[0].innerHTML = str;
			}
		}
	});
	$.ajax({
		url: 'http://182.92.173.180:8080/api/apidata/get_test_new?new=1',
		type: 'get',
		success: function (res) {
			console.log(res, 1);
			if (res.status === 1) {
				var str = '';
				var str1 = '';
				var str2 = '';
				for (var i = 9; i < 19; i++){
					str += `
          <li><a href="#">${res.data[i].title}</a></a><span>2020-03-12</span></li>
					`;
					$('.news')[0].innerHTML = str;
				};
				for (var i = 9; i < 13; i++){
					str1 += `
					<li><a href="">${res.data[i].content}</a></a><span>2020-03-16</span></li>
					`;
					$('.gonggao1')[0].innerHTML = str1;
				};
				for (var i = 13; i < 17; i++){
					str2 += `
					<li><a href="">${res.data[i].content}</a><span>2020-04-20</span></li>
					`;
					$('.gonggao2')[0].innerHTML = str2;
				}
			}
		}
	})
})();