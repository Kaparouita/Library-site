import React, { useState } from 'react';
import { ActionIcon,Flex, Text, TextInput, List } from '@mantine/core';
import { User, ProfileUser, createUserProfile } from '../../components/user/User';
import { Paso } from '../../components/user/User';
import { Address } from '../../components/user/User';
import { ListItem } from '@mui/material';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import EditIcon from '@mui/icons-material/EditRounded';
import EditableField from './EditableField';



const RenderPaso = (paso: Paso) => {
    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleString('en-US', options);
    };

    return (
        <div>
            <List withPadding listStyleType="disc">
            <List.Item>
                <Text size="xl">Paso ID: {paso.id}</Text>
            </List.Item>
            <List.Item>
                <Text size="xl">UN Number: {paso.un_number}</Text>
            </List.Item>
            <List.Item>
                <Text size="xl">Created At: {formatDate(paso.created_at)}</Text>
            </List.Item>
            <List.Item>
                <Text size="xl">End At: {formatDate(paso.end_at)}</Text>
            </List.Item>
            </List>
        </div>
    );
};


const RenderAddress = (address: Address, setUserData: React.Dispatch<React.SetStateAction<ProfileUser>>) => {
    const [editing, setEditing] = useState(false);
    const [editedValue, setEditedValue] = useState(address);
    const [currField, setCurrField] = useState<string | null>(null); // Initialize with null

    const handleEditClick = () => {
        setEditing(!editing);
        if (!editing) {
        // Update the user data with the edited value
        setUserData((prevUserData) => ({
            ...prevUserData,
            address: editedValue, // Update the 'address' property
        }));
        // Save the edited value to your data structure or API here
        }
    };

    const handleInputChange = (property: keyof Address, value: string) => {
        setEditedValue((prevEditedValue) => ({
            ...prevEditedValue,
            [property]: value,
        }));
    };

    const handleFieldEditClick = (property: string) => {
        setCurrField(property);
        handleEditClick(); // Trigger the edit click action
    };

    const renderPropertyInputs = () => {
        return Object.keys(address).map((property) => (
        <div key={property}>
            {property !== "id" && property !== "user_id" &&(
                <List withPadding listStyleType="disc">
                <List.Item>
                    <Flex direction='row' gap='md'>
                        <Text size="xl">
                        {property}:&nbsp;
                        {editing && currField === property ? (
                            <TextInput
                            name={property}
                            value={editedValue[property as keyof Address]}
                            onChange={(e) => handleInputChange(property as keyof Address, e.target.value)}
                            />
                        ) : (
                            editedValue[property as keyof Address]
                        )}
                        </Text>
                        <ActionIcon
                            onClick={() => handleFieldEditClick(property)}
                            size="md"
                            variant="default"
                            radius="md"
                            >
                            {editing && currField === property ? <DoneRoundedIcon /> : <EditIcon />}
                        </ActionIcon>
                    </Flex>
                </List.Item>
                </List>
            )}
        </div>
        ));
    };

    return (
        <div>
            {renderPropertyInputs()}
        </div>
    );
};


const RenderField = ({ obj, setUserData }: { obj: ProfileUser; setUserData: React.Dispatch<React.SetStateAction<ProfileUser>> }) => {
    let values: (keyof ProfileUser)[] = Object.keys(obj) as (keyof ProfileUser)[];
    // Use map to create an array of JSX elements
    const renderedFields = values.map((prop: keyof ProfileUser) => (
        <div key={prop}>
            <List listStyleType="disc">
                <Text size="xl">
                    {prop === "paso" ? (
                    RenderPaso(obj[prop] as Paso)
                    ) : prop === "address" ? (
                    RenderAddress(obj[prop] as Address, setUserData)
                    ) : (
                        <EditableField
                            field={obj[prop]} // Pass the user property as the field
                            onEdit={(newValue) => {
                                // Define a callback function to handle the edit
                                setUserData((prevUserData) => ({
                                    ...prevUserData,
                                    [prop]: newValue,
                                }));
                            }}
                            label={prop.toString()} // Use the property name as the label
                        />
                    )}
                </Text>
            </List>
        </div>
    ));
    return <>{renderedFields}</>;
};


export default RenderField;

