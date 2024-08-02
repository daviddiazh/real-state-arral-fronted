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
                    loop={true}
                >
                    {estate.imagenes.map((image: any) => (
                        <SwiperSlide 
                            key={image?.fotourl}
                        >
                            <img 
                                src={image?.fotourl} 
                                alt="Propiedad" 
                                className={styles['product-image']} 
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            }
            <div style={{ padding: '10px 15px' }}>
                <p className={styles['code-label']}>Código: <span className={styles['code-text']}>{estate.consecutivo}</span></p>
                <p 
                    className={styles['class-text']}
                >
                    {estate.clase} en
                    <span> {estate.tipo_servicio}</span>, 
                    <span className={styles['code-label']}> {estate?.area}m<sup>2</sup></span>
                </p>
                <p className={styles['city']}>{estate.municipio}, <span>{estate.barrio ? estate.barrio : ''}</span></p>
                <p className={styles['price']}>{estate?.tipo_servicio === 'Venta' ? copFormatter(estate?.precio_venta) : copFormatter(estate?.precio)}</p>
            </div>
        </div>
    )
}
