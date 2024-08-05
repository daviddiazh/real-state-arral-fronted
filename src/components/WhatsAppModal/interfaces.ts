export interface WhatsAppModalProps {
    openModal: boolean;
    setOpenModal: (newState: boolean) => boolean | void;
    message?: string;
}