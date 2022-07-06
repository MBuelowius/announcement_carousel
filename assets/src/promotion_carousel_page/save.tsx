import { BlockSaveProps } from "@wordpress/blocks";
import './style.css'

const mainClass ="wp-block-gymnasium-wellingdorf-promotion-carousel-page";
const imageClass = "wp-block-gymnasium-wellingdorf-promotion-carousel-page-image";
const buttonClass = "wp-block-gymnasium-wellingdorf-promotion-carousel-page-button";
const titleClass = "wp-block-gymnasium-wellingdorf-promotion-carousel-page-title";
const contentClass = "wp-block-gymnasium-wellingdorf-promotion-carousel-page-content";
const topLayerClass = "wp-block-gymnasium-wellingdorf-promotion-carousel-page-top-layer";

function save(props: BlockSaveProps<PromotionCarouselPage>) {
    const { attributes } = props;
    return <div className={mainClass} >
        <img  className={imageClass} src={attributes.mediaUrl}  />
        <div  className={topLayerClass}>
            <h6  className={titleClass} >{attributes.title}</h6>
            <p  className={contentClass} >{attributes.content}</p>
            <button className={buttonClass} title="Test"/>
        </div>
        
    </div>;
}

export default save;