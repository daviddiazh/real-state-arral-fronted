import React from 'react';
import { TextField } from '@mui/material';
import { Icon } from '../Icon';
import styles from './styles.module.css';
import { useForm } from '../../hooks/useForm';

export const Contact = () => {

    const { name, phone, email, matter, message, onInputChange } = useForm({
        name: '',
        phone: '',
        email: '',
        matter: '',
        message: '',
    });

    return (
        <div>
            <div className={styles['centered']}>
                <div className={styles['search-container']}>
                    <div className={styles['flex']}>
                        <Icon name='mail-01' size={17} />
                        <h1 className={styles['title-search']}>¡Envíanos un mensaje!</h1>
                    </div>

                    <div className={styles['inputs-container-contact']}>
                        <div className={styles['input-contact']}>
                            <div>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Nombre" 
                                    variant="outlined" 
                                    value={name}
                                    name='name'
                                    onChange={
                                        (event: React.ChangeEvent<HTMLInputElement>) => {
                                            onInputChange(event)
                                        }
                                    }
                                    style={{ width: '100%', margin: '5px 0' }}
                                    autoComplete='off'
                                />
                            </div>
                            <div>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Télefono" 
                                    variant="outlined" 
                                    value={phone} 
                                    name='phone'
                                    type='number'
                                    onChange={
                                        (event: React.ChangeEvent<HTMLInputElement>) => {
                                            onInputChange(event)
                                        }
                                    }
                                    style={{ width: '100%', margin: '5px 0' }}
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                        <div className={styles['input-contact']}>
                            <div>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Correo Electrónico" 
                                    variant="outlined" 
                                    value={email}
                                    name='email'
                                    type='email'
                                    onChange={
                                        (event: React.ChangeEvent<HTMLInputElement>) => {
                                            onInputChange(event)
                                        }
                                    }
                                    style={{ width: '100%', margin: '5px 0' }}
                                    autoComplete='off'
                                />
                            </div>
                            <div>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Asunto" 
                                    variant="outlined" 
                                    value={matter}
                                    name='matter' 
                                    onChange={
                                        (event: React.ChangeEvent<HTMLInputElement>) => {
                                            onInputChange(event)
                                        }
                                    }
                                    style={{ width: '100%', margin: '5px 0' }}
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles['input-contact-full']}>
                        <TextField 
                            id="outlined-basic" 
                            label="Mensaje" 
                            variant="outlined" 
                            value={message}
                            name='message' 
                            onChange={
                                (event: React.ChangeEvent<HTMLInputElement>) => {
                                    onInputChange(event)
                                }
                            }
                            style={{ width: '100%', margin: '5px 0' }}
                            autoComplete='off'
                            multiline
                            rows={4}
                        />
                    </div>

                    <button 
                        className={styles['btn-search']}
                        onClick={() => console.log('click')}
                    >
                        <p>Envíar</p>
                        <Icon name='send-03' color='#fff' size={15} />
                    </button>
                </div>
            </div>
        </div>
    )
}
