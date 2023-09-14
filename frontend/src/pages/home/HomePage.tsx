import React from 'react';
import { Link } from 'react-router-dom';
import { Center, Flex, Text, ThemeIcon } from '@mantine/core';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';

function HomePage() {
    return (
        <Center>
        <Flex direction="column" align="center" style={{ height: '100vh' }}>
            <h1>Welcome to Miaou</h1>
            <Link to="/login">
            <Flex gap="sm" justify="left" direction="row" wrap="wrap">
                <ThemeIcon color="green" size={24} radius="xl">
                <LoginIcon fontSize="small" />
                </ThemeIcon>
                <Text size="xl" color="green">
                    Login
                </Text>
            </Flex>
            </Link>
            <Link to="/register">
            <Flex gap="sm" justify="left" direction="row" wrap="wrap">
                <ThemeIcon color="blue" size={24} radius="xl">
                <HowToRegIcon fontSize="small" />
                </ThemeIcon>
                <Text size="xl" color="blue">
                    Register
                </Text>
            </Flex>
            </Link>
            <Link to="/guest">
            <Flex gap="sm" justify="left" direction="row" wrap="wrap">
                <ThemeIcon color="purple" size={24} radius="xl">
                <LoginIcon fontSize="small" />
                </ThemeIcon>
                <Text size="xl" color="magenta">
                    Login as guest
                </Text>
            </Flex>
            </Link>
        </Flex>
        </Center>
    );
}

export default HomePage;
