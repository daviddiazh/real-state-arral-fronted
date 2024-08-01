import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { animateScroll as scroll } from 'react-scroll';
import { Estate } from '../../components/Estate';
import { baseURL, password, user } from '../../utils/const';
import styles from './styles.module.css';
import { Loading } from '../../components/Loading';
import { Error } from '../../components/Error';
import { IEstate } from '../../interfaces/estate';
import { useEffect } from 'react';

export const Search = () => {

  const { serviceType = 'all', code = 'all' } = useParams();

  const { data: estates, error, isLoading } = useQuery({ queryKey: ['search'], queryFn: async () => {
    if (serviceType === 'all' && code.length > 1) {
        return await axios.get(`${baseURL}/${user}/${password}?cantidadporpagina=10&pagina=1&codigo=${code}`);
    } else if (serviceType !== 'all' && code === 'all') {
        return await axios.get(`${baseURL}/${user}/${password}?cantidadporpagina=10&pagina=1&destinacion=${serviceType}`);
    } else if (serviceType !== 'all' && code !== 'all') {
        return await axios.get(`${baseURL}/${user}/${password}?cantidadporpagina=10&pagina=1&codigo=${code}&destinacion=${serviceType}`);
    } else {
        return await axios.get(`${baseURL}/${user}/${password}?cantidadporpagina=10&pagina=1`);
    }
  } });

  useEffect(() => {
    scroll.scrollToTop({
        duration: 0,
        smooth: true,
    });
  }, []);

  return (
        <div className={styles['margin-top']}>
            <p className={styles['title-estates']}>Busqueda</p>
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
    )
}
