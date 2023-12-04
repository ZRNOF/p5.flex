import "p5"

interface P5FlexOptions {
	container?: {
		id?: string | undefined
		parent?: HTMLDivElement | undefined
		width?: string
		height?: string
		margin?: string
		padding?: string
		border?: string
		customBoxModel?: boolean
	}
	canvas?: {
		scale?: number
		fit?: string
	}
	stylePage?: boolean
}

declare module "p5" {
	interface p5InstanceExtensions {
		flex: (options?: P5FlexOptions) => void
		getCanvas: () => HTMLCanvasElement
		getContainer: () => HTMLDivElement
		NONE: "none"
		SCALE_DOWN: "scale_down"
	}
}
