import React, { useState } from 'react';
import { ActionIcon, Popover, TextInput, Button } from '@mantine/core';
import EditIcon from '@mui/icons-material/Edit';
import UserServices from '../../components/user/UserServices';
import User from '../../components/user/User';

interface PopOverButtonProps {
    label: string;
    fieldName1: string;
    fieldName2: string;
    user: any; // You should replace 'any' with the actual type of your user object
    setUser: (user: any) => void; // You should replace 'any' with the actual type of your user object
}

function PopOverButton(props: PopOverButtonProps) {
    const { label, fieldName1, fieldName2, user, setUser } = props;

    const handleSaveClick = async () => {
        const resp = await UserServices.updateUser(user);
        console.log(user[fieldName1][fieldName2]);
        console.log(user);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;


    };

    return (
        <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
            <Popover.Target>
                <ActionIcon size="md" variant="default" radius="xl">
                    <EditIcon />
                </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
                <TextInput
                    name={fieldName1}
                    value={fieldName2 ? user[fieldName1][fieldName2] : user[fieldName1]}
                    label={label}
                    placeholder={label}
                    size="xs"
                    onChange={handleInputChange}
                />
                <Button size="xs" onClick={handleSaveClick} >
                    Save
                </Button>
            </Popover.Dropdown>
        </Popover>
    );
}

export default PopOverButton;
