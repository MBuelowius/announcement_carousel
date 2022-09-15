import React, { useState } from 'react';
import { FC } from 'react';
import { PromotionCarouselPage } from '../promotion_carousel_page/component';
import { PromotionCarouselPageProps } from '../promotion_carousel_page/interface';
import { range, scrollSmooth } from '../utils';
import { PromotionCarouselControlsProps, PromotionCarouselProps, PromotionCarouselWrapperProps } from './interface';
import styles from './style.module.css';

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

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    function runAutoScroll() {
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
        <div className={`gymnasium-wellingdorf-promotion-carousel-wrapper`}>
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
        stopAutoScroll();
        await scrollSmooth(ref, thisScrollDuration, { x: -pageWidth }).then(() => {
            updateActiveSlide(activeSlide - 1);
            runAutoScroll();
        });
    }

    async function scrollToNextPage() {
        const pageWidth = PageWidth(ref);
        stopAutoScroll();
        await scrollSmooth(ref, thisScrollDuration, { x: pageWidth }).then(() => {
            updateActiveSlide(activeSlide + 1);
            runAutoScroll();
        });
    }

    async function scrollToPage(index: number) {
        const distance = index - activeSlide;
        const pageDistance = distance * PageWidth(ref);
        stopAutoScroll();
        await scrollSmooth(ref, thisScrollDuration, { x: pageDistance }).then(() => {
            updateActiveSlide(index);
            runAutoScroll();
        });
    }
};

export const PromotionCarousel: FC<PromotionCarouselProps> = ({ promotions, scrollerRef }) => {
    const children = promotions.map((promotion) => PromotionCarouselPage({ ...promotion }));
    return (
        <div className={styles.Carousel}>
            <div className={styles.CarouselScroller}>
                <div ref={scrollerRef} className={styles.CarouselScrollerContent}>
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
                className={`${styles.Dot} ${activeSlide === index ? `${styles.SelectedDot}` : ''}`}
                onClick={() => goToSlide(index)}
            />
        );
    });

    return (
        <div className={styles.CarouselControls}>
            <button
                onClick={prevSlide}
                className="gymnasium-wellingdorf-arrow-button material-icons mdc-icon-button mdc-ripple-upgraded--unbounded mdc-ripple-upgraded"
            >
                {'<'}
            </button>
            <div className={styles.Dots}>{slides}</div>
            <button
                onClick={nextSlide}
                className={`${styles.ArrowButton} gymnasium-wellingdorf-arrow-button material-icons mdc-icon-button mdc-ripple-upgraded--unbounded mdc-ripple-upgraded`}
            >
                {'>'}
            </button>
        </div>
    );
};
