import { ActionIcon } from '@mantine/core';
import {  useNavigate } from 'react-router-dom';
import ReviewsIcon from '@mui/icons-material/Reviews';

function ReviewButton({bookId} : {bookId: number}) {
    const navigate = useNavigate();

    const handleReview = () => {
        navigate(`/book/${bookId}/reviews`);
    };
    return (
        <ActionIcon
            size="xl"
            variant="default"
            radius="xl"
            onClick={handleReview}
            >
            <ReviewsIcon />
        </ActionIcon>
);
}

export default  ReviewButton;