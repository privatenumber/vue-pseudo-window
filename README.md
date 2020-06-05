# :framed_picture: Pseudo Window
<a href="https://npm.im/vue-pseudo-window"><img src="https://badgen.net/npm/v/vue-pseudo-window"></a>
<a href="https://npm.im/vue-pseudo-window"><img src="https://badgen.net/npm/dm/vue-pseudo-window"></a>
<a href="https://packagephobia.now.sh/result?p=vue-pseudo-window"><img src="https://packagephobia.now.sh/badge?p=vue-pseudo-window"></a>

> A pseudo `window` component to declaratively bind event-listeners to `window` or `document` in your Vue template

## :raised_hand: Why?
- **Noise reduction** No longer concern or pollute your component with `.addEventListener()` & `.removeEventListener()` code
- **Declarative API** Use Vue's `@event` syntax to add event-listeners to the window as like you would to any other element
- **Robust** Supports all event modifiers `capture`, `passive`, and `once`. SSR friendly.
- **Tiny** Optimized for high compression and includes only the bare minimum

## :rocket: Installation
```sh
npm i vue-pseudo-window
```

## :beginner: Use case [![JSFiddle Demo](https://flat.badgen.net/badge/JSFiddle/Open%20Demo/blue)](https://jsfiddle.net/hirokiosame/p5Lz419s/)

### Adding event listeners to `window`
```vue
<template>
	<div>
		<div>
			Window width: {{ winWidth }}
		</div>

		<pseudo-window
			@resize.passive="onResize" <!-- Handle window resize with "passive" option -->
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

### Adding event listeners to `document`
```vue
<template>
	<div>
		<pseudo-window
			document
			@click="onClick" <!-- Handle document click -->
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
```

### Adding event listeners and classes to `<html>` or `<body>`
```vue
<template>
	<div>
		<pseudo-window
			document

			<!-- Add a class to html -->
			:class="$style.lockScroll"

			<!-- Handle document click -->
			@click="onClick"
		/>

		<pseudo-window
			body

			<!-- Add a class to body -->
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

## Related
- [vue-subslot](https://github.com/privatenumber/vue-subslot) - 💍 Pick 'n choose what you want from a slot passed into your Vue component
