import file from '../../files/SOLICITUD-DE-ARRIENDO.pdf';
import styles from '../../pages/Home/styles.module.css';

export const RentRequest = () => {
  return (
    <div className={styles['margin-top']}>
        <button
             style={{ padding: '8px 35px', backgroundColor: '#00AEEF', margin: 30, border: 'none', borderRadius: 9 }}
        >
            <a 
                href={file} 
                download="Solicitud de arriendo"
                style={{ color: '#fff', fontSize: 18 }}
            >
                Descargar Formato
            </a>
        </button>
        <iframe src={file} width="97%" height="600px" />
    </div>
  )
}