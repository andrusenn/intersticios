/*
Intersticios fragmentados

Project: https://github.com/andrusenn/intersticios
Andrés Senn - 2022 - https://www.fxhash.xyz/u/andrusenn
*/
const loading = document.getElementById("loading");
const per = document.getElementById("per");

var rotations;
var rotate_harmo;
var harmo;
var ghost;
var fixcolor;
function setup() {
	const cv = createCanvas(2160, 2160);
	cv.parent("cv");
	cv.id("__IntersticiosFragmentados");
	cv.class("__IntersticiosFragmentados");
	pixelDensity(1);
	// fxhash features
	seed = fxrand() * 100000000000;
	window.$fxhashFeatures = {
		seed: seed,
	};

	randomSeed(seed);
	noiseSeed(seed);

	harmo = new Harmonograph();
	harmo.cx = map(fxrand(), 0, 1, -width / 2, width / 2);
	harmo.vel_theta = radians(map(fxrand(), 0, 1, 0.001, 0.002));
	harmo.vel_phi = radians(map(fxrand(), 0, 1, 0.001, 0.002));
	harmo.vel_alpha = radians(map(fxrand(), 0, 1, 0.1, 0.2));
	harmo.friction = map(fxrand(), 0, 1, 0.999998, 0.999996);
	harmo.minfricc = random(0.4, 0.5);
	harmo.noise_size2x = random(0.001, 0.002);
	harmo.noise_size2y = random(0.001, 0.002);
	harmo.icx = width / 2;
	harmo.icy = height * 0.9;

	rotations = [0, PI / 2, PI, PI + PI / 2];

	// Ghost -----------------------------
	ghost = createGraphics(width, height);
	ghost.id("ghost");
	ghost.background(0);
	ghost.noStroke();
	ghost.fill(255);
	for (let i = 0; i < 4; i++) {
		ghost.circle(random(width), random(height), random(400, 1200));
	}
	for (let i = 0; i < 3; i++) {
		ghost.rect(
			random(width),
			random(height),
			random(100, 400),
			random(100, 400),
		);
	}
	// ------------------------------------
	background(0);
	colorMode(HSB, 255, 255, 255);
	fixcolor = [
		color(240, 200, 250),
		color(130, 200, 250),
		color(40, 200, 250),
	];

	// Background ---------------------------
	noStroke();
	let gradient = drawingContext.createLinearGradient(
		-width / 2,
		-height / 2,
		width / 2,
		height / 2,
	);
	gradient.addColorStop(0, color(random(255, 167)));
	gradient.addColorStop(1, color(random(0, 40)));
	drawingContext.fillStyle = gradient;
	push();
	translate(width / 2, height / 2);
	rotate(rotations[int(random(0, 4))]);
	translate(-width / 2, -height / 2);
	rect(0, 0, width, height);
	pop();

	// Rect ---------------------------------
	push();
	translate(width / 2, height / 2);
	rotate(rotations[int(random(0, 4))]);
	translate(-width / 2, -height / 2);
	let brw = random(50, 150);
	let brp = random(width) - brw;
	let gradientRect = drawingContext.createLinearGradient(
		brp,
		0,
		brw,
		height / 2,
	);
	gradient.addColorStop(0, "#000");
	gradient.addColorStop(1, "#333");
	drawingContext.fillStyle = gradientRect;
	rect(brp, 0, brw, height);
	pop();

	// Gradiant circles ----------------------
	for (let i = 0; i < 3; i++) {
		let x = random(width);
		let y = random(height);
		let r = random(200, 1200);
		let gradient2 = drawingContext.createRadialGradient(
			x,
			y - r / 2,
			0,
			x,
			y,
			r,
		);
		gradient2.addColorStop(0, color(0, 200));
		gradient2.addColorStop(1, color(255, 200));
		drawingContext.fillStyle = gradient2;
		push();
		translate(width / 2, height / 2);
		rotate(random(TAU));
		translate(-width / 2, -height / 2);
		circle(x, y, r);
		pop();
	}

	// Initial Rotation
	rotate_harmo = rotations[int(random(0, 4))];

	document.title = `Intarsticios fragmentados | Andr\u00e9s Senn | 2022`;
	console.log(
		`%c Intarsticios fragmentados | Andr\u00e9s Senn | fxhash 01/2022 | Projet code: https://github.com/andrusenn/intersticios`,
		"background:#eee;border-radius:10px;background-size:15%;font-color:#222;padding:10px;font-size:15px;text-align:center;",
	);
}
function draw() {
	push();
	translate(width / 2, height / 2);
	rotate(rotate_harmo);
	translate(-width / 2, -height / 2);
	for (let j = 0; j < 100; j++) {
		for (let i = 0; i < 100; i++) {
			harmo.update();
			push();
			let col = map(
				brightness(ghost.get(int(harmo.x), int(harmo.y))),
				0,
				100,
				255,
				0,
			);
			stroke(col,200);
			strokeWeight(1.6);
			if (i % int(random(60,80)) == 0) {
				strokeWeight(7);
			}
			point(harmo.x, harmo.y);
			pop();
		}
	}
	pop();

	// Generating
	per.style.transform = `scale(${frameCount / 30},1)`;
	// Finish
	if (frameCount >= 40) {
		loading.style.display = "none";
		// Displace
		for (let i = 0; i < 3; i++) {
			push();
			let gh = random(3*(i+1), 50*(i+1));
			translate(width / 2, height / 2);
			rotate((TAU / 8) * int(random(0, 9)));
			translate(-width / 2, -height / 2);
			let img = get(0, random(height - gh), width, gh);
			let iyp = random(height - gh);
			image(img, 0, iyp);
			pop();
		}
		// Color line ------------------------
		push();
		translate(width / 2, height / 2);
		rotate((TAU / 4) * int(random(0, 5)));
		translate(-width / 2, -height / 2);
		let rGrad = drawingContext.createLinearGradient(0, 0, width, 0);
		let idx = int(random(3));
		rGrad.addColorStop(0.2, color(0, 0));
		rGrad.addColorStop(0.5, fixcolor[idx]);
		rGrad.addColorStop(0.8, color(0, 0));
		drawingContext.fillStyle = rGrad;
		let clw = random(8, 16);
		let clpy = random(height - clw + clw / 2);
		rect(0, clpy, width, clw);
		pop();
		if (!isFxpreview) {
			fxpreview();
		}
		noLoop();
	}
}

function keyReleased() {
	if (key == "p" || key == "P") {
		pause = !pause;
		if (pause) {
			noLoop();
		} else {
			loop();
		}
	}
	if (key == "s" || key == "S") {
		let date =
			year() +
			"" +
			month() +
			"" +
			day() +
			"" +
			hour() +
			"" +
			minute() +
			"" +
			second() +
			"" +
			".png";
		console.log(
			`%c SAVING ${
				String.fromCodePoint(0x1f5a4) + String.fromCodePoint(0x1f90d)
			}`,
			"background: #000; color: #ccc;padding:5px;font-size:15px",
		);
		saveCanvas("_" + date);
	}
}
class Harmonograph {
	constructor() {
		this.theta = 0.0;
		this.phi = 0.0;
		this.vel_theta = 0;
		this.vel_phi = 0;
		this.alpha = 0.0;
		this.radio_x1;
		this.vel_alpha = 0;
		this.friction = 0;
		this.multr = 1;
		this.x = 0.0;
		this.y = 0.0;
		this.minfricc = 0;
		// Centro del plano / Center of plane
		this.cx = 0.0;
		this.cy = 0.0;
		this.icx = 0.0;
		this.icy = 0.0;

		this.movx = 0.0;
		this.movy = 0.0;
		this.initrx2 = 0;
		this.initry2 = 0;
		this.noise_size = 0.001;
		this.noise_size2x = 0;
		this.noise_size2y = 0;
		this.n;
		this.n2;
		this.fr = true;
	}
	setVelPendulum1() {}
	update() {
		this.n = noise(this.x * this.noise_size, this.y * this.noise_size);
		this.n2 = noise(this.x * this.noise_size2x, this.y * this.noise_size2y);
		this.noise_size = map(this.n2, 0, 1, 0.002, 0.008);
		let rx1 = map(this.n, 0, 1, 2160 * 0.06, 2160 * 0.1) * this.multr;
		let ry1 = map(this.n, 0, 1, 2160 * 0.1, 2160 * 0.06) * this.multr;
		let rx2 = map(this.n, 0, 1, 2160 * 0.25, 2160 * 0.4) * this.multr;
		let ry2 = map(this.n, 0, 1, 2160 * 0.25, 2160 * 0.4) * this.multr;
		// Pendulum 1
		this.cx = this.icx + this.movx + cos(-this.theta) * rx1;
		this.cy = this.icy + this.movy + sin(this.phi) * ry1;
		// Pendulum 2
		this.x = this.cx + sin(this.alpha) * rx2;
		this.y = this.cy + cos(this.alpha) * ry2;

		this.theta += this.vel_theta;
		this.phi += this.vel_phi;
		if (this.multr < this.minfricc && this.fr) {
			this.fr = false;
		}
		if (this.multr > 0.99 && !this.fr) {
			this.fr = true;
		}
		if (this.fr) {
			this.multr *= this.friction;
		} else {
			this.multr /= this.friction;
		}

		this.alpha += this.vel_alpha;
		// add center movement
		this.movx -= 0;
		this.movy -= 0.0022;
	}
}
