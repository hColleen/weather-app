$(document).ready(function () {
	//set variables
	var long;
	var lat;
	var kTemp;
	var fTemp;
	var cTemp;
	var city;
	var windSpeed;
	var windDir;
	var weatherType;
	var iconcode;
	var iconcodeHtml;
	var windIcon;
	//get location
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			//get weather
			var api = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=329c1651a1f2de952eaae40f5d8e6ea1';

			$.getJSON(api, function (data) {

				//calculate temperature
				kTemp = data.main.temp;
				fTemp = ((kTemp) * (9 / 5) - 459.67).toFixed(2);
				cTemp = (kTemp - 273).toFixed(2);

				//set variable values
				city = data.name;
				windSpeed = 2.237 * data.wind.speed;
				windDir = data.wind.deg;
				weatherType = data.weather[0].description;
				iconcode = data.weather[0].id;
				iconcodeHtml = '<i class="wi wi-owm-' + iconcode + '"></i>';
				windIcon = '<i class ="wi wi-wind from-' + windDir + '-deg"></i>';
				//get forecast
				var forecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=329c1651a1f2de952eaae40f5d8e6ea1';

				$.getJSON(forecastAPI, function (data1) {
					//loop through forecast
					for (var i = 0; i < data1.list.length; i += 2) {

						//console.log(data1.list[1].weather[0].description);
						kTempFor = data1.list[i].main.temp_min;
						fTempFor = ((kTempFor) * (9 / 5) - 459.67).toFixed(2);
						cTempFor = (kTempFor - 273).toFixed(2);
						weatherTypeFor = data1.list[i].weather[0].description;
						weatherIconFor = data1.list[i].weather[0].id;
						weatherIconHTMLFor = '<i class="wi wi-owm-' + weatherIconFor + '"></i>';
						timestamp = data1.list[i].dt,
							date = new Date(timestamp * 1000);
						$("#forecast").append(
							"<div class='column'><div class='ui fluid card'><div class='image'>" +
							weatherIconHTMLFor +
							"</div><div class='content'>" +
							weatherTypeFor +
							"<br>" +
							fTempFor +
							"&#8457;/" +
							cTempFor +
							"&#8451; at " +
							date.toLocaleString() +
							"</div></div></div>")
					}
					//set IDs
					$("#data").html(long.toFixed(2) + " longitude " + lat.toFixed(2) + " latitude");
					$("#city").html(city);
					$("#weatherType").html(weatherType);
					$("#kTemp").html(kTemp + " &#8490;");
					$("#fTemp").html(fTemp + " &#8457;");
					$("#cTemp").html(cTemp + " &#8451;");
					$("#windSpeed").html(windSpeed.toFixed(1) + " mph");
					$("#windDir").html(windDir + "&#0176; " + windIcon);
					$('#weather-icon').html(iconcodeHtml);

					//background color by temp
					const greenColors = ["#0000ff", "#004445", "#004341", "#004d4a", "#006860", "#00743e", "#008000", "#6f7a00", "#bd6200", "#ff0000"];
					const purpleColors = ["#0000ff", "#7c00dc", "#a000b5", "#b6009b", "#c60087", "#d40076", "#e10065", "#ee0051", "#fa0036", "#ff0000"];
					var backgroundColor;

					$("input[name$='color']").click(function () {
						if ($(this).val() === "default") {
							backgroundColor = greenColors;
						} else {
							backgroundColor = purpleColors;
						}
						if (fTemp > 100) {
							$('body').css('background-color', backgroundColor[9]);
						} else if (fTemp > 90) {
							$('body').css('background-color', backgroundColor[8]);
						} else if (fTemp > 80) {
							$('body').css('background-color', backgroundColor[7]);
						} else if (fTemp > 70) {
							$('body').css('background-color', backgroundColor[6]);
						} else if (fTemp > 60) {
							$('body').css('background-color', backgroundColor[5]);
						} else if (fTemp > 50) {
							$('body').css('background-color', backgroundColor[4]);
						} else if (fTemp > 40) {
							$('body').css('background-color', backgroundColor[3]);
						} else if (fTemp > 30) {
							$('body').css('background-color', backgroundColor[2]);
						} else if (fTemp > 20) {
							$('body').css('background-color', backgroundColor[1]);
						} else {
							$('body').css('background-color', backgroundColor[0]);
						}
						})
						//user selected output  
						$("input[name$='temp']").click(function () {
							if ($(this).val() === "science") {
								$("#kTemp").css('display', 'inline');
								$("#fTemp").css('display', 'none');
								$("#cTemp").css('display', 'none');
							} else if ($(this).val() === "far") {
								$("#fTemp").css('display', 'inline');
								$("#kTemp").css('display', 'none');
								$("#cTemp").css('display', 'none');
							} else if ($(this).val() === 'cel') {
								$("#cTemp").css('display', 'inline');
								$("#fTemp").css('display', 'none');
								$("#kTemp").css('display', 'none');
							} else if ($(this).val() === 'world') {
								$("#cTemp").css('display', 'inline');
								$("#fTemp").css('display', 'inline');
								$("#kTemp").css('display', 'none');
							} else if ($(this).val() === 'all') {
								$("#cTemp").css('display', 'inline');
								$("#fTemp").css('display', 'inline');
								$("#kTemp").css('display', 'inline');
							} else {
								$("#cTemp").css('display', 'none');
								$("#fTemp").css('display', 'none');
								$("#kTemp").css('display', 'none');
							}
						});
					});
				});
			});
		}
});