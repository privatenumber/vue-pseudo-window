# Pseudo Window
<a href="https://npm.im/vue-pseudo-window"><img src="https://badgen.net/npm/v/vue-pseudo-window"></a>
<a href="https://npm.im/vue-pseudo-window"><img src="https://badgen.net/npm/dm/vue-pseudo-window"></a>
<a href="https://packagephobia.now.sh/result?p=vue-pseudo-window"><img src="https://packagephobia.now.sh/badge?p=vue-pseudo-window"></a>

## :rocket: Quick setup

#### Install
```sh
npm i vue-pseudo-window
```

## :beginner: Use case [![JSFiddle Demo](https://flat.badgen.net/badge/JSFiddle/Open%20Demo/blue)](https://jsfiddle.net/hirokiosame/p5Lz419s/)

### Listening to `window` events
```vue
<template>
	<div>
		<div>
			Window width: {{ winWidth }}
		</div>

		<pseudo-window @resize.passive="onResize" />
		<!-- Handle window resize ^ -->
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

### Listening to `document` events
```vue
<template>
	<div>
		<pseudo-window document @click="onClick" />
		<!-- Handle document click ^ -->
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
```

### When you only want one root element
The PseudoWindow is a functional component that returns exactly what's passed into it. By using it as the root component, its contents will pass-through.
```vue
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


## 🏋️‍ Motivation
Adding event-handlers on the `window`/`document` can get messy with `.addEventListener()` & `.removeEventListener()` code — steering away from the convention set by Vue's simple `@event` API. The PseudoWindow component abstracts away event management on the `window`/`document` with a declartive template API. No more imperative event handling and cleanup! Supports all event modifiers `capture`, `passive`, and `once`.

Without the PseudoWindow, you may write:
```vue
<template>
	<div>
		Handle window resize
	</div>
</template>

<script>
export default {
	methods: {
		onResize() {
			console.log('Resized!')
		}
	},

	mounted() {
		window.addEventListener('resize', this.onResize)
	},

	destroyed() {
		window.removeEventListener('resize', this.onResize)
	}
}
</script>
```
