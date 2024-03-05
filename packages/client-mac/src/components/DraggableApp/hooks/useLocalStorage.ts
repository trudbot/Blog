import { log } from 'console';
import { reactive, ref, watch } from 'vue';

export function useLocalStorage<T extends object>(key: string, initialValue: T) {
  let storage = localStorage.getItem(key);
  let init = storage ? JSON.parse(storage) : initialValue;
  const data = reactive<T>(init);
  
  watch(data, (value) => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  return { data };
}
