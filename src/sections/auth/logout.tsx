import { useTranslation } from 'react-i18next';
import { logout } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function LogoutButton() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/sign-in');
    };

    return (
        <button
            onClick={handleLogout}
            style={{
                position: 'absolute',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#f44336',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
            }}
        >
            {t('logout')}
        </button>
    );
}
