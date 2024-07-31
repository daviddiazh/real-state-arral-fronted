import { AutocompleteInput } from "../../components/Autocomplete";
import { useState } from 'react';

const data = [
    'Hola 1',
    'Hola 10',
    'Hola 2',
    'Hola 3',
    'Hola 4',
    'Hola 5',
];

export const Home = () => {
  const [value, setValue] = useState('');
  console.log({ value })

  return (
    <div style={{ marginTop: 60 }}>
        <p>Home</p>
        <AutocompleteInput
            data={data}
            label='Buscar datos'
            value={value}
            setValue={setValue}
        />
    </div>
  )
}
