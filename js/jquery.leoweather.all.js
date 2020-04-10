(function($) {
	$.fn.leoweather = function(opts) {
		var defaults = {
			city: '',
			format: ''
		};
		var options = $.extend(defaults, opts);
		return this.each(function() {
			if(!options.appid||!options.appsecret){
				$(this).html('');
				return false;
			}
			var obj = $(this),
			weather = new Array(),
			format = options.format,
			url = 'https://www.tianqiapi.com/api/?version=v1&appid='+options.appid+'&appsecret='+options.appsecret+'&city=' + options.city,
			model = format.match(/\{.*?\}/g),
			action = new Array();
			for (var i = 0; model.length > i; i++) {
				action[i] = model[i].replace(/{/g, '').replace(/}/g, '');
			};
			var valid = action.toString();
			$.ajax({
				url: url,
				dataType: "json",
				success: function(w) {
					weather['city'] = w.city;
					weather['data'] = w.data;
					setTimer();
					console.log(weather);  //二次修改请自己删除注释，查看API返回数据
				}
			});
			function getContent(type){
				if(type == '城市'){
					return weather.city;
				}
				var day = /\+(\d).*?/g.exec(type);
				if(day != null) {
					day = parseInt(day[1]);
					if(day > 6){
						day = 0;
					}
				} else {
					day = 0;
				}
				if(/日期.*?/g.exec(type) !== null){
					if(/人性化日期.*?/g.exec(type) !== null){
						return weather.data[day].day;
					}
					return weather.data[day].date;
				}
				if(/天气.*?/g.exec(type) !== null){
					return weather.data[day].wea;
				}
				if(/图标.*?/g.exec(type) !== null){
					return weather.data[day].wea_img;
				}
				if(/当前气温.*?/g.exec(type) !== null){
					return weather.data[day].tem;
				}
				if(/最高气温.*?/g.exec(type) !== null){
					return weather.data[day].tem1;
				}
				if(/最低气温.*?/g.exec(type) !== null){
					return weather.data[day].tem2;
				}
				if(/风向.*?/g.exec(type) !== null){
					return weather.data[day].win[0];
				}
				if(/风级.*?/g.exec(type) !== null){
					return weather.data[day].win_speed;
				}
				if(/空气指数.*?/g.exec(type) !== null){
					return weather.data[day].air;
				}
				if(/空气等级.*?/g.exec(type) !== null){
					return weather.data[day].air_level;
				}
				if(/空气提示.*?/g.exec(type) !== null){
					return weather.data[day].air_tips;
				}
				if(/紫外线指数.*?/g.exec(type) !== null){
					return weather.data[day].index[0].level;
				}
				if(/紫外线提示.*?/g.exec(type) !== null){
					return weather.data[day].index[0].desc;
				}
				if(/穿衣指数.*?/g.exec(type) !== null){
					return weather.data[day].index[3].level;
				}
				if(/穿衣提示.*?/g.exec(type) !== null){
					return weather.data[day].index[3].desc;
				}
				if(/洗车指数.*?/g.exec(type) !== null){
					return weather.data[day].index[4].level;
				}
				if(/洗车提示.*?/g.exec(type) !== null){
					return weather.data[day].index[4].desc;
				}
				if(type == '时段'){
					var today = new Date();
					var hh = today.getHours();
					if (hh < 06) {
						xx = '凌晨';
					} else if (hh < 09) {
						xx = '早上';
					} else if (hh < 12) {
						xx = '上午';
					} else if (hh < 14) {
						xx = '中午';
					} else if (hh < 17) {
						xx = '下午';
					} else if (hh < 19) {
						xx = '傍晚';
					} else {
						xx = '晚上';
					};
					return '<span class="weather_xx">' + xx + '</span>'
				}
				if(type == '年'){
					var today = new Date();
					var YY = today.getYear();
					if (YY < 1900) YY = YY + 1900;
					return '<span class="weather_YY">' + YY + '</span>'
				}
				if(type == '月'){
					var today = new Date();
					var MM = today.getMonth() + 1;
					if (MM < 10) MM = '0' + MM;
					return '<span class="weather_MM">' + MM + '</span>'
				}
				if(type == '日'){
					var today = new Date();
					var DD = today.getDate();
					if (DD < 10) DD = '0' + DD;
					return '<span class="weather_DD">' + DD + '</span>'
				}
				if(type == '时'){
					var today = new Date();
					var hh = today.getHours();
					if (hh < 10) hh = '0' + hh;
					return '<span class="weather_hh">' + hh + '</span>'
				}
				if(type == '分'){
					var today = new Date();
					var mm = today.getMinutes();
					if (mm < 10) mm = '0' + mm;
					return '<span class="weather_mm">' + mm + '</span>'
				}
				if(type == '秒'){
					var today = new Date();
					var ss = today.getSeconds();
					if (ss < 10) ss = '0' + ss;
					return '<span class="weather_ss">' + ss + '</span>'
				}
				if(type == '周'){
					var today = new Date();
					var ww = today.getDay();
					if (ww == 0) ww = '日';
					if (ww == 1) ww = '一';
					if (ww == 2) ww = '二';
					if (ww == 3) ww = '三';
					if (ww == 4) ww = '四';
					if (ww == 5) ww = '五';
					if (ww == 6) ww = '六';
					return '<span class="weather_ww">' + ww + '</span>'
				}
			}
			function setTimer() {
				var timer = 100;
				for (var i = 0; action.length > i; i++) {
					str = format.replace(/\{(.*?)\}/g, function(a, b) {
						var fun = b.replace(/{/g, '').replace(/}/g, '');
						return getContent(fun);
					})
				};
				obj.html(str);
				var ClockTimer = setInterval(update, timer)
			}
			function update(){
				var today = new Date();
				YY = today.getYear();
				if (YY < 1900) YY = YY + 1900;
				var MM = today.getMonth() + 1;
				if (MM < 10) MM = '0' + MM;
				var DD = today.getDate();
				if (DD < 10) DD = '0' + DD;
				var hh = today.getHours();
				if (hh < 10) hh = '0' + hh;
				var mm = today.getMinutes();
				if (mm < 10) mm = '0' + mm;
				var ss = today.getSeconds();
				if (ss < 10) ss = '0' + ss;
				var ww = today.getDay();
				if (ww == 0) ww = '日';
				if (ww == 1) ww = '一';
				if (ww == 2) ww = '二';
				if (ww == 3) ww = '三';
				if (ww == 4) ww = '四';
				if (ww == 5) ww = '五';
				if (ww == 6) ww = '六';
				if (hh < 06) {
					xx = '凌晨';
				} else if (hh < 09) {
					xx = '早上';
				} else if (hh < 12) {
					xx = '上午';
				} else if (hh < 14) {
					xx = '中午';
				} else if (hh < 17) {
					xx = '下午';
				} else if (hh < 19) {
					xx = '傍晚';
				} else {
					xx = '晚上';
				};
				$('.weather_YY',obj).html(YY);
				$('.weather_MM',obj).html(MM);
				$('.weather_DD',obj).html(DD);
				$('.weather_hh',obj).html(hh);
				$('.weather_mm',obj).html(mm);
				$('.weather_ss',obj).html(ss);
				$('.weather_ww',obj).html(ww);
				$('.weather_xx',obj).html(xx)
			}
		});
	};
})(jQuery);