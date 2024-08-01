import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer } from '@mui/material';
import { Icon } from '../Icon/index';
import styles from './styles.module.css';
import logo from '../../assets/logo-completo.png';

export const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <header>
            <div className={styles.desktop}>
                <div className={styles.width}>
                    <div className={styles.container} style={{ zIndex: 999999 }}>
                        <div className={styles['child']}>
                            <Link to='/' style={{ margin: 0, padding: 0, display: 'flex', justifyContent: 'center' }}>
                                <img 
                                    src={logo} 
                                    alt="Logo de Arrendamientos Alvarez" 
                                    className={styles.logo} 
                                />
                            </Link>

                            <div className={styles['child-container']}>
                                <Link to='/payments' className={styles.item}>
                                    <p className={styles.text}>Pagos</p>
                                </Link>
                                <Link to='/search/all/all' className={styles.item}>
                                    <p className={styles.text}>Inmuebles</p>
                                </Link>
                                <Link to='/contact' className={styles.item}>
                                    <p className={styles.text}>Contacto</p>
                                </Link>
                                <Link to='/about' className={styles.item}>
                                    <p className={styles.text}>Sobre Nosotros</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.mobile}>
                <div className={styles.width}>
                    <div className={styles.container} style={{ zIndex: isOpen ? 99 : 9999 }}>
                        <div className={styles['child']}>
                            <Link to='/'>
                                <img 
                                    src={logo} 
                                    alt="Logo de Arrendamientos Alvarez" 
                                    className={styles.logo} 
                                    style={{ margin: 0, padding: 0, display: 'flex', justifyContent: 'center'}} 
                                />
                            </Link>

                            {
                                isOpen ? (
                                    <Drawer
                                        anchor='right'
                                        open={true}
                                        onClose={() => setIsOpen(!isOpen)}
                                    >
                                        <div onClick={() => setIsOpen(!isOpen)} className={styles['btn-close']}>
                                            <Icon name='x' />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <img 
                                                src={logo} 
                                                alt="Logo de Arrendamientos Alvarez" 
                                                className={styles.bigLogo} 
                                            />
                                        </div>
                                        <div className={styles['child-container-mobile']}>
                                            <Link to='/payments' className={styles.item}>
                                                <p className={styles.text}>Pagos</p>
                                            </Link>
                                            <Link to='/search/all/all' className={styles.item}>
                                                <p className={styles.text}>Inmuebles</p>
                                            </Link>
                                            <Link to='/contact' className={styles.item}>
                                                <p className={styles.text}>Contacto</p>
                                            </Link>
                                            <Link to='/about' className={styles.item}>
                                                <p className={styles.text}>Sobre Nosotros</p>
                                            </Link>
                                        </div>
                                    </Drawer>
                                ) : (
                                    <div 
                                        onClick={() => setIsOpen(!isOpen)} 
                                        className={styles.icon}
                                    >
                                        <Icon name='menu' />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
