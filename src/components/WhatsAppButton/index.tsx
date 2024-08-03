import { useState } from 'react';
import WhatsAppIcon from '../../assets/icons/wpp.svg';
import styles from './styles.module.css';
import { handleWhatsAppClick } from '../../utils/handleWhatsAppMessage';

export const WhatsappButton = () => {

    const [isHovered, setHovered] = useState(false);

    return (
        <div className={styles['container']}>
            <button
                onClick={() => handleWhatsAppClick()}
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
// oficina 318 405 2662