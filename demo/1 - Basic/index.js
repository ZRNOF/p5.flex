function setup() {
	createCanvas(512, 256)
	pixelDensity(2)
	background("#00647f")
	noStroke()

	// p5.flex !
	flex()
}

function draw() {
	pin(50)
	fill(noise(frameCount) * 500)
	circle(mouseX, mouseY, 25)
	logo(50)
}

function pin(circleSize) {
	fill(0)
	for (let x = 0; x <= width; x += width / 2) {
		for (let y = 0; y <= height; y += height / 2) {
			circle(x, y, circleSize)
		}
	}
}

function logo(logoSize) {
	textStyle(BOLD)
	textFont("Verdana")
	textAlign(CENTER, CENTER)
	textSize(logoSize)
	fill(255)
	text("p5.flex", width / 2, height / 2)
}

function keyPressed() {
	resizeCanvas(height, width)
	background("#00647f")
}
