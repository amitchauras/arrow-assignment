import React, { useState, useRef } from 'react';
import "../styles.css";
import SelectSearch from "react-select-search";
import EmployeeData from './Employee.json';
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Checkbox from './Checkbox';

export const EmployeeDropdown = () => {
    const searchInput = useRef();
    const [personName, setPersonName] = useState('');
    const [click, setClick] = useState(true);
    const [employeeDetail, setEmployeeDetail] = useState(EmployeeData)

    const handleChange = (...args) => {
        setPersonName(args[1].name)
    };

    const handleFilter = () => {
        return (searchValue) => {
            if (searchValue.length === 0) {
                return employeeDetail;
            }
            const updatedItems = employeeDetail.map((list) => {
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
                style={{ width: '300px' }}
            />
        );
    };

    const employeeDataLength = () => {
        const Employee = employeeDetail.map((item) => item.items.length)
        const EmployeeLength = Employee.reduce((partialSum, a) => partialSum + a, 0);
        return EmployeeLength
    }
    const handleAllChecked = (event) => {
        const currentEmployeeData = employeeDetail
        const updatedItems = currentEmployeeData.map((list) => {
            if (list.name == event.target.value){
                list.disabled = true;
            } else list.disabled = false;
            return list
        });
        const filteredData = updatedItems.filter((item) => item.disabled === true)
        const updatedFilteredData = filteredData.map((filterData) => {
            return filterData.items
        })
        updatedFilteredData.map((item) => {
            const basedItem = item.map((based) => {
                    based.disabled = event.target.checked;
        })
            return basedItem
        });
        setEmployeeDetail(currentEmployeeData);
    };
    const handleCheckChieldElement = (event) => {
        const currentEmployeeData = employeeDetail
        const updatedItems = currentEmployeeData.map((list) => {
            return list
        });
        const updatedFilteredData = updatedItems.map((filterData) => {
            return filterData.items
        })
        updatedFilteredData.map((item) => {
            const filteredData = item.filter((item) => item.name === event.target.value)
            const basedItem = filteredData.map((based) => {
                if (based.name == event.target.value){
                    based.disabled = event.target.checked;
                }
        })
            return basedItem
        });
        setEmployeeDetail(currentEmployeeData);
    };
    const headerCheckbox = (optionValue) => {
        
        return (
            <div>
                <input
                    type="checkbox"
                    onClick={(e) => handleAllChecked(e)}
                    value={optionValue}
                />{" "}
                <label>{optionValue}</label>
            </div>
        );
    }
    const Option = (optionValue) => {
        return (
            <Checkbox
                handleCheckChieldElement={handleCheckChieldElement}
                {...optionValue}
            />
        );
    }
    return (
        <>
            {
                click ?
                    <IconTextField
                        label="Select Employee"
                        iconStart={employeeDataLength()}
                        iconEnd={<ArrowDropDownIcon sx={{ color: "#0089ff", fontSize: 20 }} />}
                        onClick={() => setClick(false)}
                        value={personName}
                    /> :
                    <>
                        <IconTextField
                            label="Select Employee"
                            iconStart={employeeDataLength()}
                            iconEnd={<ArrowDropUpIcon sx={{ color: "#0089ff", fontSize: 20 }} />}
                            onClick={() => setClick(true)}
                            value={personName}
                        />
                        <SelectSearch
                            ref={searchInput}
                            filterOptions={handleFilter}
                            renderOption={(optionValue) => Option(optionValue)}
                            renderGroupHeader={(name) => headerCheckbox(name)}
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
