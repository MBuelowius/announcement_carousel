import { MediaPlaceholder } from '@wordpress/block-editor';
import { BlockEditProps } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';
import { PromotionCarouselPageProps } from './interface';

const edit = (props: BlockEditProps<PromotionCarouselPageProps>) => {
    const { attributes, setAttributes } = props;
    const hasImage = attributes.mediaUrl != '';
    return (
        <div>
            {!hasImage ? (
                <MediaPlaceholder
                    onSelect={(media) => {
                        setAttributes({
                            mediaId: media.id,
                            mediaUrl: media['url'] as string | undefined
                        });
                    }}
                    allowedTypes={['image']}
                    multiple={false}
                    labels={{ title: 'Image Selector' }}
                />
            ) : (
                <img src={attributes.mediaUrl} />
            )}
            <p>Title</p>
            <TextControl onChange={(value) => setAttributes({ title: value })} value={attributes.title} />
            <p>Content</p>
            <TextControl onChange={(value) => setAttributes({ content: value })} value={attributes.content} />
        </div>
    );
};

export default edit;
