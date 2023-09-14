import React, { useState } from 'react';
import { Flex, Center, Button, TextInput, PasswordInput } from '@mantine/core';
import Loginservice from './LoginServices';
import { useNavigate } from 'react-router-dom';
import  useAuth  from '../../AuthContext';
import AutoLogout from '../../components/logout/AutoLogout';

interface LoginResponse {
    username: string;
    password: string;
}

    function Login() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    const [loginResp, setLoginResponse] = useState<LoginResponse>({
        username: '',
        password: '',
    });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string | undefined }>({});

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginResponse((prevLogin) => ({
        ...prevLogin,
        [name]: value,
        }));

        // Clear validation error when the user starts typing again
        setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
        }));
    };

    const handleSubmit = () => {
        setFormSubmitted(true);

        // Perform validation
        // const errors = validateRegistrationForm(updatedUser,confirmPassword)
        const errors = {};

        // Add more validation checks for other fields
        if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
        }
        console.log(loginResp);
        handleLogin();
    };

    const handleLogin = async () => {
        try {
            const userData = await Loginservice.login(loginResp.username, loginResp.password);
            setIsAuthenticated(true);

            localStorage.setItem('isAuthenticated', 'true');

            if (userData.user_type === 'admin') {
                navigate(`/admin/${userData.id}`);
            }
            if (userData.user_type === 'user') {
                navigate(`/user/${userData.id}`);
            }
            if (userData.user_type === 'librarian') {
                navigate(`/librarian/${userData.id}`);
            }
        } catch (error) {
        // Handle login error, e.g., display an error message
        console.error('Login failed:', error);
        }
    };

    return (
        <Center>
        <Flex gap="xl" direction="column" align="center" style={{ height: '100vh' }}>
            <h1>Login into website</h1>
            <AutoLogout />
            <TextInput
            label="Username"
            name="username"
            value={loginResp.username}
            onChange={handleInputChange}
            placeholder="Enter new username"
            withAsterisk
            error={formSubmitted && validationErrors.username}
            />
            <Flex gap="xl" justify="left" direction="row" wrap="wrap">
            <PasswordInput
                style={{ width: '10em' }}
                label="Password"
                name="password"
                value={loginResp.password}
                onChange={handleInputChange}
                placeholder="Enter new password"
                withAsterisk
                error={formSubmitted && validationErrors.password}
            />
            </Flex>

            <Button  type="button" variant="filled" size="sm" onClick={handleSubmit}>
            Login
            </Button>
        </Flex>
        </Center>
    );
}

export default Login;
