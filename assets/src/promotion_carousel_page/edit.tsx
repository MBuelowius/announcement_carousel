import { MediaPlaceholder, PlainText } from '@wordpress/block-editor';
import { BlockEditProps } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';

const edit = (props: BlockEditProps<PromotionCarouselPage>) => {
    const { attributes, setAttributes } = props;
    const hasImage = attributes.mediaUrl != '';
    return <div>
        {
            !hasImage
                ? <MediaPlaceholder onSelect={(media) => {
                    setAttributes({
                        mediaId: media.id,
                        mediaUrl: media["url"]
                    });
                }} allowedTypes={['image']} multiple={false} labels={{ title: "Image Selector" }} />
                : <img src={attributes.mediaUrl} />
        }
        <p>Title</p>
        <TextControl onChange={(value) => setAttributes({ title: value })} value={attributes.title} />
        <p>Content</p>
        <TextControl onChange={(value) => setAttributes({ content: value })} value={attributes.content} />
z
    </div>;
};

export default edit;