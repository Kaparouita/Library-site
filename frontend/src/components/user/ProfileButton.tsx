import { ActionIcon } from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

function ProfileButton() {
    const { userId } = useParams<{ userId: string }>(); // Specify the type of userId
    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate(`/user/${userId}/edit-profile`);
    };

    return (
        <ActionIcon size="xl" variant="default" radius="xl" onClick={handleEditProfile}>
        <PersonIcon />
        </ActionIcon>
    );
}

export default ProfileButton;
