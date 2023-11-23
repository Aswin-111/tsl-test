// eventBus.js
import { ref, onBeforeUnmount } from 'vue';

const listeners = ref([]);

const $on = (event, callback) => {
  listeners.value.push({ event, callback });
};

const $emit = (event, ...args) => {
  for (const listener of listeners.value) {
    if (listener.event === event) {
      listener.callback(...args);
    }
  }
};

const useEventBus = () => {
  onBeforeUnmount(() => {
    // Clean up listeners to avoid memory leaks
    listeners.value = [];
  });

  return { $on, $emit };
};

export { useEventBus };
