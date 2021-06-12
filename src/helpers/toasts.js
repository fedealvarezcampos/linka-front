import { toast } from 'react-toastify';

const notifyError = message => {
    toast.warn(`${message} 💣`, {
        position: 'bottom-right',
        limit: '3',
    });
};

const notifyAuth = (token, itsMyPost) => {
    toast.error(
        (!token && 'Log in to do that! 🍕') || (itsMyPost && 'Liking your own links is not cool 🦂'),
        {
            position: 'bottom-right',
            limit: '3',
        }
    );
};

export { notifyError, notifyAuth };
