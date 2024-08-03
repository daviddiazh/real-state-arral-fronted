/* eslint-disable @typescript-eslint/no-explicit-any */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import { copFormatter } from '../../utils/copFormatter'
import styles from './styles.module.css';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css';

import '../../pages/Home/styles.css';
import { Icon } from '../Icon';
import { Link } from 'react-router-dom';

export const Estate = ({ estate }: any) => {

    return (
        <div className={styles['card']} key={estate?.consecutivo}>
            {
                <Swiper
                    cssMode
                    navigation
                    pagination
                    mousewheel
                    keyboard
                    modules={[Navigation, Mousewheel, Keyboard, Autoplay]}
                    className="mySwiper"
                    autoplay={{
                        delay: 5000,
                    }}
                    // loop={true}
                >
                    {estate.imagenes.map((image: any) => (
                        <SwiperSlide 
                            key={image?.fotourl}
                        >
                            <img 
                                src={image?.fotourl} 
                                alt="Propiedad" 
                                className={styles['product-image']}
                                width={500}
                                height={500}
                                loading="lazy"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            }
            <div style={{ padding: '10px 15px' }}>
                <Link to={`/detail/${estate?.consecutivo}`}>
                    <p className={styles['code-label']}>Código: <span className={styles['code-text']}>{estate.consecutivo}</span></p>
                </Link>
                <Link to={`/detail/${estate?.consecutivo}`}>
                    <p 
                        className={styles['class-text']}
                    >
                        {estate.clase} en
                        <span> {estate.tipo_servicio}</span>, 
                        <span className={styles['code-label']}> {estate?.area}m<sup>2</sup></span>
                    </p>
                </Link>
                <p className={styles['city']}>{estate.municipio}, <span>{estate.barrio ? estate.barrio : ''}</span></p>
                <div className={styles['flex']}>
                    <p className={styles['price']}>{estate?.tipo_servicio === 'Venta' ? copFormatter(estate?.precio_venta) : copFormatter(estate?.precio)}</p>

                    <Link to={`/detail/${estate?.consecutivo}`}>
                        <div className={styles['flex-child']}>
                            <p className={styles['text-info']}>Más info</p>
                            <Icon name='flecha-izquierda' size={15} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
