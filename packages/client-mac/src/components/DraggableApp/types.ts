// app注册时提供给docker的信息
export interface AppDockerInfo {
  icon: string,
  system: boolean,
  name: string,
}

// app给group发送消息时的格式
export interface BaseAppInfo {
  dockerInfo: AppDockerInfo,
}

// app最小化时， 将自己的快照传递给docker
export interface MinimizeAppInfo extends BaseAppInfo {
  snapshot: string,
}

export type DispatchArgsMap = {
  'close': BaseAppInfo,
  'minimize': MinimizeAppInfo,
  'maximize': BaseAppInfo,
}

export type DispatchFunc = <T extends keyof DispatchArgsMap>(type: T, msg: DispatchArgsMap[T]) => void;