<h1>
	:framed_picture: Pseudo Window
	<a href="https://npm.im/vue-pseudo-window"><img src="https://badgen.net/npm/v/vue-pseudo-window"></a>
	<a href="https://npm.im/vue-pseudo-window"><img src="https://badgen.net/npm/dm/vue-pseudo-window"></a>
	<a href="https://packagephobia.now.sh/result?p=vue-pseudo-window"><img src="https://packagephobia.now.sh/badge?p=vue-pseudo-window"></a>
	<a href="https://bundlephobia.com/result?p=vue-pseudo-window"><img src="https://badgen.net/bundlephobia/minzip/vue-pseudo-window"></a>
</h1>

> A pseudo `window` component to declaratively bind event-listeners to `window` or `document` in your Vue template

## :raising_hand: Why?
- :sparkles: **Cleaner code** No longer concern or pollute your component with `.addEventListener()` & `.removeEventListener()` code
- :recycle: **Template API** Use Vue's `@event` syntax to bind listeners to the window as like you would to any other element
- :muscle: **Robust** Supports all event modifiers `capture`, `passive`, and `once`. SSR friendly.
- :hatched_chick: **Tiny** 855 B Gzipped!

## :rocket: Install
```sh
npm i vue-pseudo-window
```

## :man_teacher: Use case [![JSFiddle Demo](https://flat.badgen.net/badge/JSFiddle/Open%20Demo/blue)](https://jsfiddle.net/hirokiosame/p5Lz419s/)

### Adding event listeners to `window`
```vue
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

### Adding event listeners to `document`
```vue
<template>
	<div>
		<pseudo-window
			document
			
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
```

### Adding event listeners and classes to `document.body`
```vue
<template>
	<div>
		<pseudo-window
			body

			<!-- Add a class to document.body -->
			:class="$style.lockScroll"

			<!-- Handle document.body click -->
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

## :family: Related
- [vue-subslot](https://github.com/privatenumber/vue-subslot) - 💍 Pick 'n choose what you want from a slot passed into your Vue component
- [vue-proxi](https://github.com/privatenumber/vue-proxi) - 💠 Tiny proxy component for Vue.js
- [vue-vnode-syringe](https://github.com/privatenumber/vue-vnode-syringe) - 🧬Mutate your vNodes with vNode Syringe 💉

