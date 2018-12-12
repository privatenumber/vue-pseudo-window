<script>
export default {
  name: "pseudo-window",

  props: {
    document: Boolean
  },

  render: function() {
    var defSlot = this.$slots.default;
    return defSlot && defSlot.length === 1 ? defSlot[0] : defSlot;
  },

  data: function() {
    return { handlers: [] };
  },

  mounted: function() {
    this.bindEventListeners();
  },
  destroyed: function() {
    this.unbindEventListeners();
  },

  methods: {
    bindEventListeners: function() {
      var $listeners = this.$listeners;
      for (var event in $listeners) {
        if (!$listeners.hasOwnProperty(event)) {
          continue;
        }
        const e = this.normalizeEvent(
          this.document ? window.document : window,
          event,
          $listeners[event]
        );
        e.target.addEventListener(e.name, e.handler, e.opts);
        this.handlers.push(e);
      }
    },

    unbindEventListeners: function() {
      while (this.handlers.length) {
        var e = this.handlers.shift();
        e.target.removeEventListener(e.name, e.handler, e.opts);
      }
    },

    normalizeEvent: function(target, name, handler) {
      var passive = name.charAt(0) === "&";
      name = passive ? name.slice(1) : name;
      var once = name.charAt(0) === "~"; // Prefixed last, checked first

      name = once ? name.slice(1) : name;
      var capture = name.charAt(0) === "!";
      name = capture ? name.slice(1) : name;
      return {
        target: target,
        name: name,
        handler: handler,
        opts: {
          once: once,
          capture: capture,
          passive: passive
        }
      };
    }
  }
};
</script>
