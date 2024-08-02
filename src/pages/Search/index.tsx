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
import { useEffect, useState } from 'react';

export const Search = () => {

  const [page, setPage] = useState(1);
  const { serviceType = 'all', code = 'all' } = useParams();

  const { data: estates, error, isFetching, refetch } = useQuery({ queryKey: ['search'], queryFn: async () => {
    if (serviceType === 'all' && code.length > 1) {
        return await axios.get(`${baseURL}/${user}/${password}?cantidadporpagina=12&pagina=${page}&codigo=${code}`);
    } else if (serviceType !== 'all' && code === 'all') {
        return await axios.get(`${baseURL}/${user}/${password}?cantidadporpagina=12&pagina=${page}&destinacion=${serviceType}`);
    } else if (serviceType !== 'all' && code !== 'all') {
        return await axios.get(`${baseURL}/${user}/${password}?cantidadporpagina=12&pagina=${page}&codigo=${code}&destinacion=${serviceType}`);
    } else {
        return await axios.get(`${baseURL}/${user}/${password}?cantidadporpagina=12&pagina=${page}`);
    }
  } });

  useEffect(() => {
    scroll.scrollToTop({
        duration: 0,
        smooth: true,
    });
  }, []);

  useEffect(() => {
    refetch();
  }, [page]);

  return (
        <div className={styles['margin-top']}>
            <p className={styles['title-estates']}>Busqueda de Inmuebles</p>
            <div className={styles['grid-container']}>
                {
                    estates?.data && estates?.data?.map((estate: IEstate) => (
                        <Estate estate={estate} key={estate?.consecutivo} />
                    ))
                }
            </div>
            <div style={{ padding: '25px 15px' }}>
                {
                    !isFetching && estates?.data && (
                        <div>
                            <div className={styles['container-btns']}>
                                {
                                    page > 1 ? (
                                        <button 
                                            disabled={isFetching} 
                                            onClick={() => setPage(page - 1)}
                                            className={styles['btn']}
                                        >
                                            <p className={styles['text-btn']}>Pág. Anterior ({page - 1})</p>
                                        </button>
                                    ) : <div />
                                }
                                <button 
                                    disabled={isFetching} 
                                    onClick={() => setPage(page + 1)}
                                    className={styles['btn']}
                                >
                                    <p className={styles['text-btn']}>Pág. Siguiente ({page + 1})</p>
                                </button>
                            </div>

                            <p>Página actual {page}</p>
                        </div>
                    )
                }
            </div>
            {
                isFetching && (
                    <div style={{ margin: '50px 0' }}>
                        <Loading />
                    </div>
                )
            }
            {
                error?.message && <Error />
            }
        </div>
    )
}
