import { registerBlockType } from "@wordpress/blocks";
import edit from "./edit";
import save from "./save";

const registerPromotionCarouselPage = () => registerBlockType<PromotionCarouselPage>('gymnasium-wellingdorf/promotion-carousel-page', {
    title: 'Promotion Carousel Page',
    icon: "smiley",
    category: "gymnasium-wellingdorf",
    attributes: {
        link: {
            type: "string",
        },
        title: {
            type: "string",
        },
        content: {
            type: "string",
        },
        mediaId: {
            type: 'number',
            default: 0
        },
        mediaUrl: {
            type: 'string',
            default: ''
        }
    },
    save: save,
    edit: edit
});

export default registerPromotionCarouselPage;