// 定义一个类型来提取函数的返回类型
export type FunctionReturnType<F> = F extends (...args: any[]) => infer R ? R : never;

// 定义一个类型来将函数列表映射为返回值的类型数组
export type MapFunctionReturnTypes<T extends Array<(...args: any[]) => any>> = {
  [K in keyof T]: FunctionReturnType<T[K]>
};