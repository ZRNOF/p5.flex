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
		getParent: () => HTMLElement
		containerBg: (style: string) => void
		containerBgColor: (...args: any[]) => void
		parentBg: (style: string) => void
		parentBgColor: (...args: any[]) => void
		NONE: "none"
		SCALE_DOWN: "scale_down"
	}
}
