import { Link } from 'react-router-dom';
import logo from '../../assets/logo-completo2.png';
import styles from './styles.module.css';

export const Footer = () => {
  const sendWppMessage = () => {
    const encodedMessage = encodeURIComponent('Hola David, trabajemos juntos.');
    window.open(`https://wa.me/573001981089?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className={styles['component-container']}>
        <div className={styles['second-component-container']}>
            <div className={styles['second-container']}>
                <div className={styles['icons-rrss-container']}>
                    <Link to='/'>
                        <img src={logo} alt="x logo" width={130} loading="lazy" />
                    </Link>

                </div>
                <div className={styles['text-container']}>
                    <Link to='/'>
                        <p className={styles['text-second-container']}>Términos de uso web</p>
                    </Link>
                    <Link to='/'>
                        <p className={styles['text-second-container']}>Aviso de Privacidad</p>
                    </Link>
                    <Link to='/'>
                        <p className={styles['text-second-container']}>Política de tratamiento de datos</p>
                    </Link>
                </div>
            </div>
        </div>
        <p className={styles['text-copyright']}>&copy; {new Date().getFullYear()} Arrendamientos Alvarez.</p>
        <p 
            style={{
                textAlign: 'center',
                fontSize: 14,
                color: '#6b6969',
                fontWeight: 500,
                padding: '0 0 35px 0',
                margin: 0,
                textDecoration: 'underline',
                textUnderlineOffset: 5,
                cursor: 'pointer'
            }}
            onClick={sendWppMessage}
        >by. David Diaz H.</p>
    </div>
  )
}