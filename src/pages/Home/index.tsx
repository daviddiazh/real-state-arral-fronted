import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AutocompleteInput } from "../../components/Autocomplete";
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css';

import banner1 from '../../assets/banners/banner1.png';
import banner2 from '../../assets/banners/banner2.png';
import banner3 from '../../assets/banners/banner3.png';

import './styles.css';

const data = [
    'Hola 1',
    'Hola 10',
    'Hola 2',
    'Hola 3',
    'Hola 4',
    'Hola 5',
];

export const Home = () => {
  const [value, setValue] = useState('');
  console.log({ value })

  return (
    <div style={{ marginTop: 70 }}>
        
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

        <AutocompleteInput
            data={data}
            label='Buscar datos'
            value={value}
            setValue={setValue}
        />
    </div>
  )
}
