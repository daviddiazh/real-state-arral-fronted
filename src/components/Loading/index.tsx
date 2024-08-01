import styles from './styles.module.css';

export const Loading = ({ message = 'Estamos procesando tu solicitud...' }) => {
  return (
    <div className={styles['container-component']}>
        <div>
            <div className={styles['container-loader']}>
                <span className={styles['loader']} />
            </div>
            <p className={styles['message']}>{message}</p>
        </div>
    </div>
  )
}