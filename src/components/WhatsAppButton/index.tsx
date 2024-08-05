import { useState } from 'react';
import WhatsAppIcon from '../../assets/icons/wpp.svg';
import styles from './styles.module.css';
import { WhatsAppModal } from '../WhatsAppModal';

export const WhatsappButton = () => {

    const [isHovered, setHovered] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div className={styles['container']}>
                <button
                    onClick={() => setOpenModal(true)}
                    className={styles['btn']}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <span className={`${isHovered ? styles['hovered-text'] : styles['hidden']}`}>
                        ¡Chatea con nosotros! 👋
                    </span>
                    <img 
                        src={WhatsAppIcon} 
                        alt="WhatsApp icon" 
                        className={styles['icon']} 
                        width={50}
                    />
                </button>
            </div>

            <WhatsAppModal openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    );
}
