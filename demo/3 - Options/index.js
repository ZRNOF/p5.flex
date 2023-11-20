function setup() {
	createCanvas(512, 512)
	pixelDensity(2)
	background("#00647f")
	noStroke()

	// append to a resizable div, just for demo
	const resizableDiv = document.getElementById("resizable-div")

	// p5.flex !
	flex({
		container: {
			id: "myContainer",
			parent: resizableDiv, // The parent node to which the container will be attached
			width: "80%", // The maximum width for the container
			height: "90%", // The maximum height for the container
			margin: "0px", // CSS margin
			padding: "25px", // CSS padding
			border: "20px solid black", // CSS border
			customBoxModel: false, // Whether to use a custom box model
		},
		canvas: {
			scale: 1, // Scale factor for the canvas (range: [0, 1])
			fit: COVER, // Fit mode: CONTAIN | COVER | FILL | SCALE_DOWN
		},
		stylePage: true, // Whether to style the HTML and body elements
	})
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
