import { BlockSaveProps } from '@wordpress/blocks';
import { PromotionCarousel, PromotionCarouselControls } from './compontent';
import { PromotionCarouselProps } from './interface';

function save(props: BlockSaveProps<PromotionCarouselProps>) {
    const { attributes } = props;
    return (
        <div
            className="gymnasium-wellingdorf-promotion-carousel-wrapper"
            data-gymnasium-wellingdorf-attributes={JSON.stringify(
                props.attributes
            )}
        >
            <PromotionCarousel promotions={attributes.promotions} />
            <PromotionCarouselControls
                goToSlide={function (): void {
                    throw new Error('Function not implemented.');
                }}
                nextSlide={function (): void {
                    throw new Error('Function not implemented.');
                }}
                prevSlide={function (): void {
                    throw new Error('Function not implemented.');
                }}
                activeSlide={0}
                totalSlides={0}
            />
        </div>
    );
}

export default save;
