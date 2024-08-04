import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { animateScroll as scroll } from 'react-scroll';
import { Estate } from '../../components/Estate';
import { baseURL } from '../../utils/const';
import styles from './styles.module.css';
import { Loading } from '../../components/Loading';
import { Error } from '../../components/Error';
import { IEstate } from '../../interfaces/estate';
import { useEffect, useState } from 'react';
import { Icon } from '../../components/Icon';
import { WhatsappButton } from '../../components/WhatsAppButton';
import { PseButton } from '../../components/PseButton';

export const Search = () => {

  const [page, setPage] = useState(1);
  const { serviceType = 'all', code = 'all' } = useParams();

  const { data: estates, error, isFetching, refetch } = useQuery({ queryKey: ['search'], queryFn: async () => {
    if (serviceType === 'all' && code.length > 1) {
        return await axios.get(`${baseURL}/api/estates?cantidadporpagina=12&pagina=${page}&codigo=${code}`);
    } else if (serviceType !== 'all' && code === 'all') {
        return await axios.get(`${baseURL}/api/estates?cantidadporpagina=12&pagina=${page}&destinacion=${serviceType}`);
    } else if (serviceType !== 'all' && code !== 'all') {
        return await axios.get(`${baseURL}/api/estates?cantidadporpagina=12&pagina=${page}&codigo=${code}&destinacion=${serviceType}`);
    } else {
        return await axios.get(`${baseURL}/api/estates?cantidadporpagina=12&pagina=${page}`);
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
            <div>
                {
                    !isFetching && estates?.data?.length === 0 && (
                        <div>
                            <div className={styles['no-data-container']}>
                                <Icon name='alerta' color='#ffc107' />
                                <p style={{ color: '#333', fontWeight: 600 }}>No hay inmuebles para mostrar.</p>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className={styles['container-btns1']}>
                {
                    !isFetching && estates?.data && (
                        <>
                            <div className={styles['container-btns']}>
                                {
                                    page > 1 && code === 'all' ? (
                                        <button 
                                            disabled={isFetching} 
                                            onClick={() => setPage(page - 1)}
                                            className={styles['btn']}
                                        >
                                            <p className={styles['text-btn']}>Pág. Anterior ({page - 1})</p>
                                        </button>
                                    ) : <div />
                                }
                                {
                                    estates?.data?.length >= 1 && (
                                        <button 
                                            disabled={isFetching || estates?.data?.length === 0}
                                            onClick={() => setPage(page + 1)}
                                            className={styles['btn']}
                                        >
                                            <p className={styles['text-btn']}>Pág. Siguiente ({page + 1})</p>
                                        </button>
                                    )
                                }
                            </div>

                            <p>Página actual {page}</p>
                        </>
                    )
                }
            </div>
            {
                isFetching && <Loading />
            }
            {
                error?.message && <Error />
            }

            <WhatsappButton />
            <PseButton />
        </div>
    )
}
