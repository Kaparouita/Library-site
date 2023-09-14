import React from 'react';
import { ActionIcon } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';

function LogoutButton() {
    const navigate = useNavigate();
    const { logout } = useAuth(); // Use your authentication context's logout function

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <ActionIcon
            size="xl"
            variant="default"
            radius="xl"
            onClick={handleLogout}
            >
            <LogoutIcon />
        </ActionIcon>
);
}

export default LogoutButton;
