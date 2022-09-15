import { registerBlockType } from '@wordpress/blocks';
import { edit } from './edit';
import { PromotionCarouselProps } from './interface';
import save from './save';

// const allowedBlocks = ["gymnasium-wellingdorf/promotion-carousel-page"];

const registerPromotionCarousel = () =>
    registerBlockType<PromotionCarouselProps>('gymnasium-wellingdorf/promotion-carousel', {
        title: 'Promotion Carousel',
        category: 'design',
        attributes: {
            promotions: {
                type: 'array',
                default: []
            },
            scrollDuration: {
                type: 'number'
            },
            autoScrollDuration: {
                type: 'number'
            }
        },
        edit,
        save
    });

export default registerPromotionCarousel;
