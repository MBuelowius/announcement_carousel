import { RefObject } from 'react';
import { PromotionCarouselPageProps } from '../promotion_carousel_page/interface';

export interface PromotionCarouselProps {
    promotions: PromotionCarouselPageProps[];
    scrollerRef?: RefObject<HTMLDivElement>;
    scrollDuration?: number;
    autoScrollDuration?: number;
}

export interface PromotionCarouselControlsProps {
    goToSlide: (index: number) => void;
    nextSlide: () => void;
    prevSlide: () => void;
    activeSlide: number;
    totalSlides: number;
    atEnd?: boolean;
}

export interface PromotionCarouselWrapperProps {
    promotions: PromotionCarouselPageProps[];
}
