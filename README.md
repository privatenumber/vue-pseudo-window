# Pseudo Window
<a href="https://npm.im/vue-pseudo-window"><img src="https://badgen.net/npm/v/vue-pseudo-window"></a>
<a href="https://npm.im/vue-pseudo-window"><img src="https://badgen.net/npm/dm/vue-pseudo-window"></a>
<a href="https://packagephobia.now.sh/result?p=vue-pseudo-window"><img src="https://packagephobia.now.sh/badge?p=vue-pseudo-window"></a>

## :rocket: Quick setup

#### Install
```sh
npm i vue-pseudo-window
```

## :beginner: Use case

### Listening to `window` events
```vue
<template>
	<div>
		<pseudo-window @resize="onResize" />
		<!-- Handle window resize ^ -->
	</div>
</template>

<script>
import PseudoWindow from 'vue-pseudo-window';

export default {
	components: {
		PseudoWindow,
	},

	methods: {
		onResize() {
			console.log('Resized!')
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
		PseudoWindow,
	},

	methods: {
		onClick() {
			console.log('Document click!')
		}
	}
}
</script>
```

## 🏋️‍ Motivation
Adding event-handlers on the `window`/`document` can get messy as you have to imperatively write `.addEventListener` code -- steering away from Vue's simple `@event` API -- and clean it up on component destroy.

PseudoWindow is a component that abstracts away event management on the window/document through the Vue API. No more imperative event handling!

Supports all event modifiers `capture`, `passive`, and `once`.

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
		window.addEventListener('resize', this.onResize);
	},

	destroyed() {
		window.removeEventListener('resize', this.onResize);
	}
}
</script>
```
