import { Icon } from '../Icon';
import styles from './styles.module.css';

export const Error = () => {
  return (
    <div>
        <div className={styles['container-error']}>
            <Icon name='alerta' color='#f44336' />
            <p className={styles['error-text']}>Ocurrió un error, intenta más tarde...</p>
        </div>
    </div>
  )
}
