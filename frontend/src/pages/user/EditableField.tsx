import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import EditIcon from '@mui/icons-material/EditRounded';
import React, { useState } from 'react';
import { List, Text, Flex, ActionIcon, TextInput } from '@mantine/core';

interface EditableFieldProps<T extends React.ReactNode> {
    field: T;
    onEdit: (newValue: T) => void;
    label: string;
}

const EditableField = <T extends React.ReactNode>({
    field,
    onEdit,
    label,
}: EditableFieldProps<T>) => {
    const [editing, setEditing] = useState(false);
    const [editedValue, setEditedValue] = useState(field);
    const [currField, setCurrField] = useState<string | null>(null);

    const handleEditClick = () => {
        setEditing(!editing);
        if (editing) {
            console.log(editedValue)
            onEdit(editedValue);
        }
    };

    const handleFieldEditClick = () => {
        setCurrField(label);
        handleEditClick();
    };

    const handleInputChange = (value: T) => {
        setEditedValue(value);
    };

    return (
        <div>
        <List listStyleType="disc">
            <List.Item>
            <Flex direction="row" gap="md">
                <Text size="xl">
                {label}:&nbsp;
                {editing && currField === label ? (
                    <TextInput
                        name={label}
                        value={editedValue as string}
                        onChange={(e) => handleInputChange(e.target.value as T)}
                    />
                ) : (
                    editedValue
                )}
                </Text>
                <ActionIcon
                    onClick={handleFieldEditClick}
                    size="md"
                    variant="default"
                    radius="md"
                >
                {editing  ? <DoneRoundedIcon /> : <EditIcon />}
                </ActionIcon>
            </Flex>
            </List.Item>
        </List>
        </div>
    );
};

export default EditableField;
