import React, { useState, useEffect } from 'react';
import { Flex, Table } from '@mantine/core'; // Adjust imports as needed
import { BookPagin } from '../../components/book/Book';
import AvailableBooks from '../books/AvailableBooks';
import { useParams, useNavigate } from 'react-router-dom';
import AddBookForm from './AddBook';

function LibrarianProfile() {
    const { userId } = useParams<{ userId: string }>();
    const [pagin] = useState<BookPagin>(new BookPagin());
    pagin.max_year = 2023; pagin.min_year = 1200;

    return (
        <Flex gap="xl" direction="column" align="center" style={{ height: '100vh' }}>
        <h1>Librarian</h1>
            <AvailableBooks pagin={pagin} user_id={parseInt(userId ||'-1')} ></AvailableBooks>
        <AddBookForm></AddBookForm>
        </Flex>
    );
    }

export default LibrarianProfile;
