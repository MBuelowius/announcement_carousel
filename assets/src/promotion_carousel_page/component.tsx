import { FC } from 'react';
import { CarouselPageButton } from './components';
import { contentClass, imageClass, mainClass, titleClass, topLayerClass } from './constants';
import { PromotionCarouselPageProps, PromotionCarouselPageWrapperProps } from './interface';

export const PromotionCarouselPageWrapper: FC<PromotionCarouselPageWrapperProps> = (props) => {
    return (
        <div className="gymnasium-wellingdorf-promotion-carousel-page-wrapper">
            <PromotionCarouselPage {...props} />
        </div>
    );
};

export const PromotionCarouselPage: FC<PromotionCarouselPageProps> = (props) => {
    return (
        <div
            className={mainClass}
            key={props.index != null ? `promotion_carousel_page_${props.index}` : undefined}
            onContextMenu={(e) => e.preventDefault()}
        >
            <img className={imageClass} src={props.mediaUrl} />
            <div className={topLayerClass}>
                <h6 className={titleClass}>{props.title}</h6>
                <p className={contentClass}>{props.content}</p>
                <CarouselPageButton onClicked={goToUrl} />
            </div>
        </div>
    );

    function goToUrl() {
        window.location.assign(props.contentUrl);
    }
};
