import { FC } from 'react';
import styles from './styles.module.css';

export const CarouselPageButton: FC<CarouselPageButtonProps> = (props) => {
    return (
        <button className={styles.button} type="button" onClick={props.onClicked}>
            <div className={styles.buttonBackground} />
            <div className={styles.buttonContent}>Mehr Anzeigen</div>
        </button>
    );
};
