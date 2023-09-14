import React, { useState, useEffect } from 'react';
import { Flex, Table } from '@mantine/core'; // Adjust imports as needed
import { BookPagin } from '../../components/book/Book';
import AvailableBooks from '../books/AvailableBooks';

function Guest() {
  
  const [pagin] = useState<BookPagin>(new BookPagin());
  pagin.max_year = 2023; pagin.min_year = 1200;

  return (
    <Flex gap="xl" direction="column" align="center" style={{ height: '100vh' }}>
      <h1>Guest</h1>
        <AvailableBooks pagin={pagin} user_id={-1} ></AvailableBooks>
    </Flex>
  );
}

export default Guest;
