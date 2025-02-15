import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Map, Marker } from "pigeon-maps"
import { TextField } from '@mui/material';
import { scroller } from 'react-scroll';
import { AutocompleteInput } from "../../components/Autocomplete";
import { Link } from 'react-router-dom';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css';

import banner1 from '../../assets/banners/banner1.jpg';
import banner2 from '../../assets/banners/banner2.png';
import banner3 from '../../assets/banners/banner3.png';

import { Icon } from '../../components/Icon';
import { Estate } from '../../components/Estate';
import { baseURL } from '../../utils/const';
import { Error } from '../../components/Error';
import { Loading } from '../../components/Loading';
import { IEstate } from '../../interfaces/estate';
import styles from './styles.module.css';
import './styles.css';
import { WhatsappButton } from '../../components/WhatsAppButton';
import { PseButton } from '../../components/PseButton';
import { Contact } from '../../components/Contact';

const serviceTypeList = [
    'Cualquiera',
    'Venta',
    'Arriendo'
];

export const Home = () => {

  const [serviceType, setServiceType] = useState('');
  const [code, setCode] = useState('');

  const navigate = useNavigate();
  
  const handleSearch = () => {
    let url = '';
    if ((serviceType === '' || serviceType === 'Cualquiera') && code.length > 1) {
        url = `/search/all/${code}`
    } else if (serviceTypeList.includes(serviceType) && code === '') {
        url = `/search/${serviceType}/all`
    } else if (serviceType === '' && code === '') {
        url = `/search/all/all`
    } else if (serviceTypeList.includes(serviceType) && code.length > 1) {
        url = `/search/${serviceType}/${code}`
    }

    return navigate(url);
  }

  const { data: estates, error, isLoading } = useQuery({ queryKey: ['starred-estates'], queryFn: async () => {
    return await axios.get(`${baseURL}/api/estates?cantidadporpagina=4&pagina=1`);
  } });

  const location = useLocation();

    useEffect(() => {
        const section = location.hash?.substring(1)
        
        if (section) {
            scroller.scrollTo(section, {
                smooth: true,
                duration: 500,
                offset: -80,
            });
        }
    }, [location]);

  return (
    <div className={styles['margin-top']}>
        
        <Swiper
            cssMode
            navigation
            pagination
            mousewheel
            keyboard
            modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
            className="swiper-container"
            autoplay={{
                delay: 5000,
            }}
        >
            <SwiperSlide>
                <img src={banner1} alt="Banner 1" width={800} loading="lazy" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={banner2} alt="Banner 2" width={800} loading="lazy" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={banner3} alt="Banner 3" width={800} loading="lazy" />
            </SwiperSlide>
        </Swiper>

        <div className={styles['centered']}>
            <div className={styles['search-container']}>
                <div className={styles['flex']}>
                    <Icon name='casa-03' size={17} />
                    <h1 className={styles['title-search']}>¡Encuentra tu próximo inmueble aquí!</h1>
                </div>

                <div className={styles['inputs-container']}>
                    <div className={styles['input']}>
                        <AutocompleteInput
                            data={serviceTypeList}
                            label='Tipo de servicio'
                            value={serviceType}
                            setValue={setServiceType}
                        />
                    </div>
                    <div className={styles['input']}>
                        <TextField 
                            id="outlined-basic" 
                            label="Código de Inmueble" 
                            variant="outlined" 
                            value={code} 
                            onChange={
                                (event: React.ChangeEvent<HTMLInputElement>) => {
                                    setCode(event?.target?.value);
                                }
                            }
                            style={{ width: '100%' }}
                            autoComplete='off'
                        />
                    </div>
                </div>

                <button 
                    className={styles['btn-search']}
                    onClick={handleSearch}
                >
                    <p>Buscar</p>
                    <Icon name='buscar-04' color='#fff' size={17} />
                </button>
            </div>
        </div>

        <div>
            <p className={styles['generic-title']}>Inmuebles Destacados</p>
            {
                isLoading && (
                    <div style={{ margin: '50px 0' }}>
                        <Loading />
                    </div>
                )
            }
            <div className={styles['grid-container']}>
                {
                    estates?.data && estates?.data?.map((estate: IEstate) => (
                        <Estate estate={estate} key={estate?.consecutivo} />
                    ))
                }
            </div>
            {
                error?.message && <Error />
            }
        </div>
        
        <div id='about' style={{ marginTop: 15 }}>
            <p className={styles['generic-title']}>Sobre Nosotros</p>

            <div className={styles['container-about']}>
                <div className={styles['container-about-child1']}>
                    <div className={styles['container-about-info']}>
                        <Icon name='phone' size={16} />
                        <p className={styles['text-about-info']}>PBX: (604) 448 97 98</p>
                    </div>
                    <div className={styles['container-about-info']}>
                        <Icon name='phone' size={16} />
                        <p className={styles['text-about-info']}><span style={{ fontWeight: 600 }}>318 405 2662 (principal)</span> - 312 767 0793</p>
                    </div>
                    <div className={styles['container-about-info']}>
                        <Icon name='mail-01' size={16} />
                        <Link to='mailto:info@arrendamientosalvarez.com'>
                            <p 
                                className={styles['text-about-info']}
                                style={{ textDecoration: 'underline', textDecorationColor: '#00AEEF' }}
                            >
                                info@arrendamientosalvarez.com
                            </p>
                        </Link>
                    </div>
                    <div className={styles['container-about-info']}>
                        <Icon name='marker-pin-06' size={16} />
                        <div>
                            <p className={styles['text-about-info']}>Carrera 49 # 52-141 Medellin, Antioquia.</p>
                            <p className={styles['text-about-info']}>(pasaje Junin Maracaibo Of. 301)</p>
                        </div>
                    </div>
                </div>
                <div className={styles['container-about-child2']}>
                    <Map
                        height={300} 
                        defaultCenter={[6.251070586444387, -75.56584172019515]} 
                        defaultZoom={13.5}
                    >
                        <Marker width={50} anchor={[6.251070586444387, -75.56584172019515]} />
                    </Map>
                </div>
            </div>
        </div>

        <div id='contact'>
            <p className={styles['generic-title']}>Contacto</p>

            <div className={styles['contact-container']}>
                <div className={styles['message-container']}>
                    <p className={styles['title']}>¿Tienes dudas?</p>
                    <p className={styles['message']}>Asesórate con nosotros aquí</p>
                </div>
                <div className={styles['form-container']}>
                    <Contact />
                </div>
            </div>
        </div>

        <WhatsappButton />
        <PseButton />
    </div>
  )
}
