# PseudoWindow

Adding event-handlers on the `window`/`document` can get messy as you have to imperatively write `.addEventListener` code -- steering away from Vue's simple `@event` API -- and clean it up on component destroy.

PseudoWindow is a component that abstracts away event management on the window/document through the Vue API. No more imperative event handling!


### Listenint to `window` events
```vue
<template>
	<div>
		<pseudo-window @resize="onResize" />
		Handle window resize ^
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
		Handle document click ^
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
