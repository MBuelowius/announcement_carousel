import { BlockAttribute } from '@wordpress/blocks';

export type BlockAttributesMap<T> = {
    readonly [k in keyof T]: BlockAttribute<T[k] extends Array<infer U> ? U : T[k]>;
};

export type ScrollDistance = {
    x?: number;
    y?: number;
};

export type ScrollSmoothFunction = (
    element: React.RefObject<HTMLDivElement>,
    milliseconds: number,
    distance: ScrollDistance,
    graph?: (x: number) => number
) => Promise<void>;
