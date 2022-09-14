import * as easing from './easing';
import { ScrollDistance, ScrollSmoothFunction } from './types';

export const scrollSmooth: ScrollSmoothFunction = async function (
    element: React.RefObject<HTMLDivElement>,
    milliseconds: number,
    distance: ScrollDistance,
    graph?: (x: number) => number
): Promise<void> {
    if (graph === undefined) graph = easing.easeInOutExpo;
    await new Promise<void>((resolve) => {
        if (element.current == undefined) return;
        const startX = element.current.scrollLeft;
        const startY = element.current.scrollTop;
        const increment = 1 / milliseconds;

        let x = 0;
        const interval = setInterval(() => {
            if (graph === undefined) throw Error('Error assigning graph');
            const y = graph(x);
            element.current?.scrollTo({
                left: startX + y * (distance.x ?? 0),
                top: startY + y * (distance.y ?? 0)
            });
            x += increment;
            if (x >= 1) {
                element.current?.scrollTo({
                    left: startX + (distance.x ?? 0),
                    top: startY + (distance.y ?? 0)
                });
                clearInterval(interval);
                resolve();
            }
        }, 1);
    });
};
