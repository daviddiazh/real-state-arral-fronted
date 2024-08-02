import { useState } from 'react';
import PseIcon from '../../assets/icons/pse.png';
import styles from './styles.module.css';

export const PseButton = () => {

    const [isHovered, setHovered] = useState(false);

    const handlePseClick = () => {
        window.open('https://www.mipagoamigo.com/MPA_WebSite/ServicePayments/StartPayment?id=7653&searchedCategoryId=&searchedAgreementName=ARRENDAMIENTOS', '_blank');
    };

    return (
        <div className={styles['container']}>
            <button
                onClick={handlePseClick}
                className={styles['btn']}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <span className={`${isHovered ? styles['hovered-text'] : styles['hidden']}`}>
                    ¡Paga con PSE! 💰
                </span>
                <img src={PseIcon} alt="Pse icon" className={styles['icon']} />
            </button>
        </div>
    );
}