import React, { useState, useEffect } from 'react';
import { Button, Modal, TextInput, Text } from '@mantine/core'; // Adjust imports as needed
import { BookServices } from '../../components/book/BookServices';
import { BookPagin ,Review} from '../../components/book/Book';

import Book from '../../components/book/Book';
import UserServices from '../../components/user/UserServices';
import ReviewButton from './ReviewButton';



    function AvailableBooks({ pagin, user_id }: { pagin: BookPagin; user_id: number }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [newReview, setNewReview] = useState(new Review());

    useEffect(() => {
        const fetchBooks = async () => {
        try {
            const bookData = await BookServices.getBooks(pagin);
            setBooks(bookData.books);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
        };
        fetchBooks();
    }, [pagin]);

    const handleAddReviewClick = (book: Book) => {
        setSelectedBook(book);
        setReviewModalOpen(true);
    };

    const handleReviewModalClose = () => {
        setReviewModalOpen(false);
    };

    const handleReviewSubmit = () => {
    // Assuming you have a function to add a review to the selected book
        if (selectedBook) {
            const updatedBook = { ...selectedBook };
            UserServices.reviewBook(newReview,user_id);
            setBooks((prevBooks) =>
                prevBooks.map((book) => (book.title === updatedBook.title ? updatedBook : book))
            );
        }
        setNewReview(new Review());
        setReviewModalOpen(false);
    };

    const rows = books.map((book) => (
        <tr key={book.title}>
            <td>{book.title}</td>
            <td>{book.writer}</td>
            <td>{book.type}</td>
            <td>{book.publish_date || 'N/A'}</td>
            <td>{book.book_url}</td>
            <td>
                <ReviewButton bookId={book.id} />
            </td>
            <td>
                {user_id !== -1 && ( 
                    <Button onClick={() => handleAddReviewClick(book)}>Add Review</Button>
                )}
            </td>
        </tr>
    ));

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Writer</th>
                    <th>Type</th>
                    <th>Publish Date</th>
                    <th>Url</th>
                    <th>Reviews</th>
                    <th>
                        {user_id !== -1 ? 'Action' : ''}
                    </th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
            <Modal
                opened={reviewModalOpen}
                onClose={handleReviewModalClose}
                title={`Add Review for ${selectedBook?.title || ''}`}
            >
                <div>
                <Text size="xl">Rating:</Text>
                <TextInput
                    value={newReview.rating.toString()}
                    onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value, 10) })}
                    type="number"
                />
                </div>
                <div>
                <Text size="xl">Comment:</Text>
                <TextInput
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                />
                </div>
                <Button onClick={handleReviewSubmit}>Submit Review</Button>
            </Modal>
        </div>
    );
}

export default AvailableBooks;
