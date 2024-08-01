/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, TextField } from "@mui/material";
import { AutocompleteProps } from './interface';

export const AutocompleteInput = ({ 
    data, 
    label, 
    value, 
    setValue 
}: AutocompleteProps) => {
    return (
        <Autocomplete
            freeSolo
            disableClearable
            options={data.map((option) => option)}
            onChange={(event: any, newValue: string | null) => {
                setValue(newValue);
            }}
            defaultValue="Cualquiera"
            style={{ width: '100%' }}
            renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  value={value}
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
            )}
        />
    )
}
