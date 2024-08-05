export const handleWhatsAppClick = (phone: string, message = '') => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/57${phone}?text=${encodedMessage}`, '_blank');
};