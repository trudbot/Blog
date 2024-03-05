import {AppDockerInfo} from '../../types'
export interface DockerConfig {
  dockerHeight: number;
  itemSize: number;
  gap: number;
  ratio: number;
  delta: number;
  diameter: number;
}

export interface DockerItemInfo extends AppDockerInfo {
  temp?: boolean;
  snapshot?: string;
  closed?: boolean;
}
