import React from 'react';
import TextField from '@material-ui/core/TextField';
import '../styles.css';

export const DatePickers = () => {

  return (
    <form className="container" noValidate>
      <TextField
        id="date"
        label="Date Picker"
        type="date"
        placeholderText="Date picker"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
