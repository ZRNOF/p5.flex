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

declare const flex: (options?: P5FlexOptions) => void
declare const getCanvas: () => HTMLCanvasElement
declare const getContainer: () => HTMLDivElement
declare const NONE: "none"
declare const SCALE_DOWN: "scale_down"
