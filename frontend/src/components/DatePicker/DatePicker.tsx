import React, { useState } from 'react';
import {  Button, Group } from '@mantine/core'; // Adjust imports as needed
import { DatePicker} from '@mantine/dates'; // Adjust imports as needed

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

interface DateRangePickerProps {
    createdAt: Date;
    endedAt: Date;
    onCreatedAtChange: (newDate: Date) => void;
    onEndedAtChange: (newDate: Date) => void;
}

function DateRangePicker({
    createdAt,
    endedAt,
    onCreatedAtChange,
    onEndedAtChange,
    }: DateRangePickerProps){
    const handleCreatedAtChange = (newDate : Date) => {
        // Ensure that newDate is not null (you can adjust this logic based on your requirements)
        if (newDate !== null) {
            onCreatedAtChange(newDate);
        }
    };

    const handleEndedAtChange = (newDate: Date) => {
        // Ensure that newDate is not null (you can adjust this logic based on your requirements)
        if (newDate !== null) {
            onEndedAtChange(newDate);
        }
    };

    const [calendarEndVisible, setCalendarEndVisible] = useState(false);
    const [calendarStartVisible, setCalendarStartVisible] = useState(false);

    const toggleEndCalendar = () => {
        setCalendarEndVisible(!calendarEndVisible);
    };
    const toggleStartCalendar = () => {
        setCalendarStartVisible(!calendarStartVisible);
    };

    return (
        <div>
            <Button leftIcon={<CalendarMonthOutlinedIcon />} color="grape" onClick={toggleEndCalendar}>
                End Date
            </Button>

            {calendarEndVisible && (
                <Group position="center">
                    <DatePicker value={endedAt} onChange={handleEndedAtChange} defaultLevel="month" />
                </Group>
            )}

            <Button leftIcon={<CalendarMonthOutlinedIcon />} color="grape" onClick={toggleStartCalendar}>
                Start Date
            </Button>
            {calendarEndVisible && (
                <Group position="center">
                    <DatePicker value={createdAt} onChange={handleCreatedAtChange} defaultLevel="month" />
                </Group>
            )}
        </div>
    );
}

export default DateRangePicker;
