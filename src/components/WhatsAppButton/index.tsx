import { useState } from 'react';
import WhatsAppIcon from '../../assets/icons/wpp.svg';
import styles from './styles.module.css';

export const WhatsappButton = () => {

    const [isHovered, setHovered] = useState(false);
      

    const handleWhatsAppClick = () => {
        //TODO!
        // window.open('https://wa.me/+57', '_blank');
    };

    return (
        <div className={styles['container']}>
            <button
                onClick={handleWhatsAppClick}
                className={styles['btn']}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <span className={`${isHovered ? styles['hovered-text'] : styles['hidden']}`}>
                    ¡Chatea con nosotros! 👋
                </span>
                <img src={WhatsAppIcon} alt="WhatsApp icon" className={styles['icon']} />
            </button>
        </div>
    );
}