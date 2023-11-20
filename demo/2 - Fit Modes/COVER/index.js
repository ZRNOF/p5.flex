function setup() {
	createCanvas(1024, 512)
	pixelDensity(1)
	background("#00647f")
	noStroke()

	// append to a resizable div, just for demo
	const resizableDiv = document.getElementById("resizable-div")

	// p5.flex !
	flex({
		container: {
			parent: resizableDiv,
			padding: "20px",
		},
		canvas: {
			fit: COVER, // CONTAIN is the default value
		},
	})
}

function draw() {
	pin(100)
	fill(noise(frameCount) * 500)
	circle(mouseX, mouseY, 25)
	logo(100)
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
