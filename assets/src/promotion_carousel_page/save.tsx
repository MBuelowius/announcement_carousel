import { BlockSaveProps } from '@wordpress/blocks';
import { PromotionCarouselPage } from './component';
import { PromotionCarouselPageProps } from './interface';

function save(props: BlockSaveProps<PromotionCarouselPageProps>) {
    const { attributes } = props;
    return (
        <div className={'gymnasium-wellingdorf-promotion-carousel-page-wrapper'}>
            <PromotionCarouselPage
                link={attributes.link}
                title={attributes.title}
                content={attributes.content}
                mediaId={attributes.mediaId}
                mediaUrl={attributes.mediaUrl}
                contentUrl={attributes.contentUrl}
            />
        </div>
    );
}

export default save;
