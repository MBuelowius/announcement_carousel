import { InspectorControls, MediaPlaceholder, URLInput } from '@wordpress/block-editor';
import { BlockEditProps } from '@wordpress/blocks';
import { Button, PanelBody, RangeControl, TextControl } from '@wordpress/components';
import { FC, useState } from 'react';
import { PromotionCarouselPageProps } from '../promotion_carousel_page/interface';
import { range } from '../utils';
import { PromotionCarouselProps } from './interface';
import styles from './edit.styles.module.css';

export const edit = (props: BlockEditProps<PromotionCarouselProps>) => {
    const { attributes, setAttributes } = props;

    const setPageAttributes: (attrs: Partial<PageEditorAttributes>, promotionIndex: number) => void = (
        attrs,
        promotionIndex
    ) => {
        const promotions = attributes.promotions.map((promotion, index) => {
            if (index == promotionIndex) {
                return {
                    ...promotion,
                    ...attrs
                };
            }
            return promotion;
        });
        setAttributes({ promotions });
    };

    const removePage: (promotionIndex: number) => void = (promotionIndex) => {
        const promotions: PromotionCarouselPageProps[] = [];
        attributes.promotions.forEach((value, index) => {
            if (index !== promotionIndex) {
                promotions.push(value);
            }
        });
        setAttributes({ promotions });
    };

    return (
        <div>
            <InspectorControls>
                <PanelBody>
                    Animation Duration
                    <RangeControl
                        value={attributes.scrollDuration ?? 300}
                        min={100}
                        max={1000}
                        onChange={(value) => {
                            if (value === undefined) return;
                            setAttributes({ scrollDuration: value });
                        }}
                    />
                    AutoScroll Timer
                    <RangeControl
                        value={attributes.autoScrollDuration ?? 1000}
                        min={1000}
                        max={10000}
                        onChange={(value) => {
                            console.log('test');
                            if (value === undefined) return;
                            setAttributes({ autoScrollDuration: value });
                        }}
                    />
                </PanelBody>
                <PanelBody title="" initialOpen={true}>
                    Children
                    <RangeControl
                        min={1}
                        value={attributes.promotions.length}
                        onChange={function (value?: number | undefined): void {
                            if (value === undefined) return;
                            if (attributes.promotions.length > value) {
                                const promotions: PromotionCarouselPageProps[] = [];
                                attributes.promotions.forEach((props, index) => {
                                    if (index < value) {
                                        promotions.push(props);
                                    }
                                });
                                setAttributes({ promotions });
                            }
                            if (attributes.promotions.length < value) {
                                setAttributes({
                                    promotions: [
                                        ...attributes.promotions,
                                        ...range(attributes.promotions.length, value).map(() => {
                                            return {
                                                title: '',
                                                content: '',
                                                mediaId: 0,
                                                mediaUrl: '',
                                                link: '',
                                                contentUrl: ''
                                            };
                                        })
                                    ]
                                });
                            }
                        }}
                    />
                </PanelBody>
            </InspectorControls>
            <h5>Pages</h5>
            <div className={styles.GymnasiumWellingdorfEditCarousel}>
                {attributes.promotions.map((promotion, index) => {
                    return (
                        <PageEdit
                            attributes={promotion}
                            index={index}
                            setAttributes={setPageAttributes}
                            removeItem={removePage}
                        />
                    );
                })}
            </div>

            <Button
                onClick={() =>
                    setAttributes({
                        promotions: [
                            ...attributes.promotions,
                            {
                                title: '',
                                content: '',
                                mediaId: 0,
                                mediaUrl: '',
                                link: '',
                                contentUrl: ''
                            }
                        ]
                    })
                }
            >
                Add
            </Button>
        </div>
    );
};

interface PageEditorAttributes {
    title: string;
    content: string;
    mediaId: number;
    mediaUrl: string;
    link: string;
    contentUrl: string;
}

interface PageEditorProps {
    attributes: PageEditorAttributes;
    index: number;
    setAttributes: (attrs: Partial<PageEditorAttributes>, promotionIndex: number) => void;
    removeItem: (promotionIndex: number) => void;
}

const PageEdit: FC<PageEditorProps> = ({ attributes, setAttributes, removeItem, index }) => {
    const [hasImage, setHasImage] = useState(attributes.mediaUrl != '');
    const removeImage = () => {
        setAttributes({ mediaId: undefined, mediaUrl: undefined }, index);
        setHasImage(false);
    };

    function activeImageView() {
        return (
            <div>
                <img src={attributes.mediaUrl} />
                <Button onClick={removeImage}>Remove Image</Button>
            </div>
        );
    }

    const setImageData = (data: { mediaId: number; mediaUrl: string | undefined }, index: number) => {
        setAttributes(
            {
                mediaId: data.mediaId,
                mediaUrl: data.mediaUrl
            },
            index
        );
        setHasImage(true);
    };

    function imagePickerView(attributes: PageEditorAttributes, index: number) {
        return (
            <MediaPlaceholder
                onSelect={(media) => {
                    setImageData(
                        {
                            mediaId: attributes.mediaId,
                            mediaUrl: media['url'] as string | undefined
                        },
                        index
                    );
                }}
                allowedTypes={['image']}
                multiple={false}
                labels={{ title: 'Image Selector' }}
            />
        );
    }

    const imageView = !hasImage ? imagePickerView(attributes, index) : activeImageView();
    return (
        <div className="gymnasium-wellingdorf-edit-carousel-page" key={`edit-carousel-page-${index}`}>
            {imageView}
            <p>Title</p>
            <TextControl onChange={(value) => setAttributes({ title: value }, index)} value={attributes.title} />
            <p>Content</p>
            <TextControl onChange={(value) => setAttributes({ content: value }, index)} value={attributes.content} />
            <p>Url</p>
            <URLInput
                onChange={function (url: string): void {
                    setAttributes({ contentUrl: url }, index);
                }}
                value={attributes.contentUrl}
            />
            <Button onClick={() => removeItem(index)}>remove</Button>
        </div>
    );
};
