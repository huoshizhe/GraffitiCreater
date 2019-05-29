var widths = [10, Math.random() * 25 + 10, Math.random() * 50 + 10, 60];

function onPageLoaded() {
	loadMonaLisa();
	start();
}

function start() {
	setInterval(function() {
		step();
	}, 5);
}

var blink = true;

function clickBtn() {
	blink = !blink;
}

var stepIdx = 0;

function step() {
	if (blink) {
		if (stepIdx == 0) {
			var canvas = document.getElementById("myCanvas");
			var cxt = canvas.getContext("2d");
			cxt.lineCap = "round";
			drawALine(canvas, cxt, widths);
			drawALine(canvas, cxt, widths);
			stepIdx = 1;
		} else {
			copyImg(compare());
			stepIdx = 0;
		}
	} else {
		var canvas = document.getElementById("myCanvas");
		var cxt = canvas.getContext("2d");
		cxt.lineCap = "round";
		drawALine(canvas, cxt, widths);
		copyImg(compare());
		drawALine(canvas, cxt, widths);
		copyImg(compare());
	}
}

var colors = [];

function loadSample() {
	var c = document.getElementById("sampleImg");
	var myCanvas = document.getElementById("myCanvas");
	var cxt = c.getContext("2d");
	var img = new Image();
	img.onload = function() {
		c.width = img.width;
		c.height = img.height;
		myCanvas.width = img.width;
		myCanvas.height = img.height;
		cxt.drawImage(img, 0, 0);

		// var data = cxt.getImageData(0, 0, c.width, c.height).data;
		// for (var i = 0; i < data.length; i += 4) {
		// 	colors.push('#' + data[i + 0].toString(16) + data[i + 1].toString(16) + data[i + 2].toString());
		// }
		// colors.push('#000000');
		// colors.push('#FF0000');
		// colors.push('#00FF00');
		// colors.push('#0000FF');
		// colors.push('#FFFFFF');

		// console.log(colors.length);
	};
	img.src = "sample.jpg";
}

function loadResult() {
	var c = document.getElementById("myCanvas");
	var cxt = c.getContext("2d");
	var img = new Image();
	img.onload = function() {
		cxt.drawImage(img, 0, 0);
	};
	img.src = "result.jpg";
}

function loadMonaLisa() {
	loadSample();
	loadResult();
}

var backUpImgData = null;

function compare() {
	if (!backUpImgData) {
		return true;
	}

	var sampleCanvas = document.getElementById("sampleImg");
	var sampleCxt = sampleCanvas.getContext("2d");
	var sampleData = sampleCxt.getImageData(0, 0, sampleCanvas.width, sampleCanvas.height).data;

	var canvas = document.getElementById("myCanvas");
	var cxt = canvas.getContext("2d");
	var data = cxt.getImageData(0, 0, canvas.width, canvas.height).data;

	var backupData = backUpImgData.data;

	var score = 0;
	var backupScore = 0;

	for (var i = 0; i < sampleData.length; i++) {
		score += Math.max(sampleData[i] - data[i], data[i] - sampleData[i]);
		backupScore += Math.max(sampleData[i] - backupData[i], backupData[i] - sampleData[i]);
	}

	// console.log('score = ' + score + ', backupScore = ' + backupScore);

	var label = document.getElementById("label");
	label.innerHTML = Math.floor(backupScore / sampleData.length * 1000) / 1000;

	return score < backupScore;
}

function copyImg(right) {

	var canvas = document.getElementById("myCanvas");
	var cxt = canvas.getContext("2d");

	if (!backUpImgData) {
		backUpImgData = cxt.getImageData(0, 0, canvas.width, canvas.height);
	}

	if (right) {
		backUpImgData = cxt.getImageData(0, 0, canvas.width, canvas.height);
	} else {
		cxt.putImageData(backUpImgData, 0, 0);
	}
}

function drawALine(canvas, cxt, widths) {

	// cxt.strokeStyle = '#' + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16);
	// cxt.strokeStyle = '#' + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + 'FF';
	var colors = [];
	colors.push('#' + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16));
	colors.push('#' + 'FF' + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16));
	colors.push('#' + Math.floor(Math.random() * 256).toString(16) + 'FF' + Math.floor(Math.random() * 256).toString(16));
	colors.push('#' + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + 'FF');
	colors.push('#' + '00' + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16));
	colors.push('#' + Math.floor(Math.random() * 256).toString(16) + '00' + Math.floor(Math.random() * 256).toString(16));
	colors.push('#' + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + '00');
	colors.push('#' + '00' + Math.floor(Math.random() * 256).toString(16) + '00');
	colors.push('#' + Math.floor(Math.random() * 256).toString(16) + '00' + '00');
	colors.push('#' + '00' + '00' + Math.floor(Math.random() * 256).toString(16));
	colors.push('#' + 'FF' + Math.floor(Math.random() * 256).toString(16) + 'FF');
	colors.push('#' + Math.floor(Math.random() * 256).toString(16) + 'FF' + 'FF');
	colors.push('#' + 'FF' + 'FF' + Math.floor(Math.random() * 256).toString(16));

	cxt.strokeStyle = colors[Math.floor(Math.random() * colors.length)];

	var areas = [
		[0, 0, 1, 1],
		[0, 0, 0.5, 0.5],
		[0, 0.5, 0.5, 1],
		[0.5, 0, 1, 0.5],
		[0.5, 0.5, 1, 1],
		[0, 0, 0.33, 0.33],
		[0.33, 0.33, 0.66, 0.66],
		[0.66, 0.66, 1, 1],
		[0, 0, 0.33, 0.33],
		[0.33, 0.33, 0.66, 0.66],
		[0.66, 0.66, 1, 1],
		[0, 0, 0.33, 0.33],
		[0.33, 0.33, 0.66, 0.66],
		[0.66, 0.66, 1, 1],
	];

	var area = areas[Math.floor(Math.random() * areas.length)];

	cxt.lineWidth = widths[Math.floor(Math.random() * widths.length)];
	var pos1 = {
		x: canvas.width * area[0] + area[2] * Math.random() * canvas.width,
		y: canvas.height * area[1] + area[3] * Math.random() * canvas.height
	}
	var pos2 = {
		x: canvas.width * area[0] + area[2] * Math.random() * canvas.width,
		y: canvas.height * area[1] + area[3] * Math.random() * canvas.height
	}
	var controlPos1 = {
		x: canvas.width * area[0] + area[2] * Math.random() * canvas.width,
		y: canvas.height * area[1] + area[3] * Math.random() * canvas.height
	}
	var controlPos2 = {
		x: canvas.width * area[0] + area[2] * Math.random() * canvas.width,
		y: canvas.height * area[1] + area[3] * Math.random() * canvas.height
	}
	cxt.beginPath();
	cxt.moveTo(pos1.x, pos1.y);
	cxt.quadraticCurveTo(
		controlPos1.x,
		controlPos1.y,
		controlPos2.x,
		controlPos2.y,
		pos2.x,
		pos2.y
	);
	cxt.stroke();
}