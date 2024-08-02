import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";
import { baseURL, password, user } from "../../utils/const";
import styles from './styles.module.css';

export const Detail = () => {

    const { code = '' } = useParams();

    const { data: estate, error, isLoading } = useQuery({ queryKey: ['search'], queryFn: async () => {
            return await axios.get(`${baseURL}/${user}/${password}?codigo=${code}`);
    } });

    return (
        <div className={styles['margin-top']}>
            {
                isLoading && (
                    <div style={{ margin: '50px 0' }}>
                        <Loading />
                    </div>
                )
            }

            {
                JSON.stringify(estate, null, 4)
            }

            {
                error?.message && <Error />
            }
        </div>
    )
}
