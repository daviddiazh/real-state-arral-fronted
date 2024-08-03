/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard, FreeMode } from 'swiper/modules';
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";
import { baseURL, password, user } from "../../utils/const";
import { ImageZoom } from "../../components/ImageZoom";
import { Contact } from "../../components/Contact";
import { copFormatter } from "../../utils/copFormatter";
import WhatsAppIcon from '../../assets/icons/wpp.svg';

import 'swiper/css/navigation';
import 'swiper/css';
import styles from './styles.module.css';
import '../../pages/Home/styles.css';

export const Detail = () => {

    const { code = '' } = useParams();

    const { data, error, isFetching } = useQuery({ queryKey: ['detail'], queryFn: async () => {
        return await axios.get(`${baseURL}/${user}/${password}?codigo=${code}`);
    } });

    const estate = data?.data?.[0];

    const containerRef = useRef<any>(null);
    const [image, setImage] = useState('');

    useEffect(() => {
        setImage(estate?.imagenes?.[0]?.fotourl)
    }, [data])
  
    return (
        <div className={styles['margin-top']}>
            {
                isFetching && (
                    <div style={{ margin: '50px 0' }}>
                        <Loading />
                    </div>
                )
            }
            
            {
                !isFetching && estate && (
                    <div>
                        <div className={styles['container-header-images']}>
                            <div className={styles['child1']}>
                                <div className={styles['container-images']}>
                                    <ImageZoom image={image} />
                                    <div>
                                        <Swiper 
                                            watchSlidesProgress={true} 
                                            slidesPerView={7} 
                                            className={styles['mySwiper']}
                                            mousewheel
                                            keyboard
                                            modules={[Navigation, Pagination, Mousewheel, Keyboard, FreeMode]}
                                            navigation
                                            direction='horizontal'
                                            freeMode={true} 
                                        >
                                            {
                                                estate?.imagenes?.map((item: any, index: number) => (
                                                    <SwiperSlide className={styles['swiper-slide']}>
                                                        <img
                                                            key={item?.fotourl+index}
                                                            src={item?.fotourl} 
                                                            alt="Foto del inmueble"
                                                            ref={containerRef}
                                                            onMouseMove={() => setImage(item?.fotourl)}
                                                            onClick={() => setImage(item?.fotourl)}
                                                        />
                                                    </SwiperSlide>
                                                ))
                                            }
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                            <div className={styles['child2']}>
                                <div>
                                    <div className={styles['padding-left']}>
                                        <p 
                                            className={styles['code-label']}
                                        >
                                            Código: <span className={styles['code-text']}>{estate.consecutivo}</span>
                                        </p>
                                        <p 
                                            className={styles['class-text']}
                                        >
                                            {estate.clase} en
                                            <span> {estate.tipo_servicio}</span>, 
                                            <span className={styles['code-label']}> {estate?.area}m<sup>2</sup></span>
                                        </p>
                                        <p 
                                            className={styles['city']}
                                        >
                                            {estate.municipio}, <span>{estate.barrio ? estate.barrio : ''}</span>
                                        </p>
                                        <p
                                            className={styles['management-label']}
                                        >
                                            Sostenimiento:
                                            <span 
                                                className={styles['management-text']}
                                            > {estate?.sostenimiento ? estate?.sostenimiento : ' - '}</span>
                                        </p>
                                        <p
                                            className={styles['price']}
                                        >
                                            {
                                                estate?.tipo_servicio === 'Venta' 
                                                    ? copFormatter(estate?.precio_venta) 
                                                    : copFormatter(estate?.precio)
                                            }
                                        </p>

                                        <div className={styles['btn-container']}>
                                            <button className={styles['btn-info']}>
                                                <p>Pregúntanos por WhatsApp</p>
                                                <img src={WhatsAppIcon} alt="WhatsApp icon" className={styles['wpp-icon']} />
                                            </button>
                                        </div>
                                        
                                        {/* <p style={{ margin: 0, padding: 0, marginTop: 20 }}>ó</p> */}
                                        <div style={{ display: 'flex', justifyContent: 'space-around', margin: '0', marginTop: 20}}>
                                            <hr style={{ width: '155px', height: '1px', margin: 'auto 0' }} />
                                            <p style={{padding: '0 .5rem'}}>ó</p>
                                            <hr style={{ width: '155px', height: '1px', margin: 'auto 0' }} />
                                        </div>
                                    </div>
                                    <Contact />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                error?.message && <Error />
            }
        </div>
    )
}
