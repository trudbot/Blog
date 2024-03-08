import { ref, Ref } from 'vue';

export function useOption<T>(options: T[], init: T) {
  const state = ref(init) as Ref<T>;

  const setters = options.map(option => {
    return () => {
      state.value = option;
    }
  });
  const exports: [
    Ref<T>,
    ...Array<() => void>
  ] =  [
    state,
    ...setters
  ]
  return exports;
}