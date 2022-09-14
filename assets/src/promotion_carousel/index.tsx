import { registerBlockType } from '@wordpress/blocks';
import { BlockAttributesMap } from '../utils';
import { edit } from './edit';
import { PromotionCarouselProps } from './interface';
import save from './save';
import './style.css';

// const allowedBlocks = ["gymnasium-wellingdorf/promotion-carousel-page"];

const registerPromotionCarousel = () =>
    registerBlockType<PromotionCarouselProps>('gymnasium-wellingdorf/promotion-carousel', {
        title: 'Promotion Carousel',
        category: 'design',
        attributes: {
            promotions: {
                type: 'array',
                default: []
            }
        },
        edit,
        save
    });

export default registerPromotionCarousel;
