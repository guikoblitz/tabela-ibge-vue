import { store } from 'quasar/wrappers';
import { InjectionKey } from 'vue';
import general from './general';
import { createStore, Store as VuexStore, useStore as vuexUseStore } from 'vuex';

export interface StateInterface {
  general: any;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>;
  }
}

export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key');

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      general,
    },

    strict: !!process.env.DEBUGGING,
  });

  return Store;
});

export function useStore() {
  return vuexUseStore(storeKey);
}
