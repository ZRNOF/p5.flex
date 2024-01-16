/*!
 * p5.flex
 * Version: 0.2.0
 * Author: Zaron Chen
 * License: MIT
 *
 * Copyright (c) 2024 Zaron Chen
 */

;(() => {
	// common CSS style
	const RESET_BOX_MODEL = `padding: 0; margin: 0; border: 0;`
	const FULL_SIZE = `width: 100%; height: 100%;`
	const FLEX_CENTER = `display: flex; justify-content: center; align-items: center;`
	const BORDER_BOX = `box-sizing: border-box;`
	const STATIC = `position: static;`
	const HIDDEN = `overflow: hidden;`
	const BLOCK = `display: block;`

	const __p5flexStyle__ = {
		pageCSS: () => {
			const html = document.documentElement
			const body = document.body
			html.className = ""
			body.className = ""
			html.style.cssText = RESET_BOX_MODEL + FULL_SIZE
			body.style.cssText = RESET_BOX_MODEL + FULL_SIZE + FLEX_CENTER
		},
		containerCSS: (container, OPTIONS) => {
			let boxModel = ""
			if (!OPTIONS.container.customBoxModel)
				boxModel = `
				margin:  ${OPTIONS.container.margin} ;
				padding: ${OPTIONS.container.padding};
				border:  ${OPTIONS.container.border} ;
			`
			container.style.cssText = `
			max-width:  ${OPTIONS.container.width};
			max-height: ${OPTIONS.container.height};
			width:  ${OPTIONS.container.width};
			height: ${OPTIONS.container.height};
			${BORDER_BOX + FLEX_CENTER + boxModel}
		`
		},
		canvasScaleCSS: (OPTIONS) => {
			return `
			max-width:  ${100 * OPTIONS.canvas.scale}%;
			max-height: ${100 * OPTIONS.canvas.scale}%;
		`
		},
		// for COVER | NONE mode
		innerContainerCSS: (innerContainer, OPTIONS) => {
			const scale = __p5flexStyle__.canvasScaleCSS(OPTIONS)
			let style = scale + STATIC + FLEX_CENTER + HIDDEN
			if (OPTIONS.canvas.fit === "cover") style += FULL_SIZE
			innerContainer.style.cssText = style
		},
		canvasCSS: (canvas, OPTIONS) => {
			const fit = OPTIONS.canvas.fit
			let fitStyle = __p5flexStyle__.canvasScaleCSS(OPTIONS)
			if (["cover", "none"].includes(fit)) fitStyle = ""
			if (fit === "fill") fitStyle += FULL_SIZE
			canvas.elt.style.cssText = `
			${STATIC + RESET_BOX_MODEL + BORDER_BOX + fitStyle + BLOCK}
		`
		},
	}

	// provide margin, padding, and border for the container
	// using .style to access padding is faster than using getComputedStyle
	//
	// in default mode (customBoxModel === false), users cannot use percentage in padding
	// because it requires computing the padding value every time the container is resized or the aspect ratio changes
	//
	// setting customBoxModel to true allows user to use sheet style, but it will use getComputedStyle
	// in this mode, users can use percentage in padding
	const DEFAULT_OPTIONS = {
		container: {
			id: undefined,
			parent: undefined,
			width: "100%",
			height: "100%",
			margin: "0",
			padding: "0",
			border: "0",
			customBoxModel: false,
		},
		canvas: {
			scale: 1,
			fit: "contain",
		},
		stylePage: true,
	}

	// merge DEFAULT_OPTIONS & custom options
	const mergeOptions = (defaultOpts, userOpts) => {
		return {
			...defaultOpts,
			...userOpts,
			container: {
				...defaultOpts.container,
				...userOpts.container,
			},
			canvas: {
				...defaultOpts.canvas,
				...userOpts.canvas,
			},
		}
	}

	// p5.flex main function
	const p5flex = (canvas, options) => {
		const OPTIONS = mergeOptions(DEFAULT_OPTIONS, options)
		const fit = OPTIONS.canvas.fit
		const customBoxModel = OPTIONS.container.customBoxModel

		// style html and body if stylePage set to true
		if (OPTIONS.stylePage) __p5flexStyle__.pageCSS()

		// set container parent
		const parent = OPTIONS.container.parent ?? document.body
		OPTIONS.container.parent = parent

		// create p5-flex-container
		const container = document.createElement("div")
		const id = OPTIONS.container.id ?? `p5-flex-container-${canvas.elt.id}`
		container.id = OPTIONS.container.id = id
		canvas.elt.container = container

		// style p5-flex-container and append it to specified parent or body
		__p5flexStyle__.containerCSS(container, OPTIONS)
		container.classList.add("p5-flex-container")
		parent.appendChild(container)

		// create inner container, only in COVER | NONE mode
		// because COVER and NONE modes utilize CSS overflow hidden
		// container -> inner container -> p5 canvas
		let innerContainer
		if (["cover", "none"].includes(fit)) {
			innerContainer = document.createElement("div")
			__p5flexStyle__.innerContainerCSS(innerContainer, OPTIONS)
			container.appendChild(innerContainer)
		}

		// calculate vertical and horizontal padding values
		// paddingVer and paddingHor will be used in the stretchToContain function
		// to calculate the correct container width and height
		const calcPadding = () => {
			const containerStyle = customBoxModel
				? getComputedStyle(container) // user custom sheet style
				: container.style // faster
			const padding = (side) => parseFloat(containerStyle[`padding${side}`])
			const paddingVer = padding("Top") + padding("Bottom")
			const paddingHor = padding("Left") + padding("Right")
			return [paddingVer, paddingHor]
		}
		let [paddingVer, paddingHor] = calcPadding()

		// store last resized element, "container" | "canvas"
		let resizedElement = ""

		// store stretch side, "width" | "height"
		let stretchSide = ""

		// stretch & stretchToContain only in CONTAIN | COVER mode
		// one direction (either width or height) needs to stretch to fit the container
		// to keep the aspect ratio, the other direction does not need to stretch
		const stretch = (side) => {
			if (resizedElement === "container" && stretchSide === side) return
			stretchSide = side
			canvas.elt.style.width = side === "width" ? "100%" : ""
			canvas.elt.style.height = side === "height" ? "100%" : ""
		}
		const stretchToContain = () => {
			requestAnimationFrame(() => {
				if (customBoxModel) [paddingVer, paddingHor] = calcPadding()

				const containerW = container.clientWidth - paddingHor
				const containerH = container.clientHeight - paddingVer
				const containerAR = containerW / containerH
				const canvasAR = canvas.width / canvas.height

				if (containerAR >= canvasAR) {
					if (fit === "contain") stretch("height")
					if (fit === "cover") stretch("width")
				} else {
					if (fit === "contain") stretch("width")
					if (fit === "cover") stretch("height")
				}
			})
		}

		// set ResizeObserver for the container
		if (["contain", "cover"].includes(fit)) {
			new ResizeObserver(() => {
				resizedElement = "container"
				stretchToContain()
			}).observe(container)
		}

		// style canvas and append it to p5-flex-container
		__p5flexStyle__.canvasCSS(canvas, OPTIONS)
		if (["cover", "none"].includes(fit)) {
			innerContainer.classList.add("p5-flex-canvas")
			canvas.parent(innerContainer)
		} else {
			canvas.elt.classList.add("p5-flex-canvas")
			canvas.parent(container)
		}

		// monkey patching the resize function of the p5.js library
		// original implementation:
		//   https://github.com/processing/p5.js/blob/v1.8.0/src/core/p5.Renderer.js#L123
		const originalResize = canvas.resize
		canvas.resize = function (w, h) {
			originalResize.call(this, w, h)
			__p5flexStyle__.canvasCSS(canvas, OPTIONS)
			if (["contain", "cover"].includes(fit)) {
				resizedElement = "canvas"
				stretchToContain()
			}
		}
	}

	// mount p5.flex to p5
	window.mountFlex = (p5) => {
		p5.prototype.flex = function (options = {}) {
			p5flex(this._renderer, options)
		}
		p5.prototype.getCanvas = function () {
			return this._renderer.elt
		}
		p5.prototype.getContainer = function () {
			return this.getCanvas().container
		}
		p5.prototype.getParent = function () {
			return this.getContainer().parentNode
		}
		p5.prototype.containerBg = function (style) {
			this.getContainer().style.background = style
		}
		p5.prototype.containerBgColor = function (...args) {
			const color = this._renderer._pInst.color(...args)
			this.getContainer().style.background = color.toString()
		}
		p5.prototype.parentBg = function (style) {
			this.getParent().style.background = style
		}
		p5.prototype.parentBgColor = function (...args) {
			const color = this._renderer._pInst.color(...args)
			this.getParent().style.background = color.toString()
		}
		p5.prototype.NONE = "none"
		p5.prototype.SCALE_DOWN = "scale_down"
	}

	if (typeof p5 !== "undefined") mountFlex(p5)
})()
