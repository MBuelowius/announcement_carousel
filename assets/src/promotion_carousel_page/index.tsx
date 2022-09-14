import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import { PromotionCarouselPageProps } from './interface';
import save from './save';

const parent = ['gymnasium-wellingdorf/promotion-carousel'];

const registerPromotionCarouselPage = () =>
    registerBlockType<PromotionCarouselPageProps>('gymnasium-wellingdorf/promotion-carousel-page', {
        title: 'Promotion Carousel Page',
        category: 'design',
        parent: parent,
        attributes: {
            link: {
                type: 'string'
            },
            title: {
                type: 'string'
            },
            content: {
                type: 'string'
            },
            mediaId: {
                type: 'number',
                default: 0
            },
            mediaUrl: {
                type: 'string',
                default: ''
            },
            contentUrl: {
                type: 'string'
            }
        },
        save: save,
        edit: edit
    });

export default registerPromotionCarouselPage;
