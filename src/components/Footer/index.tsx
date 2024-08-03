import { Link } from 'react-router-dom';
// import fbLogo from '../../assets/icons/fb.svg';
// import igLogo from '../../assets/icons/ig.svg';
// import xLogo from '../../assets/icons/x.svg';
import logo from '../../assets/logo-completo2.png';
import styles from './styles.module.css';

export const Footer = () => {
  return (
    <div className={styles['component-container']}>
        <div className={styles['second-component-container']}>
            <div className={styles['second-container']}>
                <div className={styles['icons-rrss-container']}>
                    {/* <Link to=''>
                        <img src={fbLogo} alt="facebook logo" width={35} />
                    </Link>
                    <Link to=''>
                        <img src={igLogo} alt="instagram logo" width={35} />
                    </Link>
                    <Link to=''>
                        <img src={xLogo} alt="x logo" width={35} />
                    </Link> */}
                    <Link to='/'>
                        <img src={logo} alt="x logo" width={130} />
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
        <p style={{
            textAlign: 'center',
            fontSize: 14,
            color: '#7a7979',
            fontWeight: 500,
            padding: '0 0 35px 0',
            margin: 0,
        }}>by. David Diaz H.</p>
    </div>
  )
}