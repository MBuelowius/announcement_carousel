import ReactDOM from 'react-dom';
import { PromotionCarouselWrapper } from '../promotion_carousel/compontent';
import { PromotionCarouselWrapperProps } from '../promotion_carousel/interface';

export const PromotionCarouselHydration = () =>
    window.addEventListener('DOMContentLoaded', () => {
        const promotionCarousels = document.querySelectorAll('.gymnasium-wellingdorf-promotion-carousel-wrapper');
        if (promotionCarousels !== null) {
            Array.from(promotionCarousels).forEach((promotionCarousel) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const attributes: PromotionCarouselWrapperProps = JSON.parse(
                    promotionCarousel.getAttribute('data-gymnasium-wellingdorf-attributes') ?? '{}'
                );

                ReactDOM.render(<PromotionCarouselWrapper {...attributes} />, promotionCarousel);
            });
        }
    });
