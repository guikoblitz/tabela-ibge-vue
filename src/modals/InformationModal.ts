import { onMounted, onUnmounted, reactive } from 'vue';

export default {
  props: {
    showModal: Boolean,
    selectedRow: Object,
    isMobile: Boolean,
  },
  emits: ['closeModal'],
  setup(props: any, context: any) {
    const state = reactive({});
    const selectedRow = props.selectedRow;
    const isMobile = props.isMobile;

    onMounted(() => {
      console.log(props.selectedRow);
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

    return { state, selectedRow, isMobile, closeModal };
  },
};
