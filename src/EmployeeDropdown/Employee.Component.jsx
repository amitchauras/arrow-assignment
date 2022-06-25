import React, { useState } from 'react';
import "../styles.css";
import SelectSearch from "react-select-search";
import { useRef } from "react";
import EmployeeData from './Employee.json';
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const EmployeeDropdown = () => {
    const searchInput = useRef();
    const [personName, setPersonName] = useState('');
    const [click, setClick] = useState(true);

    const handleChange = (...args) => {
        debugger
        console.log("ARGS:", args);
        setPersonName(args[1].name)
    };

    const handleFilter = () => {
        return (searchValue) => {
            if (searchValue.length === 0) {
                return EmployeeData;
            }
            const updatedItems = EmployeeData.map((list) => {
                const newItems = list.items.filter((item) => {
                    return item.name.toLowerCase().includes(searchValue.toLowerCase());
                });
                return { ...list, items: newItems };
            });
            return updatedItems;
        };
    };

    const IconTextField = ({ iconStart, iconEnd, InputProps, ...props }) => {
        return (
            <TextField
                {...props}
                InputProps={{
                    ...InputProps,
                    startAdornment: iconStart ? (
                        <InputAdornment position="start">{iconStart}</InputAdornment>
                    ) : null,
                    endAdornment: iconEnd ? (
                        <InputAdornment position="end">{iconEnd}</InputAdornment>
                    ) : null
                }}
                style={{width: '300px'}}
            />
        );
    };
    debugger
    return (
        <>
            {
                click ?
                    <IconTextField
                        label="Select Employee"
                        iconStart={EmployeeData.length}
                        iconEnd={<ArrowDropDownIcon sx={{ color: "#0089ff", fontSize: 20 }} />}
                        onClick={() => setClick(false)}
                        value={personName}
                    /> :
                    <>
                        <IconTextField
                            label="Select Employee"
                            iconStart={EmployeeData.length}
                            iconEnd={<ArrowDropUpIcon sx={{ color: "#0089ff", fontSize: 20 }} />}
                            onClick={() => setClick(true)}
                            value={personName}
                        />
                        <SelectSearch
                            ref={searchInput}
                            options={EmployeeData}
                            filterOptions={handleFilter}
                            value=""
                            name="Employee"
                            placeholder="Select Employee"
                            search
                            onChange={handleChange}
                        />
                    </>
            }
        </>
    );
}
