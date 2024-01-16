# p5.flex

[![NPM Package][npm]][npm-url]

[![p5.flex preview][preview]][preview-url]

`p5.flex` is a tool that creates a container to hold your p5 canvas and ensures the canvas fits the container, similar to CSS `object-fit`.

It offers modes like `CONTAIN`, `COVER`, `FILL`, `NONE`, and `SCALE_DOWN` to specify how the canvas should fit the container.

Using `p5.flex` can make your p5 canvas responsive while maintaining correct mouse positions ( you can still use `mouseX` and `mouseY` ! ).

## Usage

### CDN

Make sure to include `p5` first:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.min.js"></script>
```

Next, include `p5.flex` after `p5`. Choose one of those versions that suits your needs:

```html
<script src="https://cdn.jsdelivr.net/npm/p5.flex@0.2.0/src/p5.flex.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5.flex@0.2.0/src/p5.flex.min.js"></script>
```

Here's a example of using `flex()` to make your p5 canvas responsive:

```js
function setup() {
  createCanvas(512, 256)

  // p5.flex!
  // Call flex() after createCanvas()
  flex()

  pixelDensity(2)
  background("#00647f")
}

function draw() {
  fill(noise(frameCount) * 500)
  circle(mouseX, mouseY, 25)
}
```

See more [demos](https://github.com/ZRNOF/p5.flex/tree/main/demo) and [tutorial](https://openprocessing.org/sketch/2098443).

If you're uncertain about the order of script inclusion or encounter a 'flex is not defined' error, use `mountFlex()` before `setup()` to mount `p5.flex` onto `p5`.

```js
mountFlex(p5)

function setup() {
  createCanvas(...canvasSize)
  flex()
  // ...
}
// ...
```

For using the ES6 module version of p5.flex:

```js
import { mountFlex } from "https://cdn.jsdelivr.net/npm/p5.flex@0.2.0/src/p5.flex.mjs"
// import { mountFlex } from "https://cdn.jsdelivr.net/npm/p5.flex@0.2.0/src/p5.flex.min.mjs" /* minify */

mountFlex(p5)

const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(...canvasSize)
    p.flex()
    // ...
  }
  // ...
}
// ...
```

### NPM

To install `p5.flex` using npm, you can run:

```bash
npm i p5.flex
```

Example:

```js
import p5 from "p5"
import { mountFlex } from "p5.flex"

mountFlex(p5)

const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(512, 256)
    
    // p5.flex!
    p.flex()

    p.pixelDensity(2)
    p.background("#00647f")
  }
  p.draw = () => {
    p.fill(p.noise(p.frameCount) * 500)
    p.circle(p.mouseX, p.mouseY, 25)
  }
}

new p5(sketch)
```

### Parameters

Adjust the following default parameters as needed:

```js
flex({
  container: {
    id: undefined, // string, id for container
    parent: undefined, // HTMLElement<'div'>, Parent node to which the container will be mounted
    width: "100%", // string, CSS width & max-width for the container
    height: "100%", // string, CSS height & max-height for the container
    margin: "0", // string, CSS margin
    padding: "0", // string, CSS padding, cannot use percentage
    border: "0", // string, CSS border
    customBoxModel: false, // boolean, Whether to use a custom box model
  },
  canvas: {
    scale: 1, // number, Scale of the canvas (0 to 1)
    fit: CONTAIN, // string, Fit mode: CONTAIN | COVER | FILL | NONE | SCALE_DOWN
  },
  stylePage: true, // boolean, Whether to style the HTML and body elements
})
```

## CSS

To style the container, you can use the class `p5-flex-container`. For the canvas, utilize the class `p5-flex-canvas`. Here's an example:

```css
.p5-flex-container {
  background: cyan;
}

.p5-flex-canvas {
  box-shadow: 0px 0px 15px black;
}
```

You can also set an ID for the container and use it in your CSS stylesheet. In `flex()`:

```js
flex({
  container: {
    id: "myContainer",
  },
})
```

And in your CSS:

```css
#myContainer {
  background: cyan;
}
```

Please note that `p5.flex` uses inline CSS, so some CSS properties cannot be directly overwritten by a stylesheet.
If you want a custom box model for `.p5-flex-container` using a stylesheet, set `customBoxModel` to `true`.

`.p5-flex-canvas` does not provide overwrite capabilities for the box model via a stylesheet.

⚠️ Careful or avoid modifying anything related to position, display, or the box model in `.p5-flex-container` and `.p5-flex-canvas`.

## Other

`p5.flex` also provides some additional features:

- `getCanvas()`: get the canvas element.
- `getContainer()`: get the container element.
- `getParent()`: get the parent element.
- `containerBg(style: string)`: set the container element background.
- `containerBgColor(...args: any[])`: set the container element background color.
- `parentBg(style: string)`: set the parent element background.
- `parentBgColor(...args: any[])`: set the parent element background color.
- `NONE`: a constant with the value "none".
- `SCALE_DOWN`: a constant with the value "scale_down".

## Note

`p5.flex` utilizes CSS to implement responsiveness. `p5.flex` does not use CSS `object-fit`. Instead, it employs CSS properties like `width`, `height`, `max-width`, `max-height`, etc. The switch between `width` and `height` values occurs only when the aspect ratio of the container and canvas differs from the previous result. This switch happens only in `CONTAIN` and `COVER` modes. If the HTML element structure is too complex and involves frequent resizing, it may incur a performance cost.

CSS `object-fit` can lead to incorrect mouse positions, so I choose not to use it for implementation. However, the naming of fit modes is indeed inspired by the `object-fit` modes.

## License

Please refer to [the MIT license](https://github.com/ZRNOF/p5.flex/blob/main/LICENSE) for detailed licensing information.


[npm]: https://img.shields.io/npm/v/p5.flex
[npm-url]: https://www.npmjs.com/package/p5.flex
[preview]: https://github.com/ZRNOF/p5.flex/blob/main/preview.png
[preview-url]: https://github.com/ZRNOF/p5.flex/tree/main#p5flex
