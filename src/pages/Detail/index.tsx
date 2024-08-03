/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { animateScroll as scroll } from 'react-scroll';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard, FreeMode } from 'swiper/modules';
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";
import { baseURL, password, user } from "../../utils/const";
import { ImageZoom } from "../../components/ImageZoom";
import { Contact } from "../../components/Contact";
import { copFormatter } from "../../utils/copFormatter";
import WhatsAppIcon from '../../assets/icons/wpp.svg';
import { Icon } from "../../components/Icon";
import { handleWhatsAppClick } from "../../utils/handleWhatsAppMessage";

import 'swiper/css/navigation';
import 'swiper/css';
import styles from './styles.module.css';
import '../../pages/Home/styles.css';
import { IEstate } from "../../interfaces/estate";
import { Estate } from "../../components/Estate";
import { PseButton } from "../../components/PseButton";
import { WhatsappButton } from "../../components/WhatsAppButton";

export const Detail = () => {

    const { code = '' } = useParams();

    const { data, error, isFetching, refetch } = useQuery({ queryKey: ['detail'], queryFn: async () => {
        return await axios.get(`${baseURL}/${user}/${password}?codigo=${code}`);
    } });

    const estate = data?.data?.[0];

    const randomNumber = () => {
        return Math.floor(Math.random()  * (5 - 1) + 1);
    }

    const { data: similarEstates, error: errorSE, isFetching: isFetchingSE } = useQuery({ queryKey: ['similar-estates'], queryFn: async () => {
        return await axios.get(`${baseURL}/${user}/${password}?cantidadporpagina=4&pagina=${randomNumber()}`);
    } });

    const containerRef = useRef<any>(null);
    const [image, setImage] = useState('');

    useEffect(() => {
        setImage(estate?.imagenes?.[0]?.fotourl)
    }, [data])

    useEffect(() => {
        scroll.scrollToTop({
            duration: 0,
            smooth: true,
        });
    }, [code]);

    useEffect(() => {
        refetch();
    }, [code])
  
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
                            <div className={styles['container-center']}>
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
                                                spaceBetween={5}
                                            >
                                                {
                                                    estate?.imagenes?.map((item: any, index: number) => (
                                                        <SwiperSlide className={styles['swiper-slide']} key={item?.fotourl+index}>
                                                            <img
                                                                src={item?.fotourl} 
                                                                alt="Foto del inmueble"
                                                                ref={containerRef}
                                                                onMouseMove={() => setImage(item?.fotourl)}
                                                                onClick={() => setImage(item?.fotourl)}
                                                                width={70}
                                                            />
                                                        </SwiperSlide>
                                                    ))
                                                }
                                            </Swiper>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles['desktop']}>
                                    <p className={styles['resumen-title']}>Descripción</p>
                                    <p className={styles['resumen']}>{estate?.resumen?.length < 5 ? 'Este inmueble no tiene una descripción.' : estate?.resumen}</p>

                                    <table className={styles['table']}>
                                        <tr>
                                            <td className={styles['title-row']}>Área</td>
                                            <td className={styles['data-row']}>{estate?.area}m<sup>2</sup></td>
                                        </tr>
                                        <tr>
                                            <td className={styles['title-row']}>Sala</td>
                                            <td 
                                                className={styles['data-row']}
                                            >
                                                { 
                                                    estate?.sala 
                                                        ? <Icon name="check-02" color="#4caf50" /> 
                                                        : <Icon name="x-circulo" color="#f44336" /> 
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles['title-row']}>Cocina</td>
                                            <td className={styles['data-row']}>{ estate?.cocina ? estate?.cocina : '-' }</td>
                                        </tr>
                                        <tr>
                                            <td className={styles['title-row']}>Baños</td>
                                            <td className={styles['data-row']}>{ estate?.baños ? estate?.baños : '-' }</td>
                                        </tr>
                                        <tr>
                                            <td className={styles['title-row']}>Baños con cabina</td>
                                            <td 
                                                className={styles['data-row']}
                                            >
                                                { 
                                                    estate?.baño_Cabina 
                                                        ? <Icon name="check-02" color="#4caf50" /> 
                                                        : <Icon name="x-circulo" color="#f44336" /> 
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles['title-row']}>Patios</td>
                                            <td className={styles['data-row']}>{ estate?.patios || estate?.patios >= 0 ? estate?.patios : '-' }</td>
                                        </tr>
                                        <tr>
                                            <td className={styles['title-row']}>Sector</td>
                                            <td className={styles['data-row']}>{ estate?.sector ? estate?.sector : '-' }</td>
                                        </tr>
                                    </table>
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
                                            <button 
                                                className={styles['btn-info']}
                                                onClick={() => handleWhatsAppClick()}
                                            >
                                                <p>Pregúntanos por WhatsApp</p>
                                                <img 
                                                    src={WhatsAppIcon} 
                                                    alt="WhatsApp icon" 
                                                    className={styles['wpp-icon']} 
                                                    width={50}
                                                />
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

                        <div className={styles['mobile']}>
                            <p className={styles['resumen-title']}>Descripción</p>
                            <p className={styles['resumen']}>{estate?.resumen?.length < 5 ? 'Este inmueble no tiene una descripción.' : estate?.resumen}</p>

                            <table className={styles['table']}>
                                <tr>
                                    <td className={styles['title-row']}>Área</td>
                                    <td className={styles['data-row']}>{estate?.area}m<sup>2</sup></td>
                                </tr>
                                <tr>
                                    <td className={styles['title-row']}>Sala</td>
                                    <td 
                                        className={styles['data-row']}
                                    >
                                        { 
                                            estate?.sala 
                                                ? <Icon name="check-02" color="#4caf50" /> 
                                                : <Icon name="x-circulo" color="#f44336" /> 
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles['title-row']}>Cocina</td>
                                    <td className={styles['data-row']}>{ estate?.cocina ? estate?.cocina : '-' }</td>
                                </tr>
                                <tr>
                                    <td className={styles['title-row']}>Baños</td>
                                    <td className={styles['data-row']}>{ estate?.baños ? estate?.baños : '-' }</td>
                                </tr>
                                <tr>
                                    <td className={styles['title-row']}>Baños con cabina</td>
                                    <td 
                                        className={styles['data-row']}
                                    >
                                        { 
                                            estate?.baño_Cabina 
                                                ? <Icon name="check-02" color="#4caf50" /> 
                                                : <Icon name="x-circulo" color="#f44336" /> 
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles['title-row']}>Patios</td>
                                    <td className={styles['data-row']}>{ estate?.patios || estate?.patios >= 0 ? estate?.patios : '-' }</td>
                                </tr>
                                <tr>
                                    <td className={styles['title-row']}>Sector</td>
                                    <td className={styles['data-row']}>{ estate?.sector ? estate?.sector : '-' }</td>
                                </tr>
                            </table>
                        </div>

                        <div style={{ marginTop: 20 }}>
                            <p className={styles['generic-title']}>Inmuebles que pueden interesarte</p>
                            {
                                isFetchingSE && (
                                    <div style={{ margin: '50px 0' }}>
                                        <Loading />
                                    </div>
                                )
                            }
                            <div className={styles['grid-container']}>
                                {
                                    similarEstates?.data && similarEstates?.data?.map((estate: IEstate) => (
                                        <Estate estate={estate} key={estate?.consecutivo + estate?.barrio} />
                                    ))
                                }
                            </div>
                            {
                                errorSE?.message && <Error />
                            }
                        </div>
                    </div>
                )
            }

            {
                !isFetching && !estate && (
                    <div>
                        <div className={styles['no-data-container']}>
                            <Icon name='alerta' color='#ffc107' />
                            <p style={{ color: '#333', fontWeight: 600 }}>No encontramos el inmueble {code}.</p>
                        </div>

                        <div style={{ marginTop: 40 }}>
                            <p className={styles['generic-title']}>Inmuebles que pueden interesarte</p>
                            {
                                isFetchingSE && (
                                    <div style={{ margin: '50px 0' }}>
                                        <Loading />
                                    </div>
                                )
                            }
                            <div className={styles['grid-container']}>
                                {
                                    similarEstates?.data && similarEstates?.data?.map((estate: IEstate) => (
                                        <Estate estate={estate} key={estate?.consecutivo + estate?.barrio} />
                                    ))
                                }
                            </div>
                            {
                                errorSE?.message && <Error />
                            }
                        </div>
                    </div>
                )
            }

            {
                error?.message && <Error />
            }

            <PseButton />
            <WhatsappButton />
        </div>
    )
}
