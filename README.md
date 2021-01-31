# 🖼 Pseudo Window <a href="https://npm.im/vue-pseudo-window"><img src="https://badgen.net/npm/v/vue-pseudo-window"></a> <a href="https://npm.im/vue-pseudo-window"><img src="https://badgen.net/npm/dm/vue-pseudo-window"></a> <a href="https://packagephobia.now.sh/result?p=vue-pseudo-window"><img src="https://packagephobia.now.sh/badge?p=vue-pseudo-window"></a> <a href="https://bundlephobia.com/result?p=vue-pseudo-window"><img src="https://badgen.net/bundlephobia/minzip/vue-pseudo-window"></a>

Vue component to bind event-handlers or classes to `window`/`document`/`body`!

Insert pseudo-window anywhere in your template:
```html
<pseudo-window @resize.passive="handleResize" />
```

## 🚀 Install
```sh
npm i vue-pseudo-window
```
## 🙋‍♂️ Why?

- :sparkles: **Cleaner code** No longer pollute your component with `.addEventListener()` & `.removeEventListener()`
- :recycle: **Template API** Use Vue's `@event` syntax to bind listeners to the window as like you would to any other element
- :muscle: **Robust** Supports all event modifiers `capture`, `passive`, and `once`. SSR friendly.
- :hatched_chick: **Tiny** 855 B Gzipped!

### Before
```html
<template>
  ...
</template>

<script>
export default {

	// Your component would be polluted with event binding logic
	mounted() {
		window.addEventListener('resize', this.handleResize, { passive: true })
	},

	beforeDestroy() {
		window.removeEventListener('resize', this.handleResize)
	},

	methods: {
		handleResize() {
			...
		}
	}
}
</script>
```

### After <sup>✨</sup>

```html
<template>
	<div>
		...

		<!-- Insert pseudo-window anywhere in your template -->
		<pseudo-window @resize.passive="handleResize" />
	</div>
</template>

<script>
export default {

	// Much cleaner!
	methods: {
		handleResize() {
			...
		}
	}
}
</script>
```

## :man_teacher: Demos [![JSFiddle Demo](https://flat.badgen.net/badge/JSFiddle/Open%20Demo/blue)](https://jsfiddle.net/hirokiosame/p5Lz419s/)

<details>
	<summary><strong>Adding listeners to <code>window</code></strong></summary>
	<br>

```html
<template>
	<div>
		<div>
			Window width: {{ winWidth }}
		</div>

		<pseudo-window
			<!-- Handle window resize with "passive" option -->
			@resize.passive="onResize"
		/>
	</div>
</template>

<script>
import PseudoWindow from 'vue-pseudo-window';

export default {
	components: {
		PseudoWindow
	},
	
	data() {
		return {
			winWidth: 0
		}
	},

	methods: {
		onResize() {
			this.winWidth = window.innerWidth;
		}
	}
}
</script>
```
</details>

<details>
	<summary><strong>Adding class & listeners to <code>document &lt;html&gt;</code></strong></summary>
	<br>

```html
<template>
	<div>
		<pseudo-window
			document

			<!-- Add a class to <html> -->
			:class="$style.lockScroll"

			<!-- Handle document click -->
			@click="onClick"
		/>
	</div>
</template>

<script>
import PseudoWindow from 'vue-pseudo-window';

export default {
	components: {
		PseudoWindow
	},

	methods: {
		onClick() {
			console.log('Document click!')
		}
	}
}
</script>

<style module>
.lockScroll {
	overflow: hidden;
}
</style>
```
</details>

<details>
	<summary><strong>Adding class & listeners to <code>body &lt;body&gt;</code></strong></summary>
	<br>

```html
<template>
	<div>
		<pseudo-window
			body

			<!-- Add a class to <body> -->
			:class="$style.lockScroll"

			<!-- Handle body click -->
			@click="onClick"
		/>
	</div>
</template>

<script>
import PseudoWindow from 'vue-pseudo-window';

export default {
	components: {
		PseudoWindow
	},

	methods: {
		onClick() {
			console.log('Body click!')
		}
	}
}
</script>

<style module>
.lockScroll {
	overflow: hidden;
}
</style>
```
</details>

<details>
	<summary><strong>Only want one root element?</strong></summary>
	<br>
	
PseudoWindow is a functional component that returns exactly what's passed into it. By using it as the root component, its contents will pass-through.

```html
<template>
	<pseudo-window
		@blur="pause"
		@focus="resume"
	>
		<video>
			<source
				src="/media/examples/flower.webm"
				type="video/webm"
			>
		</video>
	</div>
</template>

<script>
import PseudoWindow from 'vue-pseudo-window';

export default {
	components: {
		PseudoWindow
	},

	methods: {
		resume() {
			this.$el.play()
		},
		pause() {
			this.$el.pause()
		}
	}
}
</script>
```
</details>

## :family: Related
- [vue-subslot](https://github.com/privatenumber/vue-subslot) - 💍 Pick 'n choose what you want from a slot passed into your Vue component
- [vue-proxi](https://github.com/privatenumber/vue-proxi) - 💠 Tiny proxy component for Vue.js
- [vue-vnode-syringe](https://github.com/privatenumber/vue-vnode-syringe) - 🧬Mutate your vNodes with vNode Syringe 💉
