import React, { useState } from 'react';
import {Flex,
Text,
Button,
TextInput,
PasswordInput,
Select,
Group,
} from '@mantine/core';
import { User } from '../../components/user/User'; // Adjust the path as needed
import { validateRegistrationForm } from './RegistrationValidation';
import DateRangePicker from '../../components/DatePicker/DatePicker';
// import { validateRegistrationForm } from './RegistrationValidation';

const RegistrationForm: React.FC = () => {
const [user, setUser] = useState(new User);
const [updatedUser, setUpdatedUser] = useState({ ...user });

const [updatedPaso, setUpdatedPaso] = useState(updatedUser.paso);
const [address, setAddress] = useState(updatedUser.address);

const [gender, setGender] = useState<string | null>('male');
const [userState, setUserState] = useState<string | null>(null);
const [studentState, setStudentState] =  useState<string | null>(null);
const [university, setUniversity] = useState<string | null>('UOC');
const [calendarStartVisible, setCalendarStartVisible] = useState(false);
const [calendarEndVisible, setCalendarEndVisible] = useState(false);

const [formSubmitted, setFormSubmitted] = useState(false);
const [validationErrors, setValidationErrors] = useState(new User);
const [confirmPassword, setConfirmPassword] = useState('');

const [createdAt, setCreatedAt] = useState(new Date());
const [endAt, setEndAt] = useState(updatedPaso.end_at);

// handlers
const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUpdatedUser((prevUser) => ({
    ...prevUser,
    [name]: value,
    }));

    // Clear validation error when the user starts typing again
    setValidationErrors((prevErrors) => ({
    ...prevErrors,
    [name]: value,
    }));
};

const handlePasoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdatedPaso((prevPaso) => ({
    ...prevPaso,
    [name]: value,
    }));
};

const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddress((prevAddress) => ({
    ...prevAddress,
    [name]: value,
    }));
};


const handleCreatedAtChange = (newDate : Date) => {
    setCreatedAt(newDate);
    };

const handleEndedAtChange = (newDate : Date) => {
    setEndAt(newDate);
};

const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setConfirmPassword(value);
};

const toggleStartCalendar = () => {
    setCalendarStartVisible(!calendarStartVisible);
};

const toggleEndCalendar = () => {
    setCalendarEndVisible(!calendarEndVisible);
};

const handleSubmit = () => {
    setFormSubmitted(true);
    updatedPaso.created_at = createdAt;
    updatedPaso.end_at = endAt;
    updatedUser.paso = updatedPaso;

    updatedUser.gender = gender || '';
    updatedUser.user_type = userState || 'student';
    updatedUser.student_type = studentState || 'Barchelor';;
    updatedUser.university = university || 'UOC';
    updatedUser.address = address;

    // Perform validation
    const errors = validateRegistrationForm(updatedUser, confirmPassword)
    if (errors) {
        setValidationErrors(errors);
        return;
    }
    console.log(updatedUser);
    setUser(updatedUser);
    // You can perform API requests or additional logic here
};

// HTML
    return (
        <Flex gap="xl" justify="center" align="center" direction="column" wrap="wrap">
            <Text size="xl">Register</Text>
            <Flex gap="xl" justify="left" direction="row" wrap="wrap">
                <TextInput
                    label="First Name"
                    name="first_name"
                    value={updatedUser.first_name}
                    onChange={handleInputChange}
                    placeholder="Enter new first name"
                    withAsterisk
                    error={formSubmitted && validationErrors.first_name}
                />
                <TextInput
                    label="Last Name"
                    name="last_name"
                    value={updatedUser.last_name}
                    onChange={handleInputChange}
                    placeholder="Enter new last name"
                    withAsterisk
                    error={formSubmitted && validationErrors.last_name}
                />
            </Flex>
            <TextInput
                label="Username"
                name="username"
                value={updatedUser.username}
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
                    value={updatedUser.password}
                    onChange={handleInputChange}
                    placeholder="Enter new password"
                    withAsterisk
                    error={formSubmitted && validationErrors.password}
                />
                <PasswordInput
                    style={{ width: '10em' }}
                    label="Confirm Password"
                    name="confirm password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    placeholder="Enter new password"
                    withAsterisk
                    error={formSubmitted && validationErrors.password}
                />
            </Flex>
            <TextInput
                label="Email"
                name="email"
                value={updatedUser.email}
                onChange={handleInputChange}
                placeholder="Enter new email"
                withAsterisk
                error={formSubmitted && validationErrors.email}
            />
            <Flex gap="xl" justify="left" direction="row" wrap="wrap">
                <TextInput
                    label="Town"
                    name="town"
                    value={address.town}
                    onChange={handleAddressChange}
                    placeholder="Enter Address Town"
                    error={formSubmitted && validationErrors.address.town}
                />
                <TextInput
                    label="Country"
                    name="country"
                    value={address.country}
                    onChange={handleAddressChange}
                    placeholder="Enter Address Country"
                    error={formSubmitted && validationErrors.address.country}
                />
                <TextInput
                    label="Road"
                    name="road"
                    value={address.road}
                    onChange={handleAddressChange}
                    placeholder="Enter Address Road"
                    error={formSubmitted && validationErrors.address.road}
                />
                <TextInput
                    style={{ width: '4rem' }}
                    label="Number"
                    name="number"
                    value={address.number}
                    onChange={handleAddressChange}
                    placeholder="Enter Address Number"
                    error={formSubmitted && validationErrors.address.number}
                />
            </Flex>
            <Flex gap="xl">
                <Select
                    maw={320}
                    mx="auto"
                    label="Gender"
                    placeholder="Pick one"
                    value={gender}
                    onChange={setGender}
                    data={[
                        { value: 'Male', label: 'Male' },
                        { value: 'FeMale', label: 'Female' },
                        { value: 'other', label: 'Other' },
                    ]}
                    transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
                    withinPortal
                />
                <Select
                    maw={320}
                    mx="auto"
                    label="User type"
                    placeholder="Pick one"
                    value={userState}
                    onChange={setUserState}
                    data={[
                        { value: 'User', label: 'User' },
                        { value: 'Librarian', label: 'Librarian' },
                    ]}
                    transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
                    withinPortal
                />
            </Flex>

            <Flex align-items="baseline" justify="center" direction="row"  gap="xl">
                <Flex direction="row">
                    <TextInput
                        label="Paso UN Number"
                        name="un_number"
                        value={updatedPaso.un_number}
                        onChange={handlePasoChange}
                        placeholder="Enter Paso UN Number"
                        withAsterisk
                        error={formSubmitted && validationErrors.paso.un_number}
                    />
                    <Flex align="center" justify="top" direction="column" column-count="2"  margin-top="25px">
                        <Group position="center">
                            <DateRangePicker  
                                createdAt={createdAt}
                                endedAt={endAt}
                                onCreatedAtChange={handleCreatedAtChange}
                                onEndedAtChange={handleEndedAtChange}
                            />
                        </Group>
                    </Flex>
                <Flex align-items="end" direction="row">
                    <Flex gap="xl" justify="left" direction="column" wrap="wrap">
                        <Select
                            maw={320}
                            mx="auto"
                            label="University"
                            placeholder="Select a university"
                            value={university}
                            onChange={setUniversity}
                            data={[
                                { value: 'UOC', label: 'UOC' },
                                { value: 'HELMEPA', label: 'HELMEPA' },
                                { value: 'TUC', label: 'TUC' },
                            ]}
                            transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
                            withinPortal
                            error={formSubmitted && validationErrors.university}
                            />

                        <TextInput
                            label="Appartment"
                            name="appartment"
                            value={updatedUser.appartment}
                            onChange={handleInputChange}
                            placeholder="Enter appartment"
                            error={formSubmitted && validationErrors.appartment}
                        />
                        <Select
                            maw={320}
                            mx="auto"
                            label="Student type"
                            placeholder="Select student type"
                            value={studentState}
                            onChange={setStudentState}
                        data={[
                            { value: 'Bachelor', label: 'Bachelor' },
                            { value: 'Master', label: 'Master' },
                            { value: 'PhD', label: 'PhD' },
                        ]}
                        transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
                        withinPortal
                        />
                    </Flex>
                </Flex>
        </Flex>
    </Flex>
        <Button type="button" variant="filled" size="sm" onClick={handleSubmit}>
            Submit
        </Button>
    </Flex>
    );
    };

    export default RegistrationForm;
