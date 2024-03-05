import { InjectionKey, Ref } from 'vue';

export const DockerContext = Symbol(
  'DockerContext'
) as InjectionKey<{
  addItem: (item: DockerItemContext) => void,
  removeItem: (uid: number) => void,
}>

export interface DockerItemContext {
  uid: number,
  setRatio: (
    f: (l: number, r: number) => number
  ) => number
}
