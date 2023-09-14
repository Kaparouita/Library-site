import React, { useState, useEffect } from 'react';
import { Text } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { Review } from '../../components/book/Book';
import BookServices from '../../components/book/BookServices';
import { BookPagin, Book } from '../../components/book/Book';

const BookReviews: React.FC = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [bookData, setBookData] = useState<Book | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const parsedBookId = parseInt(bookId as string, 10);
                const bookDataResponse = await BookServices.getBook(parsedBookId);
                setBookData(bookDataResponse);
                console.log(bookDataResponse)
                setReviews(bookDataResponse.reviews);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchReviews();
    }, [bookId]);

    let content;
    if (bookData) {
        const rows = reviews.map((review) => (
            <tr key={review.user_name}>
                <td>{review.rating}</td>
                <td>{review.user_name}</td>
                <td>{review.comment}</td>
            </tr>
        ));
        content = (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Rating</th>
                            <th>Username</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    } else {
        content = <Text>Loading...</Text>;
    }
    return content;
};

export default BookReviews;
