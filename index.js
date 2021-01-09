const primaryColor = '#4834d4'
const warningColor = '#f0932b'
const successColor = '#6ab04c'
const dangerColor = '#eb4d4b'

const themeCookieName = 'theme'
const themeDark = 'dark'
const themeLight = 'light'

const body = document.getElementsByTagName('body')[0]

function setCookie(cname, cvalue, exdays) {
  var d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = "expires="+d.toUTCString()
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

function getCookie(cname) {
  var name = cname + "="
  var ca = document.cookie.split(';')
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ""
}

loadTheme()

function loadTheme() {
	var theme = getCookie(themeCookieName)
	body.classList.add(theme === "" ? themeLight : theme)
}

function switchTheme() {
	if (body.classList.contains(themeLight)) {
		body.classList.remove(themeLight)
		body.classList.add(themeDark)
		setCookie(themeCookieName, themeDark)
	} else {
		body.classList.remove(themeDark)
		body.classList.add(themeLight)
		setCookie(themeCookieName, themeLight)
	}
}

function collapseSidebar() {
	body.classList.toggle('sidebar-expand')
}

window.onclick = function(event) {
	openCloseDropdown(event)
}

function closeAllDropdown() {
	var dropdowns = document.getElementsByClassName('dropdown-expand')
	for (var i = 0; i < dropdowns.length; i++) {
		dropdowns[i].classList.remove('dropdown-expand')
	}
}

function openCloseDropdown(event) {
	if (!event.target.matches('.dropdown-toggle')) {
		// 
		// Close dropdown when click out of dropdown menu
		// 
		closeAllDropdown()
	} else {
		var toggle = event.target.dataset.toggle
		var content = document.getElementById(toggle)
		if (content.classList.contains('dropdown-expand')) {
			closeAllDropdown()
		} else {
			closeAllDropdown()
			content.classList.add('dropdown-expand')
		}
	}
}

///////////////////////
Chart.pluginService.register({
	beforeDraw: function (chart) {
	  var width = chart.chart.width,
		height = chart.chart.height,
		ctx = chart.chart.ctx;
	  ctx.restore();
	  var fontSize = (height / 114).toFixed(2);
	  ctx.font = fontSize + "em sans-serif";
	  ctx.textBaseline = "middle";
	  var text = chart.config.options.elements.center.text,
		textX = Math.round((width - ctx.measureText(text).width) / 2),
		textY = height / 2;
	  ctx.fillText(text, textX, textY);
	  ctx.save();
	}
  });
  
  var chartData = [
	{ visitor: 100, visit: 1 },
	{ visitor: 70, visit: 2 },
	{ visitor: 50, visit: 3 },
	// { visitor: 5, visit: 4 },
	// { visitor: 6, visit: 5 },
	// { visitor: 5, visit: 6 },
	{ visitor: 30, visit: 6 }
  ];
  
  var visitorData = [],
	sum = 0,
	visitData = [];
  
  for (var i = 0; i < chartData.length; i++) {
	visitorData.push(chartData[i]["visitor"]);
	visitData.push(chartData[i]["visit"]);
  
	sum += chartData[i]["visitor"];
  }
  
  var textInside = sum.toString();
  
  var myChart = new Chart(document.getElementById("mychart"), {
	type: "doughnut",
	animation: {
	  animateScale: true
	},
	data: {
	  labels: visitData,
	  datasets: [
		{
		  label: "Visitor",
		  data: visitorData,
		  backgroundColor: [
			"#4834d4",
			"#f0932b",
			"#6ab04c",
			// "#579aac",
			// "#7dcfe8",
			// "#b3dfe7",
			"#eb4d4b"
		  ]
		}
	  ]
	},
	options: {
	  elements: {
		center: {
		  text: textInside
		}
	  },
	  responsive: true,
	  legend: false,
	  legendCallback: function (chart) {
		var legendHtml = [];
		legendHtml.push("<ul>");
		var item = chart.data.datasets[0];
		for (var i = 0; i < item.data.length; i++) {
		  legendHtml.push("<li>");
		  legendHtml.push(
			'<span class="chart-legend" style="background-color:' +
			  item.backgroundColor[i] +
			  '"></span>'
		  );
		  legendHtml.push(
			'<span class="chart-legend-label-text">' +
			  item.data[i] +
			  " person - " +
			  chart.data.labels[i] +
			  " times</span>"
		  );
		  legendHtml.push("</li>");
		}
  
		legendHtml.push("</ul>");
		return legendHtml.join("");
	  },
	  tooltips: {
		enabled: true,
		mode: "label",
		callbacks: {
		  label: function (tooltipItem, data) {
			var indice = tooltipItem.index;
			return (
			  data.datasets[0].data[indice] +
			  " person visited " +
			  data.labels[indice] +
			  " times"
			);
		  }
		}
	  }
	}
  });
  
  $("#my-legend-con").html(myChart.generateLegend());
  
  console.log(document.getElementById("my-legend-con"));
  
///////////////////////

var ctx = document.getElementById('myChart')
ctx.height = 500
ctx.width = 500
var data = {
	labels: ['January', 'February', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	datasets: [{
		fill: false,
		label: 'Completed',
		borderColor: successColor,
		data: [120, 115, 130, 100, 123, 88, 99, 66, 120, 52, 59],
		borderWidth: 2,
		lineTension: 0,
	}, {
		fill: false,
		label: 'Issues',
		borderColor: dangerColor,
		data: [66, 44, 12, 48, 99, 56, 78, 23, 100, 22, 47],
		borderWidth: 2,
		lineTension: 0,
	}]
}

var lineChart = new Chart(ctx, {
	type: 'line',
	data: data,
	options: {
		maintainAspectRatio: false,
		bezierCurve: false,
	}
})

//slider

/*
------------------------------------------------------------
Function to activate form button to open the slider.
------------------------------------------------------------
*/
function open_panel() {
    slideIt();
    var a = document.getElementById("sidebar");
    a.setAttribute("id", "sidebar1");
    a.setAttribute("onclick", "close_panel()");
    }
    /*
    ------------------------------------------------------------
    Function to slide the sidebar form (open form)
    ------------------------------------------------------------
    */
    function slideIt() {
    var slidingDiv = document.getElementById("slider");
    var stopPosition = 400;
    if (parseInt(slidingDiv.style.right) < stopPosition) {
    slidingDiv.style.right = parseInt(slidingDiv.style.right) + 2 + "px";
    setTimeout(slideIt, 1);
    }
    }
    /*
    ------------------------------------------------------------
    Function to activate form button to close the slider.
    ------------------------------------------------------------
    */
    function close_panel() {
    slideIn();
    a = document.getElementById("sidebar1");
    a.setAttribute("id", "sidebar");
    a.setAttribute("onclick", "open_panel()");
    }
    /*
    ------------------------------------------------------------
    Function to slide the sidebar form (slide in form)
    ------------------------------------------------------------
    */
    function slideIn() {
    var slidingDiv = document.getElementById("slider");
    var stopPosition = -342;
    if (parseInt(slidingDiv.style.right) > stopPosition) {
    slidingDiv.style.right = parseInt(slidingDiv.style.right) - 2 + "px";
    setTimeout(slideIn, 1);
    }
    }