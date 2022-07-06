import { registerBlockType } from "@wordpress/blocks";
 
interface PromotionCarousel {
    
}

const registerPromotionCarousel  = () => registerBlockType<PromotionCarousel>('gymnasium-wellingdorf/promotion-carousel', {
    title: 'Promotion Carousel',
    icon: "smiley",
    category: "gymnasium-wellingdorf",
    attributes: {
       
    },
    edit: (props) => {
        return <div>
        </div>
    },
    save: (props) => {
        return <div></div>
    },
    
})

export default registerPromotionCarousel