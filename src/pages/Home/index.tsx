import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AutocompleteInput } from "../../components/Autocomplete";
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css';

import banner1 from '../../assets/banners/banner1.jpg';
import banner2 from '../../assets/banners/banner2.jpg';
import banner3 from '../../assets/banners/banner3.png';

import './styles.css';
import styles from './styles.module.css';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { copFormatter } from '../../utils/copFormatter';

const serviceTypeList = [
    'Cualquiera',
    'Venta',
    'Arriendo'
];

export const Home = () => {
  const user = import.meta.env.VITE_API_USER;
  const password = import.meta.env.VITE_API_PASSWORD;
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const [serviceType, setServiceType] = useState('');
  const [code, setCode] = useState('');

  const navigate = useNavigate();
  
  const handleSearch = () => {
    console.log({ serviceType, code })
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

  console.log(`${baseURL}/${user}/${password}?cantidadporpagina=8&pagina=1`)
  const { data: estates } = useQuery({ queryKey: ['starred-estates'], queryFn: async () => {
    return await axios.get(`${baseURL}/${user}/${password}?cantidadporpagina=4&pagina=1`);
  } });

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
            <SwiperSlide><img src={banner1} alt="Banner 1" /></SwiperSlide>
            <SwiperSlide><img src={banner2} alt="Banner 2" /></SwiperSlide>
            <SwiperSlide><img src={banner3} alt="Banner 3" /></SwiperSlide>
        </Swiper>

        <div className={styles['centered']}>
            <div className={styles['search-container']}>
                <div className={styles['flex']}>
                    <Icon name='casa-03' size={17} />
                    <p className={styles['title-search']}>¡Encuentra tu próximo inmueble aquí!</p>
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
            <p className={styles['title-estates']}>Inmuebles Destacados</p>
            <div className={styles['grid-container']}>
                {
                    estates?.data && estates?.data?.map(estate => (
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
                                >
                                    {estate.imagenes.map(image => (
                                        <SwiperSlide><img src={image?.fotourl} alt="" className={styles['product-image']} /></SwiperSlide>
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
                    ))
                }
            </div>
        </div>
    </div>
  )
}
