import { onMounted, onUnmounted, reactive } from 'vue';

export default {
  props: {
    showDistrict: Boolean,
    selectedDistrict: Object,
  },
  emits: ['closeModal'],
  setup(props: any, context: any) {
    const state = reactive({});
    const selectedDistrict = props.selectedDistrict;

    onMounted(() => {
      console.log(props.selectedDistrict);
      addEvents();
    });

    onUnmounted(() => {
      removeEvents();
    });

    function closeModal(): void {
      context.emit('closeModal', false);
    }

    function addEvents() {
      document.addEventListener('keyup', eventHandler);
    }

    function removeEvents() {
      document.removeEventListener('keyup', eventHandler);
    }

    function eventHandler(e: KeyboardEvent) {
      const keyCode = e.code || e.key;

      if (keyCode === 'Escape') {
        closeModal();
      }
    }

    return { state, selectedDistrict, closeModal };
  },
};
