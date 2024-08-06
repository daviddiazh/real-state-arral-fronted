import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer } from '@mui/material';
import { animateScroll as scroll } from 'react-scroll';
import { Icon } from '../Icon/index';
// import logo from '../../assets/logo-completo.png';
import logo from '../../assets/logo-completo2.png';
import styles from './styles.module.css';

export const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <header>
            <div className={styles.desktop}>
                <div className={styles.width}>
                    <div className={styles.container} style={{ zIndex: 999999 }}>
                        <div className={styles['child']}>
                            <Link 
                                to='/' 
                                style={{ margin: 0, padding: 0, display: 'flex', justifyContent: 'center' }}
                                onClick={() => scroll.scrollToTop({
                                    duration: 0,
                                    smooth: true,
                                })}
                            >
                                <img 
                                    src={logo} 
                                    alt="Logo de Arrendamientos Alvarez" 
                                    className={styles.logo} 
                                    width={100}
                                />
                            </Link>

                            <div className={styles['child-container']}>
                                <Link
                                    to="/" 
                                    className={styles.item}
                                    onClick={() => scroll.scrollToTop({
                                        duration: 0,
                                        smooth: true,
                                    })}
                                >
                                    <p className={styles.text}>Inicio</p>
                                </Link>
                                <Link to='https://www.mipagoamigo.com/MPA_WebSite/ServicePayments/StartPayment?id=7653&searchedCategoryId=&searchedAgreementName=ARRENDAMIENTOS' target='_blank' className={styles.item}>
                                    <p className={styles.text}>Pagos</p>
                                </Link>
                                <Link to='/rent-request' className={styles.item}>
                                    <p className={styles.text}>Solicitud de Arriendo</p>
                                </Link>
                                <Link to='/search/all/all' className={styles.item}>
                                    <p className={styles.text}>Inmuebles</p>
                                </Link>
                                <Link
                                    to="/#contact" 
                                    className={styles.item}
                                >
                                    <p className={styles.text}>Contacto</p>
                                </Link>
                                <Link
                                    to="/#about" 
                                    className={styles.item}
                                >
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
                            <Link 
                                to='/'
                                onClick={() => scroll.scrollToTop({
                                    duration: 0,
                                    smooth: true,
                                })}
                            >
                                <img 
                                    src={logo} 
                                    alt="Logo de Arrendamientos Alvarez" 
                                    className={styles.logo} 
                                    style={{ margin: 0, padding: 0, display: 'flex', justifyContent: 'center'}}
                                    width={100}
                                />
                            </Link>

                            {
                                isOpen ? (
                                    <Drawer
                                        anchor='right'
                                        open={true}
                                        onClose={() => setIsOpen(!isOpen)}
                                        style={{ zIndex: 999999999999999 }}
                                    >
                                        <div onClick={() => setIsOpen(!isOpen)} className={styles['btn-close']}>
                                            <Icon name='x' />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <img 
                                                src={logo} 
                                                alt="Logo de Arrendamientos Alvarez" 
                                                className={styles.bigLogo}
                                                onClick={() => {
                                                    scroll.scrollToTop({
                                                        duration: 0,
                                                        smooth: true,
                                                    });
                                                    setIsOpen(false);
                                                }}
                                                width={100}
                                            />
                                        </div>
                                        <div className={styles['child-container-mobile']}>
                                            <Link
                                                to="/" 
                                                className={styles.item}
                                                onClick={() => {
                                                    scroll.scrollToTop({
                                                        duration: 0,
                                                        smooth: true,
                                                    });
                                                    setIsOpen(false);
                                                }}
                                            >
                                                <p className={styles.text}>Inicio</p>
                                            </Link>
                                            <Link 
                                                to='https://www.mipagoamigo.com/MPA_WebSite/ServicePayments/StartPayment?id=7653&searchedCategoryId=&searchedAgreementName=ARRENDAMIENTOS' 
                                                target='_blank' 
                                                className={styles.item} 
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <p className={styles.text}>Pagos</p>
                                            </Link>
                                            <Link 
                                                to='/rent-request' 
                                                className={styles.item}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <p className={styles.text}>Solicitud de Arriendo</p>
                                            </Link>
                                            <Link 
                                                to='/search/all/all' 
                                                className={styles.item} 
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <p className={styles.text}>Inmuebles</p>
                                            </Link>
                                            <Link 
                                                to='/#contact' 
                                                className={styles.item} 
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <p className={styles.text}>Contacto</p>
                                            </Link>
                                            <Link 
                                                to='/#about' 
                                                className={styles.item}
                                                onClick={() => setIsOpen(false)}
                                            >
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
