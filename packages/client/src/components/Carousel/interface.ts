import {CSSProperties} from "vue";

export interface ClampType  {
    min: string;
    max: string;
    value: string;
}

export interface StyleProps {
    width?: ClampType;
    height?: ClampType;
    boxShadow?: CSSProperties['boxShadow'];
    borderRadius?: CSSProperties['borderRadius'];
}