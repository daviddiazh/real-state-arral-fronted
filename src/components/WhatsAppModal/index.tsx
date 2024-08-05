import { Avatar, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { handleWhatsAppClick } from '../../utils/handleWhatsAppMessage';
import { WhatsAppModalProps } from './interfaces';
import styles from '../WhatsAppButton/styles.module.css';
import WhatsAppIcon from '../../assets/icons/wpp.svg';

export const WhatsAppModal = ({ openModal, setOpenModal, message }: WhatsAppModalProps) => {
  return (
    <Dialog onClose={() => setOpenModal(false)} open={openModal}>
        <DialogTitle>Selecciona una opción</DialogTitle>
        <List sx={{ pt: 0 }}>
            <ListItem disableGutters key='318 405 2662'>
                <ListItemButton onClick={() => handleWhatsAppClick('3184052662', message)}>
                    <ListItemAvatar>
                        <Avatar>
                        <img 
                            src={WhatsAppIcon} 
                            alt="WhatsApp icon" 
                            className={styles['icon']} 
                            width={50}
                        />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={'318 405 2662 (principal)'} />
                </ListItemButton>
            </ListItem>
            <ListItem disableGutters key='312 767 0793'>
                <ListItemButton onClick={() => handleWhatsAppClick('3127670793', message)}>
                    <ListItemAvatar>
                        <Avatar>
                        <img 
                            src={WhatsAppIcon} 
                            alt="WhatsApp icon" 
                            className={styles['icon']} 
                            width={50}
                        />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={'312 767 0793 (secundario)'} />
                </ListItemButton>
            </ListItem>
        </List>
    </Dialog>
  )
}
