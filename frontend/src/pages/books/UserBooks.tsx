import React, { useState, ChangeEvent, useEffect } from 'react';
import { Button, TextInput, Flex } from '@mantine/core';
import { BookPagin } from '../../components/book/Book';
import AvailableBooks from './AvailableBooks';
import User from '../../components/user/User';

interface YearPickerProps {
    onYearSubmit: (minYear: number, maxYear: number) => void;
}

const YearPicker: React.FC<YearPickerProps> = ({ onYearSubmit }) => {
    const [minYear, setMinYear] = useState('1200');
    const [maxYear, setMaxYear] = useState('2023');

    const handleYearChange = (
        e: ChangeEvent<HTMLInputElement>,
        setYear: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const inputYear = e.target.value;
        setYear(inputYear);
    };

    const handleSubmit = () => {
        onYearSubmit(parseInt(minYear), parseInt(maxYear)); // Convert string to number here
    };

    return (
        <div>
            <Flex gap="xl" justify="left" direction="row" wrap="wrap">
                <TextInput
                    label="Min Year"
                    name="Min Year"
                    value={minYear}
                    onChange={(e) => handleYearChange(e, setMinYear)}
                    placeholder="e.g., 1200"
                />
                <TextInput
                    label="Max Year"
                    value={maxYear}
                    onChange={(e) => handleYearChange(e, setMaxYear)}
                    placeholder="e.g., 2023"
                />
                <Button m="1rem" onClick={handleSubmit}>
                    Submit
                </Button>
            </Flex>
        </div>
    );
};

function UserBooks({user} :{ user : User}) {
    const [pagin, setPagin] = useState<BookPagin>(new BookPagin());


    const handleYearSubmit = (min_year: number, max_year: number) => {
        // Update the minYear and maxYear fields in your BookPagin object here
        setPagin((prevPagin) => ({
            ...prevPagin,
            min_year,
            max_year,
        }));
    };

    useEffect(() => {

    }, [pagin]);

    return (
        <div>
            <YearPicker onYearSubmit={handleYearSubmit} />
            <AvailableBooks pagin={pagin} user_id={user.id} />
        </div>
    );
}

export default UserBooks;
