import { FC } from 'react';
import { buttonBackgroundClass, buttonClass, buttonContentClass } from './constants';
import './style.css';

export const CarouselPageButton: FC<CarouselPageButtonProps> = (props) => {
    return (
        <button className={buttonClass} type="button" onClick={props.onClicked}>
            <div className={buttonBackgroundClass} />
            <div className={buttonContentClass}>Mehr Anzeigen</div>
        </button>
    );
};
