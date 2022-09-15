import { FC } from 'react';
import { CarouselPageButton } from './components';
import { PromotionCarouselPageProps, PromotionCarouselPageWrapperProps } from './interface';
import styles from './styles.module.css';

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
            className={styles.PromotionCarouselPage}
            key={props.index != null ? `promotion_carousel_page_${props.index}` : undefined}
            onContextMenu={(e) => e.preventDefault()}
        >
            <img className={styles.PageImage} src={props.mediaUrl} />
            <div className={styles.PageTopLayer}>
                <h6 className={styles.PageTitle}>{props.title}</h6>
                <p className={styles.PageContent}>{props.content}</p>
                <CarouselPageButton onClicked={goToUrl} />
            </div>
        </div>
    );

    function goToUrl() {
        window.location.assign(props.contentUrl);
    }
};
