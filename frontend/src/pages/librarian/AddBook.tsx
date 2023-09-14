import React, { useState,useEffect } from 'react';
import Book from '../../components/book/Book';
import BookServices from '../../components/book/BookServices';
import {
    Button,
    TextInput,
    Flex,
    } from '@mantine/core';

const AddBookForm = () => {
    const [bookData, setBookData] = useState(new Book());

    const handleInputChange = (e : any) => {
        const { name, value } = e.target;
        setBookData({
            ...bookData,
            [name]: value,
        });
    };

    const fetchBookData = async () => {
        try {
            console.log(bookData);
            const resp = await BookServices.addBook(bookData);
            console.log('Response:', resp);
        } catch (error) {
            console.error('Error fetching book data:', error);
        }
    };  

    return (
        <div>
        <Flex direction='column'>
            <TextInput
            label="ISBN"
            name="isbn"
            value={bookData.isbn}
            onChange={handleInputChange}
            placeholder="Enter ISBN"
            />
        
            <TextInput
            label="Title"
            name="title"
            value={bookData.title}
            onChange={handleInputChange}
            placeholder="Enter title"
            />
        
            <TextInput
            label="Writer"
            name="writer"
            value={bookData.writer}
            onChange={handleInputChange}
            placeholder="Enter writer"
            />
        </Flex>
        <Flex>
            <TextInput
            label="Type"
            name="type"
            value={bookData.type}
            onChange={handleInputChange}
            placeholder="Enter type"
            />
        
            <TextInput
            label="Publish Date"
            name="publish_date"
            value={bookData.publish_date}
            onChange={handleInputChange}
            placeholder="Enter publish date"
            />
        
            <TextInput
            label="Pages Number"
            name="pagesNumber"
            value={bookData.pages_number}
            onChange={handleInputChange}
            placeholder="Enter pages number"
            type="number"
            />
        
            <TextInput
            label="Photo"
            name="photo"
            value={bookData.photo}
            onChange={handleInputChange}
            placeholder="Enter photo URL"
            />
        
            <TextInput
            label="Book URL"
            name="book_url"
            value={bookData.book_url}
            onChange={handleInputChange}
            placeholder="Enter book URL"
            />
        </Flex>
            <Button onClick={fetchBookData}>Add Book</Button>    
        </div>
    );
};

export default AddBookForm;