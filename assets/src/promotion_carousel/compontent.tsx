import React, { useState } from 'react';
import { FC } from 'react';
import { PromotionCarouselPage } from '../promotion_carousel_page/component';
import { PromotionCarouselPageProps } from '../promotion_carousel_page/interface';
import { range, scrollSmooth } from '../utils';
import { PromotionCarouselControlsProps, PromotionCarouselProps, PromotionCarouselWrapperProps } from './interface';

export const PromotionCarouselWrapper: FC<PromotionCarouselWrapperProps> = ({
    promotions,
    autoScrollDuration,
    scrollDuration
}) => {
    const ref = React.createRef<HTMLDivElement>();
    const [activeSlide, setActiveSlide] = useState(0);
    const thisAutoScrollDuration = autoScrollDuration ?? 2000;
    const thisScrollDuration = scrollDuration ?? 300;
    let autoScrollInterval = setInterval(() => autoScroll(), thisAutoScrollDuration);

    function autoScroll() {
        if (activeSlide < promotions.length - 1) {
            void scrollToNextPage();
        } else {
            void scrollToPage(0);
        }
    }

    function restartAutoScroll() {
        clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(() => autoScroll(), thisAutoScrollDuration);
    }

    function updateActiveSlide(slide: number) {
        if (slide < 0) return;
        if (slide > promotions.length - 1) return;
        setActiveSlide(slide);
    }

    const indexedPromotions: PromotionCarouselPageProps[] = promotions.map((promotion, index) => {
        return {
            ...promotion,
            index
        };
    });

    return (
        <div className="gymnasium-wellingdorf-promotion-carousel-wrapper">
            <PromotionCarousel promotions={indexedPromotions} scrollerRef={ref} />
            <PromotionCarouselControls
                goToSlide={(index) => {
                    void scrollToPage(index);
                }}
                nextSlide={() => {
                    void scrollToNextPage();
                }}
                prevSlide={() => {
                    void scrollToPreviousPage();
                }}
                activeSlide={activeSlide}
                totalSlides={promotions.length ?? 0}
            />
        </div>
    );

    function PageWidth(ref: React.RefObject<HTMLDivElement>) {
        if (ref.current == undefined) return 0;
        return ref.current?.scrollWidth / promotions.length;
    }

    async function scrollToPreviousPage(): Promise<void> {
        const pageWidth = PageWidth(ref);
        await scrollSmooth(ref, thisScrollDuration, { x: -pageWidth }).then(() => {
            updateActiveSlide(activeSlide - 1);
            restartAutoScroll();
        });
    }

    async function scrollToNextPage() {
        const pageWidth = PageWidth(ref);
        await scrollSmooth(ref, thisScrollDuration, { x: pageWidth }).then(() => {
            updateActiveSlide(activeSlide + 1);
            restartAutoScroll();
        });
    }

    async function scrollToPage(index: number) {
        const distance = index - activeSlide;
        const pageDistance = distance * PageWidth(ref);
        await scrollSmooth(ref, thisScrollDuration, { x: pageDistance }).then(() => {
            updateActiveSlide(index);
            restartAutoScroll();
        });
    }
};

export const PromotionCarousel: FC<PromotionCarouselProps> = ({ promotions, scrollerRef }) => {
    const children = promotions.map((promotion) => PromotionCarouselPage({ ...promotion }));
    return (
        <div className="gymnasium-wellingdorf-promotion-carousel">
            <div className="wp-block-gymnasium-wellingdorf-promotion-carousel-scroller">
                <div ref={scrollerRef} className="wp-block-gymnasium-wellingdorf-promotion-carousel-scroller-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export const PromotionCarouselControls: FC<PromotionCarouselControlsProps> = (
    props: PromotionCarouselControlsProps
) => {
    const { goToSlide, nextSlide, prevSlide, activeSlide, totalSlides } = props;

    const slides = range(0, totalSlides).map((index) => {
        return (
            <div
                key={`promotion_carousel_control_${index}`}
                className={`gymnasium-wellingdorf-promotion-carousel-controls-dot ${
                    activeSlide === index ? 'gymnasium-wellingdorf-promotion-carousel-controls-dot-selected' : ''
                }`}
                onClick={() => goToSlide(index)}
            />
        );
    });

    return (
        <div className="gymnasium-wellingdorf-promotion-carousel-controls">
            <button
                onClick={prevSlide}
                className="gymnasium-wellingdorf-arrow-button material-icons mdc-icon-button mdc-ripple-upgraded--unbounded mdc-ripple-upgraded"
            >
                {'<'}
            </button>
            <div className="gymnasium-wellingdorf-promotion-carousel-controls-dots">{slides}</div>
            <button
                onClick={nextSlide}
                className="gymnasium-wellingdorf-arrow-button material-icons mdc-icon-button mdc-ripple-upgraded--unbounded mdc-ripple-upgraded"
            >
                {'>'}
            </button>
        </div>
    );
};
